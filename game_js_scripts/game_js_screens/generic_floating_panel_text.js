game = game || {};

/************************/
/* floating text entity */
/************************/
game.generic_floating_panel_text = me.Renderable.extend(
  {
    /***************/
    /* constructor */
    /***************/
    init: function(floating_text_string, floating_text_font_size, floating_text_position_x,floating_text_position_y) 
    {
     /**************************/
      /* generic text font/size */
      /**************************/
      this.floating_text = new me.Text(0, 0, {
          font: "game_arial_font",
          size: floating_text_font_size.toString() + "px",
          fillStyle: "white",
          textAlign: "top",
          textBaseline: "bottom"
      });
      this.floating_text_position_x = floating_text_position_x;
      this.floating_text_position_y = floating_text_position_y;
      this.floating_text_string = floating_text_string;
      this._super(me.Renderable, "init", [this.floating_text_position_x, this.floating_text_position_y, 0, 0]);
    },

    updateGameLogText : function(game_log_text) {
      this.floating_text_string = game_log_text;
    },

    /*********************************/
    /* bit mapped font draw function */
    /*********************************/
    draw : function(renderer) 
    {
        this.floating_text.draw(renderer, this.floating_text_string, this.floating_text_position_x, this.floating_text_position_y); 
    }
  });
    