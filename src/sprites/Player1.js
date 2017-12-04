import Phaser from 'phaser';
import globals from '../config.globals';
// export default class extends Phaser.Sprite {
//   constructor ({
//     game, x, y, asset
//   }) {
//     super(game, x, y, asset);
//     this.anchor.setTo(0.5);
//     this.body.bounce.y = 0.2;
//     this.body.bounce.x = 0.2;
//     this.body.collideWorldBounds = true;
//     game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
//     game.camera.follow(this);
//   }
// }

/*

initPlayer() {
  ,
      body: {
        ...this.body,
        bounce: {
          ...this.body.bounce,
          x: 0.2,
          y: 0.2
        },
        collideWorldBounds: true
      }
} */

export default class Player extends Phaser.Sprite {
  constructor({ x, y }) {
    const { game } = globals;
    super(game, x, y, 'player');
    game.camera.follow(this);
    game.physics.arcade.enable(this);
    this.body.bounce.x = 0.2;
    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
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
