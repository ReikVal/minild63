var sourceFolder = 'src',
    destFolder   = 'public';

module.exports = {
    folders: {
        source: sourceFolder,
        dest: destFolder
    },
    files: {
        scripts: [
            `${sourceFolder}/js/states/*.js`,
            `${sourceFolder}/js/**/*.js`
        ],
        libs: [
            'node_modules/phaser/dist/phaser.min.js'
        ],
        html: `${sourceFolder}/*.html`,
        images: `${sourceFolder}/images/*.*`,
        json: `${sourceFolder}/json/*.*`
    },
    libs: {
        destFolder: `${destFolder}/js`,
        outFile: 'libs.js'
    },
    scripts: {
        destFolder: `${destFolder}/js`,
        outFile: 'main.js'
    },
    images: {
        destFolder: `${destFolder}/images`
    },
    json: {
        destFolder: `${destFolder}/json`
    },
    server: {
        root: destFolder,
        livereload: true
    }
};
