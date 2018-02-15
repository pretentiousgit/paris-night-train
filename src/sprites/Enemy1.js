import Phaser from 'phaser';
import globals from '../config.globals';
import { particleBurst } from '../util/sparkle';

export default class Enemy extends Phaser.Sprite {
  constructor({ x, y, asset }) {
    const { game } = globals;
    super(game, x, y, asset);

    game.physics.p2.enable(this, false);
    this.body.clearShapes();
    this.body.loadPolygon('physicsData', 'stag');
    this.body.fixedRotation = true;
    // this.body.debug = true;

    game.physics.p2.setMaterial(globals.npcMaterial, this.body);

    this.body.setCollisionGroup(globals.npcCollisionGroup);

    this.body.collides([
      globals.playerCollisionGroup,
      globals.npcCollisionGroup
    ], () => { particleBurst(); });
  }

  update() {
    this.body.setZeroVelocity();
  }
}
