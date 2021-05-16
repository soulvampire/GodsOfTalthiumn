/**********************/
/* enemy game manager */
/**********************/
game.enemy_spawn_manager = me.Object.extend(
{
    init: function(x, y, settings)
    {
        this.now = new Date().getTime();
        this.lastenemytime = new Date().getTime();
        this.alwaysUpdate = true;
    },
});