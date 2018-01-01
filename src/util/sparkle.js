import globals from '../config.globals';

function initEmitter(x, y) {
  globals.emitter = globals.game.add.emitter(0, 0, 100);
  globals.emitter.makeParticles('mushroom');
  globals.emitter.gravity = 200;
}

function particleBurst() {
  console.log('blam');
  globals.emitter.x = globals.player.x;
  globals.emitter.y = globals.player.y;

  //  The first parameter sets the effect to "explode" which means all particles are emitted at once
  //  The second gives each particle a 2000ms lifespan
  //  The third is ignored when using burst/explode mode
  //  The final parameter (10) is how many particles will be emitted in this single burst
  globals.emitter.start(true, 2000, null, 10);
}

export default {
  initEmitter,
  particleBurst
};