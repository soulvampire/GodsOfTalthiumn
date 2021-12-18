var game = game || {};
/****************************************/
/* class name : generic_mana_bar_entity */
/****************************************/
game.generic_mana_bar_entity = me.Renderable.extend( {
	/*******************************************/
	/*      health bar entity init function    */
	/*******************************************/
	/* hitPoints = damage value                */
	/* max_mana_points = max mana points       */
	/* hp_pos_x = x value screen position(px)  */
	/* hp_pos_y = y value screen position(px)  */
	/* mana_bar_width = health bar width(px)   */
  /* mana_bar_height = health bar height(px) */
	/*******************************************/
		init: function (hitPoints, max_mana_points, hp_pos_x, hp_pos_y, mana_bar_width, mana_bar_height) {
		/********************************/
    /*   mana bar init function     */
    /********************************/
    /* hp_pos_x = X cordinate       */
    /* hp_pos_y = Y cordinate       */
    /* mana_bar_width = width(px)   */
		/* mana_bar_height = height(px) */
    /********************************/
			this._super(me.Renderable, "init", [hp_pos_x, hp_pos_y, mana_bar_width, mana_bar_height]);
			this.name = "gereric_mana_bar";
			this.anchorPoint.set(0.0, 0.0);
			this.hitPoints = hitPoints;
			this.max_mana_points = max_mana_points;
			this.mana = 1;
			this.currentmana = 1;
			this.setPlayerManaBar(this.hitPoints);
			this.borderColor = '#000';
			this.alwaysUpdate = false;
		},

		drawManaBarPosition: function (hp_posX, hp_posY) {
			this.pos.x = hp_posX;
			this.pos.y = hp_posY;
		},

		draw: function (renderer) {
			if (this.mana >= 0) {
				renderer.setColor(this.borderColor);
				renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
				renderer.setColor('#808080');
				renderer.fillRect(this.pos.x + 1, this.pos.y + 1, this.width - 2, this.height - 2);
				renderer.setColor('#104e8b');
				if (this.mana > 1)
					renderer.fillRect(this.pos.x + 1, this.pos.y + 1, this.width - 2, this.height - 2);
				else
					renderer.fillRect(this.pos.x + 1, this.pos.y + 1, (this.width - 2) * this.mana, this.height - 2);
			}
		},

		update: function () {
			if (this.updateOnce) {
				this.updateOnce = false;
				return true;
			}
			if (this.mana == this.currentmana)
				return false;
			this.mana = this.currentmana;
			return true;
		},

		setPlayerManaBar: function (hit_points) {
			this.currentmana = hit_points / this.max_mana_points;
		},

		setCurrentAnimation: function () {
			return;
		},

		setAnimationFrame: function () {
			return;
		}
	});