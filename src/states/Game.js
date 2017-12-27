/* globals __DEV__ */
import Phaser, { Tilemap } from 'phaser';

// function imports

import Player1 from '../sprites/Player1';
import Enemy1 from '../sprites/Enemy1';
import HealthBar from '../util/HealthBar';

import globals from '../config.globals';

import createCarriage from '../generators/createRoom';

import store from '../redux/store';
// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.

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

    globals.tileMapLayer = map.create('level1', worldWidth, worldHeight, BLOCK_SIZE, BLOCK_SIZE);

    const { tileMapLayer } = globals;
    tileMapLayer.resizeWorld();
    game.physics.p2.convertTilemap(map, tileMapLayer);
  }

  preload () {
    const { game } = globals;

    store.subscribe(() =>
      console.log('subscription update', store.getState()));
  }

  create () {
    const { game } = globals;
    globals.cursors = game.input.keyboard.createCursorKeys();

    this.game.physics.startSystem(Phaser.Physics.P2JS);
    //  Turn on impact events for the world, without this we get no collision callbacks
    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.restitution = 0.8;

    globals.backgroundLayer = game.add.group();
    globals.playLayer = game.add.group();
    globals.uiLayer = game.add.group();

    this.initMap();

    globals.player = new Player1({ x: 75, y: 120 });
    globals.npc1 = new Enemy1({ x: 210, y: 120, asset: 'stag' });
    globals.healthBar = new HealthBar(game, {
      layer: globals.uiLayer,
      width: game.width - 150,
      height: 10,
      x: 75,
      y: game.height - 25,
      bg: {
        color: '#651828'
      },
      bar: {
        color: '#FEFF03'
      },
      opacity: 80,
      animationDuration: 200,
      flipped: false,
      isFixedToCamera: true
    });

    game.add.existing(globals.player);
    game.add.existing(globals.npc1);

    createCarriage();
    game.physics.p2.setBoundsToWorld(true, true, true, true, false);
  }

  update() {
    globals.player.update();
    globals.npc1.update();
  }

  render () {
    const { game } = globals;
    if (__DEV__) {
      // this.game.debug.body(globals.player, 'rgba(255,0,0,0.5)');
    }
  }
}
