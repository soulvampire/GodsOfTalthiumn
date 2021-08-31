game = game || {};

game.floating_generic_panel = me.Container.extend( 
  {
		init: function (panel_posX, panel_posY, panel_width, panel_height, panel_image_name, is_floating, is_persistent, is_moveable) {

        // call the constructor
        this._super(me.Container, "init", [panel_posX, panel_posY, panel_width, panel_height]);
        
        this.anchorPoint.set(0.0, 0.0);

        // persistent across level change
        this.isPersistent = is_persistent;

				this.isMoveable = is_moveable;
				
        // use screen coordinates
        this.floating = is_floating;

        this.name = "floating_UI_Panel";
      
        // give a name
        this.panel_sprite_name = panel_image_name;

        /********************/
        /* panel background */
        /********************/
        this.floating_panel_sprite = game.interface_sprites.createSpriteFromName(this.panel_sprite_name + "_normal");
        this.width = this.floating_panel_sprite.width;
        this.height = this.floating_panel_sprite.height;
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
        me.input.releasePointerEvent("pointerover", this);

        // call the parent function
        this._super(me.Container, "onDeactivateEvent");
    },

    /**
     * pointermove function
     */
    pointerMove: function (event) {
      this.hover = this.getBounds().containsPoint(event.gameX, event.gameY);
				if(this.isMoveable)
        {
          if (this.selected) 
					{
            // follow the pointer
              this.pos.set(event.gameX, event.gameY, this.pos.z);
              this.pos.sub(this.grabOffset);
              this.updateChildBounds();
          }
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

    // mouse up function
    onRelease : function (/*event*/) {
        this.selected = false;
    },

    // update function
    update : function(dt) {
        this._super(me.Container, "update", [ dt ]);
        return true;
    },

    draw: function(renderer) {
        this._super(me.Container, "draw", [ renderer ]);
    }
});