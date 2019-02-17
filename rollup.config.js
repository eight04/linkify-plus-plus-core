import cjs from "rollup-plugin-cjs-es";
import resolve from "rollup-plugin-node-resolve";
import {terser} from "rollup-plugin-terser";
import json from "rollup-plugin-json";

export default [
  createConfig({
    output: {file: "dist/linkify-plus-plus-core.js"}
  }),
  createConfig({
    output: {file: "dist/linkify-plus-plus-core.min.js"},
    plugins: [
      terser({
        compress: {
          passes: 3
        }
      })
    ]
  })
];

function createConfig({output, plugins = []}) {
  return {
    input: "index.js",
    output: {
      format: "iife",
      name: "linkifyPlusPlusCore",
      sourcemap: true,
      ...output
    },
    plugins: [
      resolve(),
      json(),
      cjs({
        nested: true
      }),
      ...plugins
    ]
  };
}
