game = game || {};

game.floating_map_panel = me.Container.extend ( {

    init: function () {

        var screen_width = me.game.viewport.width;

        // call the constructor
        this._super(me.Container, "init", [screen_width - 115, 10, 105, 125]);
        this.anchorPoint.set(0.0, 0.0);

        // persistent across level change
        this.isPersistent = true;

        // use screen coordinates
        this.floating = true;

        // give a name
        this.name = "Map_Floating_Panel";

        /********************/
        /* panel background */
        /********************/
        this.floating_map_Sprite = new me.Sprite(0, 0, {
            image: "map_interface",
            framewidth: 105,
            frameheight: 125,
            anchorPoint: new me.Vector2d(0.0, 0.0)
          });

        this.addChild(this.floating_map_Sprite);

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

        if (this.selected) {
            // follow the pointer
            this.pos.set(event.gameX, event.gameY, this.pos.z);
            this.pos.sub(this.grabOffset);
            this.updateChildBounds();
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