import Phaser from 'phaser';
import globals from '../config.globals';

export default class Enemy extends Phaser.Sprite {
  constructor({ x, y, asset }) {
    const { game } = globals;
    super(game, x, y, asset);

    game.physics.p2.enable(this, false);
    this.body.clearShapes();
    this.body.loadPolygon('physicsData', 'stag');
    this.body.fixedRotation = true;
    this.body.debug = true;

    // stag.body.setCollisionGroup(enemyCollisionGroup);
    // stag.body.collides([
    //   playerCollisionGroup,
    //   enemyCollisionGroup], () => { console.log('collision fired'); });
  }

  update() {
    this.body.setZeroVelocity();
  }
}
