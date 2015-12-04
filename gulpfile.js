"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); 	// auto start local configured server
var open = require('gulp-open'); 		// open browser to page
var browserify = require('browserify'); // allows for 'require' syntax (bundles modular scripts to one.)
var reactify = require('reactify'); 	// JSX transformer
var source = require('vinyl-source-stream');
//var buffer = require('vinyl-buffer'); // necessary to uglify js
//var uglify = require('gulp-uglify');	// js compression
var concat = require('gulp-concat'); 	// file concatenator
var lint = require('gulp-eslint'); 		// js linter
var rename = require('gulp-rename');	// renames things.


var config = {
	port: 9905,
	devBaseUrl: 'http://localhost',
	paths:{
		html: './src/*.html',
		js: './src/**/*.js',
		images : './src/images/*',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css', 
			'node_modules/toastr/build/toastr.css'
		],
		dist: './dist', 
		mainJs: './src/main.js'
	}
}

//start loc server
gulp.task('connect', function(){
	connect.server({
		root:['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function(){
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port +'/'}));
});

gulp.task('html', function(){
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', function(){
	browserify(config.paths.mainJs)		
		.transform(reactify)		
		.bundle()		
		.on('error', console.error.bind(console))	
		.pipe(source('bundle.js'))		
		//.pipe(buffer())	
        //.pipe(uglify())				
		.pipe(gulp.dest(config.paths.dist + '/scripts'))		
		.pipe(connect.reload());
});

gulp.task('css', function(){
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function(){
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload());

	gulp.src('./src/favicon.ico')
		.pipe(gulp.dest(config.paths.dist));
});


gulp.task('lint', function(){
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});


gulp.task('watch', function(){
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'images', 'css', 'lint', 'open', 'watch']);