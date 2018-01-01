import Phaser, { Tilemap } from 'phaser';
import globals from '../config.globals';

// game.input.onDown.addOnce(particleBurst, this);

function particleBurst(pointer, emitter) {
  //  Position the emitter where the mouse/touch event was
  emitter.x = pointer.x;
  emitter.y = pointer.y;

  //  The first parameter sets the effect to "explode" which means all particles are emitted at once
  //  The second gives each particle a 2000ms lifespan
  //  The third is ignored when using burst/explode mode
  //  The final parameter (10) is how many particles will be emitted in this single burst
  emitter.start(true, 2000, null, 10);

  //  destroy the emitter
  globals.game.time.events.add(500, emitter.destroy(), this);
}


export default {
  particleBurst
};
