/**
 * a player info bar didplay renderable and child items
 */

game.player_mana_health_display = game.player_mana_health_display || {};

game.player_mana_health_display = me.Renderable.extend({

	init: function () {
		this._super(me.Renderable, "init",
			[
				0, 0, 0, 0
			]);
		// persistent across level change
		this.isPersistent = true;

		// make sure we use screen coordinates
		this.floating = true;

		// make sure our object is always draw first
		this.z = 100;

		this.player_mana_health_sprite = new me.Sprite(45, 10, {
			image: "player_mana_health_bar",
			framewidth: 101,
			frameheight: 38,
			anchorPoint: new me.Vector2d(0.5, 0.5)
		});

		this.player_mana_health_sprite.floating = true;
	},

	draw: function (renderer) {
		this.player_mana_health_sprite.draw(renderer);
	},

	update: function (dt) {
		return;
	}
});