Game = {
  map_grid: {
    width: 31,
    height: 12,
    tile: {
      width: 32,
      height: 32
    }
  },
  lives: 3,
  hasRing: false,
  
  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },

  height: function() {
    return this.map_grid.height * this.map_grid.tile.height;
  },
  reset: function(){
    
  },
  start: function(){
    Crafty.init(Game.width(), Game.height());
    Crafty.background('#78bbff');
    
    // build map with rocks
    var i, j;
    for (i=0; i<Game.map_grid.width; i+=5) {
      Crafty.e("Rock").attr({x: Game.map_grid.tile.width*i, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
    }
    
    var cat = Crafty.e('Cat').attr({x: 500, y:(Game.map_grid.height-2)*Game.map_grid.tile.height});
    
    // for (i=0; i<Game.map_grid.width; i++) {
    //   for (j=0; j<Game.map_grid.height; j++) {
    //     if (i === 0 || i === Game.map_grid.width-1) {
    //       Crafty.e("Rock").attr({x: i*Game.map_grid.tile.width, y: j*Game.map_grid.tile.height});
    //     }
    //   }
    // }
    

    var player = Crafty.e('GuyPlayer').attr({x: 0, y:0});
    
    player.bind("EnterFrame", function(){
        // left bound
        if (this.x<=0) { this.x = 0; }
        // right bound
        if ((this.x+this.w)>=(Game.map_grid.width)*Game.map_grid.tile.width) {
          // this.x = (Game.map_grid.width-1)*Game.map_grid.tile.width;
          this.x = Crafty.viewport.width - this.w;
        }
        // fall under screen
        if (this.y > Game.map_grid.height*Game.map_grid.tile.height) {
          this.image("assets/lior_stand.png");
          Game.lives-=1;
          this.x=0;
          this.y=0;
        }
        // check side collision with rocks and do not allow overlap
        var hit_rock = this.hit("Rock");
        if (hit_rock) {
          this.image("assets/lior_stand.png");
          var rock_x = hit_rock[0].obj.x;
          var rock_w = hit_rock[0].obj.w;
          if (rock_x > this.x) { this.x = rock_x - this.w; }
          else { this.x = rock_x + rock_w; }
        }

        var hit_cat = this.hit("Cat");
        if (hit_cat) {
          this.image("assets/lior_stand.png");
          Game.lives-=1;
          this.x=0;
          this.y=0;
        }

        // console.log(this.y);
        if (this.y == 283) {
          this.image("assets/lior_stand.png");
        }
    });
    player.bind("KeyDown", function(e){
      if (e.key === 38) {
        this.image("assets/lior_jump.png");
      }
      if (e.key === 37) {
        this.flip("X");
      }
      if (e.key === 39) {
        this.unflip("X");
      }
    });

    var girl = Crafty.e('GirlPlayer').attr({x: 950, y: 281});

    cat.bind("EnterFrame", function(){
      this.go();
    });
    var text = Crafty.e("2D, Canvas, Text").attr({ x: 100, y: 100 }).text("Lives: " + Game.lives);
    text.bind("EnterFrame", function(){
      this.text("Lives: " + Game.lives);
    });

  }
};