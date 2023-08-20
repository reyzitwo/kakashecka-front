import { defineConfig, loadEnv } from "vite";

import path from "path";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import svgr from "@honkhonk/vite-plugin-svgr";
import fs from "fs";

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), svgr(), process?.env?.ODR ? viteSingleFile() : null],
    server: {
      https: {
        key: fs.readFileSync("./.cert/key.pem"),
        cert: fs.readFileSync("./.cert/cert.pem"),
      },
    },
    resolve: {
      alias: {
        src: path.resolve("src/"),
        fs: require.resolve("rollup-plugin-node-builtins"),
      },
    },
    optimizeDeps: {
      include: ["recoil"],
    },
    build: {
      chunkSizeWarningLimit: 1000,
      sourcemap: false,
      outDir: process?.env?.ODR ? "odr-dist" : "dist",
    },
  });
};
