import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/accordium.ts"],
  bundle: true,
  outfile: "./dist/accordium.mjs",
  minify: true,
  format: "esm",
  target: ["es2015"],
});

await esbuild.build({
  entryPoints: ["./src/accordium.ts"],
  bundle: true,
  outfile: "./dist/accordium.cjs",
  minify: true,
  format: "cjs",
  target: ["es2015"],
});
