import Phaser from 'phaser';
import { AssetLoader } from 'phaser-manifest-loader';

import manifest from '../config.assetManifest';
import kuler from '../util/kuler';

const req = require.context('../assets', true, /.*\.png|json|ttf|woff|woff2|xml|mp3|jpg$/);

export default class extends Phaser.State {
  init () {
    const scheme = kuler(272);
    this.stage.backgroundColor = scheme.mainShade;
  }

  preload () {
    this.game.load.physics('physicsData', '../assets/physics/nightTrain.json');
    this.manifestLoader = this.game.plugins.add(AssetLoader, req).loadManifest(manifest)
      .then(() => {
        this.state.start('Game');
      });
  }

  render () {

  }
}
