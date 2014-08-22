(function(global, undefined) {

  'use strict';

  //ludum dare
  var LD = {};

  LD.init = function() {

    Game.canvas.width = Game.width;
    Game.canvas.height = Game.height;

    LD.currentState = 'play';

    LD.map = new Game.Map();

    LD.loop();

  };

  LD.state = [];

  LD.state['play'] = function() {

    /* draw and update functions goes here */

    LD.map.draw();

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