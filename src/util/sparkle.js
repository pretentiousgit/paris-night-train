import globals from '../config.globals';

function initEmitter(x, y) {
  globals.emitter = globals.game.add.emitter(0, 0, 100);
  globals.emitter.makeParticles('mushroom');
  globals.emitter.gravity = 200;
}

function particleBurst(x, y) {
  globals.emitter.x = x || globals.player.x;
  globals.emitter.y = y || globals.player.y;

  //  The first parameter sets the effect to "explode" which means all particles are emitted at once
  //  The second gives each particle a 2000ms lifespan
  //  The third is ignored when using burst/explode mode
  //  The final parameter (10) is how many particles will be emitted in this single burst
  globals.emitter.start(true, 500, null, 10);

  // enable particle animation of all particles
  globals.emitter.forEach((singleParticle) => {
    singleParticle.animations.add('particleAnim');
    singleParticle.animations.play('particleAnim', 30, true);
  });

  globals.game.camera.shake(0.003, 150);
}

export {
  initEmitter,
  particleBurst
};