(function(global, undefined) {

  var key = {
    up: false,
    down: false,
    left: false,
    right: false
  };

  document.addEventListener('keydown', function(e) {
    e.preventDefault();

    if(e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 81) key.up = true;
    if(e.keyCode === 40 || e.keyCode === 83 || e.keyCode === 90) key.down = true;
    if(e.keyCode === 39 || e.keyCode === 65) key.right = true;
    if(e.keyCode === 37 || e.keyCode === 68) key.left = true;

  });

  document.addEventListener('keyup', function(e) {
    e.preventDefault();

    if(e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 81) key.up = false;
    if(e.keyCode === 40 || e.keyCode === 83 || e.keyCode === 90) key.down = false;
    if(e.keyCode === 39 || e.keyCode === 65) key.right = false;
    if(e.keyCode === 37 || e.keyCode === 68) key.left = false;

  });

  global.Game.Key = key;

}(window));