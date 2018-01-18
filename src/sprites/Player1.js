import Phaser from 'phaser';
import globals from '../config.globals';
import { range } from '../util/utilities';
import descriptorList from '../util/descriptorList';
import { particleBurst } from '../util/sparkle';

export default class Player extends Phaser.Sprite {
  constructor({ x, y }) {
    const { game } = globals;
    console.log('player x y', x, y);
    super(game, x, y, 'player');
    game.camera.follow(this);
    this.smoothed = true;

    this.health = 24;
    this.maxHealth = 50;

    game.physics.p2.enable(this, false);
    this.body.debug = true;
    this.body.clearShapes();
    this.body.loadPolygon('physicsData', 'player');
    this.body.fixedRotation = true;

    // set up player collision groups
    this.body.setCollisionGroup(globals.playerCollisionGroup);

    //  Check for the block hitting an NPC
    this.body.collides(globals.npcCollisionGroup, this.particleBurst, this);
    this.body.collides(globals.wallCollisionGroup, () => { console.log('hello wall'); }, this);
    // this.body.onBeginContact.add(this.particleBurst, this);

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

    if (cursors.left.isDown) {
      this.body.moveLeft(250);
    } else if (cursors.right.isDown) {
      this.body.moveRight(250);
    }

    if (cursors.up.isDown) {
      this.body.moveUp(250);
    } else if (cursors.down.isDown) {
      this.body.moveDown(250);
    }
  }
}
