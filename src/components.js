Crafty.c('Rock', {
  init: function(){
    this.requires('2D, Canvas, Image')
    .image('assets/rock.png')
    .attr({ w: 55, h: 32});
  }
});

Crafty.c('Wave', {
  init: function(){
    this.requires('2D, Canvas, Image')
    .image('assets/wave.png')
    .attr({ w: 55, h: 32});
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
  minX: 320,
  maxX: 485,
  init: function(){
    this.requires('2D, Canvas, Image, Collision')
    .image('assets/dora.png');
  },
  go: function(){
    this.x += this.speedX;
    if (this.speedX < 0 && this.x <= this.minX || this.speedX > 0 && this.x >= this.maxX) { this.speedX *= -1; }

    if (this.speedX < 0) { this.flip("X"); }
    else { this.unflip("X"); }
  }
});
Crafty.c('Dog', {
  speedY: 1,
  minY: 0,
  maxY: 400,
  init: function(){
    this.requires('2D, Canvas, Image, Collision')
    .image('assets/issa.png');
  },
  go: function(){
    this.y += this.speedY;
    this.speedY += 0.3;
    // this.y += this.speedY;
    // if (this.speedY < 0) { this.speedY--; }
    // else { this.speedY--; }

    // if (this.y <= this.minY) { this.speedY = 4; }
    if (this.y >= this.maxY) { this.speedY = -14; }
    if (this.speedY < 0) { this.flip("Y"); }
    else { this.unflip("Y"); }
  }
});