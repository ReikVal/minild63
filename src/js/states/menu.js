(function(exports) {
    'use strict';

    var BWRUN = exports.BWRUN || {};

    BWRUN.MenuState = {
        create: function() {
            this.game.stage.backgroundColor = '#787878';
            //TODO: Use loader.
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
