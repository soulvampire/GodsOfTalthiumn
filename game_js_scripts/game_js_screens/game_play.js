game = game || {};

game.play_screen = me.Stage.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() 
    {	

			this.is_floating = true;
			this.non_floating = false;
      this.is_persistent = true;
			this.non_persistent = false;
      this.is_moveable = true;
			this.is_non_moveable = false;
			this.highlight_required = true;
			this.non_highlight_required = false;

			this.screen_width = me.game.viewport.width;
			this.screen_height = me.game.viewport.height;

      /*********************/
      /* load castle level */
      /*********************/
        me.levelDirector.loadLevel("castle_level"); 

			/****************************/
    	/* static main game display */
    	/****************************/
				
				/****************************/
    		/* main rpg interface image */
    		/****************************/
				this.main_game_panel = new game.main_game_interface_display();
				/******************************/
    		/* display rpg main interface */
    		/******************************/
					me.game.world.addChild(this.main_game_panel, 99);
				/*******/
    		/* end */
    		/*******/

    		/************************/
    		/* player image plaque  */
    		/************************/
        	this.player_plaque_panel = new game.floating_generic_panel(10, 10, 35, 33, "player_plaque", this.is_floating, this.is_persistent, this.non_moveable);

					/*****************************/
    			/* player plaque information */
    			/*****************************/
					me.game.world.addChild(this.player_plaque_panel, 100);
				/*******/
    		/* end */
    		/*******/

				/******************************************/
    		/* health + mana bars on player character */
    		/******************************************/
        	this.player_mana_health_panel = new game.floating_generic_panel(45, 10, 101, 38, "player_mana_health_bar", this.is_floating, this.is_persistent, this.non_moveable);

					/******************************************/
    			/* displaying player mana and health bars */
    			/******************************************/
					me.game.world.addChild(this.player_mana_health_panel, 100);
				/*******/
    		/* end */
    		/*******/
				/***************************/
    		/* end static game display */
    		/***************************/
		
				

			/**************************************/
    	/* floating message panel information */
    	/**************************************/
				//this.floating_message_panel = new game.floating_generic_panel(this.screen_width - 176, this.screen_height - 107, 171, 123, "message_dialog_box_max", this.is_floating, this.is_persistent, this.is_moveable);
				//me.game.world.addChild(this.floating_message_panel, 100);
			/*******/
    	/* end */
    	/*******/

			/**********************************/
    	/* floating map panel information */
    	/**********************************/
				this.floating_map_panel = new game.floating_generic_panel(this.screen_width - 110, 5, 105, 126, "map_interface", this.is_floating, this.is_persistent, this.is_moveable);

			/**********************/
    	/* floating map icons */
    	/*********************/
				this.floating_map_panel.addChild(new game.generic_button_interface(3, 3, "map_attach", this.non_floating, this.is_persistent));
				this.floating_map_panel.addChild(new game.generic_button_interface(84, 3, "map_minimize", this.non_floating, this.is_persistent));
				this.floating_map_panel.addChild(new game.generic_button_interface(3, 105, "map_node_points", this.non_floating, this.is_persistent));

				/******************************/
    		/* display floating map panel */
    		/******************************/
				me.game.world.addChild(this.floating_map_panel,99);
			/*******/
    	/* end */
    	/*******/
    },

		onActivateEvent: function () {
			me.event.subscribe(me.event.WINDOW_ONRESIZE, function () {
			this.videoPos = me.video.getPos();
			console.log("resize");
			});
		},
    
    /**************************************************************/
    /*  action to perform when leaving this screen (state change) */
    /**************************************************************/
    onDestroyEvent: function() 
    {
			me.game.world.removeChild(this.main_game_panel);
			me.game.world.removeChild(this.player_plaque_panel);
			me.game.world.removeChild(this.player_hud_panel);
			me.game.world.removeChild(this.floating_map_panel);
      return;
    }
});
