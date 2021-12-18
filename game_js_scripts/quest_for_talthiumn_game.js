var game = game || {};

/*********************/
/* game namespace    */
/*********************/ 
game = 
{
  /**********************************************/
  /* data object where to store key information */
  /**********************************************/ 
  data : 
  {
    obtained_keys: [],
    // score
    score : 0,

    // player health bar
    player_current_health : 100,
    player_max_health : 100,

    //player mana bar
    player_current_mana: 100,
    player_max_mana : 100,

  },

  /****************/
  /* Color "enum" */
  /****************/ 
  colours: 
  {
    blue: 0,
    green: 1,
    red: 2,
    yellow: 3,
  },

  /**********************************/
  /* parse the color text to number */
  /**********************************/ 
  parseColor(key_colour) 
  {
    switch (key_colour) 
    {
      case "blue":
        return this.colours.blue;
        break;
      case "green":
        return this.colours.green;
        break;
        case "red":
        return this.colours.red;
          break;
      case "yellow":
        return this.colours.yellow;
        break; 
    }
  },

  /*************************************************/
  /* collect every key in the world for global use */
  /*************************************************/ 
  collectObjects() 
  {
    //game.game_keys = me.game.world.getChildByProp("name", "game_key");
    //game.castle_level_doors = me.game.world.getChildByProp("name", "castle_level_door");
    return;
  },
   
  // Run on page load.
  onload: function () 
  {
    // Initialize the video.
    if (!me.video.init(800, 600, {parent : "screen", scale : "auto", scaleMethod : "flex-width", renderer : me.video.AUTO, subPixel : false, antiAlias : true})) 
    {
      return;
    }

    // set and load all resources.
    // (this will also automatically switch to the loading screen)
    me.loader.preload(game.resources, this.loaded.bind(this));
  },

  /************************************/
  /*   Run on game resources loaded.  */
  /************************************/ 
  // 
  loaded: function () 
  {
    me.state.set(me.state.MENU, new game.title_screen());
    me.state.set(me.state.PLAY, new game.play_screen());

    /*************************/
    /* player entity objects */
    /*************************/
      me.pool.register("main_player", game.player_entity, false);
      me.pool.register("player_head_health_bar", game.generic_health_bar_entity, false);
      me.pool.register("player_head_mana_bar", game.generic_mana_bar_entity, false);


    /*********************************/
    /* player entity effects objects */
    /*********************************/
      me.pool.register("player_dust_trails", game.dust_trail, true);
      me.pool.register("impact_dust_trails", game.impact_dust_trail, true);
     // me.pool.register("generic_floating_text", game.generic_floating_text_entity, true);

    /*********************************/
    /* player entity damage object */
    /*********************************/
      me.pool.register("blood_trails", game.blood_trail, true);

    /********************************************/
    /* platform physical entity effects objects */
    /********************************************/
      me.pool.register("climbable_ladder", game.platform_ladder_entity, true);
      //me.pool.register("climbable_chain", game.platform_chain_entity, true);
      //me.pool.register("floating_platform", game.moving_platform_entity, true);
      //me.pool.register("vanishing_platform", game.vanishing_platform_entity, true);

    /**********************************/
    /* enemies entity effects object */
    /**********************************/
      //me.pool.register("enemies_spawn_trigger", game.enemies_spawn_trigger, true);

    /*****************************************/
    /* platform entity player damage objects */
    /*****************************************/
      me.pool.register("stationary_spike", game.stationary_spike_entity, true);
      //me.pool.register("explosive_trap", game.explosive_trap_entity, true);
    
    /***********************************/
    /* general game background objects */
    /***********************************/
      //me.pool.register("stationary_flame_torch", game.flame_torch_entity, true);

    /***************************/
    /* game level task objects */
    /***************************/
      //me.pool.register("item_chest", game.chest_entity, true);
      me.pool.register("game_key", game.game_key_entity, true);
      //me.pool.register("castle_level_door", game.door_entity, true);
      me.pool.register("castle_door_lock", game.door_lock_entity, true);
    
    /*****************************/
    /* game enemy manager object */
    /*****************************/
      me.pool.register("enemy_spawn_manager", game.enemy_spawn_manager, false);

    /********************************/
    /* load the player texture file */
    /********************************/
      game.player_sprites = new me.video.renderer.Texture(
        me.loader.getJSON("character_movement_right"),
        me.loader.getImage("character_movement_right")
      );

    /**********************************************/
    /* load the main interface texture atlas file */
    /**********************************************/
    game.interface_sprites = new me.video.renderer.Texture(
      me.loader.getJSON("main_game_interface"),
      me.loader.getImage("main_game_interface")
    );

    /**************************/
    /* game keyboard controls */
    /**************************/
      /****************************/
      /* player keyboard controls */
      /****************************/
        /***************************************/
        /* player move walk left or right keys */
        /***************************************/
          me.input.bindKey(me.input.KEY.LEFT, "player_left");
          me.input.bindKey(me.input.KEY.RIGHT, "player_right");

          me.input.bindKey(me.input.KEY.A, "player_left");
          me.input.bindKey(me.input.KEY.D, "player_right");

        /************************************/
        /* player platform pass through key */
        /************************************/  
          me.input.bindKey(me.input.KEY.DOWN, "player_down");

        /********************/
        /* player jump keys */
        /********************/
          me.input.bindKey(me.input.KEY.UP, "player_jump", true);
          me.input.bindKey(me.input.KEY.SPACE, "player_jump",true);

        /**********************************/
        /* player crawl key left or right */
        /**********************************/
          me.input.bindKey(me.input.KEY.V, "player_crawl_right");
          me.input.bindKey(me.input.KEY.C, "player_crawl_left");

        /**********************************/
        /* player climb ladder up or down */
        /**********************************/ 
          me.input.bindKey(me.input.KEY.U, "player_climb_up");
          me.input.bindKey(me.input.KEY.J, "player_climb_down");

        /***************************************************/
        /* player action key used interactive game objects */
        /***************************************************/
        me.input.bindKey(me.input.KEY.X, "player_action", true);

    
    /*********************/
    /* game pad controls */
    /*********************/
      /***************************/
      /* game pad player control */
      /***************************/
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_1}, me.input.KEY.UP);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_2}, me.input.KEY.UP);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.DOWN}, me.input.KEY.DOWN);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_3}, me.input.KEY.DOWN);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_4}, me.input.KEY.DOWN);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.LEFT}, me.input.KEY.LEFT);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.RIGHT}, me.input.KEY.RIGHT);

    /*************************/
    /* map game pad controls */
    /*************************/
      me.input.bindGamepad(0, {type:"axes", code: me.input.GAMEPAD.AXES.LX, threshold: -0.5}, me.input.KEY.LEFT);
      me.input.bindGamepad(0, {type:"axes", code: me.input.GAMEPAD.AXES.LX, threshold: 0.5}, me.input.KEY.RIGHT);
      me.input.bindGamepad(0, {type:"axes", code: me.input.GAMEPAD.AXES.LY, threshold: -0.5}, me.input.KEY.UP);

    me.game.onLevelLoaded = this.collectObjects.bind(this);
    
    // Start the game.
    me.state.change(me.state.PLAY);
  },

  // Helper function to get an image with error checking.
  getImage: function(name) 
  {
    this.image_result = me.loader.getImage(name);
    if (!image_result) 
    {
      throw "Error: No image named `" + name + "` (Did you forget to include the resource?)";
    }
    return this.image_result;
  }
};
