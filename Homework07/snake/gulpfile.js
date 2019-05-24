var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-clean-css');
// var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
	return gulp.src('./src/scss/style.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(csso())
		// .pipe(rename({
		// 	suffix: '.min'
		// }))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(browserSync.stream())
		.pipe(gulp.dest('./public/css'));
});

function watch() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch('./src/scss/**/*.scss', ['sass']);
	gulp.watch("./*.html").on('change', browserSync.reload);
}
gulp.task('watch', watch);


