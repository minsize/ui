import type { StorybookConfig } from "storybook-solidjs-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],

  framework: {
    name: "storybook-solidjs-vite",
    options: {},
  },
  core: {
    builder: {
      name: "@storybook/builder-vite",
      options: {
        viteConfigPath: "./config/dev.config.ts",
      },
    }, // 👈 The builder enabled here.
  },
  docs: {},
}
export default config
