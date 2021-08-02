 game = game || {};

 game.main_game_interface_display = me.Renderable.extend({
 
  
   init: function () {
     this._super(me.Renderable, "init",
       [
         0, 0, 0, 0
       ]);
     // persistent across level change
     this.isPersistent = true;
 
     // make sure we use screen coordinates
     this.floating = true;
     
     var screen_width = me.game.viewport.width / 2;
     var screen_height = me.game.viewport.height;
 
     this.main_game_interface_sprite = new me.Sprite(screen_width - 309, screen_height - 119, {
       image: "main_game_interface",
       framewidth: 617,
       frameheight: 109,
       anchorPoint: new me.Vector2d(0.5, 0.5)
     });
     
     this.main_game_interface_sprite.floating = true;
   },
 
   draw: function (renderer) {
     this.main_game_interface_sprite.draw(renderer);
   },
 
   update: function (dt) {
     return;
   }
 });