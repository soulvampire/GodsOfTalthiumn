game = game || {};
/**********************************/
/* class name : impact_dust_trail */
/**********************************/
game.impact_dust_trail = me.Renderable.extend( { 
  /*****************************************/
  /*   impact dust emitter init function   */
  /*****************************************/
  /* player_pos_x = x cordinate            */
  /* player_pos_y = y cordinate            */
  /*****************************************/
    init: function(player_pos_x, player_pos_y) 
    {
      // create a new emitter
      this.player_impact_dust_emitter = new me.ParticleEmitter(player_pos_x, player_pos_y);
  
      // start the emitter with pre-defined params
      this.configureImpactDustTrails();
      
      // add the emitter to game
      me.game.world.addChild(this.player_impact_dust_emitter,100);
    },
  
    /*******************************/
    /* dust particle emitter start */
    /*******************************/
    configureImpactDustTrails: function()
    {
      this.player_impact_dust_emitter.image = me.loader.getImage("dust_particle");
      this.player_impact_dust_emitter.angle = null;
      this.player_impact_dust_emitter.minLife = 500;
      this.player_impact_dust_emitter.maxLife = 1000;
      this.player_impact_dust_emitter.speedVariation = 0;
      this.player_impact_dust_emitter.angleVariation = 1.52;
      this.player_impact_dust_emitter.gravity = 0.15,
      this.player_impact_dust_emitter.wind = 0.02,
      this.player_impact_dust_emitter.floating = false;
      this.player_impact_dust_emitter.width = 22;
      this.player_impact_dust_emitter.height = 0;
      this.player_impact_dust_emitter.frequency = 10;
      this.player_impact_dust_emitter.duration = 250;
    },
  
    displayImpactDustTrails: function(player_pos_x, player_pos_y)
    {
      this.player_impact_dust_emitter.angle = 1.570;
      this.player_impact_dust_emitter.totalParticles = me.Math.random(3, 7)// random number between 3 and 7
      this.player_impact_dust_emitter.maxParticles = me.Math.random(3, 7)// random number between 3 and 7
      this.player_impact_dust_emitter.pos.set(Math.floor(player_pos_x), Math.floor(player_pos_y));
      this.player_impact_dust_emitter.burstParticles();
    },
  
    removeImpactDustTrails: function() 
    {
      // remove the emitter from game		
      me.game.world.removeChild(this.player_impact_dust_emitter);
    }
  });