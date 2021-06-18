game.play_screen = me.Stage.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() 
    {	
        // load a level
        me.levelDirector.loadLevel("castle_world");
        this.player_health_bar = new game.generic_health_bar_entity(game.data.player_current_health, game.data.player_max_health, 48, 14, 95,8);
        this.player_health_bar.isPersistent = true;
        this.player_health_bar.floating = true;

        this.player_mana_bar = new game.generic_mana_bar_entity(game.data.player_current_mana, game.data.player_max_mana, 48, 22, 95, 8);
        this.player_mana_bar.isPersistent = true;
        this.player_mana_bar.floating = true;
        
        me.game.world.addChild(new game.player_plaque_display(), 100);
        me.game.world.addChild(new game.player_hud_mana_health_sprite(), 100);

        me.game.world.addChild(this.player_health_bar, 100);
        me.game.world.addChild( this.player_mana_bar , 100);

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
