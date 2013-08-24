Crafty.c('Rock', {
  init: function(){
    this.requires('2D, Canvas, Color').color("black").attr({ w: Game.map_grid.tile.width, h: Game.map_grid.tile.height});
  }
});

Crafty.c('GuyPlayer', {
  init: function(){
    this.requires('2D, Canvas, Color, Gravity, Twoway, Collision')
    // .image('assets/mario1.png')
    .color("green")
    .gravity('Rock')
    .gravityConst(2)
    .twoway(6, 22)
    // .onHit('Rock', function(e){
    //   console.log(e);
    // })
    .attr({ w: Game.map_grid.tile.width, h: Game.map_grid.tile.height});
  }
});