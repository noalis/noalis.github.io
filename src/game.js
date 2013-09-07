Game = {
  map_grid: {
    width: 33,
    height: 14,
    tile: {
      width: 32,
      height: 32
    }
  },
  hasRing: false,
  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },

  height: function() {
    return this.map_grid.height * this.map_grid.tile.height;
  },
  start: function(){
    Crafty.init(Game.width(),Game.height(), "stage");
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
          "assets/bg.png",
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

      Crafty.background('#9ad9fd');
      
      var sun = Crafty.e('Sun').attr({x:0, y:0});
      
      var dog = Crafty.e('Dog').attr({x: 725, y: 100});
      dog.bind("EnterFrame", function(){
        this.go();
      });

      // build map with rocks
      var i, j;
      for (i=0; i<Game.map_grid.width*39; i+=39) {
        Crafty.e("Wave").attr({x: i, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      }

      window.player = Crafty.e('GuyPlayer').attr({x: 0, y:278});

      for (i=0; i<Game.map_grid.width-5; i+=5) {
        Crafty.e("Rock").attr({x: Game.map_grid.tile.width*i, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      }
      Crafty.e("Rock").attr({x: 375, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      Crafty.e("Rock").attr({x: 430, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      Crafty.e("Rock").attr({x: 950, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      Crafty.e("Rock").attr({x: 1005, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      
      Game.ring = Crafty.e('Ring').attr({x: 315, y: 20});
      
      Crafty.e("Cloud").attr({x: 160, y: 255});
      Crafty.e("Cloud").attr({x: 240, y: 380});
      // Crafty.e("Cloud").attr({x: 90, y: 210});
      Crafty.e("Cloud").attr({x: 20, y: 140});
      Crafty.e("Cloud").attr({x: 150, y: 80});
      Crafty.e("Cloud").attr({x: 290, y: 60});
      
      var prevY=0;
      

      var girl = Crafty.e('GirlPlayer').attr({x: 950, y: 307});

      // var cat = Crafty.e('Cat').attr({x: 500, y:370});
      // cat.bind("EnterFrame", function(){
      //   this.go();
      // });

      // var text = Crafty.e("2D, Canvas, Text").attr({ x: 100, y: 100 }).text("Lives: " + Game.lives);
      // text.bind("EnterFrame", function(){
      //   this.text("Lives: " + Game.lives);
      // });
    });

    // finish screen
    Crafty.scene("finish", function(){
      Crafty.background('#ffffff');
      var girl = Crafty.e('GirlPlayer').attr({x: 100, y: 100});
      var guy = Crafty.e('GuyPlayer').attr({x: 400, y:181});
    });


    // call the first scene
    Crafty.scene("loading");
    
  
  }
};