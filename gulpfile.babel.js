import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import cssnext from 'postcss-cssnext';
import debug from 'gulp-debug';
import doiuse from 'doiuse';
import del from 'del';
import envify from 'envify/custom';
import esdoc from 'gulp-esdoc-stream';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gulp_postcss from 'gulp-postcss';
import htmllint from 'gulp-htmllint';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import package_object from './package.json';
import plumber from 'gulp-plumber';
import replace from 'gulp-replace';
import server from 'gulp-server-livereload';
import stylelint from 'gulp-stylelint';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';

import 'css-modulesify';
import 'browserify-versionify';

let current_env = {
    'NODE_ENV' : process.env.BUILD_ENV || 'development'
};

const folders = {
    'sources' : './src',
    'build' : './dist',
    'doc' : './doc',
    'fonts' : '/fonts',
    'imgs' : '/img'
};

const files = {
    'bundle' : 'bundle.js',
    'entry_point' : '/js/main.jsx',
    'fonts' : '/fonts/**/*.woff',
    'html' : '/index.html',
    'i18n' : '/i18n/**/*.jsx',
    'imgs' : '/img/**/*',
    'scripts' : '/js/**/*.jsx',
    'style' : '/**/*.css'
};

/**
 * Removes all already-existing CSS files
 * @returns {*}
 */
const clean_style = () => {
    return del(folders.build + files.style);
};

/**
 *  Removes all already-existing JS files
 *  @returns {*}
 */
const clean_scripts = () => {
    return del(folders.build + files.bundle);
};

/**
 *  Removes all already-existing HTML files
 *  @returns {*}
 */
const clean_html = () => {
    return del(folders.build + files.html);
};

/**
 * Removes all already-existing WOFF font files
 * @returns {*}
 */
const clean_fonts = () => {
    return del(folders.build + files.fonts);
};

/**
 * Removes all already-existing image files
 * @returns {*}
 */
const clean_img = () => {
    return del(folders.build + files.imgs);
};

/**
 * Check syntax for HTML files
 * @returns {*}
 */
const html_lint = () => {
    // config : define the configuration file
    // failOnError : stop gulp process on error
    const htmllint_options = {
        'config' : '.htmllintrc',
        'failOnError' : true
    };

    return gulp.src(folders.sources + files.html)
        .pipe(plumber())
        .pipe(htmllint(htmllint_options));
};

/**
 * Check syntax for CSS files
 * @returns {*}
 */
const css_lint = () => {
    // define the stylelint options
    const stylelint_options = {
        'reporters' : [
            {
                'formatter' : 'string',
                'console' : true
            }
        ]
    };

    // define the postcss plugins to use
    const postcss_options = [
        doiuse({ browsers : [ 'ie >= 9', '> 1%', 'last 2 versions' ] })
    ];

    gulp.src(folders.sources + files.style)
        .pipe(plumber())
        .pipe(stylelint(stylelint_options));

    return gulp.src(folders.sources + files.style)
        .pipe(plumber())
        .pipe(gulp_postcss(postcss_options));
};

/**
 * Check syntax for JS files
 * @returns {*}
 */
const es_lint = () => {
    return gulp.src(folders.sources + files.scripts)
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
};

/**
 * Minify HTML files
 * @returns {*}
 */
const html = () => {
    // collapseWhitespace : remove whitespaces (dev indentation)
    // cssmin : minify inlinse CSS (though there shouldn't be some)
    // jsmin : minify inline JS (though there shouldn't be some)
    // removeComments : remove comment, if you want to keep a comment, write a '!' at the beginning of your comment
    const htmlmin_options = {
        'collapseWhitespace' : true,
        'cssmin' : true,
        'jsmin' : true,
        'removeComments' : true
    };

    return gulp.src(folders.sources + files.html)
        .pipe(plumber())
        .pipe(replace(/__VERSION__/g, package_object.version))
        .pipe(htmlmin(htmlmin_options))
        .pipe(gulp.dest(folders.build));
};

/**
 * Copy the WOFF font files to the `dist` folder
 * WARNING : no particular operation done as of now (simple copy)
 * @returns {*}
 */
const fonts = () => {
    return gulp.src(folders.sources + files.fonts)
        .pipe(plumber())
        .pipe(gulp.dest(folders.build + folders.fonts));
};

/**
 * Copy and compress image files to the `dist` folder
 * @returns {*}
 */
const img = () => {
    return gulp.src(folders.sources + files.imgs)
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest(folders.build + folders.imgs));
};

/**
 * Generate doc using JSDoc tags
 * @return {*}
 */
const doc = () => {
    // destination : define the output documentation folder
    // includes : define the input to use for the documentation parsing / generation
    const esdoc_options = {
        'destination' : folders.doc,
        'includes' : [ '.*\.jsx' ]
    };

    return gulp.src(
        [
            folders.sources + '/**/*.jsx',
            folders.sources + '/**/*.js'
        ]
    )
        .pipe(plumber())
        .pipe(esdoc(esdoc_options));
};

/**
 * Process JS files
 * Browserify : bundling
 * Babelify : transform ES6 code into "standard" JS
 * Versionify : replace the configuration placeholder by the package.json version number
 * Envify : replace process.env.NODE_ENV by the defined value
 */
const scripts = () => {
    // debug : flag to auto-generate and append sourcemap to the generated bundle
    // entries : main JSX file
    // extensions : file extensions to scan for bundling
    const browserify_options = {
        'debug' : true,
        'entries' : folders.sources + files.entry_point,
        'extensions' : [ '.jsx', '.css' ]
    };

    // define the placeholder to replace by the version number
    const versionify_options = {
        'placeholder' : '__VERSION__'
    };

    // o : define the output CSS file
    // use : define the list of PostCSS plugins to use
    const css_modulesify_options = {
        o : folders.build + '/main.css',
        use : [
            'postcss-modules-local-by-default',
            'postcss-modules-extract-imports',
            'postcss-modules-scope',
            cssnext({ browsers : [ 'ie >= 9', '> 1%', 'last 2 versions' ] })
        ]
    };

    return browserify(browserify_options)
        .transform(babelify)
        .transform('browserify-versionify', versionify_options)
        .transform(envify(current_env))
        .plugin('css-modulesify', css_modulesify_options)
        .bundle()
        .pipe(source(files.bundle))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(folders.build));
};

/**
 * Watch for file changes
 * .styl changes -> triggers the `style` task
 * .html changes -> triggers the `html` task
 * .jsx changes -> triggers the `scripts` task
 * i18n .jsx changes -> triggers the `scripts` task
 */
const watch = () => {
    gulp.watch(
        [
            folders.sources + files.i18n,
            folders.sources + files.style,
            folders.sources + files.scripts
        ],
        [
            'lint',
            'scripts'
        ]
    );
    gulp.watch(folders.sources + files.html, [ 'lint', 'html' ]);
};

/**
 * Serve files through a livereload server
 */
const serve = () => {
    // directoryListing : disable the ability to serve files as a "remote folder"
    // log : levels = ['info', 'debug']
    // host and port : straightforward
    const server_options = {
        'directoryListing' : false,
        'host' : '0.0.0.0',
        'log' : 'debug',
        'port' : 8080
    };

    gulp.src(folders.build)
        .pipe(plumber())
        .pipe(server(server_options));
};

// Cleaning tasks
gulp.task('clean_style', clean_style);
gulp.task('clean_scripts', clean_scripts);
gulp.task('clean_html', clean_html);
gulp.task('clean_fonts', clean_fonts);
gulp.task('clean_img', clean_img);
gulp.task('clean', [ 'clean_style', 'clean_scripts', 'clean_html', 'clean_fonts', 'clean_img' ]);

// Documentation generation
gulp.task('doc', doc);

// Heavy lifting
gulp.task('fonts', [ 'clean_fonts' ], fonts);
gulp.task('img', [ 'clean_img' ], img);
gulp.task('html', [ 'clean_html', 'fonts', 'img' ], html);
gulp.task('scripts', [ 'clean_scripts' ], scripts);

// Build task
gulp.task('build', [ 'scripts', 'html' ]);

// Linting tasks
gulp.task('html_lint', html_lint);
gulp.task('css_lint', css_lint);
gulp.task('es_lint', es_lint);
gulp.task('lint', [ 'html_lint', 'css_lint', 'es_lint' ]);

// Auto-process changes task
gulp.task('watch', [ 'lint' ], watch);

// Live-reload server task
gulp.task('serve', [ 'watch', 'build' ], serve);

// Default task
gulp.task('default', [ 'serve' ]);
