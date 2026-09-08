import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";

const root = process.cwd();
const host = "127.0.0.1";
const port = Number(process.env.PORT ?? 4173);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webp": "image/webp"
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${host}:${port}`);
  const pathname = decodeURIComponent(url.pathname);
  const candidate = pathname === "/" ? "index.html" : pathname.slice(1);
  const filePath = resolve(root, normalize(candidate));

  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const fileStat = await stat(filePath);
    const finalPath = fileStat.isDirectory() ? join(filePath, "index.html") : filePath;
    response.writeHead(200, {
      "Content-Type": types[extname(finalPath)] ?? "application/octet-stream"
    });
    createReadStream(finalPath).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(port, host, () => {
  console.log(`Serving on http://${host}:${port}/`);
});
