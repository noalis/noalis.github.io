Crafty.c('Rock', {
  init: function(){
    this.requires('2D, Canvas, Color').color("black").attr({ w: Game.map_grid.tile.width, h: Game.map_grid.tile.height});
  }
});

Crafty.c('GuyPlayer', {
  init: function(){
    this.requires('2D, DOM, Image, Gravity, Twoway, Collision')
    .attr({width: 10, height: 10})
    .image('assets/lior_stand.png')
    //  .attr({ w: 1, h: 1})
    // .attr({ w: Game.map_grid.tile.width*2, h: Game.map_grid.tile.height*2})
    // .color("green")
    .gravity('Rock')
    .gravityConst(0.8)
    .twoway(5, 15);
    // .onHit('Rock', function(e){
    //   console.log(e);
    // })
  }
});

Crafty.c('Cat', {
  speedX: -4,
  minX: 400,
  maxX: 500,
  init: function(){
    this.requires('2D, Canvas, Image, Collision')
    .image('assets/cat.png');
  },
  go: function(){
    this.x += this.speedX;
    if (this.speedX < 0 && this.x <= this.minX || this.speedX > 0 && this.x >= this.maxX) { this.speedX *= -1; }

    if (this.speedX < 0) { this.flip("X"); }
    else { this.unflip("X"); }
  }
});