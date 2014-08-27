/*Everything in Game is global*/

var Game = {
  width: 640,
  height: 384,
  tileSize: 32,
  solidTiles: [],
  mapAlpha: 1,
  canvas: document.getElementById('canvas'),
  ctx: this.canvas.getContext('2d'),
  sprite: document.getElementById('sprite'),
  end: false
};

Game.preload = {
  music1: false,
  music2: false
}

var jump = jsfxr([0,,0.1812,,0.1349,0.4524,,0.2365,,,,,,0.0819,,,,,1,,,,,0.5]);
var changeMap = jsfxr([1,0.4084,0.8252,0.1305,0.773,0.3455,,0.097,-0.0016,0.3674,-0.5267,-0.7512,-0.4427,0.603,0.1031,0.5199,-0.0151,-0.192,0.9727,-0.767,-0.8406,,0.003,0.5]);
var fall = jsfxr([2,0.8717,0.04,,0.03,0.64,,0.08,0.12,0.04,,-0.4,,,-0.7376,0.1885,-0.1999,-0.0999,0.82,-0.42,0.47,0.16,-0.18,0.74]);
var blocked = jsfxr([3,,0.0367,,0.2562,0.2087,,-0.4239,,,,,,,,,,,1,,,,,0.5]);
var win = jsfxr([1,,0.2601,,0.4024,0.4219,,0.4438,,,,,,,,0.4664,,,1,,,,,0.5]);

Game.jump = new Howl({
  urls: [jump]
});

Game.changeMap = new Howl({
  urls: [changeMap]
});

Game.fall = new Howl({
  urls: [fall]
});

Game.blocked = new Howl({
  urls: [blocked]
});

Game.win = new Howl({
  urls: [win]
});


Game.music1 = new Howl({
  urls: ['music/worlds.wav', 'music/worlds.ogg','music/worlds.mp3'],
  loop: true,
  volume: 0.7,
  onload: function() {
    Game.preload.music1 = true;
  }
});

Game.music2 = new Howl({
  urls: ['music/worlds2.wav', 'music/worlds2.ogg','music/worlds2.mp3'],
  loop: true,
  volume: 0.7,
  onload: function() {
    Game.preload.music2 = true;
  }
});

for (var i = 1; i < 160; i++) {
  Game.solidTiles.push(i);
};

//Some helper functions
function random( min, max ) {
  return Math.round(min + ( Math.random() * ( max - min ) ));
}

function randomChoice(array){
  return array[ random( 0, array.length - 1 ) ];
}

function distance(ax, ay, bx, by) {
  return Math.sqrt(Math.pow( ax - bx, 2) + Math.pow( ay - by, 2));
}