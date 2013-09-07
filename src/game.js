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
  active: "Noa",
  passive: "Lior",
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
          "assets/sounds/no_ring.wav",
          "assets/sounds/ring.wav",
          "assets/spritemap.png",
          "assets/rock.png",
          "assets/wave.png",
          "assets/bg.png"

        ],
        function() {
          //when loaded
          Crafty.scene("finish"); //go to main scene
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
      Crafty.audio.add("ring", "assets/sounds/ring.wav");
      Crafty.audio.add("no_ring", "assets/sounds/no_ring.wav");

      Crafty.background('#c7daf1');
      
      var sun = Crafty.e('Sun').attr({x:0, y:0});
      
      // var dog = Crafty.e('Dog').attr({x: 725, y: 100});
      // dog.bind("EnterFrame", function(){
      //   this.go();
      // });

      // build map with rocks
      var i, j;
      for (i=0; i<Game.map_grid.width*39; i+=39) {
        Crafty.e("Wave").attr({x: i, y: (Game.map_grid.height-1)*Game.map_grid.tile.height+10});
      }

      
      var active = Crafty.e('ActivePlayer');
      if (Game.active === "Noa") {
        active.requires("NoaStandSprite");
        active.attr({x: 0, y:278, w: 50, h: 75});
      }
      else {
        active.requires("LiorStandSprite");
        active.attr({x: 0, y:278, w: 50, h: 75});
      }
      

      
      for (i=0; i<Game.map_grid.width-5; i+=5) {
        Crafty.e("Rock").attr({x: Game.map_grid.tile.width*i, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      }
      Crafty.e("Rock").attr({x: 375, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      Crafty.e("Rock").attr({x: 430, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      Crafty.e("Rock").attr({x: 950, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      Crafty.e("Rock").attr({x: 1005, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      
      Game.ring = Crafty.e('Ring').attr({x: 815, y: 190});
      
      // Crafty.e("ShortCloud").attr({x: 160, y: 255});
      // Crafty.e("ShortCloud").attr({x: 20, y: 140});
      // Crafty.e("ShortCloud").attr({x: 150, y: 80});
      // Crafty.e("ShortCloud").attr({x: 290, y: 60});

      // Crafty.e("ShortCloudImage").attr({x: 895, y: 60});
      // Crafty.e("ShortCloudImage").attr({x: 825, y: 110});
      Crafty.e("ShortCloud").attr({x: 240, y: 380});
      Crafty.e("LongCloud").attr({x: 575, y: 150});
      Crafty.e("LongCloud").attr({x: 395, y: 270});
      Crafty.e("ShortCloudImage").attr({x: 75, y: 290});
      
      Crafty.e("ShortCloudImage").attr({x: 800, y: 290});
      
      // Crafty.e("LongCloudImage").attr({x: 395, y: 90});
      // Crafty.e("ShortCloudImage").attr({x: 470, y: 40});
      // Crafty.e("LongCloudImage").attr({x: 520, y: 90});


      
      var passive = Crafty.e('PassivePlayer');
      if (Game.passive === "Lior") {
        passive.requires("LiorStandSprite");
        passive.attr({x: Game.width()-55, y: Game.height()-107, w: 50, h: 75});
      }
      else {
        passive.requires("NoaStandSprite");
        passive.attr({x: Game.width()-55, y: Game.height()-107, w: 45, h: 75});
      }

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
      
      var heart = Crafty.e('Heart').attr({x: 500, y: 200, w: 60, h: 50, alpha: 0 }).requires("Tween");
      var lior = Crafty.e('LiorWedding').attr({x: 350, y: 200, alpha: 0 }).requires("Tween");
      var noa = Crafty.e('NoaWedding').attr({x: 560, y: 200, alpha: 0 }).requires("Tween");
      var dog = Crafty.e("Dog").attr({x: Game.width(), y: 200, w: 147, h: 90}).requires("Tween");
      var cat = Crafty.e("Cat").attr({x: Game.width(), y: 200, w: 100, h: 90}).requires("Tween");
      
      cat.tween({x: Game.width()/2}, 200).bind("TweenEnd", function(){
        cat.flip("X");
        setTimeout(function(){
          cat.unflip("X");
          cat.tween({x: -200}, 50).unbind("TweenEnd");
        }, 500);

        dog.tween({x: -200}, 100).bind("TweenEnd", function(){
          dog.flip("X");
          dog.tween({x: Game.width()+200}, 100).bind("TweenEnd", function(){
            dog.unbind("TweenEnd");
            lior.tween({alpha: 1}, 50);
            noa.tween({alpha: 1}, 50).bind("TweenEnd", function(){
              noa.unbind("TweenEnd");
              heart.tween({alpha: 1, y: 150}, 50).bind("TweenEnd", function(){
                heart.unbind("TweenEnd");
                cat.flip("X");
                dog.attr({x: -200, y: 280});
                cat.attr({x: -300, y: 280});
                dog.tween({x: 150}, 100).bind("TweenEnd", function(){
                  dog.stop();
                  dog.sprite(340, 90, 87, 90);
                });
                cat.tween({x: 50}, 100);
              });
            });
          });
        });
        
      });
      
      // var lior = Crafty.e('PassivePlayer').attr({x: 100, y: 100});
      // var guy = Crafty.e('ActivePlayer').attr({x: 400, y:181});
    });

    // call the first scene
    Crafty.scene("loading");
  
  }
};