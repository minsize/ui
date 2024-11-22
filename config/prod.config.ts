import path from "node:path"

import { defineConfig } from "vite"
import { OutputOptions } from "rollup"

import { compilerOptions } from "./tsconfig.json"
import classGenerator from "./plugins/classGenerator"
import solidSVG from "./plugins/solidSVG"

import { fileURLToPath } from "url"

import tsconfigPaths from "vite-tsconfig-paths"
import solidPlugin from "vite-plugin-solid"
import injectEntryChunk from "./plugins/injectEntryChunk"

import transformImportsPlugin from "./plugins/transformImportsPlugin"

const generator = classGenerator()

const output: OutputOptions | OutputOptions[] = {
  chunkFileNames: "js/[hash].js",
  entryFileNames: "js/[hash].js",
  assetFileNames: ({ name }) => {
    const [[, ext]] = Array.from((name || "").matchAll(/.([0-9-a-z]+)$/g))
    return `${ext}/[hash].${ext}`
  },

  // experimentalMinChunkSize: 25_000,
}

console.log({ f: `${path.resolve(__dirname, "../src")}/` })

export default defineConfig({
  base: "/static/",
  publicDir: "public",
  esbuild: {
    pure: ["console.log"],
  },
  build: {
    target: "esnext",
    outDir: path.join(compilerOptions.outDir),
    minify: "terser",
    terserOptions: {
      toplevel: true,
      compress: {
        dead_code: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: output,
    },
  },
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
    // transformImportsPlugin({ baseDir: process.cwd() }),
    // eruda(),
    tsconfigPaths(),
    solidPlugin(),
    injectEntryChunk(),
    solidSVG({
      svgo: {
        enabled: false,
      },
    }),
  ],
})
