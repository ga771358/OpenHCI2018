var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var compass = require('gulp-compass');
var jade = require('gulp-jade');
var webserver = require('gulp-webserver');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');

// image
gulp.task('clean-images', function() {
    /*return gulp.src('assets/images/*', {
            read: false
        })
        .pipe(clean());*/
});
gulp.task('images', ['clean-images'], function() {
    return gulp.src('assets/images/**') //no this
        .pipe(gulp.dest('assets/images/'));
});

// css
gulp.task('clean-css', function() {
    // return gulp.src('build/assets/styles/*', {
    //         read: false
    //     })
    //     .pipe(clean());
});
gulp.task('css', ['clean-css'], function() {
    return gulp.src('assets/styles/*.scss')
        .pipe(compass({
            css: 'assets/styles/',
            sass: 'assets/styles/',
            image: 'assets/images/',
            sourcemap: false,
            style: 'nested', // nested, expanded, compact, compressed
            comments: false
        }))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        // .pipe(uglifycss())
        .pipe(gulp.dest('assets/styles/'))
        
});

// js
gulp.task('clean-js', function() {
    // return gulp.src('build/assets/scripts/*', {
    //         read: false
    //     })
    //     .pipe(clean());
});
gulp.task('concat-js', function() {
    // return gulp.src(['src/assets/scripts/lib/jquery-3.0.0.min.js', 'src/assets/scripts/lib/TweenMax.min.js', 'src/assets/scripts/lib/device.min.js', 'src/assets/scripts/lib/imagesloaded.pkgd.min.js', 'src/assets/scripts/lib/slick.min.js', 'src/assets/scripts/lib/easeljs-0.8.2.min.js', 'src/assets/scripts/lib/preloadjs-0.6.2.min.js'])
    //   .pipe(concat('lib.js'))
    //   .pipe(gulp.dest('build/assets/scripts/'));
});

gulp.task('js', ['clean-js', 'concat-js'], function() {
    return gulp.src('assets/scripts/**')
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        // .pipe(uglify())
        .pipe(gulp.dest('assets/scripts/'));
});

// JADE to HTML
gulp.task('clean-html', function() {
    // return gulp.src('build/*.html', {
    //         read: false
    //     })
    //     .pipe(clean());
});
gulp.task('html', ['clean-html'], function() {
    gulp.src('**/[^_]*.jade')
        .pipe(jade({
            pretty: true,
            basedir: __dirname + '/src'
        }))
        .pipe(gulp.dest(''))
})

// 監聽檔案
gulp.task('watch', function() {
    gulp.watch('assets/styles/*.scss', ['css']);
    gulp.watch('assets/scripts/*', ['js']);
    gulp.watch('assets/images/**', ['images']);
    gulp.watch('**/*.jade', ['html']);
});

// 本機伺服器
gulp.task('webserver', function() {
    gulp.src('')
        .pipe(webserver({
            host: '127.0.0.1',
            port: 9527,
            livereload: true,
            directoryListing: false,
            open: true,
            fallback: '/index.html'
        }));
});

gulp.task('default', ['html', 'css', 'js', 'images'], function() {
    gulp.start('webserver');
    gulp.start('watch');
});