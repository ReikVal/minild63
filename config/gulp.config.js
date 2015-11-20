var sourceFolder = 'src',
    destFolder   = 'public';

module.exports = {
    folders: {
        source: sourceFolder,
        dest: destFolder
    },
    files: {
        scripts: [
            `${sourceFolder}/js/**/*.js`
        ],
        libs: [
            'node_modules/phaser/dist/phaser.min.js'
        ],
        html: `${sourceFolder}/*.html`
    },
    libs: {
        destFolder: `${destFolder}/js`,
        outFile: 'libs.js'
    },
    scripts: {
        destFolder: `${destFolder}/js`,
        outFile: 'main.js'
    },
    server: {
        root: destFolder,
        livereload: true
    }
};
