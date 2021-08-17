game = game || {};

game.generic_health_bar_entity = me.Renderable.extend(
  {
    init: function (hitPoints, maxHitPoints, hp_pos_x, hp_pos_y, health_bar_width, health_bar_height) {
      this._super(me.Renderable, "init", [hp_pos_x, hp_pos_y, health_bar_width, health_bar_height]);
      this.name = "generic_health_bar";
      this.anchorPoint.set(0.0, 0.0);
      this.hitPoints = hitPoints;
      this.maxHitPoints = maxHitPoints;
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

    setPlayerHealthBar: function (hitPoints) {
      this.currentHealth = hitPoints / this.maxHitPoints;
    },

    setCurrentAnimation: function () {
      return;
    },

    setAnimationFrame: function () {
      return;
    }
  });