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

    this.body.setCollisionGroup(globals.npcCollisionGroup);
    this.body.collides([
      globals.playerCollisionGroup,
      globals.npcCollisionGroup
    ], () => { console.log('collision fired'); });
  }

  update() {
    this.body.setZeroVelocity();
  }
}
