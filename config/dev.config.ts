import { defineConfig } from "vite"
import devtools from "solid-devtools/vite"

import tsconfigPaths from "vite-tsconfig-paths"
import solidPlugin from "vite-plugin-solid"

import classGenerator from "./plugins/classGenerator"
import eruda from "./plugins/eruda"
import solidSVG from "./plugins/solidSVG"

const generator = classGenerator()

export default defineConfig({
  base: "./",
  css: {
    modules: {
      generateScopedName: (name) => {
        if (name.startsWith("_")) {
          return name
        }
        return `${name}_${generator()}`
      },
    },
  },
  server: {
    port: 18300,
    host: "0.0.0.0",
  },
  plugins: [
    devtools({
      /* features options - all disabled by default */
      autoname: true, // e.g. enable autoname
    }),
    eruda(),
    tsconfigPaths(),
    solidPlugin(),
    solidSVG({
      svgo: {
        enabled: false,
      },
    }),
  ],
})
