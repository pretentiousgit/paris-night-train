import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import GameState from './states/Game';

import globals from './config.globals';

class Game extends Phaser.Game {
  constructor () {
    super(globals.gameWidth, globals.gameHeight, Phaser.AUTO, 'phaser-container', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Game', GameState, false);
    globals.game = this;

    // when using cordova,
    // you need to wait for a device to be ready
    // Call the boot state in another file to enforce task order
    if (!window.cordova) {
      this.state.start('Boot');
    }
  }
}

window.game = new Game();

if (window.cordova) {
  const app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      );
    },

    // deviceready Event Handler
    onDeviceReady: function () {
      this.receivedEvent('deviceready');

      // When the device is ready, start Phaser Boot state.
      window.game.state.start('Boot');
    },

    receivedEvent: function (id) {
      console.log(`Received Event: ${id}`);
    }
  };

  app.initialize();
}

export default Game;