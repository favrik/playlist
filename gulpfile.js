var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var qunit = require('gulp-qunit');

gulp.task('test', function() {
  return gulp.src('./test/runner.html').pipe(qunit());
});

gulp.task('build', function () {
  try {
    gulp.src('./src/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./build/'));
  } catch (e) {
    console.log(e);
  }
});

gulp.task('default', ['build', 'test']);
