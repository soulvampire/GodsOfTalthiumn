game = game || {};

game.floating_map_minimize_button = me.GUI_Object.extend ( {

  init: function () {

		this._super(me.GUI_Object, "init", [84, 3, {
			image: "map_minimize_button_normal",
      framewidth: 18,
      frameheight: 18,
      anchorPoint: new me.Vector2d(0.0, 0.0)
		}]);
	
    this.setOpacity(1.0);
		this.floating = false;
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
			this.setOpacity(0.5);
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