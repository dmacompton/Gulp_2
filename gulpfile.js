"use-strict"

var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    prefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css');

// server
gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
});

// css
gulp.task('css', function () {
    return gulp.src('style/*.css')
    .pipe(concatCss("bundle.css"))
    .pipe(prefixer("last 2 versions", '> 1%', 'ie 9'))
    .pipe(rename("bundle.css"))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
});

// min.css
gulp.task('css.min', function () {
    return gulp.src('style/*.css')
    .pipe(concatCss("bundle.css"))
    .pipe(prefixer("last 2 versions", '> 1%', 'ie 9'))
    .pipe(minifyCss())
    .pipe(rename("bundle.min.css"))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
});

// html
gulp.task('html', function () {
    gulp.src('app/index.html')
    .pipe(connect.reload());
});

// watch
gulp.task('watch', function () {
    gulp.watch('style/*.css', ['css']);
    gulp.watch('style/*.css', ['css.min']);
    gulp.watch('app/index.html', ['html']);
});

// default
gulp.task('default', ['connect', 'css', 'css.min', 'watch']);

