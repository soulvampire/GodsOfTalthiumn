 var game = game || {};

 game.main_game_interface_display = me.Renderable.extend({
 
   init: function () {
      this._super(me.Renderable, "init", [0,0,100,100]);

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
      this.floating_main_interface = new game.generic_floating_panel_interface("main interface panel", this.defined_screen_width/2 - 309, this.defined_screen_height - 115, 617, 109, "main_interface", this.is_floating, this.is_persistent, this.non_moveable );

      this.floating_player_current_sequence = new game.generic_floating_textbox(this.floating_main_interface.floatingGenericPanelPositionX() + 249, this.floating_main_interface.floatingGenericPanelPositionY() + 52, 1, 11, "Character", 10);
      this.floating_player_current_sequence = new game.generic_floating_textbox(this.floating_main_interface.floatingGenericPanelPositionX() + 288, this.floating_main_interface.floatingGenericPanelPositionY() + 52, 1, 8, "Armour", 10);
      this.floating_player_current_sequence = new game.generic_floating_textbox(this.floating_main_interface.floatingGenericPanelPositionX() + 315, this.floating_main_interface.floatingGenericPanelPositionY() + 52, 1, 9, "Potions", 10);
      this.floating_player_current_sequence = new game.generic_floating_textbox(this.floating_main_interface.floatingGenericPanelPositionX() + 345, this.floating_main_interface.floatingGenericPanelPositionY() + 52, 1, 8, "Spells", 10);
      
      /***********************************/
    	/* spell object display left panel */
    	/***********************************/
        this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 93, 30, "spell_object_button", this.non_floating, this.is_persistent));
        this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 130, 30, "spell_object_button", this.non_floating, this.is_persistent));
        this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 167, 30, "spell_object_button", this.non_floating, this.is_persistent));
        this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 204, 30, "spell_object_button", this.non_floating, this.is_persistent));

      /********************************/
    	/* spell expand icon left panel */
    	/********************************/
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 93, 18, "spell_object_expand", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 130, 18, "spell_object_expand", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 167, 18, "spell_object_expand", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 204, 18, "spell_object_expand", this.non_floating, this.is_persistent));


      /************************************/
      /* spell infomation icon left panel */
      /************************************/
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 112, 59, "spell_object_information", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 151, 59, "spell_object_information", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 186, 59, "spell_object_information", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 223, 59, "spell_object_information", this.non_floating, this.is_persistent));

      /************************************/
    	/* spell object display right panel */
    	/************************************/
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 378, 30, "spell_object_button", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 415, 30, "spell_object_button", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 452, 30, "spell_object_button", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 489, 30, "spell_object_button", this.non_floating, this.is_persistent));

      /********************************/
    	/* spell expand icon left panel */
    	/********************************/
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 378, 18, "spell_object_expand", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 415, 18, "spell_object_expand", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 452, 18, "spell_object_expand", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 489, 18, "spell_object_expand", this.non_floating, this.is_persistent));


      /************************************/
      /* spell infomation icon left panel */
      /************************************/
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 397, 59, "spell_object_information", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 434, 59, "spell_object_information", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 471, 59, "spell_object_information", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_floating_button_interface(null, 508, 59, "spell_object_information", this.non_floating, this.is_persistent));


      me.game.world.addChild(this.floating_main_interface, 99)
   },
 
   draw: function (renderer) {
     return;
   },
 
   update: function (dt) {
     return;
   }
 });