(function(global, undefined) {

  var key = {
    up: false,
    down: false,
    left: false,
    right: false,
    //switch map
    sMap: false,
    sMapPressed: false,
    m: false,
    mPressed: false,
    keydown: false
  };

  document.addEventListener('keydown', function(e) {
    e.preventDefault();

    //UP or W or Q
    if(e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 81) key.up = true;
    //DOWN or S or Z
    if(e.keyCode === 40 || e.keyCode === 83 || e.keyCode === 90) key.down = true;
    //RIGHT or D
    if(e.keyCode === 39 || e.keyCode === 68) key.right = true;
    //LEFT or A
    if(e.keyCode === 37 || e.keyCode === 65) key.left = true;
    //X or Space or L
    if(e.keyCode === 88 || e.keyCode === 76) key.sMap = true;
    //M
    if(e.keyCode === 77) key.m = true;

    key.keydown = true;

  });

  document.addEventListener('keyup', function(e) {
    e.preventDefault();

    if(e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 81) key.up = false;
    if(e.keyCode === 40 || e.keyCode === 83 || e.keyCode === 90) key.down = false;
    if(e.keyCode === 39 || e.keyCode === 68) key.right = false;
    if(e.keyCode === 37 || e.keyCode === 65) key.left = false;
    if(e.keyCode === 88 || e.keyCode === 76) {
      key.sMap = false;
      key.sMapPressed = false;
    };

    if(e.keyCode === 77){
      key.mPressed = false
      key.m = false;
    };

    key.keydown = false;

  });

  global.Game.Key = key;

}(window));