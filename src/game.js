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
      Crafty.background("#676767");
      var percent = Crafty.e("2D, DOM, Text")
        .attr({ x: 670, y: Game.height()/2+1})
        .text("1%")
        .textFont({ family: 'Arial', size: '12px', weight: "normal" })
        .textColor("#ffffff");
      Crafty.e('2D, Canvas, Color')
        .color("#000")
        .attr({x: 370, y: Game.height()/2, w: 280, h: 16});
      
      var loading_bar = Crafty.e('2D, Canvas, Color')
        .color("#fff")
        .attr({x: 373, y: Game.height()/2+3, w: 10, h: 10});

      var asset_list = [
        "assets/spritemap.png",
        "assets/rock.png",
        "assets/wave.png",
        "assets/bg.png",
        "assets/invitext.png"
      ];
      
      if (Crafty.support.audio) {
        Crafty.audio.canPlay();
        asset_list.push(
          "assets/sounds/jump.wav",
          "assets/sounds/jump.mp3",
          "assets/sounds/jump.ogg",
          "assets/sounds/lostlife.wav",
          "assets/sounds/lostlife.mp3",
          "assets/sounds/lostlife.ogg",
          "assets/sounds/no_ring.wav",
          "assets/sounds/no_ring.ogg",
          "assets/sounds/no_ring.mp3",
          "assets/sounds/ring.wav",
          "assets/sounds/ring.ogg",
          "assets/sounds/ring.mp3",
          "assets/sounds/cat_scream.wav",
          "assets/sounds/cat_scream.ogg",
          "assets/sounds/cat_scream.mp3",
          "assets/sounds/dog_bark.wav",
          "assets/sounds/dog_bark.ogg",
          "assets/sounds/dog_bark.mp3",
          "assets/sounds/music.wav",
          "assets/sounds/music.ogg",
          "assets/sounds/music.mp3",
          "assets/sounds/gamemusic.ogg",
          "assets/sounds/gamemusic.wav",
          "assets/sounds/gamemusic.mp3",
          "assets/sounds/meet.mp3",
          "assets/sounds/meet.ogg",
          "assets/sounds/meet.wav"
        );
      }

      Crafty.load(asset_list,
        function() {
          //when loaded
          Crafty.scene("choose"); //go to main scene
        },

        function(e) {
          percent.text(Math.round(e.percent) + "%");
          loading_bar.attr({w: e.percent * 274 / 100 });
          // console.log(e);
          //progress
        },

        function(e) {
          //uh oh, error loading
          console.log("error!");
          console.log(e);
        }
      );
    });

    // choose player
    Crafty.scene("choose", function(){
      Crafty.background('#ffffff');
      Crafty.e('ChooseText').attr({x: 349, y: Game.height()/2-26});
      var lior = Crafty.e('LiorStand').attr({x: 150, y: 180});
      lior.addComponent("Mouse");
      lior.bind('MouseOver', function() {
        this.sprite(90,180,83,90).attr({w: 83});
      });
      lior.bind('MouseOut', function(){
        this.sprite(180,180,61,90).attr({w: 61});
      });
      lior.bind('Click', function(){
        Game.active="Lior";
        Game.passive="Noa";
        Crafty.scene("main");
        document.getElementsByClassName("if-error")[0].style.display="none";
        document.getElementsByClassName("info")[0].style.display="block";
      });
      var noa = Crafty.e('NoaStand').attr({x: 837, y: 180});
      noa.addComponent("Mouse").flip("X");
      noa.bind('MouseOver', function() {
        this.sprite(67,270,74,72).attr({w: 74, h: 72});
      });
      noa.bind('MouseOut', function(){
        this.sprite(163,270,51,90).attr({w: 51, h: 90});
      });
      noa.bind('Click', function(){
        Game.active="Noa";
        Game.passive="Lior";
        Crafty.scene("main");
        document.getElementsByClassName("if-error")[0].style.display="none";
        document.getElementsByClassName("info")[0].style.display="block";
      });
    });

    // game scene
    Crafty.scene("main", function(){
      Crafty.audio.add("jump", ["assets/sounds/jump.wav", "assets/sounds/jump.ogg", "assets/sounds/jump.mp3"]);
      Crafty.audio.add("lostlife", ["assets/sounds/lostlife.wav", "assets/sounds/lostlife.ogg", "assets/sounds/lostlife.mp3"]);
      Crafty.audio.add("ring", ["assets/sounds/ring.wav", "assets/sounds/ring.ogg", "assets/sounds/ring.mp3"]);
      Crafty.audio.add("no_ring", ["assets/sounds/no_ring.wav", "assets/sounds/no_ring.ogg", "assets/sounds/no_ring.mp3"]);
      Crafty.audio.add("game_music", ["assets/sounds/gamemusic.wav", "assets/sounds/gamemusic.ogg", "assets/sounds/gamemusic.mp3"]);
      Crafty.audio.add("meet", ["assets/sounds/meet.wav", "assets/sounds/meet.ogg", "assets/sounds/meet.mp3"]);

      Crafty.background('#c7daf1');
      Crafty.audio.play("game_music", -1, 0.6);
      var sun = Crafty.e('Sun').attr({x:0, y:0});
      
      var seal2 = Crafty.e('SealVertical').attr({x: 710, y: 100});
      seal2.bind("EnterFrame", function(){
        this.go();
      });

      Crafty.e("DarkWave");

      var active = Crafty.e('ActivePlayer');
      if (Game.active === "Noa") {
        active.requires("NoaStandSprite");
        active.attr({x: 0, y:278, w: 50, h: 75});
      }
      else {
        active.requires("LiorStandSprite");
        active.attr({x: 0, y:278, w: 50, h: 75});
      }
      
      Crafty.e("LightWave");

      
      for (i=0; i<Game.map_grid.width-5; i+=5) {
        Crafty.e("Rock").attr({x: Game.map_grid.tile.width*i, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      }
      Crafty.e("Rock").attr({x: 55, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      Crafty.e("Rock").attr({x: 110, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      Crafty.e("Rock").attr({x: 375, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      Crafty.e("Rock").attr({x: 430, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      Crafty.e("Rock").attr({x: 950, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      Crafty.e("Rock").attr({x: 1005, y: (Game.map_grid.height-1)*Game.map_grid.tile.height});
      
      Game.ring = Crafty.e('Ring').attr({x: 815, y: 190});

      Crafty.e("ShortCloud").attr({x: 240, y: 380});
      Crafty.e("LongCloud").attr({x: 575, y: 150});
      Crafty.e("LongCloud").attr({x: 395, y: 270});
      // Crafty.e("ShortCloudImage").attr({x: 75, y: 290});
      // Crafty.e("ShortCloudImage").attr({x: 800, y: 290});
      
      
      var passive = Crafty.e('PassivePlayer');
      if (Game.passive === "Lior") {
        passive.requires("LiorStandSprite");
        passive.attr({x: Game.width()-55, y: Game.height()-107, w: 50, h: 75});
      }
      else {
        passive.requires("NoaStandSprite");
        passive.attr({x: Game.width()-55, y: Game.height()-107, w: 45, h: 75});
      }
      
      var seal1 = Crafty.e('SealHorizontal').attr({x: 480, y:380});
      seal1.bind("EnterFrame", function(){
        this.go();
      });
    });

    // finish screen
    Crafty.scene("finish", function(){
      Crafty.audio.remove("game_music");
      document.getElementsByClassName("info")[0].style.display="none";
      Crafty.background('#ffffff');
      
      Crafty.audio.add("cat_scream", ["assets/sounds/cat_scream.wav","assets/sounds/cat_scream.ogg","assets/sounds/cat_scream.mp3"]);
      Crafty.audio.add("dog_bark", ["assets/sounds/dog_bark.wav","assets/sounds/dog_bark.ogg","assets/sounds/dog_bark.mp3"]);
      Crafty.audio.add("music", ["assets/sounds/music.wav", "assets/sounds/music.ogg", "assets/sounds/music.mp3"]);
      Crafty.audio.add("ring", ["assets/sounds/ring.wav", "assets/sounds/ring.ogg", "assets/sounds/ring.mp3"]);
      Crafty.audio.play("music", -1, 0.6);

      var heart = Crafty.e('Heart').attr({x: 300, y: 125, w: 60, h: 50, alpha: 0 }).requires("Tween");
      var lior = Crafty.e('LiorWedding').attr({x: 150, y: 147, alpha: 0 }).requires("Tween");
      var noa = Crafty.e('NoaWedding').attr({x: 360, y: 147, alpha: 0 }).requires("Tween");
      var dog = Crafty.e("Dog").attr({x: Game.width(), y: 200, w: 147, h: 90}).requires("Tween");
      var cat = Crafty.e("Cat").attr({x: Game.width(), y: 200, w: 100, h: 90}).requires("Tween");
      var text = Crafty.e("InviText").attr({x: Game.width()-460, y:0, alpha: 0}).requires("Tween");

      setTimeout(function(){
        cat.tween({x: Game.width()/2}, 200).bind("TweenEnd", function(){
          Crafty.audio.play("cat_scream");
          cat.flip("X");
          cat.stop();
          setTimeout(function(){
            cat.unflip("X");
            cat.animate("DoraRun", 15, -1);
            cat.tween({x: -200}, 50).unbind("TweenEnd");
            Crafty.audio.play("dog_bark");
          }, 500);

          dog.tween({x: -200}, 100).bind("TweenEnd", function(){
            dog.flip("X");
            dog.tween({x: Game.width()+200}, 100).bind("TweenEnd", function(){
              dog.unbind("TweenEnd");
              lior.tween({alpha: 1}, 50);
              noa.tween({alpha: 1}, 50).bind("TweenEnd", function(){
                noa.unbind("TweenEnd");
                heart.tween({alpha: 1, y: 75}, 50).bind("TweenEnd", function(){
                  Crafty.audio.play("ring");
                  heart.unbind("TweenEnd");
                  cat.flip("X");
                  dog.unflip("X");
                  dog.attr({y: 237});
                  cat.attr({x: -300, y: 237});
                  dog.tween({x: 500}, 100).bind("TweenEnd", function(){
                    dog.stop();
                    dog.sprite(340, 90, 87, 90).attr({w: 87, h: 90, y: 237 });
                  });
                  cat.tween({x: 55}, 100).bind("TweenEnd", function(){
                    cat.stop();
                    cat.sprite(204, 0, 70, 90).attr({w: 70, h: 90, y: 237 });
                    text.tween({alpha: 1}, 50);
                    setTimeout(function(){ document.getElementsByClassName("map")[0].style.display="block"; }, 2000);
                  });
                });
              });
            });
          });
          
        });
      }, 2000);
      
      // var lior = Crafty.e('PassivePlayer').attr({x: 100, y: 100});
      // var guy = Crafty.e('ActivePlayer').attr({x: 400, y:181});
    });

    // call the first scene
    Crafty.scene("loading");
  
  }
};