var gulp = require('gulp');
var prettify = require('gulp-jsbeautifier');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var factory = require("widget-tester").gulpTaskFactory;
var e2ePort = process.env.E2E_PORT || 8099;

var appJSFiles = [
  "./js/*.js",
  "./test/**/*.js"
];

/*---- tooling ---*/
gulp.task('pretty', function() {
  return gulp.src('./js/*.js')
    .pipe(prettify({config: '.jsbeautifyrc', mode: 'VERIFY_AND_WRITE'}))
    .pipe(gulp.dest('./js'))
    .on('error', function (error) {
      console.error(String(error));
    });
});

gulp.task("lint", function() {
  return gulp.src(appJSFiles)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task('build', function (cb) {
  runSequence(['pretty', 'lint'], cb);
});

/*---- testing ----*/
gulp.task("server", factory.testServer({https: false}));
gulp.task("server-close", factory.testServerClose());
gulp.task("test:webdrive_update", factory.webdriveUpdate());
gulp.task("test:e2e:core", ["test:webdrive_update"], factory.testE2EAngular({
  browser: "chrome",
  src: ["test/e2e/*.js"]
}));
gulp.task("test:e2e", function (cb) {
  runSequence("server", "test:e2e:core", "server-close", cb);
});

gulp.task("metrics", factory.metrics());
gulp.task("test",  function (cb) {
  runSequence("test:e2e", "metrics", cb);
});

gulp.task('default', [], function() {
  console.log('***********************'.yellow);
  console.log('  gulp test: run e2e tests'.yellow);
  console.log('  gulp build: hint, lint, and minify files into ./dist '.yellow);
  console.log('***********************'.yellow);
  return true;
});
