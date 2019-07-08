'use strict';

// /////////////////////////////// VARIABLES
var gulp                      = require('gulp'),
    del                       = require('del'),
    sass                      = require('gulp-sass'),
    moduleImporter            = require('sass-module-importer'),
    autoprefixer              = require('gulp-autoprefixer'),
    cleanCSS                  = require('gulp-clean-css'),
    imagemin                  = require('gulp-imagemin'),
    newer                     = require('gulp-newer'),
    spritesmith               = require('gulp.spritesmith'),
    plumber                   = require('gulp-plumber'),
    notify                    = require("gulp-notify"),
    rename                    = require('gulp-rename'),
    pug                       = require('gulp-pug'),
    browserSync               = require('browser-sync').create(),
    svgstore                  = require('gulp-svgstore'),
    svgmin                    = require('gulp-svgmin'),
    webpack                   = require('webpack'),
    webpackStream             = require('webpack-stream'),
    webpackConfig             = require('./webpack.config.js');
    
// /////////////////////////////// PATHS
var build = 'build',
    src = 'src';

var path = {
  build: {
    html: build + '/',
    js: build + '/assets/js/',
    css: build + '/assets/css/',
    img: build + '/assets/img/',
    sprites: build + '/assets/img/sprites/',
    fonts: build + '/assets/fonts/',
    resources: build + '/assets/resources/'
  },
  src: {
    pug: src + '/*.pug',
    mainJs: src + '/js/main.js',
    vendorsJs: src + '/js/vendors.js',
    style: src + '/sass/*.scss',
    img: [src + '/img/**/**/**/*.*', '!' + src + '/img/sprites/source_sprite_png/*.*', '!' + src + '/img/sprites/source_sprite_svg/*.*'],
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
    img: [src + '/img/**/**/**/*.*', '!' + src + '/img/svg-icons/*.*'],
    pngSprite: src + '/img/sprites/source_sprite_png/**/*.png',
    svgSprite: src + '/img/sprites/source_sprite_svg/**/*.svg',
    fonts: src + '/fonts/**/**/**/*.*',
    resources: src + '/resources/**/**/**/*.*'
  },
  LiveReloadPath: './' + build
};

// /////////////////////////////// TASKS
gulp.task('clean:build', function(done) {
  return del(path.build.html);
});

gulp.task('html:build',  function(done) {
  return gulp.src(path.src.pug)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.reload({stream: true}));
});

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

gulp.task('js:build', function(done) {
  return gulp.src('src/entry.js', { allowEmpty: true })
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('image:build', function(done) {
  return gulp.src(path.src.img)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(newer(path.build.img))
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: true
        }, {
          cleanupIDs: false
        }]
      })
    ]))
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('fonts:build', function(done) {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('resources:build', function(done) {
  return gulp.src(path.src.resources)
    .pipe(gulp.dest(path.build.resources))
    .pipe(browserSync.reload({stream: true}));
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
    .pipe(browserSync.reload({stream: true}));
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
    .pipe(browserSync.reload({stream: true}));
});

/////////////////////////////// LIVERELOAD
gulp.task('browser-sync', function(done) {
  return browserSync.init({
    injectChanges: true,
    server: {
      baseDir: path.LiveReloadPath
    },
    notify: false
  });
});

/////////////////////////////// WATCH
gulp.task('watch', function() {
  gulp.watch(path.watch.pug,  gulp.series('html:build'));
  gulp.watch(path.watch.style, gulp.series('style:build'));
  gulp.watch(path.watch.js, gulp.series('js:build'));
  gulp.watch(path.watch.resources, gulp.series('resources:build'));
  gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
  gulp.watch(path.watch.pngSprite, gulp.series('pngSprite'));
  gulp.watch(path.watch.svgSprite, gulp.series('svgSprite'));
  gulp.watch(path.watch.img, gulp.series('image:build'));
});

/////////////////////////////// DEFAULT
gulp.task('default', gulp.series(
  gulp.parallel('clean:build'),
  gulp.parallel('html:build', 'style:build', 'js:build'),
  gulp.parallel('resources:build', 'fonts:build', 'pngSprite', 'svgSprite', 'image:build'),
  gulp.parallel('browser-sync', 'watch')
));