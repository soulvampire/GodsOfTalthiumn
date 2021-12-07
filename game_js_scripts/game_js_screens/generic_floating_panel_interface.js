var game = game || {};

/***************************************/
/* class name : generic_floating_panel */
/***************************************/
game.generic_floating_panel_interface = me.Container.extend( {
    /******************************************/
    /*           panel constructor            */
    /******************************************/
    /* panel_posX = X cordinate               */
    /* panel_posY = Y cordinate               */
    /* panel_width = width of panel(px)       */
    /* panel_height = height of panel(px)     */
    /* panel_image_name = resource name image */
    /* is_panel_floating = true or flase      */
    /* is_panel_persistent = true or false    */
    /******************************************/
		init: function (panel_name, panel_posX, panel_posY, panel_width, panel_height, panel_image_name, is_panel_floating, is_panel_persistent, is_panel_moveable) {

        // call the constructor
        this._super(me.Container, "init", [panel_posX, panel_posY, panel_width, panel_height]);
        
        this.anchorPoint.set(0.0, 0.0);

        // give a name
        this.panel_sprite_name = panel_image_name;

        // persistent across level change
        this.isPersistent = is_panel_persistent;

				this.isMoveable = is_panel_moveable;

        this.isKinematic = false;
				
        // use screen coordinates
        this.floating = is_panel_floating;
        
        if (panel_name == null)
          this.name = "floating_generic_panel";
        else
          this.name = panel_name;
      
        /********************/
        /* panel background */
        /********************/
        this.floating_panel_sprite = game.interface_sprites.createSpriteFromName(this.panel_sprite_name + "_normal");

        this.floating_panel_sprite.anchorPoint.set(0.0, 0.0);

				this.addChild(this.floating_panel_sprite);

        // input status flags
        this.selected = false;
        this.hover = false;
        // to memorize where we grab the shape
        this.grabOffset = new me.Vector2d(0.0,0.0);
    },

    onActivateEvent: function () {
        // register on the global pointermove event
        this.handler = me.event.subscribe(me.event.POINTERMOVE, this.pointerMove.bind(this));
        //register on mouse/touch event
        me.input.registerPointerEvent("pointerdown", this, this.onSelect.bind(this));
        me.input.registerPointerEvent("pointerup", this, this.onRelease.bind(this));
        me.input.registerPointerEvent("pointercancel", this, this.onRelease.bind(this));

        // call the parent function
        this._super(me.Container, "onActivateEvent");
    },

    onDeactivateEvent: function () {
        // unregister on the global pointermove event
        me.event.unsubscribe(this.handler);
        // release pointer events
        me.input.releasePointerEvent("pointerdown", this);
        me.input.releasePointerEvent("pointerup", this);
        me.input.releasePointerEvent("pointercancel", this);

        // call the parent function
        this._super(me.Container, "onDeactivateEvent");
    },

    /**
     * pointermove function
     */
    pointerMove: function (event) {
      this.hover = this.getBounds().containsPoint(event.gameX, event.gameY);
      console.log("panel name " + this.name.toString())
				if(this.isMoveable)
        {
          if (this.selected) 
					{
            // follow the pointer
              this.pos.set(event.gameX, event.gameY, this.pos.z);
              this.pos.sub(this.grabOffset);
              this.updateChildBounds();
          }
          // mark the container for redraw
          this.isDirty = true;
        }
    },

    // mouse down function
    onSelect : function (event) {
        if (this.hover === true) {
          this.grabOffset.set(event.gameX, event.gameY);
          this.grabOffset.sub(this.pos);
          this.selected = true;
          // don"t propagate the event furthermore
          return false;
        }
    },

    floatingGenericPanelPositionX: function () {
      return this.pos.x;
    },

    floatingGenericPanelPositionY: function () {
      return this.pos.y;
    },

    // mouse up function
    onRelease : function (/*event*/) {
        this.selected = false;
    },

    // update function
    update : function(dt) {
      return this._super(me.Container, "update", [ dt ]) || this.hover;
    }
});