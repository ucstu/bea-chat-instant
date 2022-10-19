// import purgecss from "@fullhuman/postcss-purgecss";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import path from "path";
import postcssPresetEnv from "postcss-preset-env";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv(),
        // purgecss({
        //   content: ["./src/**/*.tsx"],
        // }),
      ],
    },
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  plugins: [
    react(),
    legacy()
  ],
});
