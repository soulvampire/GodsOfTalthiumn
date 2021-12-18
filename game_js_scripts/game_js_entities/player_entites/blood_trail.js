var game = game || {};
/****************************/
/* class name : blood_trail */
/****************************/
game.blood_trail = me.Renderable.extend( {
  /******************************************/
  /*      blood emitter init function       */
  /******************************************/
  /* blood_pos_x = x cordinate              */
  /* blood_pos_y = y cordinate              */
  /******************************************/
  init: function (player_pos_x, player_pos_y) {
    // create a new emitter
    this.player_blood_emitter = new me.ParticleEmitter(player_pos_x, player_pos_y);

    // start the emitter with pre-defined params
    this.configureBloodTrails();

    // add the emitter to game
    me.game.world.addChild(this.player_blood_emitter, 100);
  },

  /********************************/
  /* blood particle emitter start */
  /********************************/
  configureBloodTrails: function () {
    this.player_blood_emitter.image = me.loader.getImage("blood_particle");
    this.player_blood_emitter.angle = null;
    this.player_blood_emitter.minLife = 500;
    this.player_blood_emitter.maxLife = 1000;
    this.player_blood_emitter.speedVariation = 0;
    this.player_blood_emitter.angleVariation = 1.52;
    this.player_blood_emitter.gravity = 0.1,
    this.player_blood_emitter.wind = 0.00,
    this.player_blood_emitter.floating = false;
    this.player_blood_emitter.width = 22;
    this.player_blood_emitter.height = 57;
    this.player_blood_emitter.frequency = 1;
    this.player_blood_emitter.duration = 250;
  },

  /********************************/
  /* blood particle emitter start */
  /********************************/
  displayBloodTrails: function (player_pos_x, player_pos_y) {
    this.player_blood_emitter.angle = 1.570;
    this.player_blood_emitter.totalParticles = me.Math.random(5, 11)// random number between 5 and 10;
    this.player_blood_emitter.maxParticles = me.Math.random(5, 11)// random number between 5 and 10
    this.player_blood_emitter.pos.set(Math.floor(player_pos_x), Math.floor(player_pos_y));
    this.player_blood_emitter.burstParticles();
  },

  removeBloodTrails: function () {
    // remove the emitter from game		
    me.game.world.removeChild(this.blood_emitter);
  }
});