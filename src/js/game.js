(function(exports) {
    'use strict';

    var BWRUN = exports.BWRUN || {};

    var game = new Phaser.Game(768, 432, Phaser.AUTO);

    game.state.add('play', BWRUN.PlayState);

    game.state.start('play');
}(window));
