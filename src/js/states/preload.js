(function(exports) {
    'use strict';

    var BWRUN = exports.BWRUN || {};

    BWRUN.PreloadState = {
        init: function() {
            // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;

            this.physics.startSystem(Phaser.Physics.ARCADE);
        },

        preload: function() {
            this.game.load.bitmapFont('carrier_command', 'fonts/carrier_command.png', 'fonts/carrier_command.xml');
        },

        create: function() {
            this.game.state.start('load');
        }
    };

    exports.BWRUN = BWRUN;

}(window));
