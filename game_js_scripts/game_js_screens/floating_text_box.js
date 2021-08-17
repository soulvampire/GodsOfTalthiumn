game = game || {};

game.floating_textbox = me.Renderable.extend(
	{
		init: function (floating_text_posX, floating_text_posY, floating_text_box_width, floating_text_box_height, floating_text_field, floating_text_size) {
			this._super(me.Renderable, "init", [0, 0, floating_text_box_width, floating_text_box_height]);
      this.$text = $('<textarea = text required>').css({
        "left" : floating_text_posX,
        "top" : floating_text_posY,
    });
		
    switch ("text") {
    case "text":
        this.$text.val(floating_text_field);
				this.$text.attr("readonly", "readonly");
				this.$text.attr("rows",floating_text_box_width);
				this.$text.attr("cols",floating_text_box_height);
				$(this.$text).css({'color':'white'});
				$(this.$text).css({'font-size':floating_text_size});
				$(this.$text).css({'background-color':'rgba(0,0,0,0)'});
				$(this.$text).css({'border-color':'rgba(0,0,0,0)'});
				$(this.$text).css({'resize':'none'});
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
	this.$text.attr("left", posX);
	this.$text.attr("top", posY);
},

retrievGameLogText : function() {
	return this.$text.val().toString();
},

destroy : function () {
    this.$input.remove();
}
});