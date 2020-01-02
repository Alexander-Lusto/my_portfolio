var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    // postcss = require('gulp-postcss'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-csso'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    // webp = require('gulp-webp'),
    svgstore = require('gulp-svgstore')
    posthtml = require('gulp-posthtml'),
    include = require('posthtml-include'),
    del = require('del');
    // run = require('run-sequence');

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('source/sass/**/*.scss') // Берем источник
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(plumber()) // не прирываться при возникновении ошибок
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('source/css')) // Выгружаем результата в папку css

        .pipe(minify()) // минифицируем css код
        .pipe(rename({suffix: '.min'})) //добавляем суффикс мин к названию файла
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});
gulp.task('images',function(){
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("build/img"));
});
gulp.task('webp',function(){
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img/webp"));
});
gulp.task('sprite', function(){
  return gulp.src("source/img/icon-*.svg")
      .pipe(svgstore({
        inlineSvg: true
      }))
      .pipe(rename("sprite.svg"))
      .pipe(gulp.dest('build/img'));
});
gulp.task('html', function(){
  return gulp.src("source/*.html")
    .pipe(plumber()) // не прирываться при возникновении ошибок
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
    .pipe(browserSync.reload({ stream: true }))
});
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'build/' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});
gulp.task('scripts', function() {
    return gulp.src(['source/js/common.js', 'app/libs/**/*.js'])
    .pipe(browserSync.reload({ stream: true }))
});
gulp.task('code', function() {
    return gulp.src('source/*.html')
    .pipe(browserSync.reload({ stream: true }))
});
gulp.task('watch', function() {
    gulp.watch('source/sass/**/*.scss', gulp.parallel('sass')); // Наблюдение за scss файлами
    gulp.watch('source/*.html', gulp.parallel('html')); // Наблюдение за HTML файлами в корне проекта
    gulp.watch(['source/js/common.js', 'source/libs/**/*.js'], gulp.parallel('scripts')); /* Наблюдение за главным JS файлом и за библиотеками*/
});
gulp.task('clean', function() {
  return del("build");
});
gulp.task('copy', function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**"
  ],{
    base: "source"
  })
  .pipe(gulp.dest("build"));
});


// gulp commands
gulp.task('start', gulp.parallel('sass','browser-sync', 'watch'));
gulp.task('build', gulp.series('clean','copy','sass','images','html'));
gulp.task('default', gulp.series('build', gulp.parallel('sass','browser-sync', 'watch')));
