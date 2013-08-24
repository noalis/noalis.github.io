Game = {
  map_grid: {
    width: 31,
    height: 12,
    tile: {
      width: 32,
      height: 32
    }
  },
  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },

  height: function() {
    return this.map_grid.height * this.map_grid.tile.height;
  },

  start: function(){
    Crafty.init(Game.width(), Game.height());
    Crafty.background('#78bbff');
    var i, j;
    for (i=0; i<Game.map_grid.width; i+=5) {
      Crafty.e("Rock").attr({x: Game.map_grid.tile.width*i, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
    }
      Crafty.e("Rock").attr({x: 32, y: (Game.map_grid.height-2)*Game.map_grid.tile.height});

    // for (i=0; i<Game.map_grid.width; i++) {
    //   for (j=0; j<Game.map_grid.height; j++) {
    //     if (i === 0 || i === Game.map_grid.width-1) {
    //       Crafty.e("Rock").attr({x: i*Game.map_grid.tile.width, y: j*Game.map_grid.tile.height});
    //     }
    //   }
    // }
    var player = Crafty.e('GuyPlayer').attr({x: 0, y:0});
    player.bind("EnterFrame", function(){
        if (this.x<=0) { this.x = 0; } // left bound
        if (this.x>=(Game.map_grid.width-1)*Game.map_grid.tile.width) {
          this.x = (Game.map_grid.width-1)*Game.map_grid.tile.width;
        }
        if (this.y > Game.map_grid.height*Game.map_grid.tile.height) {
          // console.log("to to reset");
        }
        var collision_data = this.hit("Rock");
        if (collision_data) {
          window.temp = collision_data;
          Crafty.stop();
        }
    });
  }
};