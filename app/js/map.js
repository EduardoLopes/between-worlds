(function(global, undefined) {

  'use strict';

  var w = 0, h = 0, i = 0;

  function MapNode(x,y,i) {

    this.type = randomChoice([0,1,2,3]);
    this.entity = [];
    this.x = x;
    this.y = y;
    this.i = i;
    this.adjacents = [];
    this.edges = [];

  };


  function Map()  {

    this.cols = 64;
    this.rows = 64;
    this.map = [];
    this.spriteCoords = [];
    this.viewport = {
      width: Game.width,
      height: Game.height
    };

    for (h = 0; h < Game.sprite.height / Game.tileSize; h++) {
      for (w = 0; w < Game.sprite.width / Game.tileSize; w++) {

        this.spriteCoords[i] = [w, h];
        i++;

      }
    }

    this.generate();

  };

  //random tiles
  Map.prototype.generate = function() {

    for (h = 0; h < this.rows; h++) {
      for (w = 0; w < this.cols; w++) {

        this.map[this.cols * h + w] = new MapNode(w, h, this.cols * h + w);

      }
    }

    //store some informations in each tile of the map
    this.findAdjacents();

  };

  Map.prototype.findAdjacents = function() {

    for (h = 0; h < this.rows; h++) {
      for (w = 0; w < this.cols; w++) {

        this.addAdjacents(this.map[this.cols * h + w], this.map[this.cols * (h + 1) + w]);
        this.addAdjacents(this.map[this.cols * h + w], this.map[this.cols * (h - 1) + w]);
        this.addAdjacents(this.map[this.cols * h + w], this.map[this.cols * (h) + (w + 1)]);
        this.addAdjacents(this.map[this.cols * h + w], this.map[this.cols * (h) + (w - 1)]);

        //this will be useful for collision detection, didn't test yet, hope works ¯\_(ツ)_/¯

        if(Game.solidTiles.indexOf(this.map[this.cols * h + w].type) !== -1){

          if(this.map[this.cols * (h + 1) + w] !== undefined && Game.solidTiles.indexOf(this.map[this.cols * (h+1) + w].type) !== -1){
            this.map[this.cols * h + w].edges.push('b');
          }

          if(this.map[this.cols * (h - 1) + w] !== undefined && Game.solidTiles.indexOf(this.map[this.cols * (h-1) + w].type) !== -1){
            this.map[this.cols * h + w].edges.push('t');
          }

          if(this.map[this.cols * (h) + (w + 1)] !== undefined && Game.solidTiles.indexOf(this.map[this.cols * h + (w + 1)].type) !== -1){
            this.map[this.cols * h + w].edges.push('r');
          }

          if(this.map[this.cols * (h) + (w - 1)] !== undefined && Game.solidTiles.indexOf(this.map[this.cols * h + (w - 1)].type) !== -1){
            this.map[this.cols * h + w].edges.push('l');
          }
        }

      }
    }

  };

  Map.prototype.addAdjacents = function(node, adjacent) {

    if(typeof adjacent !== 'undefined'){

      node.adjacents.push(adjacent);

    }

  };

  Map.prototype.drawTile = function(w, h, type) {

    if(type > -1){
      Game.ctx.drawImage(
        Game.sprite,
        this.spriteCoords[type][0] * Game.tileSize,
        this.spriteCoords[type][1] * Game.tileSize,
        Game.tileSize,
        Game.tileSize,
        (w * Game.tileSize),
        (h * Game.tileSize),
        Game.tileSize,
        Game.tileSize
      );
    }

  };

  Map.prototype.draw = function() {


    for ( h = 0; h < this.rows; h++) {
      for (w = 0; w < this.cols; w++) {

        this.drawTile(w, h, this.map[this.cols * h + w].type);

      };
    };

  };

  Map.prototype.update = function() {

  };

  global.Game.Map = Map;

}(window));

