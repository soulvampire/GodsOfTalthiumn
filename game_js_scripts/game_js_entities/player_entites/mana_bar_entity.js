game = game || {};

game.generic_mana_bar_entity = me.Renderable.extend(
	{
		init: function (hitPoints, maxHitPoints, hp_pos_x, hp_pos_y, mana_bar_width, mana_bar_height) {
			this._super(me.Renderable, "init", [hp_pos_x, hp_pos_y, mana_bar_width, mana_bar_height]);

			// give a name
			this.name = "gereric_mana_bar";

			this.anchorPoint.set(0.0, 0.0);

			this.hitPoints = hitPoints;
			this.maxHitPoints = maxHitPoints;
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

		setPlayerManaBar: function (hitPoints) {
			this.currentmana = hitPoints / this.maxHitPoints;
		},

		setCurrentAnimation: function () {
			return;
		},

		setAnimationFrame: function () {
			return;
		}
	});