(function(exports) {
    'use strict';

    var BWRUN = exports.BWRUN || {};

    var game = new Phaser.Game(768, 432, Phaser.AUTO);

    game.state.add('play', BWRUN.PlayState);
    game.state.add('menu', BWRUN.MenuState);

    game.state.start('menu', true, false, 'level1');
}(window));
