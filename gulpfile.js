var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var jade         = require('gulp-jade');
var autoprefixer = require('gulp-autoprefixer');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var rename       = require('gulp-rename');

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
    .pipe(sass({
      indentedSyntax: true,
      outputStyle: "compressed"
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('download', function() {
  gulp.src(['src/sass/_z-tooltips.sass'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(rename("z-toltips.sass"))
    .pipe(gulp.dest('dist/download'))
    .pipe(sass({
      indentedSyntax: true,
      outputStyle: "compressed"
    }))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('dist/download'))
});


gulp.task('build', ['styles', 'jade', 'download']);

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("src/sass/**/*.sass", ['styles']);
  gulp.watch("src/sass/_z-tooltips.sass", ['download']);
  gulp.watch("src/**/*.jade", ['jade']);
});
