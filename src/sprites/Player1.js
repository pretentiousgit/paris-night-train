import Phaser from 'phaser';
import globals from '../config.globals';
import { range } from '../util/utilities';
import descriptorList from '../util/descriptorList';

export default class Player extends Phaser.Sprite {
  constructor({ x, y }) {
    const { game } = globals;
    super(game, x, y, 'player');
    game.camera.follow(this);
    game.physics.arcade.enable(this);
    this.body.bounce.x = 0.2;
    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.health = 24;
    this.maxHealth = 50;

    // a character has some preferences
    // like they enjoy coffee or tilework or cafes or reading or parties or nightclubs
    // this.preferences = range(9).map((i) => { });
    // at the start of the game they don't know what they like,
    // so they don't know what they want to do
    // and the only way to find out how is to try a bunch of things while sleeping

    // what are some mechanics we could try?
  }

  update() {
    const {
      cursors, game, collisionLayer
    } = globals;

    game.physics.arcade.collide(this, collisionLayer);

    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    if (cursors.left.isDown) {
      this.body.velocity.x = -250;
    } else if (cursors.right.isDown) {
      this.body.velocity.x = 250;
    }

    if (cursors.up.isDown) {
      this.body.velocity.y = -250;
    } else if (cursors.down.isDown) {
      this.body.velocity.y = 250;
    }
  }
}
