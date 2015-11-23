(function(exports) {
    'use strict';

    var BWRUN = exports.BWRUN || {};

    BWRUN.PlayState = {
        preload: function() {
            this.load.tilemap('level1', 'json/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('world', 'images/world.png');
        },

        create: function() {
            this.map = this.add.tilemap('level1');
            this.map.addTilesetImage('world', 'world');
            this.layer = this.map.createLayer('level1');
            this.layer.resizeWorld();
        }
    };

    exports.BWRUN = BWRUN;
}(window));
