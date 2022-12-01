import typescript from "rollup-plugin-ts";
import terser from "@rollup/plugin-terser";
import del from "rollup-plugin-delete";
import json from "@rollup/plugin-json";
import pkg from "./package.json";

export default [
  {
    input: "src/package/index.ts",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "esm" },
    ],
    plugins: [
      json(),
      del({ targets: "dist/*" }),
      typescript(),
      terser({
        compress: { unused: false, collapse_vars: false },
        output: { comments: false },
      }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
];
