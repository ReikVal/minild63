(function(exports) {
    'use strict';

    var BWRUN = exports.BWRUN || {};

    BWRUN.MenuState = {
        init: function() {
            // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;

            this.physics.startSystem(Phaser.Physics.ARCADE);
        },

        preload: function() {
            this.load.image('world', 'images/world.png');
            this.load.image('button', 'images/button.png');
            this.load.image('bg', 'images/bg.png');
            this.load.image('bg1', 'images/bg1.png');
            this.load.image('bg2', 'images/bg2.png');

            this.load.spritesheet('player', 'images/player.png', 16, 24, 2);
        },

        create: function() {
            this.game.stage.backgroundColor = '#787878';
            this.game.state.start('play', true, false, 'level1');
        },

        deleteSave: function() {
            if(exports.localStorage) {
                exports.localStorage.clear();
            }
        }
    };

    exports.BWRUN = BWRUN;

}(window));
