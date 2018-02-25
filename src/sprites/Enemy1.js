import Phaser from 'phaser';
import globals from '../config.globals';
import { particleBurst } from '../util/sparkle';
import { affectEvent } from '../util/playerFeeling';

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
    this.body.onBeginContact.add(this.contactHandler, this);

    this.body.collides([
      globals.playerCollisionGroup,
      globals.npcCollisionGroup
    ], () => {
      affectEvent();
    });
  }

  contactHandler(bodyA, bodyB, shapeA, shapeB, equation) {
    const pos = equation[0].bodyA.position;
    const pt = equation[0].contactPointA;

    const cx = globals.game.physics.p2.mpxi(pos[0] + pt[0]);
    const cy = globals.game.physics.p2.mpxi(pos[1] + pt[1]);

    // do something at the X/Y of the collision
    particleBurst(cx, cy);
  }

  update() {
    this.body.setZeroVelocity();
  }
}
