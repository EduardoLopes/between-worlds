(function(global, undefined) {

  'use strict';

  //ludum dare
  /*
  * Everything in LD is private
  */
  var LD = {}, i = 0;
  //switch music;
  LD.music = false;
  LD.muteMusic = false;
  LD.whiteFlashALpha = 1;
  //overlaping next map
  LD.overlapingNM = [];

  LD.addOverlaping = function(node) {

    if(node !== undefined){
      if(LD.overlapingNM.indexOf(node) <= -1 && Game.solidTiles.indexOf(node.type) > -1){
        LD.overlapingNM.push(node);
      }
    }

  };

  document.addEventListener('keydown', function(e) {
    e.preventDefault();

    //X or SPACE or L
    if(Game.Key.sMap && !Game.Key.sMapPressed){
      Game.switchMap();
      Game.Key.sMapPressed = true;
    }

    if(Game.Key.m && !Game.Key.mPressed){
      Game.Key.mPressed = true;

      LD.muteMusic = !LD.muteMusic;

      if(LD.muteMusic){
        Game.music1.mute();
      } else {
        Game.music1.unmute();
      }
    }

  });

  Game.indexCurrentMap = 0;

  Game.switchMap = function() {
    var current;
    LD.overlapingNM.length = 0;

    if(Game.end){

      Game.blocked.play();
      Game.mapAlpha = 0.6;

      return false;
    }

    //top-left
    LD.addOverlaping(Game.nextMap.grid[Game.nextMap.cols * Math.floor(LD.player.y / Game.tileSize) + Math.floor(LD.player.x / Game.tileSize)]);
    //top-right
    LD.addOverlaping(Game.nextMap.grid[Game.nextMap.cols * Math.floor((LD.player.y) / Game.tileSize) + Math.floor((LD.player.x + LD.player.size) / Game.tileSize)]);
    //bottom-left
    LD.addOverlaping(Game.nextMap.grid[Game.nextMap.cols * Math.floor((LD.player.next.y + LD.player.size) / Game.tileSize) + Math.floor(LD.player.next.x / Game.tileSize)]);
    //bottom-right
    LD.addOverlaping(Game.nextMap.grid[Game.nextMap.cols * Math.floor((LD.player.next.y + LD.player.size) / Game.tileSize) + Math.floor((LD.player.next.x + LD.player.size) / Game.tileSize)]);

    for (i = 0; i < LD.overlapingNM.length; i++) {

      if(Game.Collision.intercects(LD.overlapingNM[i], LD.player)){
        Game.blocked.play();
        Game.mapAlpha = 0.6;
        return false;
      }

    };

    current = Game.currentMap;
    Game.currentMap = Game.nextMap;
    Game.nextMap = current;

    Game.mapAlpha = 1;
    LD.whiteFlashALpha = 0.5;

    //document.body.style.background = Game.currentMap.color;
    Game.canvas.style.borderColor = Game.currentMap.border;
    Game.canvas.style.background = Game.currentMap.background;
    Game.changeMap.play();
  };

  Game.setNextMap = function() {

      Game.currentMap = Game.nextMap;
      Game.nextMap = LD.mapObjects[Game.currentMap.index + 1];

      //document.body.style.background = Game.currentMap.color;
      Game.canvas.style.borderColor = Game.currentMap.border;
      Game.canvas.style.background = Game.currentMap.background;

      Game.nextMapSound.play();
      Game.mapAlpha = 1;
      LD.whiteFlashALpha = 0.5;

  };

  LD.init = function() {

    Game.canvas.width = Game.width;
    Game.canvas.height = Game.height;

    LD.currentState = 'preload';
    LD.maps = [];
    LD.mapObjects = [];

    LD.maps[0] = [12, 12, 12, 12, 64, 22, 22, 22, 65, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 191, 183, 192, 11, 12, 15, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 0, 182, 0, 11, 12, 12, 12, 12, 12, 35, 12, 12, 12, 12, 12, 64, 22, 22, 22, 23, 0, 181, 0, 21, 22, 65, 64, 22, 22, 22, 22, 22, 22, 22, 65, 13, 0, 0, 0, 191, 172, 183, 172, 172, 192, 11, 13, 0, 0, 0, 0, 181, 181, 181, 11, 13, 0, 0, 0, 0, 0, 181, 0, 0, 0, 11, 13, 0, 0, 0, 0, 191, 183, 192, 11, 13, 161, 161, 161, 161, 163, 181, 161, 162, 161, 11, 13, 161, 162, 163, 161, 162, 164, 162, 11, 74, 2, 2, 2, 2, 2, 2, 2, 2, 2, 75, 74, 2, 2, 2, 2, 2, 2, 2, 75, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 15, 12, 12, 12, 12, 12, 12, 5, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 15, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12];
    LD.maps[1] = [17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 30, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 10, 17, 17, 17, 17, 20, 17, 17, 17, 17, 69, 27, 27, 27, 27, 27, 70, 69, 27, 27, 27, 27, 27, 27, 70, 69, 27, 27, 27, 70, 18, 181, 0, 0, 181, 181, 16, 18, 0, 0, 0, 181, 0, 171, 16, 18, 181, 181, 181, 16, 18, 183, 182, 172, 182, 183, 16, 18, 171, 172, 172, 183, 172, 192, 16, 18, 191, 182, 183, 16, 18, 181, 161, 161, 181, 181, 16, 18, 192, 162, 161, 181, 161, 162, 16, 18, 162, 162, 181, 16, 79, 7, 7, 50, 37, 37, 59, 59, 37, 37, 50, 50, 37, 37, 59, 59, 50, 7, 7, 17, 17, 17, 17, 18, 0, 181, 181, 0, 0, 0, 16, 18, 0, 0, 171, 172, 26, 27, 27, 70, 17, 20, 17, 18, 171, 183, 192, 163, 162, 162, 16, 18, 161, 161, 191, 172, 172, 172, 192, 16, 17, 17, 17, 17, 8, 164, 6, 7, 7, 7, 80, 79, 7, 7, 7, 7, 7, 7, 7, 80, 17, 17, 17, 17, 17, 7, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17];
    LD.maps[2] = [92, 92, 92, 93, 0, 181, 0, 101, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 92, 92, 92, 92, 93, 0, 182, 172, 172, 172, 192, 0, 0, 0, 0, 0, 181, 171, 183, 183, 91, 92, 92, 92, 93, 0, 0, 0, 0, 0, 0, 0, 0, 0, 161, 162, 191, 183, 183, 192, 91, 92, 92, 92, 93, 0, 161, 162, 162, 163, 162, 162, 161, 162, 81, 82, 83, 192, 164, 81, 155, 92, 85, 95, 154, 82, 82, 82, 82, 82, 82, 82, 82, 82, 155, 92, 144, 112, 112, 134, 145, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 93, 0, 0, 0, 91, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 93, 162, 161, 0, 91, 92, 92, 92, 92, 92, 92, 144, 102, 102, 102, 102, 102, 102, 102, 102, 134, 125, 83, 0, 91, 92, 92, 92, 92, 92, 92, 93, 0, 0, 0, 0, 0, 0, 0, 191, 172, 91, 93, 171, 91, 92, 92, 92, 92, 92, 102, 135, 163, 162, 162, 161, 162, 161, 161, 161, 162, 91, 93, 183, 91, 92, 92, 92, 92, 93, 191, 91, 82, 82, 82, 82, 82, 82, 82, 82, 82, 155, 154, 82, 155, 92, 92, 92, 92, 93, 171, 91, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92];
    LD.maps[3] = [97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 149, 107, 107, 107, 107, 107, 150, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 98, 191, 172, 182, 172, 192, 96, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 98, 161, 162, 162, 0, 161, 96, 149, 107, 107, 107, 107, 97, 107, 107, 107, 107, 107, 150, 97, 159, 87, 87, 88, 0, 86, 160, 98, 172, 172, 172, 172, 99, 192, 191, 183, 192, 181, 106, 107, 107, 107, 150, 98, 163, 96, 97, 98, 163, 86, 87, 87, 97, 87, 87, 88, 172, 182, 192, 0, 0, 0, 96, 159, 87, 160, 97, 97, 117, 97, 97, 97, 97, 97, 97, 159, 88, 192, 161, 162, 161, 162, 96, 97, 97, 97, 97, 98, 173, 96, 97, 97, 97, 97, 97, 97, 97, 117, 117, 117, 117, 130, 160, 97, 97, 97, 97, 98, 183, 106, 107, 107, 107, 97, 107, 107, 108, 0, 191, 183, 192, 96, 97, 97, 97, 97, 97, 98, 191, 192, 191, 172, 182, 99, 182, 172, 192, 0, 162, 164, 162, 96, 97, 97, 97, 97, 97, 98, 162, 162, 161, 161, 161, 99, 163, 161, 162, 162, 86, 87, 87, 160, 97, 97, 97, 97, 97, 159, 87, 87, 87, 87, 87, 97, 87, 87, 87, 87, 160, 97, 97, 97, 97, 97, 97, 97, 97];
    LD.maps[4] = [64, 22, 12, 22, 22, 22, 22, 12, 12, 12, 12, 12, 12, 13, 171, 183, 173, 11, 15, 12, 13, 0, 14, 191, 183, 192, 0, 21, 22, 22, 15, 12, 12, 13, 192, 182, 191, 21, 22, 65, 13, 161, 14, 162, 164, 162, 161, 162, 0, 0, 21, 12, 12, 74, 2, 3, 162, 0, 162, 11, 12, 32, 22, 45, 32, 32, 32, 3, 162, 162, 0, 21, 22, 64, 22, 22, 33, 0, 53, 75, 13, 0, 161, 14, 162, 161, 161, 11, 2, 3, 0, 0, 0, 14, 0, 162, 162, 161, 11, 12, 13, 173, 53, 12, 2, 2, 2, 12, 12, 13, 163, 182, 172, 14, 172, 53, 2, 2, 75, 12, 13, 192, 11, 12, 12, 12, 12, 12, 12, 12, 3, 161, 163, 14, 161, 11, 12, 12, 12, 12, 13, 162, 11, 12, 12, 15, 12, 25, 12, 12, 12, 32, 32, 54, 2, 75, 5, 12, 12, 12, 74, 2, 12, 64, 22, 22, 22, 22, 22, 64, 23, 182, 183, 182, 21, 22, 65, 12, 12, 12, 12, 12, 12, 13, 0, 0, 0, 0, 0, 14, 161, 161, 181, 163, 162, 171, 11, 12, 12, 12, 12, 12, 12, 13, 0, 0, 0, 0, 0, 11, 2, 2, 2, 2, 3, 181, 11, 12, 12, 12, 12, 12, 12, 74, 2, 2, 2, 2, 2, 12, 12, 12, 12, 12, 13, 181, 11, 12, 12, 12];
    LD.maps[5] = [17, 27, 27, 17, 17, 17, 17, 27, 70, 27, 27, 27, 27, 28, 0, 0, 0, 16, 17, 17, 18, 183, 172, 16, 27, 17, 28, 0, 19, 162, 161, 161, 161, 0, 0, 0, 161, 16, 17, 17, 18, 192, 0, 19, 172, 29, 192, 163, 49, 7, 7, 7, 8, 161, 162, 0, 6, 17, 20, 17, 18, 0, 0, 19, 0, 0, 162, 6, 17, 27, 27, 17, 27, 37, 38, 0, 16, 17, 17, 17, 18, 162, 162, 19, 162, 162, 6, 17, 18, 162, 161, 19, 171, 192, 0, 0, 16, 17, 30, 17, 17, 7, 7, 17, 7, 7, 20, 17, 17, 7, 7, 18, 192, 0, 0, 0, 16, 17, 17, 17, 17, 17, 17, 20, 17, 17, 10, 17, 17, 17, 17, 18, 161, 162, 161, 0, 16, 30, 17, 17, 17, 20, 17, 17, 17, 30, 27, 27, 27, 17, 10, 17, 7, 7, 8, 0, 16, 17, 17, 17, 17, 27, 27, 27, 27, 28, 0, 181, 182, 26, 17, 30, 17, 17, 18, 0, 26, 17, 17, 17, 18, 192, 0, 0, 181, 171, 172, 183, 192, 191, 26, 27, 27, 27, 18, 0, 0, 16, 17, 30, 18, 162, 162, 163, 164, 181, 162, 181, 161, 162, 163, 162, 161, 162, 19, 0, 0, 16, 10, 17, 17, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 60, 0, 0, 16, 17, 17];
    LD.maps[6] = [92, 92, 92, 92, 92, 92, 144, 102, 102, 102, 145, 92, 115, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 93, 0, 0, 0, 101, 102, 102, 102, 92, 92, 144, 102, 145, 92, 92, 92, 105, 92, 92, 95, 154, 82, 82, 113, 191, 172, 172, 173, 101, 144, 103, 183, 91, 92, 92, 92, 92, 92, 92, 92, 92, 92, 93, 162, 0, 161, 162, 181, 162, 94, 163, 164, 91, 92, 92, 102, 102, 102, 102, 102, 102, 102, 102, 113, 161, 81, 82, 82, 82, 92, 82, 82, 155, 92, 93, 0, 0, 0, 0, 0, 0, 0, 161, 162, 81, 92, 92, 92, 92, 92, 92, 92, 92, 92, 93, 161, 0, 182, 171, 172, 84, 0, 81, 82, 92, 92, 92, 92, 92, 105, 92, 92, 92, 92, 154, 83, 172, 183, 192, 161, 94, 162, 91, 92, 92, 92, 105, 95, 92, 92, 92, 92, 92, 92, 92, 93, 0, 191, 81, 82, 92, 82, 92, 92, 115, 92, 92, 92, 144, 102, 92, 92, 105, 92, 92, 93, 161, 0, 101, 102, 92, 92, 92, 95, 92, 92, 102, 102, 103, 0, 91, 92, 92, 92, 115, 154, 83, 161, 161, 163, 91, 92, 92, 92, 92, 93, 162, 161, 162, 163, 91, 92, 115, 92, 92, 92, 154, 82, 82, 82, 92, 92, 92, 92, 92, 154, 82, 82, 82, 82, 92, 92, 92, 92];
    LD.maps[7] = [97, 107, 107, 107, 97, 97, 97, 90, 97, 97, 97, 149, 107, 107, 107, 98, 0, 0, 0, 96, 98, 0, 182, 0, 96, 107, 107, 107, 107, 107, 107, 98, 192, 162, 162, 99, 0, 0, 0, 96, 98, 182, 183, 182, 99, 162, 162, 162, 181, 161, 162, 96, 87, 117, 117, 107, 118, 0, 86, 160, 98, 0, 164, 162, 96, 87, 87, 87, 117, 117, 117, 150, 98, 161, 162, 162, 161, 0, 96, 97, 98, 163, 86, 87, 97, 100, 97, 98, 181, 0, 0, 96, 159, 87, 87, 87, 88, 0, 96, 100, 97, 87, 97, 97, 149, 107, 150, 107, 127, 162, 163, 96, 100, 97, 97, 100, 98, 0, 96, 97, 97, 110, 97, 97, 98, 172, 99, 162, 96, 87, 87, 160, 97, 97, 97, 97, 98, 172, 96, 97, 97, 97, 149, 107, 107, 117, 150, 87, 97, 97, 100, 97, 97, 90, 110, 97, 98, 172, 96, 97, 97, 97, 98, 173, 162, 0, 96, 107, 107, 150, 97, 97, 97, 97, 97, 97, 98, 172, 96, 90, 110, 97, 159, 87, 88, 163, 99, 161, 191, 96, 97, 97, 90, 97, 97, 97, 98, 171, 96, 97, 97, 97, 97, 97, 159, 87, 160, 88, 171, 96, 97, 100, 97, 97, 110, 97, 98, 181, 96, 97, 97, 110, 97, 97, 97, 97, 97, 159, 87, 160, 97, 97, 97, 97, 97, 97, 98, 192, 96, 97];
    LD.maps[8] = [12, 25, 12, 12, 12, 12, 12, 12, 12, 12, 12, 64, 22, 65, 22, 23, 0, 0, 0, 11, 12, 12, 64, 22, 22, 22, 22, 22, 64, 22, 22, 23, 0, 14, 163, 162, 162, 0, 0, 11, 12, 64, 23, 162, 161, 181, 161, 162, 14, 162, 181, 162, 171, 11, 2, 2, 3, 0, 161, 11, 12, 13, 182, 53, 2, 2, 2, 2, 74, 2, 2, 2, 2, 75, 12, 25, 13, 0, 53, 75, 12, 13, 161, 11, 22, 22, 22, 65, 22, 22, 22, 64, 22, 22, 65, 12, 13, 171, 11, 12, 12, 74, 2, 13, 162, 161, 162, 14, 162, 161, 181, 14, 161, 0, 11, 5, 13, 181, 11, 12, 12, 12, 12, 74, 2, 2, 2, 74, 2, 2, 2, 74, 3, 173, 11, 12, 13, 181, 11, 5, 12, 12, 12, 12, 12, 12, 12, 12, 15, 12, 12, 12, 13, 183, 11, 12, 13, 183, 11, 12, 12, 12, 25, 12, 5, 12, 12, 12, 12, 12, 64, 22, 23, 191, 21, 65, 23, 192, 21, 65, 12, 12, 12, 12, 15, 12, 12, 12, 12, 5, 13, 191, 183, 182, 191, 14, 0, 0, 191, 11, 12, 12, 5, 12, 12, 12, 12, 12, 12, 12, 13, 162, 164, 181, 161, 14, 161, 0, 162, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 74, 2, 2, 2, 2, 75, 3, 0, 53, 75];
    LD.maps[9] = [17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 30, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 30, 17, 20, 17, 17, 17, 17, 17, 17, 17, 17, 17, 10, 17, 17, 17, 10, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 69, 27, 70, 17, 17, 17, 17, 20, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 69, 28, 182, 26, 27, 70, 27, 27, 27, 69, 27, 27, 27, 17, 17, 10, 17, 17, 17, 17, 18, 191, 183, 173, 161, 19, 162, 161, 162, 19, 162, 162, 161, 16, 17, 17, 17, 20, 17, 17, 17, 37, 37, 37, 37, 80, 7, 7, 7, 17, 7, 7, 7, 27, 70, 17, 17, 17, 17, 17, 18, 191, 173, 181, 0, 16, 17, 10, 17, 17, 17, 17, 18, 182, 16, 17, 17, 17, 17, 17, 18, 172, 182, 192, 0, 16, 17, 17, 27, 10, 17, 17, 27, 37, 80, 17, 17, 17, 17, 17, 18, 0, 0, 0, 0, 26, 27, 18, 183, 26, 27, 18, 0, 0, 16, 17, 17, 17, 30, 17, 18, 162, 161, 162, 162, 162, 161, 19, 164, 161, 162, 19, 161, 162, 16, 17, 17, 17, 20, 17, 79, 7, 7, 7, 7, 7, 7, 80, 7, 7, 7, 79, 7, 7, 80, 17, 17, 17, 17, 17];
    LD.maps[10] = [95, 93, 0, 0, 0, 91, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 103, 0, 171, 172, 101, 92, 92, 92, 105, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 93, 172, 172, 183, 173, 0, 91, 92, 92, 92, 92, 92, 92, 92, 105, 92, 85, 92, 92, 92, 93, 0, 0, 181, 181, 0, 91, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 93, 0, 182, 183, 182, 0, 91, 92, 92, 92, 92, 105, 92, 85, 92, 92, 92, 92, 92, 92, 93, 0, 191, 182, 192, 0, 91, 92, 95, 92, 92, 92, 92, 92, 92, 92, 115, 92, 92, 92, 93, 0, 182, 183, 182, 0, 91, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 93, 172, 172, 183, 192, 162, 91, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 95, 92, 92, 93, 0, 0, 181, 0, 81, 134, 102, 102, 92, 102, 102, 92, 92, 92, 92, 92, 92, 92, 92, 93, 0, 0, 181, 0, 104, 172, 172, 192, 94, 191, 182, 101, 92, 92, 92, 92, 92, 105, 92, 93, 162, 171, 166, 173, 0, 162, 161, 163, 94, 162, 161, 162, 91, 92, 95, 92, 92, 92, 92, 92, 82, 82, 82, 82, 82, 82, 82, 82, 92, 82, 82, 82, 92, 92, 92, 92, 92, 92, 92];

    LD.mapObjects[0] = new Game.Map(LD.maps[0], '#b45c71', '#891b35', '#ebb2bf', 0);
    LD.mapObjects[1] = new Game.Map(LD.maps[1], '#b46d5c', '#89301b', '#e0b8af', 1);
    LD.mapObjects[2] = new Game.Map(LD.maps[2], '#b4a35c', '#89731b', '#DCE0AF', 2);
    LD.mapObjects[3] = new Game.Map(LD.maps[3], '#67b45c', '#1f5719', '#AFE0AF', 3);
    LD.mapObjects[4] = new Game.Map(LD.maps[4], '#b45c71', '#891b35', '#ebb2bf', 4);
    LD.mapObjects[5] = new Game.Map(LD.maps[5], '#b46d5c', '#89301b', '#e0b8af', 5);
    LD.mapObjects[6] = new Game.Map(LD.maps[6], '#b4a35c', '#89731b', '#DCE0AF', 6);
    LD.mapObjects[7] = new Game.Map(LD.maps[7], '#67b45c', '#1f5719', '#AFE0AF', 7);
    LD.mapObjects[8] = new Game.Map(LD.maps[8], '#b45c71', '#891b35', '#ebb2bf', 8);
    LD.mapObjects[9] = new Game.Map(LD.maps[9], '#b46d5c', '#89301b', '#e0b8af', 9);
    LD.mapObjects[10] = new Game.Map(LD.maps[10], '#b4a35c', '#89731b', '#DCE0AF', 10);

    Game.currentMap = LD.mapObjects[0];
    Game.nextMap = LD.mapObjects[1];

    //document.body.style.background = Game.currentMap.color;
    Game.canvas.style.borderColor = Game.currentMap.border;
    Game.canvas.style.background = Game.currentMap.background;

    LD.player = new Game.Player();

    LD.loop();

  };

  LD.state = [];

  LD.state['preload'] = function() {

    Game.ctx.textAlign = 'center';
    Game.ctx.font = "normal 60px Arial";
    Game.ctx.fillText('BETWEEN WORLDS', (Game.width / 2), (Game.height / 2));

    Game.ctx.font = "normal 20px Arial";
    Game.ctx.fillText('Loading...', Game.width - 120, Game.height - 20);

    if(Game.preload.music1){
      LD.currentState = 'play';
      Game.music1.play();
    }

  };

  LD.state['play'] = function() {

    /* draw and update functions goes here */
    LD.player.update();

    Game.currentMap.draw();
    LD.player.draw();

    //debug for collision with the next map
    // for (var i = 0; i < LD.overlapingNM.length; i++) {
    //   Game.ctx.fillRect(LD.overlapingNM[i].x, LD.overlapingNM[i].y, 32,32);
    // };

    if(Game.end){
      Game.ctx.textAlign = 'center';
      Game.ctx.font = "normal 30px Arial";
      Game.ctx.fillText('The End', (Game.width / 2) + 100, (Game.height / 2) - 100);
      Game.ctx.font = "normal 15px Arial";
      Game.ctx.fillText('Now you are stuck and cannot go anywhere!' , (Game.width / 2) + 100, ((Game.height / 2) + 20) - 100);
      Game.ctx.font = "normal 12px Arial";
      Game.ctx.fillText('Did something happen? i don\'t know, we can\'t see from here!', (Game.width / 2) +100, ((Game.height / 2) + 40) - 100);
    }

    Game.mapAlpha += (0.14 - Game.mapAlpha) * 0.09;
    if(typeof Game.nextMap !== 'undefined'){
      Game.ctx.globalAlpha = Game.mapAlpha;
      Game.nextMap.draw();
    }

    LD.whiteFlashALpha += (0 - LD.whiteFlashALpha) * 0.3;
    Game.ctx.globalAlpha = LD.whiteFlashALpha;
    Game.ctx.fillStyle = 'rgba(205,205,205, 1)';
    Game.ctx.fillRect(0, 0, Game.width, Game.height);

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