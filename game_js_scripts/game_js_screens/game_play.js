game = game || {};

game.play_screen = me.Stage.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() 
    {	
        // load a level
        me.levelDirector.loadLevel("castle_level");    
        me.game.world.addChild(new game.player_plaque_display(), 100);
        me.game.world.addChild(new game.player_hud_mana_health_sprite(), 100);
        me.game.world.addChild(new game.main_game_interface_display(), 100);

        this.floating_map_window = new game.floating_map_panel();

        this.floating_map_window.addChild(new game.floating_map_attach_button(),100);
        this.floating_map_window.addChild(new game.floating_map_minimize_button(), 100);
        this.floating_map_window.addChild(new game.floating_map_node_points_button(), 100);
        
        me.game.world.addChild(this.floating_map_window,101);
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
