const { src, dest, series } = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

const scripts = () => src([
  "scr/*.ts",
  "scr/**/*.ts",
  "src/**/**/*.ts"
])
  .pipe(tsProject())
  .pipe(dest("dist/"))

exports.default = scripts;