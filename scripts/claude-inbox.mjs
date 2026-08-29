import { execFile } from "node:child_process";
import { createServer } from "node:http";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const host = "127.0.0.1";
const port = Number(process.env.CLAUDE_INBOX_PORT ?? 3947);
const target = process.env.CLAUDE_TMUX_TARGET;
const maxBodyBytes = 20_000;
const allowedOrigins = new Set(["http://localhost:3000", "http://127.0.0.1:3000"]);
const bufferName = `claude-inbox-${process.pid}`;

function json(response, status, body, origin = "http://localhost:3000") {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": origin,
    "Vary": "Origin",
  });
  response.end(JSON.stringify(body));
}

function promptFrom({ instruction, selectedText }) {
  return `"""\n${selectedText}\n"""\n\n${instruction}`;
}

async function sendToTmux(prompt) {
  if (!target) throw new Error("CLAUDE_TMUX_TARGET is not set.");
  await execFileAsync("tmux", ["display-message", "-p", "-t", target, "#{pane_id}"], { timeout: 2_000 });
  await execFileAsync("tmux", ["set-buffer", "-b", bufferName, "--", prompt], { timeout: 2_000 });
  await execFileAsync("tmux", ["paste-buffer", "-d", "-b", bufferName, "-t", target], { timeout: 2_000 });
  await execFileAsync("tmux", ["send-keys", "-t", target, "Enter"], { timeout: 2_000 });
}

const server = createServer(async (request, response) => {
  const origin = request.headers.origin;
  if (origin && !allowedOrigins.has(origin)) return json(response, 403, { error: "Only the local portfolio may use this inbox." }, origin);
  if (request.method === "OPTIONS") {
    response.writeHead(204, { "Access-Control-Allow-Origin": origin ?? "http://localhost:3000", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Vary": "Origin" });
    return response.end();
  }
  if (request.method !== "POST" || request.url !== "/handoff") return json(response, 404, { error: "Not found." }, origin);

  let bytes = 0;
  let raw = "";
  for await (const chunk of request) {
    bytes += chunk.length;
    if (bytes > maxBodyBytes) return json(response, 413, { error: "The selected passage is too long." }, origin);
    raw += chunk;
  }

  try {
    const payload = JSON.parse(raw);
    const required = ["instruction", "selectedText"];
    if (required.some((key) => typeof payload[key] !== "string") || !payload.instruction.trim() || !payload.selectedText.trim()) throw new Error("An instruction and selected text are required.");
    await sendToTmux(promptFrom(payload));
    return json(response, 200, { ok: true }, origin);
  } catch (error) {
    return json(response, 503, { error: error instanceof Error ? error.message : "Could not contact tmux." }, origin);
  }
});

server.listen(port, host, () => {
  console.log(`Claude inbox listening at http://${host}:${port}`);
  if (!target) console.log("Set CLAUDE_TMUX_TARGET to the pane running Claude Code before sending handoffs.");
});
