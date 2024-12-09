import { extname, relative, resolve } from "path"
import { fileURLToPath } from "node:url"
import { glob } from "glob"
import copy from "rollup-plugin-copy"

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
  // css: {
  //   modules: false,
  // },
  // resolve: {
  //   alias: [{ find: "@src", replacement: "/src" }],
  // },
  plugins: [
    solidPlugin(),
    tsconfigPaths(),
    libInjectCss(),
    dts({ include: [entry] }),
  ],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // assetFileNames: "[name][extname]",
        entryFileNames: "[name].js",
        assetFileNames: ({ name }) => {
          const [[, ext]] = Array.from((name || "").matchAll(/.([0-9-a-z]+)$/g))
          return `${ext}/[hash].${ext}`
        },
        plugins: [
          copy({
            targets: [{ src: "src/package.json", dest: "dist" }],
          }),
        ],
      },
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
    sourcemap: false,
    emptyOutDir: true,
    copyPublicDir: false,
    lib: {
      entry: entry + "/index.ts",
      name: "@minsize/ui",
    },
  },
})
