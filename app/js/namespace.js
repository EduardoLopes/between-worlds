/*Everything in Game is global*/

var Game = {
  width: 640,
  height: 384,
  tileSize: 32,
  solidTiles: [63,64,73,74,68,69,78,79],
  canvas: document.getElementById('canvas'),
  ctx: this.canvas.getContext('2d'),
  sprite: document.getElementById('sprite')
};

for (var i = 1; i < 59; i++) {
  Game.solidTiles.push(i);
};

//Some helper functions
function random( min, max ) {
  return Math.round(min + ( Math.random() * ( max - min ) ));
}

function randomChoice(array){
  return array[ random( 0, array.length - 1 ) ];
}