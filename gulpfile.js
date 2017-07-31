var gulp = require('gulp');
var postCSS = require('gulp-postcss');
var browserSync = require('browser-sync').create();
//var autoprefixer = require('autoprefixer');
var cssnext = require('postcss-cssnext');
var mixins = require('postcss-mixins');
var nested = require('postcss-nested');
var cssimport = require('postcss-import');
var csswring = require('csswring');
var mqpacker = require('css-mqpacker');
var rucksack = require('rucksack-css');
var lost = require('lost');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('css', function () {
	var processor = [
		cssimport(),
		mixins(),
		nested,
		lost(),
		rucksack(),
		cssnext({browsers: ['> 5%', 'ie 8']}),
		mqpacker(),
		csswring()
	];
	return gulp
		.src('./src/invie.css')
		.pipe(postCSS(processor))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('watch', function () {
	gulp.watch('./src/*.css', ['css']);
	gulp.watch('./dist/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'browser-sync']);