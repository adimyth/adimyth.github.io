// Next emits generated images as extensionless files (out/**/opengraph-image and
// out/apple-icon). Static hosts such as GitHub Pages then serve them as
// application/octet-stream, which some link scrapers and iOS reject. This gives every
// generated image a .png extension and repoints every reference at it. Runs
// automatically after `next build`.
import { readdir, readFile, writeFile, copyFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";
const REWRITABLE = /\.(html|txt|json|xml)$/;
// Every route Next generates from an ImageResponse file convention.
const GENERATED = ["opengraph-image", "apple-icon"];
// Matches the extensionless path but not one already carrying an extension, so a second
// run over rewritten output is a no-op.
const GENERATED_REF = new RegExp(`/(${GENERATED.join("|")})(?![\\w.-])`, "g");

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

const images = files.filter((f) => GENERATED.some((name) => f.endsWith(`/${name}`)));
await Promise.all(images.map((f) => copyFile(f, `${f}.png`)));

let rewritten = 0;
for (const f of files.filter((f) => REWRITABLE.test(f))) {
  const src = await readFile(f, "utf8");
  const next = src.replace(GENERATED_REF, "/$1.png");
  if (next !== src) {
    await writeFile(f, next);
    rewritten += 1;
  }
}

console.log(`generated images: ${images.length} given .png, ${rewritten} file(s) repointed`);
