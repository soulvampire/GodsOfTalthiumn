 var game = game || {};

 game.main_game_interface_display = me.Renderable.extend( {
 
   init: function () {
    /******************************************/
    /*    main game interface init function   */
    /******************************************/
    /* no values passed                       */
    /******************************************/
      this._super(me.Renderable, "init", [0, 0, me.game.viewport.width, me.game.viewport.height]);

      this.is_floating = true;
			this.non_floating = false;
      this.is_persistent = true;
			this.non_persistent = false;
      this.is_moveable = true;
			this.non_moveable = false;

      this.defined_screen_width = me.game.viewport.width;
			this.defined_screen_height = me.game.viewport.height;

      /****************************/
    	/* main rpg interface panel */
    	/****************************/
      this.floating_main_interface = new game.generic_floating_panel_interface("main interface panel", this.defined_screen_width/2 - 309, this.defined_screen_height - 115, 618, 109, "main_interface", this.is_floating, this.is_persistent, this.non_moveable);
      me.game.world.addChild(this.floating_main_interface, 98);
      me.game.world.addChild(new game.generic_floating_textbox(this.defined_screen_width/2 - 61, this.defined_screen_height - 64, 1, 11, "Character", 10), 100);
      me.game.world.addChild(new game.generic_floating_textbox(this.defined_screen_width/2 - 22, this.defined_screen_height - 64, 1, 8, "Armour", 10), 100);
      me.game.world.addChild(new game.generic_floating_textbox(this.defined_screen_width/2 + 7, this.defined_screen_height - 64, 1, 9, "Spells", 10), 100);
      me.game.world.addChild(new game.generic_floating_textbox(this.defined_screen_width/2 + 34, this.defined_screen_height - 64, 1, 8, "Potions", 10), 100);

      /************************/
    	/* player image plaque  */
    	/************************/
      me.game.world.addChild(new game.generic_floating_button_interface("player_plaque", this.defined_screen_width/2 - 26, this.defined_screen_height - 130, "player_plaque_button", this.is_floating, this.is_persistent),99)
      
      me.game.world.addChild(new game.generic_floating_button_interface("player_plaque_right_information_button", this.defined_screen_width/2 + 25, this.defined_screen_height - 130, "information_button", this.is_floating, this.is_persistent),100);
      me.game.world.addChild(new game.generic_floating_button_interface("player_plaque_right_expand_button", this.defined_screen_width/2 + 25, this.defined_screen_height - 101, "action_right_button", this.is_floating, this.is_persistent),100);
      
      me.game.world.addChild(new game.generic_floating_button_interface("player_plaque_left_information_button", this.defined_screen_width/2 - 33, this.defined_screen_height - 130, "information_button", this.is_floating, this.is_persistent),100);
      me.game.world.addChild(new game.generic_floating_button_interface("player_plaque_left_expand_button", this.defined_screen_width/2 - 38, this.defined_screen_height - 101, "action_left_button", this.is_floating, this.is_persistent),100);
      
      /****************************/
    	/* player interaction icons */
    	/****************************/
      me.game.world.addChild(new game.generic_floating_button_interface("player_character", this.defined_screen_width/2 - 52, this.defined_screen_height - 80, "player_character_button", this.is_floating, this.is_persistent),99);
      me.game.world.addChild(new game.generic_floating_button_interface("player_armour", this.defined_screen_width/2 - 19, this.defined_screen_height - 80, "player_armour_button", this.is_floating, this.is_persistent),99);
      me.game.world.addChild(new game.generic_floating_button_interface("player_spells", this.defined_screen_width/2 + 11, this.defined_screen_height - 80, "player_spells_button", this.is_floating, this.is_persistent),99);
      me.game.world.addChild(new game.generic_floating_button_interface("player_potions", this.defined_screen_width/2 + 40, this.defined_screen_height - 80, "player_potions_button", this.is_floating, this.is_persistent),99);
      

      

      /***********************************/
    	/* spell object display left panel */
    	/***********************************/
        me.game.world.addChild(new game.generic_floating_button_interface("action_spell_position_one", this.defined_screen_width/2 - 216, this.defined_screen_height - 85, "spell_object_button", this.is_floating, this.is_persistent), 99);
        me.game.world.addChild(new game.generic_floating_button_interface("action_spell_position_two", this.defined_screen_width/2 - 179, this.defined_screen_height - 85, "spell_object_button", this.is_floating, this.is_persistent), 99);
        me.game.world.addChild(new game.generic_floating_button_interface("action_spell_position_three", this.defined_screen_width/2 - 142, this.defined_screen_height - 85, "spell_object_button", this.is_floating, this.is_persistent), 99);
        me.game.world.addChild(new game.generic_floating_button_interface("action_spell_position_four", this.defined_screen_width/2 - 105, this.defined_screen_height - 85, "spell_object_button", this.is_floating, this.is_persistent), 99);

      /********************************/
    	/* spell expand icon left panel */
    	/********************************/
      me.game.world.addChild(new game.generic_floating_button_interface("spell_object_expand_one", this.defined_screen_width/2 - 216, this.defined_screen_height - 98, "spell_object_expand", this.is_floating, this.is_persistent), 100);
      me.game.world.addChild(new game.generic_floating_button_interface("spell_object_expand_two", this.defined_screen_width/2 - 179, this.defined_screen_height - 98, "spell_object_expand", this.is_floating, this.is_persistent), 100);
      me.game.world.addChild(new game.generic_floating_button_interface("spell_object_expand_three", this.defined_screen_width/2 - 142, this.defined_screen_height - 98, "spell_object_expand", this.is_floating, this.is_persistent), 100);
      me.game.world.addChild(new game.generic_floating_button_interface("spell_object_expand_four", this.defined_screen_width/2 - 105, this.defined_screen_height - 98, "spell_object_expand", this.is_floating, this.is_persistent), 100);


      /************************************/
      /* spell infomation icon left panel */
      /************************************/
      me.game.world.addChild(new game.generic_floating_button_interface("spell_object_information_one", this.defined_screen_width/2 - 197, this.defined_screen_height - 56, "spell_object_information", this.is_floating, this.is_persistent), 100);
      me.game.world.addChild(new game.generic_floating_button_interface("spell_object_information_two", this.defined_screen_width/2 - 160, this.defined_screen_height - 56, "spell_object_information", this.is_floating, this.is_persistent), 100);
      me.game.world.addChild(new game.generic_floating_button_interface("spell_object_information_three", this.defined_screen_width/2 - 123, this.defined_screen_height - 56, "spell_object_information", this.is_floating, this.is_persistent), 100);
      me.game.world.addChild(new game.generic_floating_button_interface("spell_object_information_four", this.defined_screen_width/2 - 86, this.defined_screen_height - 56, "spell_object_information", this.is_floating, this.is_persistent), 100);

      /************************************/
    	/* spell object display right panel */
    	/************************************/
      me.game.world.addChild(new game.generic_floating_button_interface("action_spell_position_five", this.defined_screen_width/2 + 70, this.defined_screen_height - 85, "spell_object_button", this.is_floating, this.is_persistent), 99);
      me.game.world.addChild(new game.generic_floating_button_interface("action_spell_position_six", this.defined_screen_width/2 + 107, this.defined_screen_height - 85, "spell_object_button", this.is_floating, this.is_persistent), 99);
      me.game.world.addChild(new game.generic_floating_button_interface("action_spell_position_seven", this.defined_screen_width/2 + 144, this.defined_screen_height - 85, "spell_object_button", this.is_floating, this.is_persistent), 99);
      me.game.world.addChild(new game.generic_floating_button_interface("action_spell_position_eight", this.defined_screen_width/2 + 181, this.defined_screen_height - 85, "spell_object_button", this.is_floating, this.is_persistent), 99);

      /********************************/
    	/* spell expand icon right panel */
    	/********************************/
      me.game.world.addChild(new game.generic_floating_button_interface("spell_object_expand_five", this.defined_screen_width/2 + 70, this.defined_screen_height - 98, "spell_object_expand", this.is_floating, this.is_persistent), 100);
      me.game.world.addChild(new game.generic_floating_button_interface("spell_object_expand_six", this.defined_screen_width/2 + 107, this.defined_screen_height - 98, "spell_object_expand", this.is_floating, this.is_persistent), 100);
      me.game.world.addChild(new game.generic_floating_button_interface("spell_object_expand_seven", this.defined_screen_width/2 + 144, this.defined_screen_height - 98, "spell_object_expand", this.is_floating, this.is_persistent), 100);
      me.game.world.addChild(new game.generic_floating_button_interface("spell_object_expand_eight", this.defined_screen_width/2 + 181, this.defined_screen_height - 98, "spell_object_expand", this.is_floating, this.is_persistent), 100);


      /************************************/
      /* spell infomation icon right panel */
      /************************************/
      me.game.world.addChild(new game.generic_floating_button_interface("spell_object_information_five", this.defined_screen_width/2 + 89, this.defined_screen_height - 56, "spell_object_information", this.is_floating, this.is_persistent), 100);
      me.game.world.addChild(new game.generic_floating_button_interface("spell_object_information_six", this.defined_screen_width/2 + 126, this.defined_screen_height - 56, "spell_object_information", this.is_floating, this.is_persistent), 100);
      me.game.world.addChild(new game.generic_floating_button_interface("spell_object_information_seven", this.defined_screen_width/2 + 163, this.defined_screen_height - 56, "spell_object_information", this.is_floating, this.is_persistent), 100);
      me.game.world.addChild(new game.generic_floating_button_interface("spell_object_information_eight", this.defined_screen_width/2 + 200, this.defined_screen_height - 56, "spell_object_information", this.is_floating, this.is_persistent), 100);
   },
 
   draw: function (renderer) {
     return;
   },
 
   update: function (dt) {
     return;
   }
 });