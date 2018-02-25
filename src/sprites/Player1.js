import Phaser from 'phaser';
import globals from '../config.globals';

export default class Player extends Phaser.Sprite {
  constructor({ x, y }) {
    const { game } = globals;
    console.log('player x y', x, y);

    super(game, x, y, 'player', 1);
    this.scale.setTo(0.3, 0.3);
    this.anchor.setTo(0.5, 0.5);

    game.camera.follow(this);
    this.smoothed = true;

    game.physics.p2.enable(this, false);
    // this.body.debug = true;

    // ANIMATIONS
    this.animations.add('walkR', [1, 2]);
    this.animations.add('walk', [6, 7]);
    this.animations.add('pointR', [0, 11, 0]);
    this.animations.add('pointL', [8, 6, 8]);
    this.animations.add('pointUpL', [9, 10, 9]);
    this.animations.add('pointUpR', [3, 4, 3]);
    this.animations.add('idle', [0]);

    this.animations.play('idle', 6, true);

    // PHYSICS
    this.body.clearShapes();
    this.body.setRectangle(Math.abs(this.width), Math.abs(this.height));
    this.body.fixedRotation = true;

    game.physics.p2.setMaterial(globals.playerMaterial, this.body);

    // COLLISION GROUPS
    this.body.setCollisionGroup(globals.playerCollisionGroup);

    // CONTACT COLLISION GROUPS
    this.body.collides(globals.npcCollisionGroup, () => {
    }, this);
    this.body.collides(globals.wallCollisionGroup, () => {
      globals.game.camera.shake(0.002, 50);
    }, this);

    this.body.createGroupCallback(globals.npcCollisionGroup);


    // a character has some preferences
    // like they enjoy coffee or tilework or cafes or reading or parties or nightclubs
    // this.preferences = range(9).map((i) => { });
    // at the start of the game they don't know what they like,
    // so they don't know what they want to do
    // and the only way to find out how is to try a bunch of things while sleeping

    // what are some mechanics we could try?

    // Okay so basically you go up to a character and you press a button
    // The button press coughs up an "interaction" bubble where you ask for snacks or the bathroom or
    // and you interact with them using a ping-pong controller - if you NAIL IT that becomes a thing
    // your character likes better?
  }

  update() {
    const {
      cursors
    } = globals;

    this.body.setZeroVelocity();

    // interaction key animation
    // globals.actionKey.onDown.add(this.particleBurst, this);

    // walking/interaction animation
    if (cursors.left.isDown) {
      this.animations.play('walk', 6, false);
      this.body.moveLeft(250);
    } else if (cursors.right.isDown) {
      this.animations.play('walkR', 6, false);
      this.body.moveRight(250);
    } else if (cursors.up.isDown) {
      this.body.moveUp(250);
      this.animations.play('walk', 6, false);
    } else if (cursors.down.isDown) {
      this.body.moveDown(250);
      this.animations.play('walk', 6, false);
    } else {
      this.animations.play('idle');
    }
  }
}
