const fs = require('fs')
const fsExtra = require('fs-extra')
const gulp = require('gulp')
const swc = require('gulp-swc')
const terser = require('gulp-terser')

const swcOptions = {
  jsc: {
    target: 'es5'
  },
  module: {
    type: 'commonjs',
  },
}

const clear = function () {
  return fsExtra.remove('dist')
}

const generatePackageJson = function () {
  const packageJson = {
    'type': 'commonjs'
  }
  fs.writeFileSync('dist/package.json', JSON.stringify(packageJson, null, 2))
  return Promise.resolve()
}

const buildProject = function () {
  return gulp.src('src/**/*.ts')
    .pipe(swc(swcOptions))
    .pipe(terser({
      mangle: true, // Enable variable name mangling
      compress: {
        unused: true, // Remove unused code
      },
    }))
    .pipe(gulp.dest('dist'))
}

exports.build = gulp.series(clear, buildProject, generatePackageJson)
