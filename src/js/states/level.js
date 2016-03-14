(function(exports) {
    'use strict';

    var BWRUN = exports.BWRUN || {};

    BWRUN.PlayState = {
        init: function(level) {
            this.layerFlag = false;

            this.level = level;

            //Attemp
            this.attemp = 0;
        },

        create: function() {
            //Background
            this.game.stage.backgroundColor = '#787878';
            this.bg1 = this.game.add.tileSprite(0, 0, 1152, 432, 'bg1');
            this.bg1.fixedToCamera = true;
            this.bg1.sendToBack();
            this.bg2 = this.game.add.tileSprite(0, 0, 1152, 432, 'bg2');
            this.bg2.fixedToCamera = true;
            this.bg2.sendToBack();
            this.bg = this.game.add.tileSprite(0, 0, 768, 432, 'bg');
            this.bg.fixedToCamera = true;
            this.bg.sendToBack();
            this.cameraLastPositionX = 0;
            //Creating map
            this.map = this.add.tilemap(this.level);
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
            //Camera
            this.game.camera.follow(this.player);
            this.game.camera.deadzone = new Phaser.Rectangle(0, 0, 100, 432);
            //Shaking
            this.shaking = false;
            this.shakingFactor = 1;
            this.nShaking = 26;
            //Particles
            this.emitter = this.game.add.emitter(0, 0);
            this.emitter.makeParticles('particles', [0, 1]);
            //Adding sounds
            this.explosionFx = this.game.add.audio('explosion');
            this.explosionFx.volume = 0.2;
            this.changeFx = this.game.add.audio('change');
            this.changeFx.volume = 0.2;
            this.winFx = this.game.add.audio('win');
            this.winFx.volume = 0.2;
            this.bgMusic = this.game.add.audio(this.level + 'Sound');
            this.bgMusic.volume = 0.2;
            this.bgMusic.loop = true;
            this.bgMusic.play();
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
            this.soundButton = this.game.add.button(389, 0, 'soundButton');
            this.soundButton.frame = this.sound.mute?1:0;
            this.soundButton.onInputDown.add(function() {
                this.sound.mute = !this.sound.mute;
                this.soundButton.frame = this.sound.mute?1:0;
            }, this);
            this.soundButton.fixedToCamera = true;
            this.backButton = this.game.add.button(378, 0, 'backButton');
            this.backButton.anchor.setTo(1, 0);
            this.backButton.onInputDown.add(function() {
                this.bgMusic.stop();
                this.game.state.start('menu');
            }, this);
            this.backButton.fixedToCamera = true;
            //Attemp
            this.attempText = this.game.add.bitmapText(200, 100, 'carrier_command', 'ATTEMP: ' + BWRUN.attemp++, 24);
            this.attempText.anchor.setTo(0.5);
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
            if(this.player.body.blocked.right && this.player.alive) {
                this.restart();
            }

            if(this.player.y >= this.world.height && this.player.alive) {
                this.restart();
            }

            //Checking end of level
            if(this.player.x >= this.game.world.width - 96 && this.player.alive) {
                this.player.kill();
                //Saving data
                if(exports.localStorage) {
                    exports.localStorage.setItem(this.level, 100);
                }
                this.emitter.height = this.world.height;
                this.emitter.x = this.world.width;
                this.emitter.y = this.world.centerY;
                this.emitter.maxParticleScale = 5;
                this.emitter.setYSpeed(-2, 2);
                this.emitter.setXSpeed(-500, -300);
                this.emitter.start(false, 2000, 5, 50);
                //Sounds
                this.winFx.play();
                this.bgMusic.stop();
                this.winTimer = this.game.time.create(true);
                this.winTimer.add(3 * Phaser.Timer.SECOND, function() {
                    this.game.state.start('menu');
                }, this);
                this.winTimer.start();
            }
            //Shaking
            if(this.shaking && this.nShaking > 0) {
                this.nShaking--;
                if(this.nShaking % 2 === 0) {
                    this.shakingFactor *= -1;
                    this.camera.x += 3*this.shakingFactor;
                }
            }
            //Background
            this.bg1.autoScroll((this.cameraLastPositionX - this.camera.position.x)*30, 0);
            this.bg2.autoScroll((this.cameraLastPositionX - this.camera.position.x)*15, 0);
            this.bg.autoScroll((this.cameraLastPositionX - this.camera.position.x)*8, 0);
            this.cameraLastPositionX = this.camera.position.x;
        },

        render: function() {
            //this.game.debug.body(this.player);
        },

        changeLayer: function() {
            this.layerFlag = !this.layerFlag;
            this.player.frame = this.layerFlag?1:0;
            if(this.player.alive) {
                this.changeFx.play();
            }
            this.physics.arcade.collide(this.player, this.layerFlag?this.whiteLayer:this.blackLayer, null, function(player, tile) {
                if(tile.index != -1) {
                    this.restart();
                }
            }, this);
        },

        restart: function() {
            var progress = parseInt(100*this.player.x/this.game.world.width);
            this.player.kill();
            //Saving Progress
            if(exports.localStorage) {
                if(!exports.localStorage.getItem(this.level) || exports.localStorage.getItem(this.level) < progress) {
                    exports.localStorage.setItem(this.level, progress);
                }
            }
            //Doing the player explosion
            this.emitter.x = this.player.x;
            this.emitter.y = this.player.y;
            this.emitter.gravity = 200;
            //sounds
            this.bgMusic.stop();
            this.explosionFx.play();
            this.emitter.start(true, 0, null, 50);
            this.restartTimer = this.game.time.create(true);
            this.restartTimer.add(2 * Phaser.Timer.SECOND, function() {
                this.game.state.restart(true, false, this.level);
            }, this);
            this.restartTimer.start();
            this.shaking = true;
        }
    };

    exports.BWRUN = BWRUN;
}(window));
