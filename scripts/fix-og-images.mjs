// Next emits generated Open Graph images as extensionless files (out/**/opengraph-image).
// Static hosts such as GitHub Pages then serve them as application/octet-stream, which
// some link scrapers reject. This gives every generated image a .png extension and
// repoints every reference at it. Runs automatically after `next build`.
import { readdir, readFile, writeFile, copyFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";
const REWRITABLE = /\.(html|txt|json|xml)$/;

async function walk(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(p)));
    else found.push(p);
  }
  return found;
}

const files = await walk(OUT);

const images = files.filter((f) => f.endsWith("/opengraph-image"));
await Promise.all(images.map((f) => copyFile(f, `${f}.png`)));

let rewritten = 0;
for (const f of files.filter((f) => REWRITABLE.test(f))) {
  const src = await readFile(f, "utf8");
  const next = src.replace(/\/opengraph-image(?!\.png)/g, "/opengraph-image.png");
  if (next !== src) {
    await writeFile(f, next);
    rewritten += 1;
  }
}

console.log(`og-images: ${images.length} image(s) given .png, ${rewritten} file(s) repointed`);
