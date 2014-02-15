var gulp = require('gulp');
var gutil = require('gulp-util');
var qunit = require('gulp-qunit');

gulp.task('test', function() {
  return gulp.src('./test/runner.html').pipe(qunit());
});


gulp.task('default', ['test']);
