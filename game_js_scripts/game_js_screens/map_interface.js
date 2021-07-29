game = game || {};

game.map_interface_display = me.Renderable.extend({

  init: function () {
    this._super(me.Renderable, "init",
      [
        0, 0, 0, 0
      ]);
    // persistent across level change
    this.isPersistent = true;

    // make sure we use screen coordinates
    this.floating = true;

    // make sure our object is always draw first
    this.z = 100;  
    
    var screen_width = me.game.viewport.width;
    var screen_height = me.game.viewport.height;

    this.map_interface_sprite = new me.Sprite(screen_width - 113, 10, {
      image: "map_interface",
      framewidth: 105,
      frameheight: 103,
      anchorPoint: new me.Vector2d(0.5, 0.5)
    });
    
    this.map_interface_sprite.floating = true;
  },

  draw: function (renderer) {
    this.map_interface_sprite.draw(renderer);
  },

  update: function (dt) {
    return;
  }
});