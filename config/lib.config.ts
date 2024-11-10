import { extname, relative, resolve } from "path"
import { fileURLToPath } from "node:url"
import { glob } from "glob"

import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"
import classGenerator from "./plugins/classGenerator"
import tsconfigPaths from "vite-tsconfig-paths"

const generator = classGenerator()

const entry = resolve(__dirname, "../src")
console.log({ entry }, { url: import.meta.url })
export default defineConfig({
  css: {
    modules: {
      generateScopedName: (name) => {
        if (name.startsWith("_")) {
          return name
        }
        return generator()
      },
    },
  },
  plugins: [
    solidPlugin(),
    tsconfigPaths(),
    libInjectCss(),
    dts({ include: [entry] }),
  ],
  build: {
    rollupOptions: {
      external: ["solid-js", "solid-js/web", "solid-js/store"],
      input: Object.fromEntries(
        glob
          .sync(entry + "/**/*.{ts,tsx}", {
            ignore: [entry + "/**/*.d.ts", entry + "/**/test.tsx"],
          })
          .map((file) => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative(entry, file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(
              new URL(file, import.meta.url.replace("/config", "")),
            ),
          ]),
      ),
    },
    copyPublicDir: false,
    lib: {
      entry: entry + "/index.ts",
      name: "@minsize/ui",
    },
  },
})
