game.PlayScreen = me.Stage.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() 
    {	
        // load a level
        me.levelDirector.loadLevel("castle_world");

        // reset the score
        game.data.score = 0;
        
        // add our player info bar to the game world
        me.game.world.addChild(new game.player_info_bar_display(), 100);
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
