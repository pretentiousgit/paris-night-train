/* globals __DEV__ */
import Phaser, { Tilemap } from 'phaser';

// function imports

import Player1 from '../sprites/Player1';
import Enemy1 from '../sprites/Enemy1';
import HealthBar from '../util/HealthBar';

import globals from '../config.globals';

import createCarriage from '../generators/createRoom';

const {
  blockSize: BLOCK_SIZE,
  worldHeight,
  worldWidth
} = globals;

export default class extends Phaser.State {
  constructor(game) {
    super(game, 0, 0);
    globals.game = game;
  }

  initMap () {
    const { game } = globals;
  }

  preload () {
    const { game } = globals;
  }

  create () {
    const { game } = globals;
    globals.cursors = game.input.keyboard.createCursorKeys();

    this.game.physics.startSystem(Phaser.Physics.P2JS);
    //  Turn on impact events for the world, without this we get no collision callbacks
    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.restitution = 0.8;

    globals.map = game.add.tilemap();

    const { map } = globals;
    map.addTilesetImage('walls', 'scifi_platformTiles_32x32', BLOCK_SIZE, BLOCK_SIZE);
    map.setCollisionBetween(1, 2000);

    globals.tileMapLayer = map.create('level1', worldWidth, worldHeight, BLOCK_SIZE, BLOCK_SIZE);

    const { tileMapLayer } = globals;
    tileMapLayer.resizeWorld();

    // //  Create our collision groups. One for the player, one for the pandas
    // const playerCollisionGroup = game.physics.p2.createCollisionGroup();
    // const enemyCollisionGroup = game.physics.p2.createCollisionGroup();

    // game.physics.p2.updateBoundsCollisionGroup();
    // game.physics.p2.setBoundsToWorld();


    this.stag = game.add.sprite(250, 150, 'stag');
    game.physics.p2.enable(this.stag, false);
    this.stag.body.clearShapes();
    this.stag.body.loadPolygon('physicsData', 'stag');
    // stag.body.setCollisionGroup(enemyCollisionGroup);
    // stag.body.collides([
    //   playerCollisionGroup,
    //   enemyCollisionGroup], () => { console.log('collision fired'); });
    this.stag.body.fixedRotation = true;
    this.stag.body.debug = true;

    // TODO: Pull player in here and see if we can get ANY collisions going

    this.player = game.add.sprite(75, 110, 'player');
    game.physics.p2.enable(this.player, false);
    this.player.body.debug = true;
    this.player.body.clearShapes();
    this.player.body.loadPolygon('physicsData', 'player');
    this.player.body.fixedRotation = true;

    // this.player.body.setCollisionGroup(playerCollisionGroup);
    // this.player.body.collides(enemyCollisionGroup, () => {
    //   console.log('player collision');
    // }, this);

    this.initMap();

    createCarriage();
    game.physics.p2.convertTilemap(map, tileMapLayer);
    game.physics.p2.setBoundsToWorld(true, true, true, true, false);
  }

  update() {
    const {
      cursors, game
    } = globals;

    this.player.body.setZeroVelocity();
    this.stag.body.setZeroVelocity();

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      console.log('interaction button clicked');
      // set the player text bubble to visible
      // there are two options, positive and negative?
    }

    if (cursors.left.isDown) {
      this.player.body.moveLeft(250);
    } else if (cursors.right.isDown) {
      this.player.body.moveRight(250);
    }

    if (cursors.up.isDown) {
      this.player.body.moveUp(250);
    } else if (cursors.down.isDown) {
      this.player.body.moveDown(250);
    }
  }

  render () {
    const { game } = globals;
    if (__DEV__) {
      // this.game.debug.body(globals.player, 'rgba(255,0,0,0.5)');
    }
  }
}
