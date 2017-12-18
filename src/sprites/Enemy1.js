import Phaser from 'phaser';
import globals from '../config.globals';

export default class Enemy extends Phaser.Sprite {
  constructor({ x, y, asset }) {
    const { game } = globals;
    super(game, x, y, asset);
  }

  update() {
    this.body.setZeroVelocity();
  }
}
