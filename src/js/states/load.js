(function(exports) {
    'use strict';

    var BWRUN = exports.BWRUN || {};

    //Loading Screen: If level is passed, it will load a level.
    BWRUN.LoadState = {
        init: function(level) {
            this.level = level;
        },

        preload: function() {
            this.loadingText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'carrier_command', "Loading...", 18);
            this.loadingText.anchor.setTo(0.5);

            if(this.level) {
                this.load.tilemap(this.level, 'json/' + this.level + '.json', null, Phaser.Tilemap.TILED_JSON);
            } else {
                this.load.image('world', 'images/world.png');
                this.load.image('button', 'images/button.png');
                this.load.image('bg', 'images/bg.png');
                this.load.image('bg1', 'images/bg1.png');
                this.load.image('bg2', 'images/bg2.png');

                this.load.spritesheet('player', 'images/player.png', 16, 24, 2);
            }
        },

        create: function() {
            if(this.level) {
                this.game.state.start('play', true, false, this.level);
            } else {
                this.game.state.start('menu');
            }
        }
    };
    exports.BWRUN = BWRUN;
}(window));
