var gulp    = require('gulp'),
    wait    = require('gulp-wait'),
    stylus  = require('gulp-stylus'),
    connect = require('gulp-connect'),
    inlineCss   = require('gulp-inline-css'),
    fileinclude = require('gulp-file-include');

var srcDir = './app/';
var distDir = './dist/'
var styleDir = srcDir + 'style/';

gulp.task('style', function () {
  gulp.src(styleDir + '**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest(distDir + 'style'));
});

gulp.task('fileinclude', function() {
  gulp.src(srcDir + 'html/pages/*.html')
    // wait style complete
    .pipe(wait(100))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './app/html/tpl/'
    }))
    .pipe(replaceStr('replace'))
    .pipe(inlineCss({
      applyStyleTags: false,
      removeStyleTags: false
    }))
    .pipe(replaceStr('fix'))
    .pipe(gulp.dest(distDir))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(
    [srcDir + '**/*.html', srcDir + '**/*.styl'],
    ['style', 'fileinclude']
  );
});

// 因为 inline css plugin 会自动给 <% attr => <% attr="" 导致 erb 语法失效
// 在这里进行临时替换
function replaceStr(type) {
  function transform(file, cb) {
    if(type === 'replace') {
      file.contents = new Buffer(String(file.contents).replace(/<%/g, '|%'));
    } else {
      file.contents = new Buffer(String(file.contents).replace(/\|%/g, '<%'));
    }
    cb(null, file);
  }
  return require('event-stream').map(transform);
}

gulp.task('default', ['style', 'fileinclude', 'connect', 'watch']);
