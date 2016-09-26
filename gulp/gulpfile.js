var gulp = require('gulp'),
sass = require('gulp-sass'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
jshint = require('gulp-jshint'),
htmlmin = require('gulp-htmlmin'),
minifycss = require('gulp-minify-css');

var packageJSON  = require('./package'),
jshintConfig = packageJSON.jshintConfig;

gulp.task('htmlmin',function(){
	var options = {
		removeComments: true,  //清除HTML注释
		collapseWhitespace: true,  //压缩HTML
		collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
		removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
		removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
		removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
		minifyJS: true,  //压缩页面JS
		minifyCSS: true  //压缩页面CSS
	};
	gulp.src('./html/src/*.html')
	.pipe(htmlmin(options))
	.pipe(gulp.dest('html'));
})

gulp.task('sass', function(){
	return gulp.src('./sass/*.scss')
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest('./css'))
})

gulp.task('minifycss',['sass'],function(){
	return gulp.src('./css/*.css')
	.pipe(rename({
		// dirname: "main/text",
		// basename: "base",
		// prefix: "prefix-",
		suffix: ".min"
		// extname: ".min.css"
	}))
	.pipe(minifycss())
	.pipe(gulp.dest('./css/min'))
})

gulp.task('jshint',function() {
	return gulp.src('./script/*.js')
	.pipe(jshint(jshintConfig))
	.pipe(jshint.reporter('default'))
})

gulp.task('minifyjs',['jshint'],function(){
	return gulp.src('./script/*.js')
	.pipe(rename({suffix: ".min"}))
	.pipe(uglify())
	.pipe(gulp.dest('./script/min'))
})

gulp.task('default',['htmlmin','sass','minifycss','jshint','minifyjs'])

var whtml = gulp.watch('./html/src/*.html',['htmlmin']);
whtml.on('change',function(){
	console.log('html change');
})

var wcss = gulp.watch('./sass/*.scss',['sass','minifycss']);
wcss.on('change',function(){
	console.log('css change');
})

var wjs = gulp.watch('./script/*.js',['jshint','minifyjs']);
wjs.on('change',function(){
	console.log('js change');
})