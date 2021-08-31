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

      var screen_width = me.game.viewport.width / 2;
      var screen_height = me.game.viewport.height;

      /****************************/
    	/* main rpg interface panel */
    	/****************************/
      this.floating_main_interface = new game.floating_generic_panel(screen_width - 308, screen_height - 125, 617, 119, "main_interface", this.is_floating, this.is_persistent, this.non_moveable );

      /***********************************/
    	/* spell object display left panel */
    	/***********************************/
        this.floating_main_interface.addChild(new game.generic_button_interface(93, 42, "spell_object_button", this.non_floating, this.is_persistent));
        this.floating_main_interface.addChild(new game.generic_button_interface(130, 42, "spell_object_button", this.non_floating, this.is_persistent));
        this.floating_main_interface.addChild(new game.generic_button_interface(167, 42, "spell_object_button", this.non_floating, this.is_persistent));
        this.floating_main_interface.addChild(new game.generic_button_interface(204, 42, "spell_object_button", this.non_floating, this.is_persistent));

      /************************************/
    	/* spell object display right panel */
    	/************************************/
      this.floating_main_interface.addChild(new game.generic_button_interface(378, 42, "spell_object_button", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_button_interface(415, 42, "spell_object_button", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_button_interface(452, 42, "spell_object_button", this.non_floating, this.is_persistent));
      this.floating_main_interface.addChild(new game.generic_button_interface(489, 42, "spell_object_button", this.non_floating, this.is_persistent));

      /********************************/
    	/* spell expand icon left panel */
    	/********************************/
        this.floating_main_interface.addChild(new game.generic_button_interface(93, 32, "spell_object_expand", this.non_floating, this.is_persistent));
        this.floating_main_interface.addChild(new game.generic_button_interface(130, 32, "spell_object_expand", this.non_floating, this.is_persistent));
        this.floating_main_interface.addChild(new game.generic_button_interface(167, 32, "spell_object_expand", this.non_floating, this.is_persistent));
        this.floating_main_interface.addChild(new game.generic_button_interface(204, 32, "spell_object_expand", this.non_floating, this.is_persistent));


      /************************************/
    	/* spell infomation icon left panel */
    	/************************************/
        this.floating_main_interface.addChild(new game.generic_button_interface(116, 70, "spell_object_information", this.non_floating, this.is_persistent));
        this.floating_main_interface.addChild(new game.generic_button_interface(155, 70, "spell_object_information", this.non_floating, this.is_persistent));
        this.floating_main_interface.addChild(new game.generic_button_interface(190, 70, "spell_object_information", this.non_floating, this.is_persistent));
        this.floating_main_interface.addChild(new game.generic_button_interface(227, 70, "spell_object_information", this.non_floating, this.is_persistent));

      me.game.world.addChild(this.floating_main_interface, 99)
   },
 
   draw: function (renderer) {
     return;
   },
 
   update: function (dt) {
     return;
   }
 });