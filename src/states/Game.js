/* globals __DEV__ */
import Phaser, { Tilemap } from 'phaser';
import Chart from 'chart.js';

// function imports
import Player1 from '../sprites/Player1';
import Enemy1 from '../sprites/Enemy1';

import globals from '../config.globals';

import createCarriage from '../generators/createRoom';
import store from '../redux/store';

import { initChart } from '../generators/statsFactory';

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.


Chart.pluginService.register({
  beforeDraw(chart, easing) {
    if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
      const { ctx } = chart.chart;
      const { chartArea } = chart;

      ctx.save();
      ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
      ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
      ctx.restore();
    }
  }
});


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

  particleBurst(pointer) {
    console.log('blam');
    globals.emitter.x = globals.player.x;
    globals.emitter.y = globals.player.y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    globals.emitter.start(true, 2000, null, 10);
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
    globals.actionKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.game.physics.startSystem(Phaser.Physics.P2JS);
    //  Turn on impact events for the world, without this we get no collision callbacks
    this.game.physics.p2.setImpactEvents(true);

    globals.npcMaterial = game.physics.p2.createMaterial('npcMaterial');
    globals.playerMaterial = game.physics.p2.createMaterial('playerMaterial');
    globals.worldMaterial = game.physics.p2.createMaterial('worldMaterial');

    //  4 trues = the 4 faces of the world in left, right, top, bottom order
    game.physics.p2.setWorldMaterial(globals.worldMaterial, true, true, true, true);

    // Turn on collision groups
    globals.wallCollisionGroup = game.physics.p2.createCollisionGroup();
    globals.npcCollisionGroup = game.physics.p2.createCollisionGroup();
    globals.playerCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    globals.backgroundLayer = game.add.group();
    globals.playLayer = game.add.group();
    globals.uiLayer = game.add.group();

    this.initMap();

    globals.player = new Player1({ x: 75, y: 120 });
    globals.npc1 = new Enemy1({ x: 210, y: 120, asset: 'stag' });

    game.add.existing(globals.player);
    game.add.existing(globals.npc1);

    createCarriage();
    game.physics.p2.setBoundsToWorld(true, true, true, true, false);

    // global particle burster
    globals.emitter = globals.game.add.emitter(globals.player.x, globals.player.y, 100);
    globals.emitter.makeParticles('mushroom');
    globals.emitter.gravity = 200;

    // global health chart
    globals.healthChart = new Chart(document.getElementById('health-bar'), initChart());
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
