import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, "index.html"), join(dist, "index.html"));
await cp(join(root, "src"), join(dist, "src"), { recursive: true });
await cp(join(root, "assets"), join(dist, "assets"), { recursive: true });
await cp(join(root, "_headers"), join(dist, "_headers"));
await cp(join(root, "_redirects"), join(dist, "_redirects"));

console.log("Static site built in dist/");
