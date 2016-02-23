(function(exports) {
    'use strict';

    var BWRUN = exports.BWRUN || {};

    BWRUN.MenuState = {
        init: function() {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;

            this.physics.startSystem(Phaser.Physics.ARCADE);
        },

        preload: function() {
            this.load.image('world', 'images/world.png');
            this.load.image('button', 'images/button.png');

            this.load.spritesheet('player', 'images/player.png', 16, 24, 2);
        },

        create: function() {
            this.game.state.start('play', true, false, 'level1');
        }
    };

    exports.BWRUN = BWRUN;

}(window));
