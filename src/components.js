Crafty.c('Rock', {
  init: function(){
    this.requires('2D, Canvas, Color').color("black").attr({ w: Game.map_grid.tile.width, h: Game.map_grid.tile.height});
  }
});

Crafty.c('GuyPlayer', {
  init: function(){
    this.requires('2D, Canvas, Image, Gravity, Twoway, Collision')
    .image('assets/mario1.png')
    .attr({ w: Game.map_grid.tile.width*2, h: Game.map_grid.tile.height*2})
    // .color("green")
    .gravity('Rock')
    .gravityConst(0.8)
    .twoway(5, 15);
    // .onHit('Rock', function(e){
    //   console.log(e);
    // })
  }
});