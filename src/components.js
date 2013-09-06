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
    .attr({w: 20, h: 10})
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
  _lives: 3,
  _hasRing: false,
  init: function(){
    this.requires('2D, Canvas, Image, Gravity, Twoway, Collision')
    .image('assets/lior_stand.png')
    .gravity('Platform')
    .gravityConst(1.5)
    .twoway(5, 15)
    .bindCollisions()
    .bindKeys();

    var prevY;
    this.bind("EnterFrame", function(){
      // stop jump pose when reaching ground
      if (this.y === prevY) {
        this.image("assets/lior_stand.png");
      }
      prevY = this.y;

      // left bound
      if (this.x<=0) { this.x = 0; }
      
      // right bound
      if ((this.x+this.w)>=(Game.map_grid.width)*Game.map_grid.tile.width) {
        this.x = Crafty.viewport.width - this.w;
      }
      
      // fall under screen
      if (this.y > Game.map_grid.height*Game.map_grid.tile.height+100) {
        this.loseLife();
      }

      // if (this.y == 283) {
      //   this.image("assets/lior_stand.png");
      // }
    });
  },
  bindKeys: function(){
    this.bind("KeyDown", function(e){
      if (!Crafty.isPaused()){
        if (e.key === 38) {
          this.image("assets/lior_jump.png");
          Crafty.audio.play("jump");
        }
        if (e.key === 37) {
          this.flip("X");
        }
        if (e.key === 39) {
          this.unflip("X");
        }
      }
    });
  },
  bindCollisions: function(){
    this.onHit('Platform', this.stopMovement);
    this.onHit('Obstacle', this.loseLife);
    this.onHit('Cloud', this.checkIfStand);
    this.onHit('GirlPlayer', this.winOnMeet);
    this.onHit('Ring', this.gotRing);
    return this;
  },
  gotRing: function(ring){
    this.attach(ring[0].obj);
    ring[0].obj._attr("y",(this.y-20));
    ring[0].obj._attr("x",(this.x+15));
  },
  stopMovement: function(platform){
    var platform_x = platform[0].obj.x;
    var platform_w = platform[0].obj.w;
    if (platform_x > this.x) { this.x = platform_x - this.w; }
    else { this.x = platform_x + platform_w; }
  },
  loseLife: function(){
    Crafty.audio.play("lostlife");
    this.y-=20;
    Crafty.pause();
    var _this = this;
    setTimeout(function(){
      _this.image("assets/lior_stand.png");
      _this.detach();
      Game.ring._attr("x",315);
      Game.ring._attr("y",330);
      _this.lives-=1;
      _this.x=0;
      _this.y=278;
      _this._movement.x=0;
      _this._movement.y=0;
      _this.unflip();
      Crafty.pause();
    }, 3100);
  },
  checkIfStand: function(cloud){
    if (this._gy >= 15 && this._y >= cloud[0].obj.y) {
      // cloud[0].obj.antigravity();
      
      this._falling=false;
      // this.stopFalling(cloud[0].obj);
      // this._gy=-15;
      // .requires("Platform");
      // console.log(cloud[0].obj)
    }
    // console.log(this._gy);
  },
  winOnMeet: function(girl){
    Crafty.audio.play("success");
    Crafty.scene("finish");
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
});