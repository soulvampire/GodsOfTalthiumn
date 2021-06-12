/**
 * a player info bar didplay renderable and child items
 */

game.player_info_bar_display = game.player_info_bar_display || {};

game.player_info_bar_display = me.Renderable.extend({

    init: function( ) {
        this._super(me.Renderable, "init",
        [
            0,0,0,0
        ]);
        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // make sure our object is always draw first
        this.z = 100;

        this.player_bar = new me.Sprite(10,10, {
            image : "player_info_bar",
            framewidth: 138,
            frameheight: 38,
            anchorPoint: new me.Vector2d(0.5,0.5)
        });

        this.player_bar.floating = true;
    },

    draw: function(renderer) {
        this.player_bar.draw(renderer);
    },

    update: function (dt)
    {
        return;
    }
});