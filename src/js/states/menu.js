(function(exports) {
    'use strict';

    var BWRUN = exports.BWRUN || {};

    BWRUN.MenuState = {
        create: function() {
            // Reseting the world width because the world is not always 768 width
            this.world.width = 768;
            this.world.height = 432;
            //Background
            this.game.stage.backgroundColor = '#787878';
            this.bg = this.game.add.tileSprite(0, 0, 768, 432, 'bg');
            this.bg.sendToBack();
            //Logo
            this.logo = this.game.add.sprite(this.world.centerX, 0, 'logo');
            this.logo.anchor.setTo(0.5);
            this.game.physics.arcade.enable(this.logo);
            this.logo.body.gravity.y = 100;
            this.logo.body.bounce.y = 0.3;
            this.invisibleGraphic = this.game.make.graphics(0, 0);
            this.invisibleGraphic.beginFill(0x000000, 0);
            this.invisibleGraphic.drawRect(0, 0, this.logo.width, 4);
            this.invisibleGraphic.endFill();
            this.invisibleFloor = this.game.add.sprite(this.world.centerX, this.world.centerY + 20, this.invisibleGraphic.generateTexture());
            this.invisibleFloor.anchor.setTo(0.5, 0);
            this.game.physics.arcade.enable(this.invisibleFloor);
            this.invisibleFloor.body.immovable = true;
            //Generting buttons
            this.levelText = this.game.add.bitmapText(this.world.centerX, this.world.centerY + 50   , 'carrier_command', 'LEVELS:', 18);
            this.levelText.anchor.setTo(0.5);
            this.levelText.tint = 0x000000;
            if(exports.localStorage) {
                var deleteButtonGraphic = this.game.make.graphics(0, 0);
                deleteButtonGraphic.beginFill(0x111111, 1);
                deleteButtonGraphic.drawRect(0, 0, 180, 25);
                deleteButtonGraphic.beginFill(0x2d2d2d, 1);
                deleteButtonGraphic.drawRect(7, 7, 166, 11);
                deleteButtonGraphic.endFill();
                this.deleteButton = this.game.add.button(this.world.centerX, this.world.centerY + 170, deleteButtonGraphic.generateTexture(), this.deleteSave);
                this.deleteButton.anchor.setTo(0.5);
                this.deleteText = this.game.add.bitmapText(this.world.centerX, this.world.centerY + 170   , 'carrier_command', 'Delete progress', 8);
                this.deleteText.anchor.setTo(0.5);

            }
            this.tutorialButton = this.game.add.button(0, this.world.height - 50, 'tutorialButton', function() {
                this.game.state.start('tutorial');
            }, this);
            this.tutorialText = this.game.add.bitmapText(45, this.world.height - 55, 'carrier_command', 'tutorial', 12);
            this.tutorialText.tint = 0x000000;
            createLevelPick(this, '1', - 75);
            createLevelPick(this, '2', 0);
            createLevelPick(this, '3', 75);
            //Title and credits
            this.twitterLogo = this.game.add.sprite(600, 400, 'twitterLogo');
            this.twitterLogo.anchor.setTo(0.5);
            this.twitterName = this.twitterLogo.addChild(this.game.make.bitmapText(-10, -35, 'carrier_command', 'Made by:\n\n  @ReikVal', 14));
            this.twitterName.tint = 0x000000;
        },

        update: function() {
            this.game.physics.arcade.collide(this.logo, this.invisibleFloor);
        },

        deleteSave: function() {
            if(exports.localStorage) {
                exports.localStorage.clear();
                this.game.state.restart();
            }
        }
    };

    function createLevelPick(context, n, relativeX) {
        var rect         = context.make.graphics(0, 0),
            progressRect = context.make.graphics(0, 0),
            level        = 'level' + n;
        var button, buttonText, progressBar, progressText, progress;
        rect.beginFill(0x111111, 1);
        rect.drawRect(0, 0, 50, 50);
        rect.beginFill(0x2d2d2d, 1);
        rect.drawRect(7, 7, 36, 36);
        rect.endFill();
        progressRect.beginFill(0xffd60a, 1);
        progressRect.drawRect(0, 0, 1, 14);
        progressRect.endFill();

        button = context.game.add.button(context.world.centerX + relativeX, context.world.centerY + 100, rect.generateTexture(), function() {
            BWRUN.attemp = 1;
            context.game.state.start('load', true, false, level);
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
