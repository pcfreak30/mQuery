var gulp = require('gulp');
var concat = require('gulp-concat');
var ugify = require('gulp-uglify');
var rename = require('gulp-rename');
var umd = require('gulp-umd');
var gulpClean = require('gulp-clean');

function build() {
  return gulp.src(
    ['src/polyfill.js', 'src/mQuery.js', 'src/lib/*', 'src/jquery-compatibility.js',
     'src/plugins/**/*.js',
     '!src/plugins/**/*test.js'])
    .pipe(concat('mQuery.js'))
    .pipe(umd({
                exports: function () {
                  return 'mq';
                },
                namespace: function () {
                  return 'mq';
                },
              }
    ))
    .pipe(gulp.dest('./dist/'))
    .pipe(ugify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/'))
}

exports.default = gulp.series(function clean() {
  return gulp.src('./dist/', {allowEmpty: true}).pipe(gulpClean())
}, build);
