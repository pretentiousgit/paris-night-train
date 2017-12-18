import Phaser from 'phaser';
import globals from '../config.globals';

export default class extends Phaser.State {
  constructor(game) {
    super(game, 0, 0);
    globals.game = game;
  }

  preload() {
  }

  create() {
    //  Enable p2 physics
    this.result = 'Move with the cursors';
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.game.physics.p2.restitution = 0.9;

    this.stag = this.game.add.sprite(200, 200, 'stag');
    this.player = this.game.add.sprite(500, 200, 'player');

    //  Enable the physics bodies on all the sprites
    this.game.physics.p2.enable([this.stag, this.player], false);

    //  The following just loads the polygon data into the objects
    this.stag.body.clearShapes();
    this.stag.body.loadPolygon('physicsData', 'stag');

    this.cursors = this.game.input.keyboard.createCursorKeys();

    //  Check for the player hitting another object
    this.player.body.onBeginContact.add(this.playerHit, this);
  }

  playerHit (body, bodyB, shapeA, shapeB, equation) {
    //  The player hit something.
    //
    //  This callback is sent 5 arguments:
    //
    //  The Phaser.Physics.P2.Body it is in contact with. *This might be null* if the Body was created directly in the p2 world.
    //  The p2.Body this Body is in contact with.
    //  The Shape from this body that caused the contact.
    //  The Shape from the contact body.
    //  The Contact Equation data array.
    //
    //  The first argument may be null or not have a sprite property, such as when you hit the world bounds.
    if (body) {
      this.result = `You last hit: ${body.sprite.key}`;
    } else {
      this.result = 'You last hit: The wall :)';
    }
  }

  update() {
    this.player.body.setZeroVelocity();

    if (this.cursors.left.isDown) {
      this.player.body.moveLeft(200);
    } else if (this.cursors.right.isDown) {
      this.player.body.moveRight(200);
    }

    if (this.cursors.up.isDown) {
      this.player.body.moveUp(200);
    } else if (this.cursors.down.isDown) {
      this.player.body.moveDown(200);
    }
  }

  render() {
    this.game.debug.text(this.result, 32, 32);
  }
}