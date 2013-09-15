Crafty.sprite("assets/spritemap.png", {
  Dora:[0,0,100,90],
  Issa:[0,90,147,90],
  NoaJumpSprite:[67,270,74,72],
  NoaStandSprite:[163,270,51,90],
  LiorJumpSprite:[90,180,83,90],
  LiorStandSprite:[180,180,61,90],
  ShortCloudSprite: [278, 16, 114, 74],
  LongCloudSprite: [394, 13, 170, 77],
  RingSprite: [536, 90, 30, 17],
  LiorWeddingSprite: [241,180,144,180],
  NoaWeddingSprite: [391,180,127,180],
  HeartSprite: [435, 90, 98, 90],
  SealSprite: [384, 361, 164, 90],
  ChooseTextSprite: [0, 450, 358, 52],
  PutARingSprite: [517,180,164,97],
  LiorMeetSprite: [595,0,72,90],
  NoaMeetSprite: [613,90,54,90],
  DarkWaveSprite: [154,360,108,90],
  LightWaveSprite: [267,360,108,90],
  CloudArrowSprite: [565,277,77,68],
  OpenSpeakersSprite: [394,450,292,20],
  PlayAgainTextSprite: [394,470,150,26]
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
    .attach(Crafty.e("ShortCloudImage").attr({x: this._x-14, y:this._y-17, w: 56.5, h: 34}));
  }
});

Crafty.c("LongCloud", {
  init: function(){
    this.requires('2D, Canvas')
    .attr({w: 60, h:50})
    .attach(Crafty.e("LongCloudImage").attr({x: this._x-15, y:this._y-19, w: 85.5, h: 38.5}));
  }
});
Crafty.c("LiorStand", {
  init: function(){
    this.requires('2D, DOM, LiorStandSprite').css('cursor', 'pointer');
  }
});
Crafty.c("NoaStand", {
  init: function(){
    this.requires('2D, DOM, NoaStandSprite').css('cursor', 'pointer');
  }
});
Crafty.c("ChooseText", {
  init: function(){
    this.requires('2D, Canvas, ChooseTextSprite');
  }
});
Crafty.c("PutARing", {
  init: function(){
    this.requires('2D, Canvas, PutARingSprite');
  }
});
Crafty.c("CloudArrow", {
  init: function(){
    this.requires('2D, Canvas, CloudArrowSprite, Tween')
    .attr({w: 38, h: 34, x: 180, y: 360});
  },
  show: function(){
    this.unbind("TweenEnd");
    this.tween({alpha: 1, y: 350}, 20).bind("TweenEnd", this.hide);
  },
  hide: function(){
    this.unbind("TweenEnd");
    this.tween({alpha: 0, y: 360}, 20).bind("TweenEnd", this.show);
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
    .collision([0,0],[0,40],[50,40],[50,0])
    .animate('SealRun', [[384,360],[548,360]])
    .animate('SealRun', 15, -1)
    .attr({w: 61, h: 36})
    .origin("center");
  }
});

Crafty.c('SealHorizontal', {
  speedX: -2.5,
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
  maxY: 700,
  init: function(){
    this.requires('Obstacle, SealAnimation');
    this.rotation=90;
    this.stop();
  },
  go: function(){
    this.y += this.speedY;
    this.speedY += 0.3;
    if (this.y >= this.maxY) {
      this.speedY = -16.5;
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

Crafty.c('LightWave', {
  init: function(){
    this.requires('2D, Canvas, Image, Tween')
    .attr({ x:0, y: 432, w: Game.width(), h: 32})
    .image("assets/wave.png", "repeat");
    this.up();
  },
  up: function(){
    this.unbind("TweenEnd");
    this.attr({x:this.x-39});
    this.tween({y: 426, x: this.x+39}, 70).bind("TweenEnd", this.down);
  },
  down: function(){
    this.unbind("TweenEnd");
    this.attr({x:this.x-39});
    this.tween({y: 432, x: this.x+39}, 70).bind("TweenEnd", this.up);
  }
});

Crafty.c('DarkWave', {
  init: function(){
    this.requires('2D, Canvas, Image, Tween')
    .attr({ x:25, y: 426, w: Game.width(), h: 32})
    .image("assets/wave2.png", "repeat");
    this.up();
  },
  up: function(){
    this.unbind("TweenEnd");
    this.attr({x:this.x-39});
    this.tween({y: 426, x: this.x+39}, 140).bind("TweenEnd", this.down);
  },
  down: function(){
    this.unbind("TweenEnd");
    this.attr({x:this.x-39});
    this.tween({y: 432, x: this.x+39}, 140).bind("TweenEnd", this.up);
  }
});

Crafty.c('ActivePlayer', {
  _lives: 3,
  _hasRing: false,
  _prevY: null,
  init: function(){
    this.requires('2D, Canvas, Gravity, Twoway, Collision')
    .collision([10,0],[10,75],[40,75],[40,0])
    .attr({x: 10, y: 10, w: 10, h: 10})
    .gravity('Platform')
    .gravityConst(1)
    .twoway(5, 15)
    .bindCollisions()
    .bindKeys();

    this.bind("EnterFrame", function(){
      // stop jump pose when reaching ground
      if (this.y >= this._prevY) {
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
    });
  },
  bindKeys: function(){
    this.bind("KeyDown", function(e){
      if (!Crafty.isPaused()){
        if (e.key === 38 || e.key === 32 || e.key === 87) {
          this.changeJumpSprite();
          Crafty.audio.play("jump");
        }
        if (e.key === 37 || e.key === 65) {
          this.origin("center");
          this.flip("X");
        }
        if (e.key === 39 || e.key === 68) {
          this.origin("center");
          this.unflip("X");
        }
      }
    });
    // this.bind("KeyUp", function(e){
    //   if (e.key === 37 || e.key === 65 || e.key === 39 || e.key === 68) {
    //     this._movement.x=0;
    //   }
    // });
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
    this._hasRing=true;
    ring[0].obj._attr("y",-50);
    ring[0].obj._attr("x",-50);
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
        Game.ring._attr("x",815);
        Game.ring._attr("y",190);
        _this._hasRing=false;
        _this.lives-=1;
        _this._attr("x",0);
        _this._attr("y",278);
        _this.unflip();
        Crafty.audio.unpause("game_music");
        _this._movement.x=0;
        _this._movement.y=0;
        Crafty.pause();
      }, 3100);
    }
  },
  checkIfStand: function(cloud){
    // check if player intersects with cloud when coming from the top
    var hit = cloud[0].obj;
    if (this._prevY<this._y && this.y+this.h <= hit.y+hit.h/2) {
      this.attr("y",hit.y+hit.h);
      this.stopFalling(hit);
    }
  },
  winOnMeet: function(girl){
    if (this._hasRing) {
      
      Crafty.audio.remove("game_music");
      Crafty.pause();
      this.destroy();
      girl[0].obj.destroy();
      
      var lior = Crafty.e("LiorMeet");
      var noa = Crafty.e("NoaMeet");
      var ring = Crafty.e("Ring");
      if (Game.active === "Lior") {
        lior.attr({x: Game.width()-106, y: 342});
        noa.attr({x: Game.width()-46, y: 342});
        noa.flip("X");
        ring.attr({x: Game.width()-65, y: 316 });
      }
      else {
        noa.attr({x: Game.width()-116, y: 342});
        lior.attr({x: Game.width()-56, y: 342});
        lior.flip("X");
        ring.attr({x: Game.width()-75, y: 316 });
      }

      Crafty.audio.play("meet");

      setTimeout(function(){
        Crafty.pause();
        ring.destroy();
        if (Game.active === "Lior") { noa.unflip("X"); }
        else { lior.unflip("X"); }
        lior.requires("Tween").tween({x:Game.width()+100}, 100);
        noa.requires("Tween").tween({x:Game.width()+100}, 100).bind("TweenEnd", function(){
          Crafty.scene("finish");
        });
      }, 3000);
    }
    else {
      Crafty.audio.play("no_ring");
      var shoulda = Crafty.e("PutARing").attr({ x: Game.width()-200, y: 240 });
      var cloud_arrow;
      setTimeout(function(){
        shoulda.destroy();
        cloud_arrow = Crafty.e("CloudArrow").show();
      }, 5000);
      this._slapped = true;
      this.requires("Tween").tween({x: 0, _up: 2990}, 20).bind("TweenEnd", function(){
        this._slapped = false;
      });
    }
  }
});

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
Crafty.c("OpenSpeakers", {
  init: function(){
    this.requires('2D, Canvas, OpenSpeakersSprite');
  }
});
Crafty.c("PlayAgainText", {
  init: function(){
    this.requires('2D, DOM, PlayAgainTextSprite').css('cursor','pointer');
  }
});
Crafty.c("Ring", {
  init: function(){
    this.requires('2D, Canvas, RingSprite');
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
Crafty.c("LiorMeet", {
  init: function(){
    this.requires('2D, Canvas, LiorMeetSprite')
    .attr({w: 60, h: 75});
  }
});
Crafty.c("NoaMeet", {
  init: function(){
    this.requires('2D, Canvas, NoaMeetSprite')
    .attr({w: 45, h: 75});
  }
});
Crafty.c("Heart", {
  init: function(){
    this.requires('2D, Canvas, HeartSprite');
  }
});