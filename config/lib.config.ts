import { resolve } from "node:path"

import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [solidPlugin(), dts({ include: ["src"] })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
    },
  },
})
