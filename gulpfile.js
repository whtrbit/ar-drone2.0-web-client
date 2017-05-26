var fs = require('fs'),
    gulp = require('gulp'),
    browserify = require('browserify'),
    less = require('gulp-less'),
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babelify = require('babelify'),
    sourcemaps = require('gulp-sourcemaps');

var path = {
  js: {
    src: './public/assets/js/src/',
    dest: './public/assets/js/dist/'
  },
  css: {
    src: './public/assets/less/',
    dest: './public/assets/css/'
  },
  html: {
    src: './public/'
  }
};

gulp.task('js', function () {
  var b = browserify({
    entries: path.js.src + 'main.js',
    debug: true,
    transform: [babelify]
  });

  return b.bundle()
    .pipe(source(path.js.dest + 'main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'));
});

gulp.task('less', function () {
    return gulp.src(path.css.src + 'main.less')
      .pipe(less())
      .pipe(gulp.dest(path.css.dest));
});

gulp.task('build', ['js', 'less']);

gulp.task('watch', function() {
  gulp.watch(path.js.src + '**/*.js', [ 'js' ]);
  gulp.watch(path.css.src + '**/*.less', [ 'less' ]);
});
