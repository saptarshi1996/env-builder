let fs = require('fs')
let fsExtra = require('fs-extra')
let gulp = require('gulp')
let swc = require('gulp-swc')
let terser = require('gulp-terser')

let swcOptions = {
  jsc: {
    target: 'es5'
  },
  module: {
    type: 'commonjs',
  },
}

let clear = function () {
  return fsExtra.remove('dist')
}

let generatePackageJson = function () {
  let packageJson = {
    'type': 'commonjs'
  }
  fs.writeFileSync('dist/package.json', JSON.stringify(packageJson, null, 2))
  return Promise.resolve()
}

let buildProject = function () {
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
