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

            //Adding keyboard
            this.layerKey = this.game.input.keyboard.addKey(Phaser.KeyCode.Z);
            this.layerKey.onDown.add(this.changeLayer, this);
            this.jumpKey = this.game.input.keyboard.addKey(Phaser.KeyCode.X);
            this.jumpKey.onDown.add(this.jump, this);
            //Adding buttons
            this.layerButton = this.game.add.button(0, 0, 'button', this.changeLayer, this);
            this.layerButton.fixedToCamera = true;
            this.jumpButton = this.game.add.button(384, 0, 'button', this.jump, this);
            this.jumpButton.fixedToCamera = true;
        },

        update: function() {
            if(this.layerFlag) {
                this.physics.arcade.collide(this.player, this.whiteLayer);
            } else {
                this.physics.arcade.collide(this.player, this.blackLayer);
            }

            //Checking right collision
            if(this.player.body.blocked.right) {
                console.log("YOU ARE DEATH");
            }
        },

        render: function() {
            //this.game.debug.body(this.player);
        },

        changeLayer: function() {
            this.layerFlag = !this.layerFlag;
            this.player.frame = this.layerFlag?1:0;
            this.physics.arcade.collide(this.player, this.layerFlag?this.whiteLayer:this.blackLayer, null, function(player, tile) {
                //TODO: Kill the player
                if(tile.index != -1) {
                    console.log("YOU ARE DEATH");
                }
            }, this);
        },

        jump: function() {
            if(this.player.body.blocked.down) {
                this.player.body.velocity.y = -300;
            }
        }
    };

    exports.BWRUN = BWRUN;
}(window));
