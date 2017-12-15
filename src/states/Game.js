/* globals __DEV__ */
import Phaser, { Tilemap } from 'phaser';

// function imports

import Player1 from '../sprites/Player1';
import Enemy1 from '../sprites/Enemy1';

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
    globals.map = game.add.tilemap();

    const { map } = globals;
    map.addTilesetImage('walls', 'scifi_platformTiles_32x32', BLOCK_SIZE, BLOCK_SIZE);
    map.setCollisionBetween(1, 2000);
    globals.collisionLayer = map.create('level1', worldWidth, worldHeight, BLOCK_SIZE, BLOCK_SIZE);

    const { collisionLayer } = globals;
    collisionLayer.resizeWorld();
    game.add.existing(collisionLayer);
    globals.underLayer.add(collisionLayer);
  }

  preload () {
    const { game } = globals;
  }

  create () {
    const { game } = globals;
    globals.cursors = game.input.keyboard.createCursorKeys();

    globals.underLayer = game.add.group();
    globals.playerLayer = game.add.group();
    globals.abovePlayerLayer = game.add.group();

    this.initMap();

    createCarriage();

    globals.player = new Player1({ x: 50, y: 50 });

    this.stag = new Enemy1({ x: 250, y: 150, asset: 'stag' });
    globals.playerLayer.add(globals.player);
    globals.playerLayer.add(this.stag);

    const { player } = globals;
    globals.game.add.existing(player);
    globals.game.add.existing(this.stag);
  }

  update() {
    globals.player.update();
    this.stag.update();
  }

  render () {
    const { game } = globals;
    if (__DEV__) {
      // this.game.debug.body(globals.player, 'rgba(255,0,0,0.5)');
    }
  }
}
