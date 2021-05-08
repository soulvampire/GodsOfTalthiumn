game.generic_flame_entity = me.Entity.extend(
    {
      init: function (x, y, settings) 
      {
            settings = settings || {};
            settings.framewidth = settings.width;
            settings.frameheight = settings.height;
            this._super(me.Entity, 'init', [x, y, settings]);
    
            this.pos.z = 10;
        this.speed = settings.speed;
        this.flame_hit_points = settings.flame_hit_points;
            this.body.collisionType = me.collision.types.USER;
            this.body.setVelocity(0, 0);
            this.body.setMaxVelocity(this.speed, this.speed);
            this.body.setFriction(0, 0);
            this.body.gravity = 0;
            this.setDirection(settings.flame_direction);
            this.body.setCollisionMask(me.collision.types.NO_OBJECT);
            this.frameCount = settings.frameCount;
            this.renderable.addAnimation("flame_animation", this.range(this.frameCount));
            this.renderable.setCurrentAnimation("flame_animation", this.end.bind(this));
        },
    
      range: function(count) 
      {
            return Array.apply(0, Array(count)).map(function (element, index) { return index; });
        },
    
      end: function() 
      {
            this.renderable.setAnimationFrame(this.frameCount - 1);
            me.game.world.removeChild(this);
        },
    
      setDirection: function(flame_direction) 
      {
            this.body.vel.x = flame_direction.x * this.speed;
            this.body.vel.y = flame_direction.y * this.speed;
            this.renderable.angle = Math.atan2(flame_direction.y, flame_direction.x);
        },
    
      update : function (dt) 
      {
            this.body.update(dt);
            return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
        },
    });
    
    game.small_trap_flame = game.generic_flame_entity.extend(
    {
      init : function (x, y, settings) 
      {
            settings = settings || {};
            settings.image = "default_trap_flame";
            settings.name = "small_trap_flame";
            settings.width = 32;
            settings.height = 32;
            settings.flame_hit_points = 6;
            settings.frameCount = 12;
            this._super(game.generic_flame_entity, 'init', [x, y, settings]);
            this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        },
    });
    
    game.large_trap_explode = game.generic_flame_entity.extend(
        {
            init : function (x, y, settings) 
            {
                settings = settings || {};
                settings.image = "large_trap_flame";
                settings.name = "large_trap_flame";
                settings.width = 64;
                settings.height = 57;
                settings.explosion_hit_points = 12;
                settings.frameCount = 12;
                this._super(game.generic_flame_entity, 'init', [x, y, settings]);
                this.body.setCollisionMask(me.collision.types.NO_OBJECT);
            },
        });
    
    game.small_explode = game.generic_flame_entity.extend(
        {
            init : function (x, y, settings) 
            {
                settings = settings || {};
                settings.image = "default_flame";
                settings.name = "small_flame"
                settings.width = 32;
                settings.height = 32;
                settings.explosion_hit_points = 6;
                settings.frameCount = 10;
                this._super(game.generic_flame_entity, 'init', [x, y, settings]);
                this.body.setCollisionMask(me.collision.types.NO_OBJECT);
            },
        });