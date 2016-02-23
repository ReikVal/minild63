(function(exports) {
    'use strict';

    var BWRUN = exports.BWRUN || {};

    BWRUN.PlayState = {
        preload: function() {
            this.load.tilemap('level1', 'json/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('world', 'images/world.png');
            this.load.image('button', 'images/button.png');

            this.load.spritesheet('player', 'images/player.png', 16, 24, 2);
        },

        init: function() {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;

            this.physics.startSystem(Phaser.Physics.ARCADE);

            this.layerFlag = false;
        },

        create: function() {
            //Background
            this.game.stage.backgroundColor = '#787878';
            //Creating map
            this.map = this.add.tilemap('level1');
            this.map.addTilesetImage('world', 'world');
            this.blackLayer = this.map.createLayer('black');
            this.blackLayer.resizeWorld();
            this.whiteLayer = this.map.createLayer('white');
            //Setting collisions
            this.map.setCollisionByIndex(1, true, this.whiteLayer.index);
            this.map.setCollisionByIndex(2, true, this.blackLayer.index);

            //Creating player
            this.player = this.add.sprite(0, 0, 'player');
            this.physics.enable(this.player);
            this.player.body.gravity.y = 1000;
            this.player.body.velocity.x = 200;

            this.game.camera.follow(this.player);
            this.game.camera.deadzone = new Phaser.Rectangle(0, 0, 100, 432);

            //Adding keyboard
            this.layerKey = this.game.input.keyboard.addKey(Phaser.KeyCode.Z);
            this.layerKey.onDown.add(this.changeLayer, this);
            this.jumpKey = this.game.input.keyboard.addKey(Phaser.KeyCode.X);
            //Adding buttons
            this.layerButton = this.game.add.button(0, 0, 'button');
            this.layerButton.onInputDown.add(this.changeLayer, this);
            this.layerButton.fixedToCamera = true;
            this.jumpButton = this.game.add.button(384, 0, 'button');
            this.jumpButton.onInputDown.add(function() {
                this.player.mustJump = true;
            }, this);
            this.jumpButton.onInputUp.add(function() {
                this.player.mustJump = false;
            }, this);
            this.jumpButton.onInputOut.add(function() {
                this.player.mustJump = false;
            }, this);
            this.jumpButton.fixedToCamera = true;
        },

        update: function() {
            if(this.layerFlag) {
                this.physics.arcade.collide(this.player, this.whiteLayer);
            } else {
                this.physics.arcade.collide(this.player, this.blackLayer);
            }

            //Jump logic
            if((this.jumpKey.isDown || this.player.mustJump) && this.player.body.blocked.down) {
                this.player.body.velocity.y = -300;
            }
            //Checking right collision
            if(this.player.body.blocked.right) {
                //TODO: Do a better restart
                this.game.state.restart();
            }

            if(this.player.y >= 420) {
                this.game.state.restart();
            }
        },

        render: function() {
            //this.game.debug.body(this.player);
        },

        changeLayer: function() {
            this.layerFlag = !this.layerFlag;
            this.player.frame = this.layerFlag?1:0;
            this.physics.arcade.collide(this.player, this.layerFlag?this.whiteLayer:this.blackLayer, null, function(player, tile) {
                if(tile.index != -1) {
                    //TODO: Do a better restart
                    this.game.state.restart();
                }
            }, this);
        }
    };

    exports.BWRUN = BWRUN;
}(window));
