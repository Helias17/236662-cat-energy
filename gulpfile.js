"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var minify = require("gulp-csso");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var runseq = require("run-sequence");
var gulpCopy = require("gulp-copy");
var del = require("del");


/*                                  СБОРКА BUILD*/
gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(gulp.dest("build/css"))
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**\/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html");
});

gulp.task("copy", function () {
  return gulp
  .src([  "source/fonts/**\/*.{woff,woff2}","source/img/**","source/js/**","source/*.html"]  )
  .pipe(gulpCopy('build', { prefix: 1 }))
});

gulp.task("clean", function () {
  return del("build/");
});

gulp.task("build", function(done) {
  runseq ("clean","copy","style",done);
});



/*                                  ОТЛАДКА


gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**\/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html").on("change", server.reload);
});
*/
