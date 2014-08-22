var Game = {
  width: 640,
  height: 384,
  tileSize: 32,
  solidTiles: [1],
  canvas: document.getElementById('canvas'),
  ctx: this.canvas.getContext('2d'),
  sprite: document.getElementById('sprite')
};

function random( min, max ) {
  return Math.round(min + ( Math.random() * ( max - min ) ));
}

function randomChoice(array){
  return array[ random( 0, array.length - 1 ) ];
}