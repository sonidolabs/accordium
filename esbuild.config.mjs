import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/accordium.ts"],
  bundle: true,
  outfile: "./dist/accordium.mjs",
  minify: false,
  format: "esm",
  target: ["es2015"],
});

await esbuild.build({
  entryPoints: ["./src/accordium.ts"],
  bundle: true,
  outfile: "./dist/accordium.cjs",
  minify: false,
  format: "cjs",
  target: ["es2015"],
});
