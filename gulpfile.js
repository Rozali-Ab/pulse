const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', browserSync.reload);
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));



// const gulp        = require('gulp');
// const browserSync = require('browser-sync');
// const sass        = require('gulp-sass')(require('sass'));
// const cleanCSS = require('gulp-clean-css');
// const autoprefixer = require('gulp-autoprefixer');
// const rename = require("gulp-rename");
// const imagemin = require('gulp-imagemin');
// const htmlmin = require('gulp-htmlmin');

// task('server', function() {

//     browserSync({
//         server: {
//             baseDir: "dist"
//         }
//     });

//     watch("src/*.html").on('change', reload);
// });

// task('styles', function() {
//     return src("src/sass/**/*.+(scss|sass)")
//         .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//         .pipe(rename({suffix: '.min', prefix: ''}))
//         .pipe(autoprefixer())
//         .pipe(cleanCSS({compatibility: 'ie8'}))
//         .pipe(dest("dist/css"))
//         .pipe(stream());
// });

// task('watch', function() {
//     watch("src/sass/**/*.+(scss|sass|css)", parallel('styles'));
//     watch("src/*.html").on('change', reload);
// });


// task('scripts', function() {
//     return src("src/js/**/*.js")
//         .pipe(dest("dist/js"));
// });

// task('fonts', function() {
//     return src("src/fonts/**/*")
//         .pipe(dest("dist/fonts"));
// });

// task('icons', function() {
//     return src("src/icons/**/*")
//         .pipe(dest("dist/icons"));
// });

// task('mailer', function() {
//     return src("src/mailer/**/*")
//         .pipe(dest("dist/mailer"));
// });

// task('images', function() {
//     return src("src/img/**/*")
//         .pipe(imagemin())
//         .pipe(dest("dist/img"));
// });

// task('default', parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'mailer', 'images'));