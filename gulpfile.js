var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var jade = require('gulp-jade');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./dist"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('jade', function() {
  gulp.src('src/*.jade')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(jade())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream:true}))
});


gulp.task('styles', function(){
  gulp.src(['src/sass/**/*.sass'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass({indentedSyntax: true}))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return gulp.src('src/js/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('build', ['styles', 'scripts', 'jade']);

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("src/sass/**/*.sass", ['styles']);
  gulp.watch("src/js/**/*.js", ['scripts']);
  gulp.watch("src/**/*.jade", ['jade']);
});
