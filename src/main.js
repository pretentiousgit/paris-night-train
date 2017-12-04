import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import GameState from './states/Game';

import globals from './config.globals';

class Game extends Phaser.Game {
  constructor () {
    super(globals.gameWidth, globals.gameHeight, Phaser.AUTO, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Game', GameState, false);
    globals.game = this;

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
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
    //
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
