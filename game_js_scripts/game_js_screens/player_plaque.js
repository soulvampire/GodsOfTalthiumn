game = game || {};

game.player_plaque_display = me.Renderable.extend({

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

		this.player_plaque_sprite = new me.Sprite(10, 10, {
			image: "player_plaque",
			framewidth: 35,
			frameheight: 33,
			anchorPoint: new me.Vector2d(0.5, 0.5)
		});

		this.player_plaque_sprite.floating = true;
	},

	draw: function (renderer) {
		this.player_plaque_sprite.draw(renderer);
	},

	update: function (dt) {
		return;
	}
});