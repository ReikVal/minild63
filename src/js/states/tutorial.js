(function(exports) {
    'use strict';

    var BWRUN = exports.BWRUN || {};

    BWRUN.TutorialState = {
        preload: function() {
            this.load.tilemap('tutorial', 'json/tutorial.json', null, Phaser.Tilemap.TILED_JSON);
        },

        create: function() {
            //Background
            this.game.stage.backgroundColor = '#787878';
            this.bg = this.game.add.tileSprite(0, 0, 768, 432, 'bg');
            this.bg.sendToBack();
            //Creating map
            this.map = this.add.tilemap('tutorial');
            this.map.addTilesetImage('world', 'world');
            this.layer = this.map.createLayer('bw');
            this.map.setCollisionByIndex(1);
            //Creating tutorial text
            this.tip1 = this.game.add.bitmapText(10, 10, 'carrier_command', 'You can only interact\n\nwith platforms of your current colour', 8);
            this.tip2 = this.game.add.bitmapText(10, 202, 'carrier_command', 'You can jump pressing\n\nX key or right side of the screen', 8);
            this.tip3 = this.game.add.bitmapText(426, 10, 'carrier_command', 'You die if you hit a wall\n\nof your current colour', 8);
            this.tip4 = this.game.add.bitmapText(426, 202, 'carrier_command', 'You can change your colour pressing\n\nZ key or left side of the screen', 8);

            //Creating players
            this.players = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
            this.player1 = this.players.create(0, 64, 'player');
            this.player2 = this.players.create(0, 256, 'player');
            this.player3 = this.players.create(416, 64, 'player');
            this.players.addAll('body.gravity.y', 1000);
            this.players.addAll('body.velocity.x', 200);
            this.player4 = this.game.add.sprite(416, 256, 'player');
            this.physics.enable(this.player4);
            this.player4.body.gravity.y = 1000;
            this.player4.body.velocity.x = 200;

            //Back to menu
            this.menuButton = this.game.add.button(0, this.world.height - 50, 'tutorialButton', function() {
                this.game.state.start('menu');
            }, this);
            this.menuText = this.game.add.bitmapText(45, this.world.height - 55, 'carrier_command', 'Menu', 12);
            this.menuText.tint = 0x000000;
        },

        update: function() {
            this.physics.arcade.collide(this.players, this.layer);
            if(this.player2.body.blocked.down) {
                this.player2.body.velocity.y = -300;
            }
            if(this.player3.body.blocked.right) {
                this.player1.x = 0;
                this.player1.y = 64;
                this.player1.body.velocity.y = 0;
                this.player2.x = 0;
                this.player2.y = 256;
                this.player2.body.velocity.y = 0;
                this.player3.x = 416;
                this.player3.y = 64;
                this.player3.body.velocity.y = 0;
                this.player3.body.velocity.x = 200;
                this.player4.x = 416;
                this.player4.y = 256;
                this.player4.body.velocity.y = 0;
                this.player4.frame = 0;
            }
            if(this.player4.x < 540) {
                this.physics.arcade.collide(this.player4, this.layer);
            } else {
                this.player4.frame = 1;
            }
        }
    };

    exports.BWRUN = BWRUN;
}(window));
