import gulp from 'gulp';
import browsersync from 'browser-sync';
import fileinclude from 'gulp-file-include';
import scss from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import group_media from 'gulp-group-css-media-queries';
import rename from 'gulp-rename';
import del from 'del';

const project_folder = "dist"; // Production folder.
const source_folder = "src";  // Source folder.

const path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    // fonts: project_folder + "/fonts/",
  },
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: source_folder + "/scss/style.scss",
    js: source_folder + "/js/script.js",
    img: source_folder + "/img/**/*", // {jpg, png, svg, gif, ico, webp}
    // fonts: source_folder + "/fonts/*.ttf",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.*", // {jpg, png, svg, gif, ico, webp}
    // fonts: source_folder + "/fonts/*.ttf",
  }
}

export const deleteDist = () => {
  return del(project_folder);
}

export const html = () => {
  return gulp.src(path.src.html)
    .pipe(fileinclude())
    .pipe(gulp.dest(path.build.html))
    .pipe(browsersync.stream())
}

export const css = () => {
  return gulp.src(path.src.css)
    .pipe(scss({ outputStyle: "expanded" }))
    .pipe(group_media())
    .pipe(autoprefixer({
      overrideBrowserslist: ["last 5 versions"],
      cascade: true
    }))
    .pipe(gulp.dest(path.build.css))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest(path.build.css))
    .pipe(browsersync.stream())
}

export const js = () => {
  return gulp.src('src/js/main.js')
    .pipe(fileinclude())
    .pipe(gulp.dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest(path.build.js))
    .pipe(browsersync.stream())
}

export const img = () => {
  return gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(browsersync.stream())	
}

export const watchFiles = () => {
  gulp.watch([path.watch.html], build, html);
  gulp.watch([path.watch.css], build, css);
  gulp.watch([path.watch.js], build, js);
  gulp.watch([path.watch.img], build, img);
}

export const sync = () => {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/"
    },
    port: 3000,
    notify: false
  })
};

const build = gulp.series(deleteDist, gulp.parallel(html, css, js, img));
// const watching = gulp.parallel(build, watchFiles, sync);
// export default gulp.parallel(build, watchFiles, sync);

export default gulp.series(build, gulp.parallel(watchFiles, sync));