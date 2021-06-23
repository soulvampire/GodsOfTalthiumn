game = game || {};

game.play_screen = me.Stage.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() 
    {	
        // load a level
        me.levelDirector.loadLevel("castle_world");    
        me.game.world.addChild(new game.player_plaque_display(), 100);
        me.game.world.addChild(new game.player_hud_mana_health_sprite(), 100);
        me.game.world.addChild(new game.main_game_interface_display(), 100);
        // display the current pointer coordinates on top of the pointer arrow
    },
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() 
    {
        // remove the HUD from the game world
        me.game.world.removeChild(this.player_info_bar);
    }
});
