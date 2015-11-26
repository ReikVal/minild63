(function(exports) {
    'use strict';

    var BWRUN = exports.BWRUN || {};

    BWRUN.PlayState = {
        preload: function() {
            this.load.tilemap('level1', 'json/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('world', 'images/world.png');

            this.load.image('player', 'images/player.png');
        },

        init: function() {
            this.physics.startSystem(Phaser.Physics.ARCADE);
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
            this.player.body.gravity.y = 300;
            this.player.body.velocity.x = 200;

            this.game.camera.follow(this.player);
        },

        update: function() {
            this.physics.arcade.collide(this.player, this.whiteLayer);
            this.physics.arcade.collide(this.player, this.blackLayer);
        }
    };

    exports.BWRUN = BWRUN;
}(window));
