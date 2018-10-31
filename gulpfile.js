'use strict';

// /////////////////////////////// VARIABLES
var gulp                      = require('gulp'),
    watch                     = require('gulp-watch'),
    del                       = require('del'),
    cache                     = require('gulp-cached'),
    sass                      = require('gulp-sass'),
    moduleImporter            = require('sass-module-importer'),
    autoprefixer              = require('gulp-autoprefixer'),
    cleanCSS                  = require('gulp-clean-css'),
    imagemin                  = require('gulp-imagemin'),
    spritesmith               = require('gulp.spritesmith'),
    gulpif                    = require('gulp-if'),
    plumber                   = require('gulp-plumber'),
    notify                    = require("gulp-notify"),
    rename                    = require('gulp-rename'),
    runSequence               = require('run-sequence'),
    pug                       = require('gulp-pug'),
    browserSync               = require('browser-sync').create(),
    svgstore                  = require('gulp-svgstore'),
    svgmin                    = require('gulp-svgmin'),
    webpack                   = require('webpack'),
    webpackStream             = require('webpack-stream'),
    webpackConfig             = require('./webpack.config.js'),
    cachedPug                 = true,
    cachedSass                = true;

    
// /////////////////////////////// PATHS
var path = {
  build: {
    html: 'build/',
    js: 'build/assets/js/',
    css: 'build/assets/css/',
    img: 'build/assets/img/',
    sprites: 'build/assets/img/sprites/',
    fonts: 'build/assets/fonts/',
    resources: 'build/assets/resources/'
  },
  src: {
    pug: 'src/*.pug',
    mainJs: 'src/js/main.js',
    vendorsJs: 'src/js/vendors.js',
    style: 'src/sass/main.scss',
    img: ['src/img/**/**/**/*.*', '!src/img/sprites/source_sprite_png/*.*', '!src/img/sprites/source_sprite_svg/*.*'],
    pngSprite: 'src/img/sprites/source_sprite_png/**/*.png',
    svgSprite: 'src/img/sprites/source_sprite_svg/**/*.svg',
    sassComponents: 'src/sass/_components/',
    fonts: 'src/fonts/**/*.*',
    resources: 'src/resources/**/*.*'
  },
  watch: {
    pug: 'src/*.pug',
    pugInclude: 'src/pug/**/**/**/*.pug',
    js: 'src/js/**/*',
    style: 'src/sass/*.*',
    styleInclude: ['src/sass/**/**/**/*.*', '!src/sass/*.*'],
    img: ['src/img/**/**/**/*.*', '!src/img/svg-icons/*.*'],
    pngSprite: 'src/img/sprites/source_sprite_png/**/*.png',
    svgSprite: 'src/img/sprites/source_sprite_svg/**/*.svg',
    fonts: 'src/fonts/**/**/**/*.*',
    resources: 'src/resources/**/**/**/*.*'
  },
  clean: './build',
  LiveReloadPath: './build'
};

// /////////////////////////////// TASKS
gulp.task('clearCache', function () {
  cache.caches = {};
});

gulp.task('clean:build', function() {
  return del.sync(path.build.html);
});

gulp.task('html:build',  function() {
  return gulp.src(path.src.pug)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(gulpif(cachedPug, cache('pug')))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
});

gulp.task('style:build', function() {
  return gulp.src(path.src.style)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(gulpif(cachedSass, cache('sass')))
    .pipe(sass({
      errLogToConsole: true,
      importer: moduleImporter()
    }))
    .pipe(autoprefixer())
    // Минимизация css
    .pipe(cleanCSS())
    //
    .pipe(rename({
      basename: 'bundle'
    }))
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
});

gulp.task('js:build', function() {
  return gulp.src('src/entry.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
});

gulp.task('image:build', function() {
  return gulp.src(path.src.img)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(cache('images'))
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true,
      svgoPlugins: [
        {removeViewBox: false},
        {cleanupIDs: false}
      ]
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream());
});

gulp.task('fonts:build', function() {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(browserSync.stream());
});

gulp.task('resources:build', function() {
  return gulp.src(path.src.resources)
    .pipe(gulp.dest(path.build.resources))
    .pipe(browserSync.stream());
});

gulp.task('pngSprite', function () {
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
});

// Как делается svg sprite 
// 1) Svg иконки берутся из папки source_sprite_svg
// 2) Минимизируются
// 3) Вставляются иконки c помощью миксина в pug/_mixins/svg-icon.pug вот так:
//    +svg('yourIcon') где yourIcon имя файла иконки в папке source_sprite_svg/yourIcon.svg
gulp.task('svgSprite', function() {
  gulp.src(path.src.svgSprite)
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
    .pipe(gulp.dest(path.build.sprites));
});

/////////////////////////////// LIVERELOAD
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: path.LiveReloadPath
    },
    notify: false
  });
});

/////////////////////////////// WATCH
gulp.task('watch', function() {
  watch(path.watch.pug, function(event, cb) {
    cachedPug = true;
    gulp.start('html:build');
  });
  watch(path.watch.pugInclude, function(event, cb) {
    cachedPug = false;
    gulp.start('html:build');
  });
  watch(path.watch.style, function(event, cb) {
    cachedSass = true;
    gulp.start('style:build');
  });
  watch(path.watch.styleInclude, function(event, cb) {
    cachedSass = false;
    gulp.start('style:build');
  });
  watch(path.watch.js, function(event, cb) {
    gulp.start('js:build');
  });
  watch(path.watch.img, function(event, cb) {
    gulp.start('image:build');
  });
  watch(path.watch.pngSprite, function(event, cb) {
    gulp.start('pngSprite');
  });
  watch(path.watch.svgSprite, function(event, cb) {
    gulp.start('svgSprite');
  });
  watch(path.watch.fonts, function(event, cb) {
    gulp.start('fonts:build');
  });
  watch(path.watch.resources, function(event, cb) {
    gulp.start('resources:build');
  });
});

/////////////////////////////// DEFAULT
gulp.task('default', function() {
  runSequence(
    'clearCache',
    'clean:build',
    'image:build',
    'pngSprite',
    'svgSprite',
    'fonts:build',
    'resources:build',
    'html:build',
    'style:build',
    'js:build',
    'browser-sync',
    'watch'
  )
});