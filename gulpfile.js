var gulp = require('gulp');
var del = require('del');
var es = require('event-stream');
var htmlbuild = require('gulp-htmlbuild');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');

var gulpSrc = function (opts) {
  var paths = es.through();
  var files = es.through();

  paths.pipe(es.writeArray(function (err, srcs) {

    gulp.src(srcs, { cwd: 'app' }).pipe(files);

  }));

  return es.duplex(paths, files);
};

var jsBuild = es.pipeline(
  concat('main.js'),
  uglify(),
  gulp.dest('./dist')
);

var cssBuild = es.pipeline(
  concat('main.css'),
  cssmin(),
  gulp.dest('./dist')
);

gulp.task('default', function(cb) {

   del(['./dist/*'], cb);

   gulp.src(['./app/index.html'])
    .pipe(htmlbuild({

      js: htmlbuild.preprocess.js(function (block) {

        block.pipe(gulpSrc())
          .pipe(jsBuild);

        block.end('main.js');

      }),

      css: htmlbuild.preprocess.css(function (block) {

        block.pipe(gulpSrc())
          .pipe(cssBuild);

        block.end('main.css');

      }),
      //remove livereload scripe
      remove: function (block) {
        block.end();
      }
    }))
    .pipe(gulp.dest('./dist'));

   gulp.src('./app/img/*.{png,jpg}')
   .pipe(gulp.dest('./dist/img'));

   gulp.src('./app/music/*.{wav,ogg,mp3}')
   .pipe(gulp.dest('./dist/music'));

});


gulp.task('watch', function() {

  livereload.listen();

  gulp.watch(['app/**']).on('change', livereload.changed);

});