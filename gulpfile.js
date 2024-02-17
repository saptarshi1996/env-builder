import fs from 'fs'
import fsExtra from 'fs-extra'
import gulp from 'gulp'
import swc from 'gulp-swc'
import terser from 'gulp-terser'

const swcOptions = {
  jsc: {
    target: 'es5'
  },
  module: {
    type: 'commonjs',
  },
}

const clear = () => {
  return fsExtra.remove('dist')
}

const generatePackageJson = () => {
  const packageJson = {
    'type': 'commonjs'
  }
  fs.writeFileSync('dist/package.json', JSON.stringify(packageJson, null, 2))
  return Promise.resolve()
}

const buildProject = () => {
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

export const build = gulp.series([clear, buildProject, generatePackageJson])
