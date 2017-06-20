/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var gulpFilter = require('gulp-filter');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var include = require('gulp-include');
var stylus = require('gulp-stylus');
var cssmin = require('gulp-minify-css');
var sass = require('gulp-sass');

var publishdir = './www/';

var src = {
    js: ['scripts/**/*.js', 'js/**/*.js', 'views/**/*.js']
};

var dist = {
    js: publishdir + '/scripts/'
};


gulp.task('pages', function () {
    gulp.src('./views/**/*.html')
      .pipe(gulp.dest(publishdir + '/views'));

    gulp.src('./*.html')
      .pipe(gulp.dest(publishdir));

});

gulp.task('buildIonic', function () {
    gulp.src('./lib/**/*')
      .pipe(gulp.dest(publishdir + '/lib/'));

    gulp.src('./config.xml')
      .pipe(gulp.dest(publishdir));
    gulp.src('./ionic.config.json')
      .pipe(gulp.dest(publishdir));


});

function buildJS() {
    return gulp.src(src.js)
        .pipe(include())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dist.js));
}
gulp.task('js', buildJS);

gulp.task('css', function () {
    gulp.src('./css/**/*.css')
      .pipe(gulp.dest(publishdir + '/css'));

});

gulp.task('images', function () {
    gulp.src('./images/**/*')
      .pipe(gulp.dest(publishdir + '/images/'));
});

gulp.task('default', ['js', 'pages', 'buildIonic', 'css', 'images']); // development