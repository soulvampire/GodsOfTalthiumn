game = game || {};

/**************************/
/* player movement states */
/**************************/
const player_states =
{
  player_idle: "player_idle",
  player_falling: "player_falling",
  player_not_falling: "player_not_falling",
  player_facing_left: "player_facing_left",
  player_facing_right: "player_facing_right",
  player_jump_up: "player_jump_up",
  player_crawl_right: "player_crawl_right",
  player_crawl_left: "player_crawl_left",
  player_on_climbable: "player_on_climbable",
  player_in_climbable: "player_in_climbable",
  player_off_climbable: "player_off_climbable",
  player_climb_up: "player_climb_up",
  player_climb_down: "player_climb_down"
};

/*****************/
/* player entity */
/*****************/
game.player_entity = me.Entity.extend(
  {
    /***************/
    /* constructor */
    /***************/
    init: function (x, y, settings) {
      this.action = { enabled: false, other: null };

      this._super(me.Entity, 'init', [x, y, settings]);
      this.name = "mainPlayer";
      this.body.collisionType = me.collision.types.PLAYER_OBJECT;

      this.body.removeShape(this.body.getShape(0));
      this.body.addShape(new me.Rect(0, 0, 22, 57));

      // max walking & jumping speed
      this.body.setMaxVelocity(2, 9);
      this.body.setFriction(0.4, 0);

      // enable physic collision (off by default for basic me.Renderable)
      this.isKinematic = false;;

      // set the display to follow our position on both axis
      me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.2);

      // ensure the player is updated even when outside of the viewport
      this.alwaysUpdate = true;

      /*******************************************************/
      /* standing animations = cs(character stand)           */
      /* walking animations = cw(character walk)             */
      /* crawling animations = cc(character crawl)           */
      /* jumping animations = cj(character jump)             */
      /* climbing up animations = cu(character climb up)     */
      /* climbing down animations = cd(character climb down) */
      /*******************************************************/
      this.renderable = game.player_sprites.createAnimationFromName(["cs_right_000",
        "cs_right_001",
        "cs_right_002",
        "cw_right_000",
        "cw_right_001",
        "cw_right_002",
        "cw_right_003",
        "cw_right_004",
        "cw_right_005",
        "cc_right_000",
        "cc_right_001",
        "cc_right_002",
        "cc_right_003",
        "cc_right_004",
        "cc_right_005",
        "cr_right_000",
        "cr_right_001",
        "cr_right_002",
        "cr_right_003",
        "cr_right_004",
        "cr_right_005",
        "cj_right_000",
        "cj_right_001",
        "cj_right_002",
        "cj_right_003",
        "cu_right_000",
        "cu_right_001",
        "cu_right_002",
        "cu_right_003",
        "cu_right_004",
        "cu_right_005",
        "co_right_000",
        "co_right_001",
        "co_right_002",
        "co_right_003",
        "co_right_004",
        "co_right_005",
        "co_right_006",
        "co_right_007",
        "co_right_008",
        "co_right_009",
        "co_right_010",
        "co_right_011"]);

      /******************/
      /* idle animation */
      /******************/
      this.renderable.addAnimation("stand", [{ name: "cs_right_000", delay: 300 },
      { name: "cs_right_001", delay: 400 },
      { name: "cs_right_002", delay: 500 }]);

      /******************/
      /* walk animation */
      /******************/
      this.renderable.addAnimation("walk", [{ name: "cw_right_000", delay: 150 },
      { name: "cw_right_001", delay: 100 },
      { name: "cw_right_002", delay: 100 },
      { name: "cw_right_003", delay: 100 },
      { name: "cw_right_004", delay: 100 },
      { name: "cw_right_005", delay: 100 }]);

      /*******************/
      /* crawl animation */
      /*******************/
      this.renderable.addAnimation("crawl", [{ name: "cc_right_000", delay: 150 },
      { name: "cc_right_001", delay: 150 },
      { name: "cc_right_002", delay: 150 },
      { name: "cc_right_003", delay: 150 },
      { name: "cc_right_004", delay: 150 },
      { name: "cc_right_005", delay: 150 }]);

      /*****************************/
      /* climb up ladder animation */
      /*****************************/
      this.renderable.addAnimation("climb_up", [{ name: "cu_right_000", delay: 150 },
      { name: "cu_right_001", delay: 150 },
      { name: "cu_right_002", delay: 150 },
      { name: "cu_right_003", delay: 150 },
      { name: "cu_right_004", delay: 150 },
      { name: "cu_right_005", delay: 150 }]);

      /*******************************/
      /* climb down ladder animation */
      /*******************************/
      this.renderable.addAnimation("climb_down", [{ name: "cu_right_005", delay: 150 },
      { name: "cu_right_004", delay: 150 },
      { name: "cu_right_003", delay: 150 },
      { name: "cu_right_002", delay: 150 },
      { name: "cu_right_001", delay: 150 },
      { name: "cu_right_000", delay: 150 }]);

      /**********************************/
      /* climb over ladder up animation */
      /**********************************/
      this.renderable.addAnimation("climb_over_up", [{ name: "co_right_000", delay: 140 },
      { name: "co_right_001", delay: 140 },
      { name: "co_right_002", delay: 140 },
      { name: "co_right_003", delay: 140 },
      { name: "co_right_004", delay: 140 },
      { name: "co_right_005", delay: 140 },
      { name: "co_right_006", delay: 140 },
      { name: "co_right_007", delay: 140 },
      { name: "co_right_008", delay: 140 },
      { name: "co_right_009", delay: 140 },
      { name: "co_right_010", delay: 140 }]);

      /**********************************/
      /* climb over ladder down animation */
      /**********************************/
      this.renderable.addAnimation("climb_over_down", [{ name: "cs_right_000", delay: 130 },
      { name: "co_right_009", delay: 130 },
      { name: "co_right_008", delay: 130 },
      { name: "co_right_007", delay: 130 },
      { name: "co_right_006", delay: 130 },
      { name: "co_right_005", delay: 130 },
      { name: "co_right_004", delay: 130 },
      { name: "co_right_003", delay: 130 },
      { name: "co_right_002", delay: 130 },
      { name: "co_right_001", delay: 130 },
      { name: "co_right_000", delay: 130 }]);

      /*********************/
      /* jump up animation */
      /*********************/
      this.renderable.addAnimation("jump_up", [{ name: "cj_right_000", delay: 100 },
      { name: "cj_right_001", delay: 100 },
      { name: "cj_right_002", delay: 100 },
      { name: "cj_right_003", delay: 100 }]);

      /**************************/
      /* falling down animation */
      /**************************/
      this.renderable.addAnimation("fall_down", [{ name: "cj_right_003", delay: 100 },
      { name: "cj_right_002", delay: 100 },
      { name: "cj_right_001", delay: 100 },
      { name: "cj_right_000", delay: 100 }]);

      // define a standing animation
      this.change_animation("stand");
      this.anchorPoint.set(0.5, 0.5);

      /********************/
      /* player varaibles */
      /********************/

        this.display_time = new Date(Date.now());

      /*************************/
      /* player starting level */
      /************************/
      this.player_starting_game_lvl = 2;

      /********************/
      /* current position */
      /********************/
      this.current_pos_y = 0;
      this.current_pos_x = 0;

      /***************************/
      /* max player health lvl 1 */
      /***************************/
      this.max_health = game.data.player_max_health;
      this.current_health = game.data.player_current_health;

      /************************/
      /* player fall distance */
      /************************/
      this.player_max_fall_distance = this.default_player_fall_distance = 25;// number of squares that the player can fall each square is 16x16 pixels
      this.player_current_fall_distance = 0;

      /*************************/
      /* max player mana lvl 1 */
      /*************************/
      this.max_mana = game.data.player_max_mana;
      this.current_mana = game.data.player_current_mana;

      /**************************/
      /* player multi jump flag */
      /**************************/
      this.mutipleJump = 1;

      /***************************/
      /* player facing left flag */
      /***************************/
      this.facing_right_left = "";

      /********************************/
      /* vanishing platform variables */
      /********************************/
      this.current_platform_opacity;
      this.timer_value;

      /*******************************************/
      /* player start default animation position */
      /*******************************************/
      this.player_current_states = player_states.player_idle;

      /*******************************/
      /* player climable start state */
      /*******************************/
      this.player_climbable_states = player_states.player_off_climbable;

      /***************************/
      /* player fall start state */
      /***************************/
      this.player_fall_states = player_states.player_not_falling;
      /************************/
      /* end player varaibles */
      /************************/

      this.is_floating = true;
			this.non_floating = false;
      this.is_persistent = true;
			this.non_persistent = false;
      this.is_moveable = true;
			this.is_non_moveable = false;
			this.highlight_required = true;
			this.non_highlight_required = false;

      this.defined_screen_width = me.game.viewport.width;
			this.defined_screen_height = me.game.viewport.height;
      
      /***************************************/
    	/* floating game log panel information */
    	/***************************************/
			  this.floating_game_log_panel = new game.generic_floating_panel(7,  this.defined_screen_height - 62, 171, 56, "game_log_dialog_box_min", this.is_floating, this.is_persistent, this.non_moveable);

      /******************************************/
			/* floating game log current time display */
			/******************************************/
        this.floating_game_log_time = new game.generic_floating_textbox(184, this.defined_screen_height - 62, 1, 10, (this.display_time.getHours().toString().padStart(2, '0') + ":" + this.display_time.getMinutes().toString().padStart(2, '0') + ":" + this.display_time.getMinutes().toString().padStart(2, '0')).toString(), 13);
      /******************************************/
      /* floating game log updated time display */
      /******************************************/
       window.setInterval(() => { 
                                    this.display_time = new Date(Date.now());
                                    this.floating_game_log_time.updateGameLogText(this.display_time.getHours().toString().padStart(2, '0') + ":" + this.display_time.getMinutes().toString().padStart(2, '0') + ":" + this.display_time.getSeconds().toString().padStart(2, '0'));
                                  },900);	
      /********************************************/
      /* floating game log player sequence events */
      /********************************************/
        this.floating_player_current_sequence = new game.generic_floating_textbox(15, this.defined_screen_height - 44, 1, 40, "Player current sequence events", 10);
        this.floating_player_previous_sequence = new game.generic_floating_textbox(13, this.defined_screen_height - 22, 1, 50, "Player previous sequence events", 10);
	
			/*********************************************/
			/* floating game log player text information */
			/*********************************************/
        this.floating_game_log_panel.addChild(new game.generic_floating_textbox(12, this.defined_screen_height - 62, 1, 13, "Game Log Panel", 12), 100);
			  this.floating_game_log_panel.addChild(this.floating_player_current_sequence, 100);
        this.floating_game_log_panel.addChild(this.floating_player_previous_sequence, 100);

			/***********************************/
			/* display floating game log panel */
			/***********************************/
			me.game.world.addChild(this.floating_game_log_panel, 100);
			/*******/
			/* end */
			/*******/

      /************************************/
      /* player health bar initial values */
      /************************************/
      this.player_head_health_bar = me.pool.pull("player_head_health_bar", game.data.player_current_health, game.data.player_max_health, this.pos.x - 8, this.pos.y - 12, 35, 4);
      me.game.world.addChild(this.player_head_health_bar, 100);
      this.player_head_health_bar.updateOnce = true;

      this.player_plaque_health_bar = me.pool.pull("player_head_health_bar", game.data.player_current_health, game.data.player_max_mana, 48, 14, 95, 8);
      me.game.world.addChild(this.player_plaque_health_bar, 100);
      this.player_plaque_health_bar.isPersistent = true;
      this.player_plaque_health_bar.floating = true;
      this.player_plaque_health_bar.updateOnce = true;

      /**********************************/
      /* player mana bar initial values */
      /**********************************/
      this.player_head_mana_bar = me.pool.pull("player_head_mana_bar", game.data.player_current_mana, game.data.player_max_mana, this.pos.x - 8, this.pos.y - 7, 35, 4);
      me.game.world.addChild(this.player_head_mana_bar, 100);
      this.player_head_mana_bar.updateOnce = true;

      this.player_plaque_mana_bar = me.pool.pull("player_head_mana_bar", game.data.player_current_mana, game.data.player_max_mana, 48, 22, 95, 8);
      me.game.world.addChild(this.player_plaque_mana_bar, 100);
      this.player_plaque_mana_bar.isPersistent = true;
      this.player_plaque_mana_bar.floating = true;
      this.player_plaque_mana_bar.updateOnce = true;
    },

    /**************************/
    /* update player position */
    /**************************/
    update: function (delta_time) {
      /******************************/
      /* player keyboard keys check */
      /******************************/
      this.playerKeyboardCheck();

      /*************************/
      /* player movement check */
      /*************************/
      this.playerMovement();

      /*************************/
      /* use the action button */
      /*************************/
      if ((me.input.isKeyPressed("player_action")) && this.action.enabled) {
        if ((this.action.other.name === "item_chest") && Math.floor(this.action.other.pos.x - this.pos.x) <= 50) {
          if (this.action.other.chest_open()) {
            this.action.other = null;
          }
          this.action.enabled = false;
        }
        if ((this.action.other.name === "castle_door_lock") && Math.floor(this.action.other.pos.x - this.pos.x) <= 97) {
          if (this.action.other.open_lock()) {
            this.action.other = null;
          }
          this.action.enabled = false;
        }
      }
      /*****************************/
      /* end use the action button */
      /*****************************/

      /**********************************************/
      /* player fall within ladder conditions check */
      /**********************************************/
      if (!this.body.falling && this.player_climbable_states === "player_on_climbable") {
        this.player_current_fall_distance = 0;
      }
      else if (this.body.falling && this.player_current_states != "player_climb_down" && this.player_climbable_states === "player_in_climbable") {
        this.player_current_fall_distance = this.player_current_fall_distance + 1;
      }
      else if (this.body.falling && this.player_climbable_states === "player_off_climbable") {
        this.player_current_fall_distance = this.player_current_fall_distance + 1;
      }
      /**************************************************/
      /* end player fall within ladder conditions check */
      /**************************************************/

      /***************************************/
      /* player fall penalty condition check */
      /***************************************/
      if (!this.body.falling && !this.body.jumping) {
        /*********************************/
        /* fall penalty deduction values */
        /*********************************/
        if (this.player_current_fall_distance >= this.player_max_fall_distance) {
          this.fall_value_penalty = this.player_current_fall_distance - this.player_max_fall_distance;
          if (this.fall_value_penalty <= 0) {
            this.hit_points = 0;
          }
          else if (this.fall_value_penalty >= 1 && this.fall_value_penalty <= 6) {
            this.hit_points = 5;
          }
          else if (this.fall_value_penalty >= 7 && this.fall_value_penalty <= 12) {
            this.hit_points = 7;
          }
          else if (this.fall_value_penalty >= 13 && this.fall_value_penalty <= 18) {
            this.hit_points = 9;
          }
          else if (this.fall_value_penalty >= 19 && this.fall_value_penalty <= 24) {
            this.hit_points = 11;
          }
          else if (this.fall_value_penalty >= 25) {
            this.hit_points = this.current_health - (this.current_health / 2);
          }
          /****************************************/
          /* set the fall penalty deduction value */
          /****************************************/
          // this.hurt(this.hit_points);
          this.player_current_fall_distance = 0;
        }
        /************************************/
        /* end fall penalty deduction value */
        /************************************/

        /*******************************/
        /* reset current fall distance */
        /*******************************/
        else {
          this.player_current_fall_distance = 0;
        }
        /**********************************/
        /* reset the multi jump flag to 1 */
        /**********************************/
        this.multipleJump = 1;
        this.body.jumping = false;
      }
      /******************************/
      /* multi jump condition check */
      /******************************/
      else if (this.body.falling && this.multipleJump < 2) {
        // set the multipleJump flag if falling
        this.multipleJump = 2;
      }
      /*******************************************/
      /* end player fall penalty condition check */
      /******************************************/

      /**************************************/
      /* impact dust trails condition check */
      /**************************************/
      if (this.body.falling && this.body.vel.y === 0) {
        //player dust trail when falling down and landing on platform or ground
        if ((this.player_climbable_states !== player_states.player_on_climbable) && (this.player_climbable_states !== player_states.player_in_climbable)) {
          this.playerimpactdusttrails = me.pool.pull("impact_dust_trails", this.pos.x, this.pos.y);
          this.playerPosition = me.game.viewport.worldToLocal(this.pos.x, this.pos.y)
          this.playerimpactdusttrails.displayImpactDustTrails(Math.floor(this.playerPosition.x), Math.floor(this.playerPosition.y) + 53);
        }
      }

      /*****************************/
      /* apply physics to the body */
      /*****************************/
      this.body.update(delta_time);

      /**************************************/
      /* update position of the health bar  */
      /* update position of mana bar        */
      /* update position of player icon bar */
      /**************************************/
      //this.updatePlayerStatBars();

      /******************************************/
      /* handle collisions against other shapes */
      /******************************************/
      me.collision.check(this);

      /***********************/
      /* entity moved update */
      /***********************/
      return (this._super(me.Entity, 'update', [delta_time]) || this.body.vel.x !== 0 || this.body.vel.y !== 0)
    },
    /******************************/
    /* end update player position */
    /******************************/

    /************************************/
    /* player/platform colision handler */
    /************************************/
    onCollision: function (response, other) {
      switch (other.body.collisionType) {
        case me.collision.types.WORLD_SHAPE:
          /****************************/
          /* moving floating platform */
          /****************************/
          if ((other.name === "floating_platform") && (other.type === "platform_pass_through")) {
            if ((this.pos.y < other.pos.y)) {
              if (this.renderable.isCurrentAnimation("stand")) {
                this.pos.x = other.pos.x - this.current_pos_x;
              }
              this.current_pos_x = other.pos.x - this.pos.x;
            }
          }

          /**********************/
          /* vanishing platform */
          /**********************/
          if ((other.name === "vanishing_platform") && (other.type === "platform_pass_through")) {
            this.current_platform_opacity = other.renderable.getOpacity();
            other.renderable.setOpacity(this.current_platform_opacity - other.vanish_platform_speed);
            if (this.current_platform_opacity <= 0) {
              me.game.world.removeChild(other);
            }
          }

          /*****************************/
          /* player ladder climb check */
          /*****************************/
          if ((other.name === "climbable_ladder") && (other.type === "platform_pass_through")) {
            if ((Math.floor(this.pos.y) <= other.ladder_top_position) && (Math.floor(this.pos.x) >= other.ladder_left_position) && (Math.floor(this.pos.x) <= other.ladder_right_position)) {
              this.player_climbable_states = player_states.player_on_climbable;
              console.log("on ladder");
            }
            else if (((Math.floor(this.pos.x) >= other.ladder_left_position) && (Math.floor(this.pos.y) >= other.ladder_top_position)) &&
              ((Math.floor(this.pos.x) <= other.ladder_right_position) && (Math.floor(this.pos.y) <= other.ladder_bottom_position))) {
              this.player_climbable_states = player_states.player_in_climbable;
              console.log("in ladder");
            }
          }

          /****************************/
          /* player chain climb check */
          /****************************/
          if ((other.name === "climbable_chain") && (other.type === "platform_pass_through")) {
            if ((Math.floor(this.pos.y) > other.chain_top_position) && (Math.floor(this.pos.y) <= other.chain_bottom_position)) {
              this.player_climbable_states = player_states.player_in_climbable;
            }
            else if ((Math.floor(this.pos.y) < other.chain_top_position) && (Math.floor(this.pos.x) >= other.chain_right_position)) {
              this.player_climbable_states = player_states.player_on_climbable;
            }
          }

          /*****************/
          /* sloped ground */
          /*****************/
          if (other.type === "slope") {
            console.log("slope if");
            // Always adjust the collision response upward
            response.overlapV.y = Math.abs(response.overlap);
            response.overlapV.x = 0;
            // Respond to the slope (it is solid)
            return true;
          }

          /******************/
          /* explosive trap */
          /******************/
          if (other.type === "trap_hazard") {
            //this.hurt(other.explosive_trap_hit_points);
          }

          /********************************/
          /* static pass through platform */
          /********************************/
          if (other.type === "platform_pass_through") {
            if (this.body.falling && !me.input.isKeyPressed("player_down") && (response.overlapV.y > 0) && (~~this.body.vel.y >= ~~response.overlapV.y)) {
              // Disable collision on the x axis
              response.overlapV.x = 0;
              // Repond to the platform (pass through)
              return true;
            }
            // Do not respond to the platform (it is solid)
            return false;
          }
          break;

        case me.collision.types.ENEMY_OBJECT:
          if (!other.isMovingEnemy) {
            //game world fixed danger
            //this.body.vel.y -= this.body.maxVel.y * 0.2 * me.timer.tick;
            if (other.name === "stationary_spike") {
              this.hurt(other.spike_hit_points);
            }
          }
          else {
            // a regular moving enemy entity
            if ((response.overlapV.y > 0) && this.body.falling) {
              // jump
              this.body.vel.y -= this.body.maxVel.y * 0.2; // me.timer.tick;
            }
            else {
              //this.hurt(0);
            }
            // Not solid
            return false;
          }
          break;

        case me.collision.types.ACTION_OBJECT:
          // If the entity jumped onto a spring.
          if (other.name === "platform_spring") {
            if ((response.overlapV.y > 0) && this.body.falling) {
              // Accelerate the entity.
              this.speedUp();

              // Force the jump with accelerated vertical speed.
              this.jump();

              // Play the spring animation.
              other.action();
            }
          }
          else if (other.name === "castle_door_lock" || other.name === "item_chest") {
            this.action.enabled = true;
            this.action.other = other;
          }
          break;

        default:
          // Do not respond to other objects (e.g. coins)
          return false;
      }
      // Make the object solid
      return true;
    },
    /****************************************/
    /* end player/platform colision handler */
    /****************************************/

    /***************************/
    /* player keyboard handler */
    /***************************/
    playerKeyboardCheck: function () {
      /********************************/
      /* player controller key states */
      /*********************************/
      /* keypress player left position */
      /*********************************/
      if (me.input.isKeyPressed("player_left")) {
        this.player_current_states = player_states.player_facing_left;//player left game state
      }

      /**********************************/
      /* keypress player right position */
      /**********************************/
      else if (me.input.isKeyPressed("player_right")) {
        this.player_current_states = player_states.player_facing_right;//player right game state
      }

      /***********************************/
      /* keypress player climb up ladder */
      /***********************************/
      else if (me.input.isKeyPressed('player_climb_up')) {
        this.player_current_states = player_states.player_climb_up//player climb up game state
      }

      /*************************************/
      /* keypress player climb down ladder */
      /*************************************/
      else if (me.input.isKeyPressed("player_climb_down")) {
        this.player_current_states = player_states.player_climb_down;//player climb down game state
      }

      /**********************************/
      /* keypress right player crawling */
      /**********************************/
      else if (me.input.isKeyPressed("player_crawl_right")) {
        this.player_current_states = player_states.player_crawl_right;//player crawl right game state
      }

      /*********************************/
      /* keypress left player crawling */
      /*********************************/
      else if (me.input.isKeyPressed("player_crawl_left")) {
        this.player_current_states = player_states.player_crawl_left;//player crawl left game state
      }

      /**********************************************/
      /* update player state standing doing nothing */
      /**********************************************/
      else {
        this.player_current_states = player_states.player_idle;//player idle game state
      }

      /*******************************************/
      /* keypress player jumping and double jump */
      /*******************************************/
      if (me.input.isKeyPressed("player_jump")) {
        this.player_current_states = player_states.player_jump_up;//player jump left game state
        /*************************/
        /* set jump flag to true */
        /*************************/
        this.body.jumping = true;
      }
      /**********************************/
      /* end player movement key states */
      /**********************************/
    },
    /*******************************/
    /* end player keyboard handler */
    /*******************************/

    /******************************/
    /* player controller movement */
    /******************************/
    playerMovement: function () {
      switch (this.player_current_states) {
        /************************/
        /* idle player movement */
        /************************/
        case "player_idle":
          this.body.setMaxVelocity(2, 10);
          this.body.force.x = 0;
          this.body.force.y = 0;
          // change to the standing animation
          if (!this.renderable.isCurrentAnimation("stand")) {
            this.body.removeShape(this.body.getShape(0));
            this.body.addShape(new me.Rect(0, 0, 22, 57));
            this.anchorPoint.set(0.5, 0.5);
            this.change_animation("stand");
          }
          this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 12));
          this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 7));
          break;

        /*************************/
        /* right player movement */
        /*************************/
        case "player_facing_right":
          this.body.setMaxVelocity(2, 10);
          this.body.force.y = 0;
          // update the entity velocity
          this.body.vel.x += this.body.maxVel.x * me.timer.tick;
          // flip the sprite
          this.renderable.flipX(false);
          // change to the walking right animation
          if (!this.renderable.isCurrentAnimation("walk")) {
            this.body.removeShape(this.body.getShape(0));
            this.body.addShape(new me.Rect(0, 0, 22, 57));
            this.anchorPoint.set(0.5, 0.5);
            this.change_animation("walk");
            this.displayplayerimpactdustTrails();
          }
          this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 12));
          this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 7));
          break;

        /*************************/
        /* left player movement */
        /*************************/
        case "player_facing_left":
          this.body.setMaxVelocity(2, 10);
          this.body.force.y = 0;
          // update the entity velocity
          this.body.vel.x -= this.body.maxVel.x * me.timer.tick;
          // flip the sprite
          this.renderable.flipX(true);
          // change to the walking right animation
          if (!this.renderable.isCurrentAnimation("walk")) {
            this.body.removeShape(this.body.getShape(0));
            this.body.addShape(new me.Rect(0, 0, 22, 57));
            this.anchorPoint.set(0.5, 0.5);
            this.change_animation("walk");
            this.displayplayerimpactdustTrails();
          }
          this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 12));
          this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 7));
          break;

        /****************************/
        /* climb up player movement */
        /****************************/
        case "player_climb_up":
          if (this.player_climbable_states === "player_on_climbable") {
            this.body.setMaxVelocity(0, 0);
            this.body.force.x = 0;
            this.body.force.y = 0;
            //change to the climbing up animation
            if (!this.renderable.isCurrentAnimation("climb_over_up")) {
              this.body.removeShape(this.body.getShape(0));
              this.body.addShape(new me.Rect(-3, -28, 28, 57));
              this.anchorPoint.set(0.5, 0.5);
              this.change_animation("climb_over_up", (function () { this.pos.y = this.pos.y - 60; me.input.unbindKey(me.input.KEY.U, "player_climb_up"); }).bind(this));
            }
            switch (this.renderable.getCurrentAnimationFrame()) {
              case 10:
                this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 68));
                this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 63));
                break;
              case 9:
                this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 58));
                this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 53));
                break;
              case 8:
                this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 53));
                this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 48));
                break;
              case 7:
                this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 50));
                this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 45));
                break;
              case 6:
                this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 45));
                this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 40));
                break;
              case 5:
                this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 37));
                this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 32));
                break;
              case 4:
                this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 27));
                this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 22));
                break;
              case 3: case 2: case 1: case 0:
                this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 17));
                this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 12));
                break;
            }
          }

          if (this.player_climbable_states === "player_in_climbable") {
            this.body.setMaxVelocity(1, 0.70);
            this.body.force.x = 0;
            this.body.force.y -= this.body.maxVel.y * me.timer.tick;
            // change to the climbing up animation
            if (!this.renderable.isCurrentAnimation("climb_up")) {
              this.body.removeShape(this.body.getShape(0));
              this.body.addShape(new me.Rect(-4, 0, 28, 57));
              this.anchorPoint.set(0.5, 0.5);
              this.change_animation("climb_up");
            }
            this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 12));
            this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 7));
          }
          break;

        /******************************/
        /* climb down player movement */
        /******************************/
        case "player_climb_down":
          if (this.player_climbable_states === "player_on_climbable") {
            this.body.setMaxVelocity(0, 0);
            this.body.force.x = 0;
            this.body.force.y += this.body.maxVel.y * me.timer.tick;
            //change to the climbing up animation
            if (!this.renderable.isCurrentAnimation("climb_over_down")) {
              this.body.removeShape(this.body.getShape(0));
              this.body.addShape(new me.Rect(-3, +29, 28, 57));
              this.anchorPoint.set(0.5, 0.5);
              this.change_animation("climb_over_down", (function () { this.pos.y = this.pos.y + 64; window.setTimeout(() => { me.input.bindKey(me.input.KEY.U, "player_climb_up");},4);}).bind(this));
            }
            switch (this.renderable.getCurrentAnimationFrame()) {
              case 1:
                this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y));
                this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y + 5));
                break;
              case 2:
                this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y + 5));
                this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y + 10));
                break;
              case 3:
                this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y + 10));
                this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y + 15));
                break;
              case 4:
                this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y + 15));
                this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y + 20));
                break;
              case 5:
                this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y + 20));
                this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y + 25));
                break;
              case 6:
                this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y + 25));
                this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y + 30));
                break;
              case 7:
                this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y + 45));
                this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y + 50));
                break;
              case 8: case 9: case 10: case 11:
                this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y + 45));
                this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y + 50));
                break;
            }
          }

          if (this.player_climbable_states === "player_in_climbable") {
            this.body.setMaxVelocity(1, 0.70);
            this.body.force.x = 0;
            this.body.force.y += this.body.maxVel.y * me.timer.tick;
            // change to the climbing up animation
            if (!this.renderable.isCurrentAnimation("climb_down")) {
              this.body.removeShape(this.body.getShape(0));
              this.body.addShape(new me.Rect(-4, 0, 30, 57));
              this.anchorPoint.set(0.5, 0.5);
              this.change_animation("climb_down");
            }
            this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 12));
            this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 7));
          }
          break;

        /*******************************/
        /* crawl right player movement */
        /*******************************/
        case "player_crawl_right":
          this.body.setMaxVelocity(0.7, 8.0);
          this.body.force.x += this.body.maxVel.x * me.timer.tick;
          this.body.force.y = 0;
          this.renderable.flipX(false)
          if (!this.renderable.isCurrentAnimation("crawl")) {
            this.body.removeShape(this.body.getShape(0));
            this.body.addShape(new me.Rect(-15, 0, 50, 31));
            this.anchorPoint.set(0.5, 0.5);
            this.change_animation("crawl");
          }
          this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 6), Math.floor(this.pos.y - 12));
          this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 6), Math.floor(this.pos.y - 7));
          break;

        /******************************/
        /* crawl left player movement */
        /******************************/
        case "player_crawl_left":
          this.body.setMaxVelocity(0.7, 8.0);
          this.body.force.x -= this.body.maxVel.x * me.timer.tick;
          this.body.force.y = 0;
          this.renderable.flipX(true)
          if (!this.renderable.isCurrentAnimation("crawl")) {
            this.body.removeShape(this.body.getShape(0));
            this.body.addShape(new me.Rect(-15, 0, 50, 31));
            this.anchorPoint.set(0.5, 0.5);
            this.change_animation("crawl");
          }
          this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 6), Math.floor(this.pos.y - 12));
          this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 6), Math.floor(this.pos.y - 7));
          break;

        /***************************/
        /* player jumping movement */
        /***************************/
        case "player_jump_up":
          if (this.multipleJump <= 2) {
            // easy "math" for double jump
            this.body.force.y -= this.body.maxVel.y * this.multipleJump++;
          }
          this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 12));
          this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 7));
          break;

        default:
          // do nothing just return
          return;
      }
    },
    /*********************************/
    /* end player direction movement */
    /*********************************/

    /************************/
    /* player health damage */
    /************************/
    hurt: function (hit_points) {
      if (!this.renderable.isFlickering()) {
        this.renderable.flicker(250);
        //this.floating_text = me.pool.pull("generic_floating_text", hit_points, Math.floor(this.pos.x), Math.floor(this.pos.y));
        this.player_head_health_bar.setPlayerHealthBar(game.data.player_current_health -= hit_points);
        this.player_head_health_bar.updateOnce = true;
        this.floating_player_current_sequence.updateGameLogText("player recieves " + hit_points + " damage Time [" + this.floating_game_log_time.retrievGameLogText().toString() + "]");
        window.setTimeout(() => { 
                                  this.floating_player_previous_sequence.updateGameLogText(this.floating_player_current_sequence.retrievGameLogText());
                                  this.floating_player_current_sequence.updateGameLogText("Player current sequence events");
                                }, 2000);
        this.player_plaque_health_bar.setPlayerHealthBar(game.data.player_current_health);
        this.player_plaque_health_bar.updateOnce = true;
        // hurt blood splatter
        this.bloodtrails = me.pool.pull("blood_trails", Math.floor(this.pos.x), Math.floor(this.pos.y));
        this.bloodPosition = me.game.viewport.worldToLocal(Math.floor(this.pos.x), Math.floor(this.pos.y));
        if ((this.player_current_states === "player_idle") || (this.player_current_states === "player_facing_left") || (this.player_current_states === "player_facing_right")) {
          this.bloodtrails.displayBloodTrails(Math.floor(this.bloodPosition.x), Math.floor(this.bloodPosition.y));
        }
        else if ((this.player_current_states === "player_crawl_left") || (this.player_current_states === "player_crawl_right")) {
          this.bloodtrails.displayBloodTrails(Math.floor(this.bloodPosition.x), Math.floor(this.bloodPosition.y - 22));
        }
      }
    },

    /**************************/
    /* update player stat bar */
    /**************************/
    updatePlayerStatBars: function () {
      /****************************/
      /* update player health bar */
      /****************************/
      this.player_head_health_bar.drawHealthBarPosition(Math.floor(this.pos.x), Math.floor(this.pos.y - 12));
      /**************************/
      /* update player mana bar */
      /**************************/
      this.player_head_mana_bar.drawManaBarPosition(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 7));
    },

    displayplayerimpactdustTrails: function () {
      // player dust trail when starting walk left animation from another state
      this.playerdusttrails = me.pool.pull("player_dust_trails", Math.floor(this.pos.x), Math.floor(this.pos.y));
      this.playerPosition = me.game.viewport.worldToLocal(Math.floor(this.pos.x), Math.floor(this.pos.y));
      this.playerdusttrails.displayDustTrails(Math.floor(this.playerPosition.x), Math.floor(this.playerPosition.y), this.player_current_states.toString());
    },

    change_animation: function (current_animation, next_animation) {
      if (!this.renderable.isCurrentAnimation(current_animation)) {
        if (next_animation) {
          next_animation = next_animation.bind(this);
        }
        this.renderable.setCurrentAnimation(current_animation, next_animation);
      }
    },
  });