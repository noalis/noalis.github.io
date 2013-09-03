Game = {
  map_grid: {
    width: 33,
    height: 12,
    tile: {
      width: 32,
      height: 32
    }
  },
  lives: 3,
  hasRing: false,
  player: null,
  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },

  height: function() {
    return this.map_grid.height * this.map_grid.tile.height;
  },
  lostLife: function(){
    Crafty.audio.play("lostlife");
    this.player.y-=20;
    // this.player.rotation=-180;
    Crafty.pause();
    setTimeout(this.minusLife, 3100);
  },
  minusLife: function(){
    // Game.player.rotation=0;
    Game.player.image("assets/lior_stand.png");
    Game.lives-=1;
    Game.player.x=0;
    Game.player.y=0;
    Crafty.pause();
  },
  start: function(){
    Crafty.init(Game.width(),Game.height());
    Crafty.scene("loading", function() {
      Crafty.background("#000");
      Crafty.e("2D, DOM, Text")
        .attr({ w: 100, h: 20, x: 150, y: 120 })
        .text("Loading")
        .css({ "text-align": "center"})
        .textColor("#FFFFFF");
      Crafty.image_whitelist.push("wav");
      Crafty.image_whitelist.push("png");
      Crafty.load(
        [
          "assets/sounds/jump.wav",
          "assets/sounds/lostlife.wav",
          "assets/sounds/success.wav",
          "assets/sounds/issajump.wav",
          "assets/rock.png",
          "assets/wave.png",
          "assets/lior_stand.png",
          "assets/noa_stand.png",
          "assets/dora.png",
          "assets/issa.png",
          "assets/cloud.png"
        ],
        function() {
          //when loaded
          Crafty.scene("main"); //go to main scene
        },

        function(e) {
          //progress
        },

        function(e) {
          //uh oh, error loading
        }
      );
    });

    // game scene
    Crafty.scene("main", function(){
      Crafty.audio.add("jump", "assets/sounds/jump.wav");
      Crafty.audio.add("lostlife", "assets/sounds/lostlife.wav");
      Crafty.audio.add("success", "assets/sounds/success.wav");
      Crafty.audio.add("issajump", "assets/sounds/issajump.wav");

      Crafty.background('#78bbff');
      
      var dog = Crafty.e('Dog').attr({x: 725, y: 100});
      dog.bind("EnterFrame", function(){
        this.go();
      });

      Game.player = Crafty.e('GuyPlayer').attr({x: 0, y:0});

      // build map with rocks
      var i, j;
      for (i=0; i<Game.map_grid.width*39; i+=39) {
        Crafty.e("Wave").attr({x: i, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      }

      for (i=0; i<Game.map_grid.width-5; i+=5) {
        Crafty.e("Rock").attr({x: Game.map_grid.tile.width*i, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      }
      Crafty.e("Rock").attr({x: 375, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      Crafty.e("Rock").attr({x: 430, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      Crafty.e("Rock").attr({x: 950, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      Crafty.e("Rock").attr({x: 1005, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      
      Crafty.e("Cloud").attr({x: 200, y: 10});
      Crafty.e("Cloud").attr({x: 290, y: 20});
      Crafty.e("Cloud").attr({x: 370, y: 15});
      Crafty.e("Cloud").attr({x: 420, y: 10});

      Game.player.bind("EnterFrame", function(){
          // left bound
          if (this.x<=0) { this.x = 0; }
          // right bound
          if ((this.x+this.w)>=(Game.map_grid.width)*Game.map_grid.tile.width) {
            // this.x = (Game.map_grid.width-1)*Game.map_grid.tile.width;
            this.x = Crafty.viewport.width - this.w;
          }
          // fall under screen
          if (this.y > Game.map_grid.height*Game.map_grid.tile.height+100) {
            Game.lostLife();
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
            Game.lostLife();
          }

          var hit_dog = this.hit("Dog");
          if (hit_dog) {
            Game.lostLife();
          }
          var hit_girl = this.hit("GirlPlayer");
          if (hit_girl) {
            Crafty.audio.play("success");
            Crafty.scene("finish");
            // Crafty.pause();
          }
          // console.log(this.y);
          if (this.y == 283) {
            this.image("assets/lior_stand.png");
          }
      });

      Game.player.bind("KeyDown", function(e){
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

      var girl = Crafty.e('GirlPlayer').attr({x: 1000, y: 281});
      var cat = Crafty.e('Cat').attr({x: 500, y:306});
      // Crafty.sprite("assets/dora.png", {dora:[0,0,52,46]});
      // var cat = Crafty.e("2D, Canvas, SpriteAnimation, dora")
      //   .animate('DoraRun', 0, 0, 52)
      //   .animate('DoraRun', [[0,0],[52,0]])
      //   .animate('DoraRun', 15, -1);

      cat.bind("EnterFrame", function(){
        this.go();
      });
      

      var text = Crafty.e("2D, Canvas, Text").attr({ x: 100, y: 100 }).text("Lives: " + Game.lives);
      text.bind("EnterFrame", function(){
        this.text("Lives: " + Game.lives);
      });
    });

    // finish screen
    Crafty.scene("finish", function(){
      Crafty.background('#ffffff');
      var girl = Crafty.e('GirlPlayer').attr({x: 500, y: 181});
      var guy = Crafty.e('GuyPlayer').attr({x: 400, y:181});
    });


    // call the first scene
    Crafty.scene("loading");
    
  
  }
};