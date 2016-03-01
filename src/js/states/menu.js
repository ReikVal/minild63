(function(exports) {
    'use strict';

    var BWRUN = exports.BWRUN || {};

    BWRUN.MenuState = {
        create: function() {
            // Reseting the world width because the world is not always 768 width
            this.world.width = 768;
            //Background
            this.game.stage.backgroundColor = '#787878';
            this.bg = this.game.add.tileSprite(0, 0, 768, 432, 'bg');
            this.bg.sendToBack();
            //Generting buttons
            createLevelPick(this, '1', - 75);
            createLevelPick(this, '2', 0);
            createLevelPick(this, '3', 75);
            //Title and credits
            this.twitterLogo = this.game.add.sprite(600, 400, 'twitterLogo');
            this.twitterLogo.anchor.setTo(0.5);
            this.twitterName = this.twitterLogo.addChild(this.game.make.bitmapText(-10, -35, 'carrier_command', 'Made by:\n\n  @ReikVal', 14));
            this.twitterName.tint = 0x000000;
        },

        deleteSave: function() {
            if(exports.localStorage) {
                exports.localStorage.clear();
            }
        }
    };

    function createLevelPick(context, n, relativeX) {
        var rect         = context.make.graphics(0, 0),
            progressRect = context.make.graphics(0, 0),
            level        = 'level' + n;
        var button, buttonText, progressBar, progressText, progress;
        rect.beginFill(0x000000, 1);
        rect.drawRect(0, 0, 50, 50);
        rect.endFill();
        progressRect.beginFill(0xffd60a, 1);
        progressRect.drawRect(0, 0, 1, 14);
        progressRect.endFill();

        button = context.game.add.button(context.world.centerX + relativeX, context.world.centerY + 100, rect.generateTexture(), function() {
            context.game.state.start('play', true, false, level);
        });
        button.anchor.setTo(0.5);
        button.inputEnabled = true;
        button.input.useHandCursor = true;
        buttonText = button.addChild(context.game.make.bitmapText(0, 0, 'carrier_command', n, 18));
        buttonText.anchor.setTo(0.5);
        if(exports.localStorage) {
            progress = exports.localStorage.getItem(level)?exports.localStorage.getItem(level):0;
            progressBar = context.add.sprite(button.x - 25, button.y + 25, progressRect.generateTexture());
            progressBar.scale.setTo(progress/2, 1);
            progressText = context.game.add.bitmapText(button.x, button.y + 32, 'carrier_command', progress + "%", 10);
            progressText.anchor.setTo(0.5);
            progressText.tint = 0x000000;
        }
    }

    exports.BWRUN = BWRUN;

}(window));
