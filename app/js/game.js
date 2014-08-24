(function(global, undefined) {

  'use strict';

  //ludum dare
  /*
  * Everything in LD is private
  */
  var LD = {};
  //switch music;
  LD.music = false;

  document.addEventListener('keydown', function(e) {
    e.preventDefault();

    //X or SPACE or L
    if(e.keyCode === 88 || e.keyCode === 32 || e.keyCode === 76){
      Game.switchMap();
    }

  });

  Game.indexCurrentMap = 0;

  Game.switchMap = function() {
    Game.changeMap.play();
    var current = Game.currentMap;
    Game.currentMap = Game.nextMap;
    Game.nextMap = current;

    document.body.style.background = Game.currentMap.color;
    Game.canvas.style.borderColor = Game.currentMap.border;
    Game.canvas.style.background = Game.currentMap.background;


    if(LD.music){
      Game.music1.unmute();
      Game.music2.mute();
    } else {
      Game.music2.unmute();
      Game.music1.mute();
    }

    LD.music = !LD.music;
  };

  Game.setNextMap = function() {

    Game.currentMap = Game.nextMap;
    Game.nextMap = LD.mapObjects[Game.indexCurrentMap + 2];

    document.body.style.background = Game.currentMap.color;
    Game.canvas.style.borderColor = Game.currentMap.border;
    Game.canvas.style.background = Game.currentMap.background;

    Game.changeMap.play();
    if(LD.music){
      Game.music1.unmute();
      Game.music2.mute();
    } else {
      Game.music2.unmute();
      Game.music1.mute();
    }

    LD.music = !LD.music;

  };

  LD.init = function() {

    Game.canvas.width = Game.width;
    Game.canvas.height = Game.height;

    LD.currentState = 'play';
    LD.maps = [];
    LD.mapObjects = [];

    LD.maps[0] = [64, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 65, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 71, 73, 0, 11, 13, 72, 72, 82, 61, 62, 61, 63, 62, 62, 61, 0, 71, 82, 83, 72, 83, 76, 73, 11, 74, 3, 62, 81, 31, 53, 2, 2, 2, 2, 3, 0, 82, 83, 82, 72, 53, 2, 2, 75, 12, 74, 3, 83, 92, 21, 22, 22, 22, 22, 23, 73, 91, 82, 92, 0, 21, 22, 22, 65, 12, 12, 74, 3, 62, 0, 0, 0, 91, 83, 83, 92, 0, 0, 0, 0, 0, 0, 0, 11, 12, 12, 12, 74, 3, 63, 62, 61, 62, 82, 81, 62, 61, 62, 0, 0, 62, 61, 61, 11, 12, 12, 12, 12, 74, 2, 2, 2, 3, 81, 53, 2, 2, 2, 2, 2, 2, 2, 2, 75, 12, 12, 12, 12, 12, 12, 12, 12, 13, 81, 21, 22, 22, 22, 22, 22, 22, 22, 22, 65, 12, 12, 12, 12, 12, 12, 12, 12, 13, 91, 72, 72, 73, 0, 0, 0, 0, 0, 0, 11, 12, 12, 12, 12, 12, 12, 12, 12, 13, 61, 61, 63, 81, 61, 61, 62, 62, 62, 63, 11, 12, 12, 12, 12, 12, 12, 12, 12, 74, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 75];
    LD.maps[1] = [69, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 70, 18, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 81, 16, 18, 62, 62, 62, 62, 62, 62, 62, 62, 66, 66, 66, 71, 72, 72, 72, 72, 72, 83, 16, 79, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 71, 82, 6, 7, 7, 7, 7, 7, 80, 69, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28, 82, 36, 26, 27, 27, 27, 27, 27, 70, 18, 66, 66, 66, 66, 66, 66, 91, 72, 72, 72, 92, 0, 0, 66, 66, 66, 66, 66, 16, 18, 61, 61, 62, 62, 61, 62, 61, 61, 62, 63, 63, 61, 62, 62, 61, 62, 61, 63, 16, 79, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 80, 17, 17, 17, 17, 20, 17, 40, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 20, 17, 17, 10, 17, 20, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 20, 20, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 80];
    LD.maps[2] = [164, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 165, 113, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 111, 113, 62, 61, 61, 62, 61, 62, 61, 62, 61, 61, 0, 0, 63, 62, 61, 61, 62, 62, 111, 174, 102, 102, 102, 102, 102, 102, 102, 102, 102, 103, 0, 61, 101, 102, 102, 102, 102, 102, 175, 164, 122, 122, 122, 122, 122, 122, 122, 165, 112, 113, 0, 131, 154, 122, 122, 122, 122, 122, 165, 113, 71, 83, 72, 72, 72, 72, 82, 111, 112, 113, 0, 0, 0, 0, 0, 0, 0, 0, 111, 113, 91, 76, 73, 62, 61, 61, 62, 111, 112, 113, 61, 61, 62, 61, 62, 61, 61, 63, 111, 174, 102, 102, 102, 102, 102, 102, 102, 175, 112, 174, 102, 102, 102, 102, 102, 102, 102, 102, 175, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112];

    LD.mapObjects[0] = new Game.Map(LD.maps[0], '#b45c71', '#891b35', '#ebb2bf');
    LD.mapObjects[1] = new Game.Map(LD.maps[1], '#b46d5c', '#89301b', '#e0b8af');
    LD.mapObjects[2] = new Game.Map(LD.maps[2], '#b4a35c', '#89731b', '#DCE0AF');

    Game.currentMap = LD.mapObjects[0];
    Game.nextMap = LD.mapObjects[1];

    document.body.style.background = Game.currentMap.color;
    Game.canvas.style.borderColor = Game.currentMap.border;
    Game.canvas.style.background = Game.currentMap.background;

    LD.player = new Game.Player();

    // Game.music1.play();
    // Game.music2.play();
    // Game.music2.mute();

    LD.loop();

  };

  LD.state = [];

  LD.state['play'] = function() {

    /* draw and update functions goes here */

    LD.player.update();

    Game.currentMap.draw();
    LD.player.draw();

    Game.ctx.globalAlpha = '0.1';
    Game.nextMap.draw();


  };

  LD.loop = function() {

    //clear the canvas
    Game.canvas.width = Game.width;
    LD.state[LD.currentState]();
    requestAnimationFrame(LD.loop);

  };

  window.addEventListener('load', function() {

    LD.init();

  });

}(window));