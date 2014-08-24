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
    var current;

    if(
      Game.solidTiles.indexOf(Game.nextMap.grid[Game.nextMap.cols * Math.floor((LD.player.y + (LD.player.size / 2)) / Game.tileSize) + Math.floor((LD.player.x + (LD.player.size / 2)) / Game.tileSize)].type) > -1 ||
      Game.solidTiles.indexOf(Game.nextMap.grid[Game.nextMap.cols * Math.floor(LD.player.y / Game.tileSize) + Math.floor(LD.player.x / Game.tileSize)].type) > -1 ||
      Game.solidTiles.indexOf(Game.nextMap.grid[Game.nextMap.cols * Math.floor((LD.player.y) / Game.tileSize) + Math.floor((LD.player.x + LD.player.size) / Game.tileSize)].type) > -1
      ){

        Game.blocked.play();

        return false;
    };

    current = Game.currentMap;
    Game.currentMap = Game.nextMap;
    Game.nextMap = current;

    //document.body.style.background = Game.currentMap.color;
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

  Game.setNextMap = function() {

    Game.currentMap = Game.nextMap;
    Game.nextMap = LD.mapObjects[Game.currentMap.index + 1];

    //document.body.style.background = Game.currentMap.color;
    Game.canvas.style.borderColor = Game.currentMap.border;
    Game.canvas.style.background = Game.currentMap.background;

    Game.changeMap.play();

  };

  LD.init = function() {

    Game.canvas.width = Game.width;
    Game.canvas.height = Game.height;

    LD.currentState = 'play';
    LD.maps = [];
    LD.mapObjects = [];

    LD.maps[0] = [12, 12, 12, 12, 64, 22, 22, 22, 65, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 191, 183, 192, 11, 12, 15, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 0, 182, 0, 11, 12, 12, 12, 12, 12, 35, 12, 12, 12, 12, 12, 64, 22, 22, 22, 23, 0, 181, 0, 21, 22, 65, 64, 22, 22, 22, 22, 22, 22, 22, 65, 13, 0, 0, 0, 191, 172, 183, 172, 172, 192, 11, 13, 0, 0, 0, 0, 181, 181, 181, 11, 13, 0, 0, 0, 0, 0, 181, 0, 0, 0, 11, 13, 0, 0, 0, 0, 191, 183, 192, 11, 13, 161, 161, 161, 161, 163, 181, 161, 162, 161, 11, 13, 161, 162, 163, 161, 162, 164, 162, 11, 74, 2, 2, 2, 2, 2, 2, 2, 2, 2, 75, 74, 2, 2, 2, 2, 2, 2, 2, 75, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 15, 12, 12, 12, 12, 12, 12, 5, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 15, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12];
    LD.maps[1] = [17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 30, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 10, 17, 17, 17, 17, 20, 17, 17, 17, 17, 69, 27, 27, 27, 27, 27, 70, 69, 27, 27, 27, 27, 27, 27, 70, 69, 27, 27, 27, 70, 18, 181, 0, 0, 181, 181, 16, 18, 0, 0, 0, 181, 0, 171, 16, 18, 181, 181, 181, 16, 18, 183, 182, 172, 182, 183, 16, 18, 171, 172, 172, 183, 172, 192, 16, 18, 191, 182, 183, 16, 18, 181, 161, 161, 181, 181, 16, 18, 192, 162, 161, 181, 161, 162, 16, 18, 162, 162, 181, 16, 79, 7, 7, 50, 37, 37, 59, 59, 37, 37, 50, 50, 37, 37, 59, 59, 50, 7, 7, 17, 17, 17, 17, 18, 0, 181, 181, 0, 0, 0, 16, 18, 0, 0, 171, 172, 26, 27, 27, 70, 17, 20, 17, 18, 171, 183, 192, 163, 162, 162, 16, 18, 161, 161, 191, 172, 172, 172, 192, 16, 17, 17, 17, 18, 192, 164, 161, 6, 7, 7, 80, 79, 7, 7, 7, 7, 7, 7, 7, 80, 17, 17, 17, 79, 7, 7, 7, 80, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17];
    LD.maps[2] = [92, 92, 92, 93, 0, 0, 0, 101, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 92, 92, 92, 92, 93, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 181, 171, 183, 192, 91, 92, 92, 92, 93, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 191, 183, 164, 161, 91, 92, 92, 92, 93, 0, 161, 162, 162, 163, 162, 162, 161, 162, 162, 81, 125, 112, 112, 125, 155, 92, 85, 95, 154, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 155, 93, 191, 172, 101, 145, 92, 92, 92, 92, 92, 95, 92, 92, 92, 92, 92, 92, 105, 92, 92, 93, 0, 0, 0, 91, 95, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 93, 162, 161, 0, 91, 92, 92, 92, 92, 92, 92, 144, 102, 102, 102, 102, 102, 102, 102, 102, 134, 125, 83, 0, 91, 92, 92, 105, 92, 92, 92, 93, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 93, 0, 91, 92, 92, 92, 144, 102, 102, 135, 163, 162, 162, 161, 162, 161, 161, 0, 0, 91, 93, 0, 91, 92, 92, 92, 93, 0, 0, 131, 125, 82, 82, 82, 82, 82, 82, 82, 82, 155, 154, 82, 155, 92, 92, 92, 93, 0, 0, 0, 91, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92];
    LD.maps[3] = [92, 92, 92, 93, 0, 0, 0, 101, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 92, 92, 92, 92, 93, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 181, 171, 183, 192, 91, 92, 92, 92, 93, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 191, 183, 164, 161, 91, 92, 92, 92, 93, 0, 161, 162, 162, 163, 162, 162, 161, 162, 162, 81, 125, 112, 112, 125, 155, 92, 85, 95, 154, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 155, 93, 191, 172, 101, 145, 92, 92, 92, 92, 92, 95, 92, 92, 92, 92, 92, 92, 105, 92, 92, 93, 0, 0, 0, 91, 95, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 93, 162, 161, 162, 91, 92, 92, 92, 92, 92, 92, 144, 102, 102, 102, 102, 102, 102, 102, 102, 134, 125, 82, 82, 155, 92, 92, 105, 92, 92, 92, 93, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 92, 92, 92, 92, 92, 92, 144, 102, 102, 135, 163, 162, 162, 161, 162, 161, 161, 0, 0, 91, 92, 92, 92, 92, 92, 92, 93, 0, 0, 131, 125, 82, 82, 82, 82, 82, 82, 82, 82, 155, 92, 105, 92, 92, 92, 92, 93, 0, 0, 0, 91, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92];

    LD.mapObjects[0] = new Game.Map(LD.maps[0], '#b45c71', '#891b35', '#ebb2bf', 0);
    LD.mapObjects[1] = new Game.Map(LD.maps[1], '#b46d5c', '#89301b', '#e0b8af', 1);
    LD.mapObjects[2] = new Game.Map(LD.maps[2], '#b4a35c', '#89731b', '#DCE0AF', 2);
    LD.mapObjects[3] = new Game.Map(LD.maps[2], '#b4a35c', '#89731b', '#DCE0AF', 2);

    Game.currentMap = LD.mapObjects[0];
    Game.nextMap = LD.mapObjects[1];

    //document.body.style.background = Game.currentMap.color;
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