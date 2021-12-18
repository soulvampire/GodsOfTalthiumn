var game = game || {};
/***************************/
/* class name : dust_trail */
/***************************/
game.dust_trail = me.Renderable.extend( {
  /*****************************************/
  /*      dust emitter init function       */
  /*****************************************/
  /* player_pos_x = x cordinate            */
  /* player_pos_y = y cordinate            */
  /*****************************************/
    init: function(player_pos_x, player_pos_y) 
    {
      // create a new emitter
      this.player_dust_emitter = new me.ParticleEmitter(player_pos_x, player_pos_y);
  
      // start the emitter with pre-defined params
      this.startDustTrails(player_pos_x, player_pos_y);
      
      // add the emitter to game
      me.game.world.addChild(this.player_dust_emitter,100);
    },
  
    /*******************************/
    /* dust particle emitter start */
    /*******************************/
    startDustTrails: function(player_pos_x, player_pos_y)
    {
      this.player_dust_emitter.image = me.loader.getImage("dust_particle");
      this.player_dust_emitter.angle = null;
      this.player_dust_emitter.minLife = 250;
      this.player_dust_emitter.maxLife = 500;
      this.player_dust_emitter.speedVariation = 0;
      this.player_dust_emitter.angleVariation = 1.52;
      this.player_dust_emitter.gravity = 0.1,
      this.player_dust_emitter.wind = 0.02,
      this.player_dust_emitter.floating = false;
      this.player_dust_emitter.width = 10;
      this.player_dust_emitter.height = 0;
      this.player_dust_emitter.frequency = 10;
      this.player_dust_emitter.duration = 250;
      this.player_dust_emitter.pos.set(player_pos_x, player_pos_y);
    },
  
    displayDustTrails: function(player_pos_x, player_pos_y, player_direction)
    {
      if (player_direction === "player_facing_left")
      {
        this.player_dust_emitter.angle = -0.000;
        this.player_dust_emitter.pos.set(Math.floor(player_pos_x) + 10, Math.floor(player_pos_y) + 53);
      }
      else if ((player_direction === "player_facing_right"))
      {
        this.player_dust_emitter.angle = 3.142;
        this.player_dust_emitter.pos.set(Math.floor(player_pos_x) + 10, Math.floor(player_pos_y) + 53);
      }
      else if ((player_direction === "player_crawl_left"))
      {
        this.player_dust_emitter.angle = -0.000;
        this.player_dust_emitter.pos.set(Math.floor(player_pos_x) + 10, Math.floor(player_pos_y) + 22);
      }
      else if ((player_direction === "player_crawl_right"))
      {
        this.player_dust_emitter.angle = 3.142;
        this.player_dust_emitter.pos.set(Math.floor(player_pos_x) + 10, Math.floor(player_pos_y) + 22);
      }
      this.player_dust_emitter.totalParticles = me.Math.random(3, 7)// random number between 5 and 10;
      this.player_dust_emitter.maxParticles = me.Math.random(3, 7)// random number between 5 and 10
      this.player_dust_emitter.burstParticles();
    },
  
    removePlayerDustTrails: function() 
    {
      // remove the emitter from game		
      me.game.world.removeChild(this.player_dust_emitter);
    }
  });