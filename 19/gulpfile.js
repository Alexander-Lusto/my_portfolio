var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');


gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('sass/**/*.scss') // Берем источник
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('css')) // Выгружаем результата в папку css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            // baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});
gulp.task('scripts', function() {
    return gulp.src(['js/common.js', 'app/libs/**/*.js'])
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
    return gulp.src('*.html')
    .pipe(browserSync.reload({ stream: true }))
});
gulp.task('watch', function() {
    gulp.watch('sass/**/*.scss', gulp.parallel('sass')); // Наблюдение за scss файлами
    gulp.watch('*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
    gulp.watch(['js/common.js', 'libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
}); //ctrl + c - чтобы отключить

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));
