(function(exports) {
    'use strict';

    var BWRUN = exports.BWRUN || {};

    BWRUN.MenuState = {
        create: function() {
            this.createLevelPick('1', - 75);
            this.createLevelPick('2', 0);
            this.createLevelPick('3', 75);

            this.game.stage.backgroundColor = '#787878';
        },

        createLevelPick: function(n, relativeX) {
            var rect         = this.make.graphics(0, 0),
                progressRect = this.make.graphics(0, 0),
                level        = 'level' + n;
            var button, buttonText, progressBar, progressText, progress;
            rect.beginFill(0x000000, 1);
            rect.drawRect(0, 0, 50, 50);
            rect.endFill();
            progressRect.beginFill(0xffd60a, 1);
            progressRect.drawRect(0, 0, 1, 14);
            progressRect.endFill();

            button = this.game.add.sprite(this.world.centerX + relativeX, this.world.centerY + 100, rect.generateTexture());
            button.anchor.setTo(0.5);
            button.inputEnabled = true;
            button.events.onInputDown.add(function() {
                this.game.state.start('play', true, false, level);
            }, this);
            buttonText = button.addChild(this.game.make.bitmapText(0, 0, 'carrier_command', n, 18));
            buttonText.anchor.setTo(0.5);
            if(exports.localStorage) {
                progress = exports.localStorage.getItem(level)?exports.localStorage.getItem(level):0;
                progressBar = button.addChild(this.game.make.sprite(-25, 33, progressRect.generateTexture()));
                progressBar.scale.setTo(progress/2, 1);
                progressText = button.addChild(this.game.make.bitmapText(0, 40, 'carrier_command', progress + "%", 10));
                progressText.anchor.setTo(0.5);
                progressText.tint = 0x000000;
            }
        },

        deleteSave: function() {
            if(exports.localStorage) {
                exports.localStorage.clear();
            }
        }
    };

    exports.BWRUN = BWRUN;

}(window));
