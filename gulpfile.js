var gulp   = require('gulp'),
    $      = require('gulp-load-plugins')({lazy: true}),
    config = require('./config/gulp.config.js');

gulp.task('libs', function() {
    gulp.src(config.files.libs)
        .pipe($.plumber())
        .pipe($.concat(config.libs.outFile))
        .pipe(gulp.dest(config.libs.destFolder))
        .pipe($.connect.reload());
});

gulp.task('scripts', function() {
    gulp.src(config.files.scripts)
        .pipe($.plumber())
        .pipe($.concat(config.scripts.outFile))
        .pipe(gulp.dest(config.scripts.destFolder))
        .pipe($.connect.reload());
});

gulp.task('html', function() {
    gulp.src(config.files.html)
        .pipe($.plumber())
        .pipe(gulp.dest(config.folders.dest));
});

gulp.task('watch', function() {
    gulp.watch(config.files.scripts, ['scripts']);
    gulp.watch(config.files.libs, ['libs']);
    gulp.watch(config.files.html, ['html']);
});

gulp.task('build', ['scripts', 'libs', 'html']);

gulp.task('dev', ['watch', 'server']);

gulp.task('server', ['build'], function() {
    $.connect.server(config.server);
});

gulp.task('default', ['dev']);
