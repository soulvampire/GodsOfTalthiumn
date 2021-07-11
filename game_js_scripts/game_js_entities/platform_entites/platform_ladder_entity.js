/************************/
/* player ladder entity */
/************************/
game.platform_ladder_entity = me.Entity.extend(
{
  /***************/
  /* constructor */
  /***************/ 
  init : function (x, y, settings) 
  {
    /**********************************************************/
    /* x = ladder_left_position                               */
    /* y = ladder_top_position                                */
    /*                      |----|                            */
    /*                      |----|                            */
    /*                      |----|                            */
    /*                      |----|                            */
    /*                      |----| x = ladder_right_position  */
    /*                             y = ladder_bottom_position */
    /**********************************************************/
    this.ladder_top_position  = settings.y;
    this.ladder_left_position  = settings.x;
    this.ladder_right_position  = settings.x + settings.width;
    this.ladder_bottom_position = settings.y + settings.height;
    
    this._super(me.Entity, 'init', [x, y, settings]);
    this.body.collisionType = me.collision.types.WORLD_SHAPE;
    // enable physic collision (off by default for basic me.Renderable)
    this.isKinematic = false;

    // ensure the ladder is not updated even when outside of the viewport
    this.alwaysUpdate = false;
  },
      
  update : function (dt) 
  {
    return false;
  }
});