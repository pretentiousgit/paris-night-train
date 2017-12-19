import Phaser from 'phaser';
import globals from '../config.globals';
import { range } from '../util/utilities';
import descriptorList from '../util/descriptorList';

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
      cursors, game
    } = globals;

    this.body.setZeroVelocity();

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      console.log('interaction button clicked');
      // set the player text bubble to visible
      // there are two options, positive and negative?
    }

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
