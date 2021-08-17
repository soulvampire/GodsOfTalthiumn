game = game || {};

game.generic_button_interface = me.GUI_Object.extend ( {

  init: function (button_posX, button_posY, button_name, is_floating, is_persistent) {

		this._super(me.GUI_Object, "init", [button_posX, button_posY, {
			image: game.interface_sprites,
      region: button_name + "_normal"
		}]);

		this.button_name = button_name;

		this.button_normal_region = game.interface_sprites.getRegion(this.button_name + "_normal");
		this.button_hover_region = game.interface_sprites.getRegion(this.button_name + "_highlight ");
    this.button_clicked_region = game.interface_sprites.getRegion(this.button_name + "_pressed");

		
		this.anchorPoint.set(0.0, 0.0);

    this.setOpacity(1.0);

		this.isPersistent = is_persistent;

		this.floating = is_floating;
  },

		/**
     * function called when the pointer is over the object
     */
		onOver : function (/* event */) {
			this.setOpacity(0.5);
		},

	/**
	 * function called when the pointer is leaving the object area
	 */
		onOut : function (/* event */) {
			this.setOpacity(1.0);
		},

	/**
	 * function called when the object is clicked on
	 */
		onClick : function (/* event */) {
			// don't propagate the event
			return false;
		},

	/**
	 * function called when the pointer button is released
	 */
		onRelease : function (/* event */) {
			// don't propagate the event
			return false;
		},

		draw: function(renderer) {
			this._super(me.GUI_Object, "draw", [ renderer ]);
		}
});