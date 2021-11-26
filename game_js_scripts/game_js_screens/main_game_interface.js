 game = game || {};

 game.main_game_interface_display = me.Renderable.extend({
 
   init: function () {
      this._super(me.Renderable, "init", [0,0,0,0]);

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
      this.floating_main_interface = new game.generic_floating_panel(this.defined_screen_width/2 - 309, this.defined_screen_height - 115, 617, 119, "main_interface", this.is_floating, this.is_persistent, this.non_moveable );

      this.floating_player_current_sequence = new game.generic_floating_textbox(this.floating_main_interface.floatingGenericPanelPositionX() + 249, this.floating_main_interface.floatingGenericPanelPositionY() + 52, 1, 11, "Character", 10);
      this.floating_player_current_sequence = new game.generic_floating_textbox(this.floating_main_interface.floatingGenericPanelPositionX() + 288, this.floating_main_interface.floatingGenericPanelPositionY() + 52, 1, 8, "Armour", 10);
      this.floating_player_current_sequence = new game.generic_floating_textbox(this.floating_main_interface.floatingGenericPanelPositionX() + 315, this.floating_main_interface.floatingGenericPanelPositionY() + 52, 1, 9, "Potions", 10);
      this.floating_player_current_sequence = new game.generic_floating_textbox(this.floating_main_interface.floatingGenericPanelPositionX() + 345, this.floating_main_interface.floatingGenericPanelPositionY() + 52, 1, 8, "Spells", 10);
      
      /***********************************/
    	/* spell object display left panel */
    	/***********************************/
        this.floating_main_interface.addChild(new game.generic_button_interface(93, 32, "spell_object_button", this.non_floating, this.is_persistent));
        this.floating_main_interface.addChild(new game.generic_button_interface(130, 32, "spell_object_button", this.non_floating, this.is_persistent));
        this.floating_main_interface.addChild(new game.generic_button_interface(167, 32, "spell_object_button", this.non_floating, this.is_persistent));
        this.floating_main_interface.addChild(new game.generic_button_interface(204, 32, "spell_object_button", this.non_floating, this.is_persistent));

      /********************************/
    	/* spell expand icon left panel */
    	/********************************/
      this.floating_main_interface.addChild(new game.generic_button_interface(93, 22, "spell_object_expand", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_button_interface(130, 22, "spell_object_expand", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_button_interface(167, 22, "spell_object_expand", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_button_interface(204, 22, "spell_object_expand", this.non_floating, this.is_persistent));


      /************************************/
      /* spell infomation icon left panel */
      /************************************/
      this.floating_main_interface.addChild(new game.generic_button_interface(116, 60, "spell_object_information", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_button_interface(155, 60, "spell_object_information", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_button_interface(190, 60, "spell_object_information", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_button_interface(227, 60, "spell_object_information", this.non_floating, this.is_persistent));

      /************************************/
    	/* spell object display right panel */
    	/************************************/
      this.floating_main_interface.addChild(new game.generic_button_interface(378, 32, "spell_object_button", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_button_interface(415, 32, "spell_object_button", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_button_interface(452, 32, "spell_object_button", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_button_interface(489, 32, "spell_object_button", this.non_floating, this.is_persistent));

      

      me.game.world.addChild(this.floating_main_interface, 99)
   },
 
   draw: function (renderer) {
     return;
   },
 
   update: function (dt) {
     return;
   }
 });