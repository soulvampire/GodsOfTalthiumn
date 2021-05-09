/************************************/
/* stationary explosive trap entity */
/************************************/
game.explosive_trap_entity = me.Entity.extend(
  {
    /***************/
    /* constructor */
    /***************/
    init: function (x, y, settings) {
      /**************************************************************************/
      /* explosive_trap_animation_speed = how fast the animation plays for trap */
      /* explosive_trap_time_delay = delay on trap triggering                   */
      /* explosive_trap_hit_points = how much does it hurt the player           */
      /* explosive_trap_damage_distance = how far does the damage extend        */
      /* explosive_trap_damage_falloff = how tha damage fall off over distance  */
      /**************************************************************************/
      this.explosive_trap_animation_speed = settings.explosive_trap_animation_speed;
      this.explosive_trap_time_delay = settings.explosive_trap_time_delay;
      this.explosive_trap_hit_points = settings.explosive_trap_hit_points;
      this.explosive_trap_damage_distance = settings.explosive_trap_damage_max_distance;
      this.explosive_trap_damage_falloff = settings.explosive_trap_damage_falloff;
      settings.image = "explosive_trap";
      settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

      /********************/
      /* call constructor */
      /********************/
      this._super(me.Entity, 'init', [x, y, settings]);
      this.name = "explosive_trigger_trap";

      /*************************/
      /* default for all traps */
      /*************************/
      this.body.collisionType = me.collision.types.WORLD_SHAPE;
      this.body.setCollisionMask(me.collision.types.WORLD_SHAPE | me.collision.types.PLAYER_OBJECT);
      this.body.setVelocity(0, 0);
      this.body.gravity = 0;

      // ALWAYS update.
      this.alwaysUpdate = false;

      this.renderable.addAnimation("static_explosive_trap", [0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1, 0], this.explosive_trap_animation_speed);
      this.renderable.setCurrentAnimation("static_explosive_trap");
    },

    /*****************/
    /* entity update */
    /*****************/
    update: function (dt) {
      // Return true if we moved or if the renderable was updated.
      return (this._super(me.Entity, 'update', [dt]));
    },

    onCollision: function (response, other) {
      switch (other.body.collisionType) {
        case me.collision.types.PLAYER_OBJECT:
          // Simulate a platform object
          if (other.type === "players_character") {
            var small_trap_explosion_position_x = this.pos.x;
            var small_trap_explosion_position_y = this.pos.y;
            window.setTimeout(() => {
              me.game.world.removeChild(this);
              me.game.world.addChild(
                new game.small_trap_explode(
                  small_trap_explosion_position_x - 7,
                  small_trap_explosion_position_y - 17,
                  {
                    speed: (0),
                    explosion_direction:
                    {
                      x: 0,
                      y: 0,
                    },
                  }
                )
              );
            }, this.explosive_trap_time_delay);
          }
          break;
      }
    }
  });
