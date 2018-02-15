import Phaser from 'phaser';
import globals from '../config.globals';
import { range } from '../util/utilities';
import descriptorList from '../util/descriptorList';
import { particleBurst } from '../util/sparkle';

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
    this.body.debug = true;

    this.animations.add('walkR', [1, 2]);
    this.animations.add('walk', [6, 7]);
    this.animations.add('pointR', [0, 11, 0]);
    this.animations.add('pointL', [8, 6, 8]);
    this.animations.add('pointUpL', [9, 10, 9]);
    this.animations.add('pointUpR', [3, 4, 3]);
    this.animations.add('idle', [0]);

    this.animations.play('idle', 6, true);

    this.body.clearShapes();
    this.body.setRectangle(Math.abs(this.width), Math.abs(this.height));
    this.body.fixedRotation = true;

    // set up player collision groups
    this.body.setCollisionGroup(globals.playerCollisionGroup);

    //  Check for the block hitting an NPC
    this.body.collides(globals.npcCollisionGroup, this.particleBurst, this);
    this.body.collides(globals.wallCollisionGroup, () => {}, this);

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

  particleBurst(pointer) {
    console.log('blam');
    globals.emitter.x = globals.player.x;
    globals.emitter.y = globals.player.y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    globals.emitter.start(true, 2000, null, 10);
  }

  update() {
    const {
      cursors
    } = globals;

    this.body.setZeroVelocity();

    // interaction key animation
    globals.actionKey.onDown.add(this.particleBurst, this);

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
