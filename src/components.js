Crafty.c('Rock', {
  init: function(){
    this.requires('2D, Canvas, Color').color("black").attr({ w: Game.map_grid.tile.width, h: Game.map_grid.tile.height});
  }
});

Crafty.c('GuyPlayer', {
  init: function(){
    this.requires('2D, Canvas, Image, Gravity, Twoway, Collision')
    .image('assets/lior_stand.png')
    .gravity('Rock')
    .gravityConst(0.8)
    .twoway(5, 15);
  }
});
Crafty.c('GirlPlayer', {
  init: function(){
    this.requires('2D, Canvas, Image, Collision')
    .image('assets/noa_stand.png')
    .flip("X");
  }
});
Crafty.c('Cat', {
  speedX: -4,
  minX: 300,
  maxX: 600,
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