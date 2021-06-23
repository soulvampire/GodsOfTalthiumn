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
 
     // make sure our object is always draw first
     this.z = 100;   
 
     this.main_game_interface_sprite = new me.Sprite(290, 415, {
       image: "main_game_interface",
       framewidth: 618,
       frameheight: 181,
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