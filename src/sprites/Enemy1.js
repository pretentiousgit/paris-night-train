import Phaser from 'phaser';
import globals from '../config.globals';

export default class Player extends Phaser.Sprite {
  constructor({ x, y, asset }) {
    const { game } = globals;
    super(game, x, y, asset);

    game.physics.arcade.enable(this);
    this.smoothed = true;
    this.body.bounce.x = 0.2;
    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.scale.x += 0.5;
    this.scale.y += 0.5;
  }

  update() {
    const { game, collisionLayer, player } = globals;

    game.physics.arcade.collide(this, collisionLayer);
    game.physics.arcade.collide(this, player);

    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
  }
}
