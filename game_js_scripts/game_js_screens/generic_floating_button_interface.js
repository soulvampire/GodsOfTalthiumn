var game = game || {};

/*****************************************/
/* class name : generic_button_interface */
/*****************************************/
game.generic_floating_button_interface = me.GUI_Object.extend ( {
	/*******************************************/
	/*          gui button constructor         */
	/*******************************************/
	/* button_posX = X cordinate               */
	/* button_posY = Y cordinate               */
	/* button_image_name = resource name image */
	/* is_button_floating = true or flase      */
	/* is_button_persistent = true or false    */
	/*******************************************/
  init: function (button_name, button_posX, button_posY, button_image_name, is_button_floating, is_button_persistent) {

		this._super(me.GUI_Object, "init", [button_posX, button_posY, {
			image: game.interface_sprites,
      region: button_image_name + "_normal"
		}]);

		this.button_normal_region = game.interface_sprites.getRegion(button_image_name + "_normal");
		this.button_hover_region = game.interface_sprites.getRegion(button_image_name + "_highlight");
    this.button_clicked_region = game.interface_sprites.getRegion(button_image_name + "_pressed");
		
		this.anchorPoint.set(0.0, 0.0);

    this.setOpacity(1.0);

		this.isPersistent = is_button_persistent;

		this.isKinematic = false;
		this.inViewport = true;

		this.floating = is_button_floating;

		if (button_name == null)
			this.name = "floating_generic_button";
    else
      this.name = button_name;
  },

		/**
     * function called when the pointer is over the object
     */
		onOver : function (event) {
			this.setRegion(this.button_hover_region);
		},

	/**
	 * function called when the pointer is leaving the object area
	 */
		onOut : function (/* event */) {
			this.setRegion(this.button_normal_region);
		},

	/**
	 * function called when the object is clicked on
	 */
		onClick : function (/*event*/) {
			this.setRegion(this.button_clicked_region);
			// don't propagate the event
			return false;
		},

	/**
	 * function called when the pointer button is released
	 */
		onRelease : function (/* event */) {
			this.setRegion(this.button_hover_region);
			// don't propagate the event
			return false;
		},

		draw: function(renderer) {
			this._super(me.GUI_Object, "draw", [ renderer ]);
		},

		update: function(dt){
			this._super(me.GUI_Object, 'update', [dt]);
		},
});