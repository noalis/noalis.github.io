Crafty.c('Platform', {
  init: function(){
    this.requires('2D, Canvas');
  }
});

Crafty.c('Obstacle', {
  init: function(){
    this.requires('2D, Canvas, Collision');
  }
});


Crafty.c('Rock', {
  init: function(){
    this.requires('2D, Canvas, Image, Platform')
    .image('assets/rock.png')
    .attr({ w: 55, h: 32});
  }
});

Crafty.c("Cloud", {
  init: function(){
    this.requires('2D, Canvas, Image')
    .image('assets/cloud.png');
  }
});


Crafty.sprite("assets/dora.png", {dora:[0,0,52,46]});
Crafty.c('Cat', {
  speedX: -3,
  minX: 320,
  maxX: 485,
  init: function(){
    this.requires('Obstacle, SpriteAnimation, dora')
    .animate('DoraRun', 0, 0, 52)
    .animate('DoraRun', [[0,0],[52,0]])
    .animate('DoraRun', 15, -1);
  },
  go: function(){
    this.x += this.speedX;
    if (this.speedX < 0 && this.x <= this.minX || this.speedX > 0 && this.x >= this.maxX) { this.speedX *= -1; }

    if (this.speedX < 0) { this.unflip("X"); }
    else { this.flip("X"); }
  }
});

Crafty.c('Dog', {
  speedY: 1,
  minY: 0,
  maxY: 450,
  init: function(){
    this.requires('Obstacle, Image')
    .image('assets/issa.png');
  },
  go: function(){
    this.y += this.speedY;
    this.speedY += 0.3;
    // this.y += this.speedY;
    // if (this.speedY < 0) { this.speedY--; }
    // else { this.speedY--; }

    // if (this.y <= this.minY) { this.speedY = 4; }
    if (this.y >= this.maxY) { 
      this.speedY = -14;
      // Crafty.audio.play("issajump");
    }
    if (this.speedY < 0) { this.flip("Y"); }
    else { this.unflip("Y"); }
  }
});

Crafty.c('Wave', {
  init: function(){
    this.requires('2D, Canvas, Image')
    .image('assets/wave.png')
    .attr({ w: 55, h: 32});
  }
});

Crafty.c('Wave2', {
  init: function(){
    this.requires('2D, Canvas, Image')
    .image('assets/wave2.png');
  }
});

Crafty.c('GuyPlayer', {
  init: function(){
    this.requires('2D, Canvas, Image, Gravity, Twoway, Collision')
    .image('assets/lior_stand.png')
    .gravity('Platform')
    .gravityConst(1)
    .twoway(5, 15)
    .stopOnPlatforms()
    .hitByObstacles();
  },
  stopOnPlatforms: function(){
    this.onHit('Platform', this.stopMovement);
    return this;
  },
  stopMovement: function(platform){
    var platform_x = platform[0].obj.x;
    var platform_w = platform[0].obj.w;
    if (platform_x > this.x) { this.x = platform_x - this.w; }
    else { this.x = platform_x + platform_w; }
  },
  hitByObstacles: function(){
    this.onHit('Obstacle', this.loseLife);
    return this;
  },
  loseLife: function(){
    Crafty.audio.play("lostlife");
    this.y-=20;
    Crafty.pause();
    var _this = this;
    setTimeout(function(){
      _this.image("assets/lior_stand.png");
      Game.lives-=1;
      _this.x=0;
      _this.y=278;
      _this._movement.x=0;
      Crafty.pause();
      console.log(_this);
    }, 3100);
  }
});

Crafty.c('GirlPlayer', {
  init: function(){
    this.requires('2D, Canvas, Image, Collision')
    .image('assets/noa_stand.png')
    .flip("X");
  }
});




Crafty.c("Sun", {
  init: function(){
    this.requires('2D, Canvas, Image')
    .image('assets/bg.png');
  }
});
Crafty.c("Ring", {
  init: function(){
    this.requires('2D, Canvas, Image')
    .image('assets/ring.png');
  }
})