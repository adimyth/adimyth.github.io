#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const essaysDirectory = join(root, "content", "essays");
const publicDirectory = join(root, "public");
const appRoutes = new Set(["/", "/about"]);
const issues = [];

function issue(file, message) {
  issues.push(`${file}: ${message}`);
}

function localPath(url) {
  return join(publicDirectory, url.split(/[?#]/, 1)[0].replace(/^\//, ""));
}

function validateLocalTarget(file, target) {
  const pathname = target.split(/[?#]/, 1)[0];

  if (appRoutes.has(pathname)) return;

  if (pathname.startsWith("/essays/")) {
    const linkedSlug = pathname.replace(/^\/essays\//, "");
    if (!existsSync(join(essaysDirectory, `${linkedSlug}.mdx`))) issue(file, `broken essay link: ${target}`);
    return;
  }

  if (!existsSync(localPath(pathname))) issue(file, `broken local link or asset: ${target}`);
}

function validateEssay(file) {
  const path = join(essaysDirectory, file);
  const source = readFileSync(path, "utf8");
  const slug = file.replace(/\.mdx$/, "");

  if (!source.startsWith("---\n") || !/^title: .+$/m.test(source) || !/^date: .+$/m.test(source)) {
    issue(file, "missing required frontmatter (title or date)");
  }

  for (const [, target] of source.matchAll(/!?\[[^\]]*\]\((\/[^)\s#]+)/g)) {
    validateLocalTarget(file, target);
  }

  for (const [, target] of source.matchAll(/<(?:img|source)\b[^>]*(?:src|srcSet)=["'](\/[^"']+)/g)) {
    validateLocalTarget(file, target);
  }

  if (!slug) issue(file, "empty essay slug");
}

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, stdio: "inherit" });
  if (result.status !== 0) process.exitCode = result.status ?? 1;
}

for (const file of readdirSync(essaysDirectory).filter((entry) => entry.endsWith(".mdx"))) validateEssay(file);

if (issues.length) {
  console.error("\nPublish sanity checks failed:");
  for (const message of issues) console.error(`- ${message}`);
  process.exit(1);
}

run("npm", ["run", "lint"]);
run("npx", ["tsc", "--noEmit"]);

const stopSlop = join(root, "node_modules", ".bin", "stop-slop");
if (existsSync(stopSlop)) {
  run(stopSlop, ["content/essays"]);
} else {
  console.warn("\nstop-slop is not installed; skipping its optional editorial check.");
}
