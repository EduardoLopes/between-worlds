(function(global, undefined) {

  'use strict';

  //ludum dare
  /*
  * Everything in LD is private
  */
  var LD = {};

  document.addEventListener('keydown', function(e) {
    e.preventDefault();

    if(e.keyCode === 88){
      var current = Game.currentMap;
      Game.currentMap = Game.nextMap;
      Game.nextMap = current;

      document.body.style.background = Game.currentMap.color;
    }

  });

  LD.init = function() {

    Game.canvas.width = Game.width;
    Game.canvas.height = Game.height;

    LD.currentState = 'play';
    LD.maps = [];
    LD.mapObjects = [];

    LD.maps[0] = [64, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 65, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 74, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 0, 53, 2, 2, 2, 2, 2, 75, 64, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 0, 0, 21, 22, 22, 22, 22, 22, 65, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 74, 2, 2, 2, 2, 2, 2, 2, 3, 0, 53, 2, 2, 2, 2, 2, 2, 2, 2, 75, 12, 12, 12, 12, 12, 12, 12, 12, 13, 0, 21, 22, 22, 22, 22, 22, 22, 22, 22, 65, 12, 12, 12, 12, 12, 12, 12, 12, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 12, 12, 12, 12, 12, 12, 12, 12, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 12, 12, 12, 12, 12, 12, 12, 12, 74, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 75];
    LD.maps[1] = [69, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 70, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 79, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 0, 0, 6, 7, 7, 7, 7, 7, 80, 69, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28, 0, 36, 26, 27, 27, 27, 27, 27, 70, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 79, 7, 7, 7, 7, 7, 7, 7, 8, 0, 6, 7, 7, 7, 7, 7, 7, 7, 7, 80, 17, 17, 17, 17, 20, 17, 40, 17, 18, 0, 26, 27, 27, 27, 27, 27, 27, 27, 27, 70, 17, 20, 17, 17, 10, 17, 20, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 17, 17, 20, 20, 17, 17, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 17, 17, 17, 17, 17, 17, 17, 79, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 80];

    LD.mapObjects[0] = new Game.Map(LD.maps[0], '#c14965');
    LD.mapObjects[1] = new Game.Map(LD.maps[1], '#c16049');

    Game.currentMap = LD.mapObjects[0];
    Game.nextMap = LD.mapObjects[1];

    LD.player = new Game.Player();

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