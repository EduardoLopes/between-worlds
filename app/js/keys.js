(function(global, undefined) {

  var key = {
    up: false,
    down: false,
    left: false,
    right: false
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

  });

  document.addEventListener('keyup', function(e) {
    e.preventDefault();

    if(e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 81) key.up = false;
    if(e.keyCode === 40 || e.keyCode === 83 || e.keyCode === 90) key.down = false;
    if(e.keyCode === 39 || e.keyCode === 68) key.right = false;
    if(e.keyCode === 37 || e.keyCode === 65) key.left = false;

  });

  global.Game.Key = key;

}(window));