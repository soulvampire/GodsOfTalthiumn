var game = game || {};
/******************************************/
/* class name : generic_health_bar_entity */
/******************************************/
game.generic_health_bar_entity = me.Renderable.extend( {
  /*********************************************/
	/*       health bar entity constructor       */
	/*********************************************/
	/* hitPoints = damage value                  */
	/* max_health_points = max health points     */
	/* hp_pos_x = x value screen position(px)    */
	/* hp_pos_y = y value screen position(px)    */
	/* health_bar_width = health bar width(px)   */
  /* health_bar_height = health bar height(px) */
	/*********************************************/
    init: function (hit_points, max_health_points, hp_pos_x, hp_pos_y, health_bar_width, health_bar_height) {
    /**********************************/
    /*    health bar init function    */
		/**********************************/
    /* hp_pos_x = X cordinate         */
    /* hp_pos_y = Y cordinate         */
    /* health_bar_width = width(px)   */
		/* health_bar_height = height(px) */
    /**********************************/
      this._super(me.Renderable, "init", [hp_pos_x, hp_pos_y, health_bar_width, health_bar_height]);
      this.name = "generic_health_bar";
      this.anchorPoint.set(0.0, 0.0);
      this.hitPoints = hit_points;
      this.max_health_points = max_health_points;
      this.health = 1;
      this.currentHealth = 1;
      this.setPlayerHealthBar(this.hitPoints);
      this.borderColor = '#000000';
      this.alwaysUpdate = false;
    },

    drawHealthBarPosition: function (hp_pos_x, hp_pos_y) {
      this.pos.x = hp_pos_x;
      this.pos.y = hp_pos_y;
    },

    draw: function (renderer) {
      if (this.health >= 0) {
        renderer.setColor(this.borderColor);
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);;
        renderer.setColor('#808080');
        renderer.fillRect(this.pos.x + 1, this.pos.y + 1, this.width - 2, this.height - 2);
        renderer.setColor('#bb0a1e');
        if (this.health > 1) {
          renderer.fillRect(this.pos.x + 1, this.pos.y + 1, this.width - 2, this.height - 2);
        }
        else {
          renderer.fillRect(this.pos.x + 1, this.pos.y + 1, (this.width - 2) * this.health, this.height - 2);
        }
      }
    },

    update: function () {
      if (this.updateOnce) {
        this.updateOnce = false;
        return true;
      }
      if (this.health == this.currentHealth) {
        return false;
      }
      this.health = this.currentHealth;
      return true;
    },

    setPlayerHealthBar: function (hit_points) {
      this.currentHealth = hit_points / this.max_health_points;
    },

    setCurrentAnimation: function () {
      return;
    },

    setAnimationFrame: function () {
      return;
    }
  });