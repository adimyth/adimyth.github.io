import { spawn } from "node:child_process";

const inbox = spawn(process.execPath, ["scripts/claude-inbox.mjs"], { stdio: "inherit", env: process.env });
const next = spawn("./node_modules/.bin/next", ["dev"], { stdio: "inherit", env: process.env });

function stop(signal) {
  inbox.kill(signal);
  next.kill(signal);
}

process.on("SIGINT", () => stop("SIGINT"));
process.on("SIGTERM", () => stop("SIGTERM"));
next.on("exit", (code) => {
  inbox.kill();
  process.exit(code ?? 0);
});
