import globals from '../config.globals';

function initEmitter(x, y) {
  globals.emitter = globals.game.add.emitter(0, 0, 100);
  globals.emitter.makeParticles('mushroom');
  globals.emitter.gravity = 200;
}

function particleBurst(pointer) {
  //  Position an emitter where the mouse/touch event was
  globals.emitter.x = pointer.x;
  globals.emitter.y = pointer.y;

  //  The first parameter sets the effect to "explode" which means all particles are emitted at once
  //  The second gives each particle a 2000ms lifespan
  //  The third is ignored when using burst/explode mode
  //  The final parameter (10) is how many particles will be emitted in this single burst
  globals.emitter.start(true, 2000, null, 10);

  //  destroy the emitter
  globals.game.time.events.add(500, globals.emitter.destroy(), this);
}

export default {
  initEmitter,
  particleBurst
};