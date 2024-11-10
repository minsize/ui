import { extname, relative, resolve } from "path"
import { fileURLToPath } from "node:url"
import { glob } from "glob"

import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"

export default defineConfig({
  plugins: [solidPlugin(), libInjectCss(), dts({ include: ["src"] })],
  build: {
    rollupOptions: {
      external: ["solid-js"],
      input: Object.fromEntries(
        glob
          .sync("src/**/*.{ts,tsx}", {
            ignore: ["src/**/*.d.ts"],
          })
          .map((file) => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative("src", file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
    },
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
    },
  },
})
