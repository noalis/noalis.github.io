Crafty.sprite("assets/spritemap.png", {
  Dora:[0,0,100,90],
  Issa:[0,90,147,90],
  NoaJumpSprite:[67,270,74,72],
  NoaStandSprite:[163,270,51,90],
  LiorJumpSprite:[90,180,83,90],
  LiorStandSprite:[180,180,61,90],
  ShortCloudSprite: [278, 16, 114, 74],
  LongCloudSprite: [394, 13, 170, 77],
  RingSprite: [536, 90, 153, 90],
  LiorWeddingSprite: [241,180,144,180],
  NoaWeddingSprite: [391,180,127,180],
  HeartSprite: [435, 90, 98, 90],
  SealSprite: [384, 360, 164, 90]
});

Crafty.sprite("assets/invitext.png", {
  InviTextSprite: [0, 0, 460, 442]
});

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

Crafty.c("ShortCloud", {
  init: function(){
    this.requires('2D, Canvas')
    .attr({w: 30, h:50})
    // .color("#000000")
    .attach(Crafty.e("ShortCloudImage").attr({x: this._x-14, y:this._y-17, w: 56.5, h: 34}));
  }
});

Crafty.c("LongCloud", {
  init: function(){
    this.requires('2D, Canvas')
    .attr({w: 60, h:50})
    // .color("#000000")
    .attach(Crafty.e("LongCloudImage").attr({x: this._x-15, y:this._y-19, w: 85.5, h: 38.5}));
  }
});

Crafty.c("ShortCloudImage", {
  init: function(){
    this.requires('2D, Canvas, ShortCloudSprite')
    .attr({w: this._w/2, h: this._h/2});
  }
});

Crafty.c("LongCloudImage", {
  init: function(){
    this.requires('2D, Canvas, LongCloudSprite')
    .attr({w: this._w/2, h: this._h/2});
  }
});
Crafty.c('SealAnimation', {
  init: function(){
    this.requires('Obstacle, SpriteAnimation, SealSprite')
    .animate('SealRun', [[384,360],[548,360]])
    .animate('SealRun', 15, -1)
    .attr({w: 76, h: 45})
    .origin("center");
  }
});

Crafty.c('SealHorizontal', {
  speedX: -4,
  minX: 306,
  maxX: 475,
  init: function(){
    this.requires('Obstacle, SealAnimation');
  },
  go: function(){
    this.x += this.speedX;
    if (this.speedX < 0 && this.x <= this.minX || this.speedX > 0 && this.x >= this.maxX) { this.speedX *= -1; }
    if (this.speedX < 0) { this.unflip("X"); }
    else { this.flip("X"); }
  }
});

Crafty.c('SealVertical', {
  speedY: 1,
  minY: 0,
  maxY: 450,
  init: function(){
    this.requires('Obstacle, SealAnimation');
    this.rotation=90;
    this.stop();
  },
  go: function(){
    this.y += this.speedY;
    this.speedY += 0.3;
    if (this.y >= this.maxY) {
      this.speedY = -15;
    }
    if (this.speedY < 0) { this.attr("rotation",90); }
    else { this.attr("rotation",-90); }
  }
});

Crafty.c('Cat', {
  init: function(){
    this.requires('2D, Canvas, SpriteAnimation, Dora')
    .animate('DoraRun', [[0,0],[100,0]])
    .animate('DoraRun', 30, -1)
    .attr({w: 50, h:45});
  }
});

Crafty.c('Dog', {
  init: function(){
    this.requires('2D, Canvas, SpriteAnimation, Issa')
    .animate('IssaRun', [[0,90],[147,90]])
    .animate('IssaRun', 15, -1)
    .attr({w: 74, h: 45});
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

Crafty.c('ActivePlayer', {
  _lives: 3,
  _hasRing: false,
  _prevY: null,
  init: function(){
    this.requires('2D, Canvas, Gravity, Twoway, Collision')
    .gravity('Platform')
    .gravityConst(1)
    .twoway(5, 15)
    .bindCollisions()
    .bindKeys();

    this.bind("EnterFrame", function(){
      // console.log(this._movement);
      // stop jump pose when reaching ground
      if (this.y >= this._prevY) {
        // if (this._children.length === 2) this._children[1]._y=this._y+50;
        // this.image("assets/lior_stand.png");
        this.changeStandSprite();
      }
      this._prevY = this.y;

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
          // this.image("assets/lior_jump.png");
          this.changeJumpSprite();
          // if (this._children.length === 2) this._children[1]._y-=22;
          Crafty.audio.play("jump");
        }
        if (e.key === 37) {
          this.origin("center");
          this.flip("X");
        }
        if (e.key === 39) {
          this.origin("center");
          this.unflip("X");
        }
      }
    });
  },
  changeJumpSprite: function(){
    if (Game.active === "Noa") {
      this.sprite(67,270,93,90);
      this.attr({w: 90, h: 75});
    }
    else {
      this.sprite(90,180,83,90);
      this.attr({w: 69, h: 75});
    }
  },
  changeStandSprite: function(){
    if (Game.active === "Noa") {
      this.sprite(163,270,51,90);
      this.attr({w: 50, h: 75});
    }
    else {
      this.sprite(180,180,61,90);
      this.attr({w: 51, h: 75});
    }
  },
  bindCollisions: function(){
    this.onHit('Platform', this.stopMovement);
    this.onHit('Obstacle', this.loseLife);
    this.onHit('ShortCloud', this.checkIfStand);
    this.onHit('LongCloud', this.checkIfStand);
    this.onHit('PassivePlayer', this.winOnMeet);
    this.onHit('Ring', this.gotRing);
    return this;
  },
  gotRing: function(ring){
    Crafty.audio.play("ring");
    // this.attach(ring[0].obj);
    this._hasRing=true;
    ring[0].obj._attr("y",-50);
    ring[0].obj._attr("x",-50);
    // this.unbind("EnterFrame");
    // this.onHit('Ring', this);
    // this.kill();
  },
  stopMovement: function(platform){
    var platform_x = platform[0].obj.x;
    var platform_w = platform[0].obj.w;
    if (platform_x > this.x) { this.x = platform_x - this.w; }
    else { this.x = platform_x + platform_w; }
  },
  loseLife: function(){
    if (!this._slapped) {
      Crafty.audio.pause("game_music");
      Crafty.audio.play("lostlife");
      this.y-=20;
      Crafty.pause();
      var _this = this;
      setTimeout(function(){
        // _this.image("assets/ nd.png");
        // _this.detach();
        Game.ring._attr("x",815);
        Game.ring._attr("y",190);
        _this._hasRing=false;
        _this.lives-=1;
        _this._attr("x",0);
        _this._attr("y",278);
        _this._movement.x=0;
        _this._movement.y=0;
        _this.unflip();
        Crafty.audio.unpause("game_music");
        Crafty.pause();
      }, 3100);
    }
  },
  checkIfStand: function(cloud){
    // check if player intersects with cloud when coming from the top
    var hit = cloud[0].obj;
    // console.log(this.y-this.h);
    // if () {
    if (this._prevY<this._y && this.y+this.h <= hit.y+hit.h/2) {
      // || (!this._falling && this.y+this.h === hit.y+hit.h))
      // make him stop falling
      this.attr("y",hit.y+hit.h);
      this.stopFalling(hit);
      // this._falling = false;
      // this._up = false;
    }
    
    
      // cloud[0].obj.antigravity();
      // this._falling=false;
      // this._y = cloud[0].obj.y-40;
      // this.stopFalling(cloud[0].obj);
      // this._gy=-15;
      // .requires("Platform");
      // console.log(cloud[0].obj)
    // }
    // console.log(this._gy);
  },
  winOnMeet: function(girl){
    if (this._hasRing) {
      
      Crafty.audio.remove("game_music");
      Crafty.scene("finish");
    }
    else {
      Crafty.audio.play("no_ring");
      this._slapped = true;
      this.requires("Tween").tween({x: 0, _up: 2990}, 20).bind("TweenEnd", function(){
        this._slapped = false;
      });
      Crafty.e("2D, Canvas, Text").attr({ x: Game.width()-100, y: 200, w: 100, h: 100 })
      .textFont({ size: '12px' })
      .text("If you like it - ");
      Crafty.e("2D, Canvas, Text").attr({ x: Game.width()-110, y: 215, w: 100, h: 100 })
      .textFont({ size: '12px' })
      .text("put a RING on it");
    }
  }
});

// Crafty.c("NoaJump", {
//   init: function(){
//     this.requires('2D, Canvas, Sprite');
//   }
// });

Crafty.c('PassivePlayer', {
  init: function(){
    this.requires('2D, Canvas').flip("X");
  }
});

Crafty.c("Sun", {
  init: function(){
    this.requires('2D, Canvas, Image')
    .image('assets/bg.png');
  }
});

Crafty.c("InviText", {
  init: function(){
    this.requires('2D, Canvas, InviTextSprite');
  }
});
Crafty.c("Ring", {
  init: function(){
    this.requires('2D, Canvas, RingSprite')
    .attr({w:30, h: 18});
  }
});
Crafty.c("LiorWedding", {
  init: function(){
    this.requires('2D, Canvas, LiorWeddingSprite');
  }
});
Crafty.c("NoaWedding", {
  init: function(){
    this.requires('2D, Canvas, NoaWeddingSprite').flip("X");
  }
});
Crafty.c("Heart", {
  init: function(){
    this.requires('2D, Canvas, HeartSprite');
  }
});