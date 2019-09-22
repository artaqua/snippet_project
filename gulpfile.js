'use strict';

// /////////////////////////////// VARIABLES
var gulp                      = require('gulp'),
    del                       = require('del'),
    sass                      = require('gulp-sass'),
    moduleImporter            = require('sass-module-importer'),
    autoprefixer              = require('gulp-autoprefixer'),
    cleanCSS                  = require('gulp-clean-css'),
    cache                     = require('gulp-cached'),
    image                     = require('gulp-image'),
    spritesmith               = require('gulp.spritesmith'),
    plumber                   = require('gulp-plumber'),
    notify                    = require("gulp-notify"),
    rename                    = require('gulp-rename'),
    pug                       = require('gulp-pug'),
    browserSync               = require('browser-sync').create(),
    svgstore                  = require('gulp-svgstore'),
    svgmin                    = require('gulp-svgmin'),
    surge                     = require('gulp-surge'),
    webpack                   = require('webpack'),
    webpackStream             = require('webpack-stream'),
    webpackConfig             = require('./webpack.config.js');
    
// /////////////////////////////// PATHS
var build = 'build',
    src = 'src';

var path = {
  src: {
    pug: src + '/*.pug',
    mainJs: src + '/js/main.js',
    vendorsJs: src + '/js/vendors.js',
    style: src + '/sass/*.scss',
    img: [src + '/img/**/**/**/*.*', '!' + src + '/img/sprites/**/*'],
    pngSprite: src + '/img/sprites/source_sprite_png/**/*.png',
    svgSprite: src + '/img/sprites/source_sprite_svg/**/*.svg',
    sassComponents: src + '/sass/_components/',
    fonts: src + '/fonts/**/*.*',
    resources: src + '/resources/**/*.*'
  },
  watch: {
    pug: [src + '/*.pug', src + '/pug/**/**/**/*.pug'],
    js: src + '/js/**/**/*',
    style: src + '/sass/**/**/**/*.*',
    img: [src + '/img/**/**/**/*.*', '!' + src + '/img/sprites/**/*'],
    pngSprite: src + '/img/sprites/source_sprite_png/**/*.png',
    svgSprite: src + '/img/sprites/source_sprite_svg/**/*.svg',
    fonts: src + '/fonts/**/**/**/*.*',
    resources: src + '/resources/**/**/**/*.*'
  },
  build: {
    html: build + '/',
    js: build + '/assets/js/',
    css: build + '/assets/css/',
    img: build + '/assets/img/',
    minImg: src + '/img/',
    sprites: build + '/assets/img/sprites/',
    fonts: build + '/assets/fonts/',
    resources: build + '/assets/resources/'
  },
  LiveReloadPath: './' + build
};

/////////////////////////////// LIVERELOAD
gulp.task('browser-sync', async function(done) {
  return browserSync.init({
    injectChanges: true,
    server: {
      baseDir: path.LiveReloadPath
    },
    notify: false
  });
});
function bsReload(done) { browserSync.reload(); done(); };

// /////////////////////////////// TASKS
gulp.task('clean:build', function(done) {
  return del(path.build.html);
});

gulp.task('html:build', function(done) {
  return gulp.src(path.src.pug)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream())
});
gulp.task('htmlReload', gulp.series('html:build', bsReload));

gulp.task('style:build', function(done) {
  return gulp.src(path.src.style)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass({
      errLogToConsole: true,
      importer: moduleImporter()
    }))
    .pipe(autoprefixer())
    // Минимизация css
    // .pipe(cleanCSS())
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
});
gulp.task('styleReload', gulp.series('style:build', bsReload));

gulp.task('js:build', function(done) {
  return gulp.src('src/entry.js', { 
      allowEmpty: true
    })
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
});

gulp.task('img:build', function(done) {
  return gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream());
});

gulp.task('fonts:build', function(done) {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('resources:build', function(done) {
  return gulp.src(path.src.resources)
    .pipe(gulp.dest(path.build.resources))
    .pipe(browserSync.stream());
});

gulp.task('pngSprite', function(done) {
  var spriteData = gulp.src(path.src.pngSprite)
    .pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../img/sprites/sprite.png',
      cssName: 'png-sprite.scss',
      algorithm: 'binary-tree',
      padding: 15
    }));
    spriteData.img.pipe(gulp.dest(path.build.sprites))
    spriteData.css.pipe(gulp.dest(path.src.sassComponents))
    .pipe(browserSync.stream());
  done();
});

// Как делается svg sprite 
// 1) Svg иконки берутся из папки source_sprite_svg
// 2) Минимизируются
// 3) Вставляются иконки c помощью миксина в pug/_mixins/svg-icon.pug вот так:
//    +svg('yourIcon') где yourIcon имя файла иконки в папке source_sprite_svg/yourIcon.svg
gulp.task('svgSprite', function(done) {
  return gulp.src(path.src.svgSprite)
    .pipe(rename({
      prefix: 'svg-icon-'
    }))
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename({
      basename: 'sprite'
    }))
    .pipe(gulp.dest(path.build.sprites))
    .pipe(browserSync.stream());
});

/////////////////////////////// WATCH
gulp.task('watch', function() {
  gulp.watch(path.watch.pug,  gulp.series('htmlReload'));
  gulp.watch(path.watch.style, gulp.series('styleReload'));
  gulp.watch(path.watch.js, gulp.series('js:build'));
  gulp.watch(path.watch.img, gulp.series('img:build'));
  gulp.watch(path.watch.resources, gulp.series('resources:build'));
  gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
  gulp.watch(path.watch.pngSprite, gulp.series('pngSprite'));
  gulp.watch(path.watch.svgSprite, gulp.series('svgSprite'));
});

/////////////////////////////// DEFAULT
gulp.task('default', gulp.series(
  gulp.parallel('clean:build'),
  gulp.parallel('htmlReload', 'styleReload', 'js:build'),
  gulp.parallel('img:build', 'fonts:build', 'resources:build', 'pngSprite', 'svgSprite'),
  gulp.parallel('browser-sync', 'watch')
));

/////////////////////////////// MIN IMGS 
gulp.task('img', async function() {
  return gulp.src(path.src.img)
    .pipe(cache('images'))
    .pipe(image())
    .pipe(gulp.dest(path.build.minImg))
});

/////////////////////////////// DEPLOY PROJECT
gulp.task('deploy', async function () {
  return surge({
    project: './build',           // Path to your static build directory
    domain: 'flex-flex.surge.sh'  // Your domain or Surge subdomain
  })
})



