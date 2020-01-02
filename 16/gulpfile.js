var gulp = require('gulp'),
    sass = require('gulp-sass');



gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src(['sass/**/*.scss','sass/**/*.sass']) // Берем источник
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('css')) // Выгружаем результата в папку app/css
});

gulp.task('watch', function(){
    gulp.watch('sass/**/*.scss', gulp.parallel('sass')); // Наблюдение за scss файлами
}); //ctrl + c - чтобы отключить
