import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { defineConfig } from "vite";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const GENERATOR = pathToFileURL(
  path.join(HERE, "scripts", "generate-resume-data.mjs"),
).href;

/**
 * Vite config exists for exactly one reason: to keep the native Resume section
 * in sync with `public/Mukund_V_Resume.pdf` while `npm run dev` is running.
 *
 * `predev` / `prebuild` already regenerate `src/data/resume.generated.js`
 * before the server or build starts. This plugin covers the remaining case —
 * dropping a new PDF in while the dev server is up — by watching the file and
 * re-running the same generator, then reloading the page.
 *
 * Everything else is Vite's default; no other build behaviour is configured.
 */
function resumePdfWatcher() {
  const PDF = "public/Mukund_V_Resume.pdf";
  let running = false;
  let queued = false;

  return {
    name: "resume-pdf-watcher",
    apply: "serve",
    configureServer(server) {
      const regenerate = async () => {
        if (running) {
          queued = true;
          return;
        }
        running = true;
        try {
          // Cache-busted per run so edits to the generator are picked up too.
          const mod = await import(`${GENERATOR}?t=${Date.now()}`);
          const { changed } = await mod.generateResumeData();
          if (changed) server.ws.send({ type: "full-reload" });
        } catch (err) {
          server.config.logger.error(
            `\n[resume] regeneration FAILED — the page is still showing the ` +
              `previously generated data.\n  ${err?.message ?? err}\n`,
          );
        } finally {
          running = false;
          if (queued) {
            queued = false;
            await regenerate();
          }
        }
      };

      server.watcher.add(PDF);
      server.watcher.on("change", (file) => {
        if (file.replace(/\\/g, "/").endsWith(PDF)) regenerate();
      });
      server.watcher.on("add", (file) => {
        if (file.replace(/\\/g, "/").endsWith(PDF)) regenerate();
      });
    },
  };
}

export default defineConfig({
  plugins: [resumePdfWatcher()],
});
