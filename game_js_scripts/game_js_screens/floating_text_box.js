game = game || {};

game.floating_textbox = me.Renderable.extend(
	{
		init: function (floating_text_posX, floating_text_posY, floating_text_box_width, floating_text_box_height, floating_text_field, floating_text_size) {
			this._super(me.Renderable, "init", [0, 0, floating_text_box_width, floating_text_box_height]);

			this.defined_screen_width = me.game.viewport.width;
			this.defined_screen_height = me.game.viewport.height;

			this.screen_ratioX = window.innerWidth / this.defined_screen_width;
			this.screen_ratioY = window.innerHeight / this.defined_screen_height;

      this.$text = $('<textarea = text required>').css({
        "left" : (Math.round(floating_text_posX * this.screen_ratioX)),
        "top" : (Math.round(floating_text_posY * this.screen_ratioY)),
    });
		
    switch ("text") {
    case "text":
        this.$text.val(floating_text_field);
				this.$text.attr("readonly", "readonly");
				this.$text.attr("rows",floating_text_box_width);
				this.$text.attr("cols",floating_text_box_height);
				this.$text.prop("disabled", true);
				$(this.$text).css({'color':'white'});
				$(this.$text).css({'font-size':floating_text_size});
				$(this.$text).css({'background-color':'rgba(0,0,0,0)'});
				$(this.$text).css({'border-color':'rgba(0,0,0,0)'});
				$(this.$text).css({'resize':'none'});
				$(this.$text).css({'focus':'none'});
        break;
    }
    $(me.video.getWrapper()).append(this.$text);
},

updateGameLogText : function(game_log_text) {
	this.$text.val(game_log_text);
},

setColourGameLogText : function (colour_type) {
	$(this.$text).css({'color':"'" + colour_type + "'"})
},

updateGameLogPositionText : function(posX, posY) {
	this.$text.css({"left": posX });
	this.$text.css({"top": posY });
},

retrievGameLogText : function() {
	return this.$text.val().toString();
},

destroy : function () {
    this.$input.remove();
}
});