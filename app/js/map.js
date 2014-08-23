(function(global, undefined) {

  'use strict';

  var w = 0, h = 0, i = 0;

  //Each tile
  function MapNode(x,y,i,t) {

    this.type = t;
    this.entity = [];
    this.x = x;
    this.y = y;
    this.i = i;
    this.adjacents = [];
    this.edges = [];

  };

  //Simple map class
  function Map()  {

    this.cols = 20;
    this.rows = 12;
    this.grid = [];
    this.spriteCoords = [];
    this.viewport = {
      width: Game.width,
      height: Game.height
    };
    this.map = [61, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 63, 71, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 71, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 74, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 0, 1, 82, 82, 82, 82, 82, 75, 64, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 0, 0, 21, 62, 62, 62, 62, 62, 65, 71, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 71, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 74, 2, 2, 2, 2, 2, 2, 2, 3, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 75, 72, 12, 12, 12, 12, 12, 12, 12, 13, 0, 21, 22, 22, 22, 22, 22, 22, 22, 22, 65, 72, 12, 12, 12, 12, 12, 12, 12, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 72, 12, 12, 12, 12, 12, 12, 12, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 72, 72, 72, 72, 72, 72, 72, 72, 74, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 83];

    for (h = 0; h < Game.sprite.height / Game.tileSize; h++) {
      for (w = 0; w < Game.sprite.width / Game.tileSize; w++) {

        this.spriteCoords[i] = [w, h];
        i++;

      }
    }

    this.generate();

  };


  Map.prototype.generate = function() {

    for (h = 0; h < this.rows; h++) {
      for (w = 0; w < this.cols; w++) {

        this.grid[this.cols * h + w] = new MapNode(w, h, this.cols * h + w, this.map[this.cols * h + w] - 1);


      }
    }

    //store some informations in each tile of the map
    this.findAdjacents();

  };

  Map.prototype.findAdjacents = function() {

    for (h = 0; h < this.rows; h++) {
      for (w = 0; w < this.cols; w++) {

        this.addAdjacents(this.grid[this.cols * h + w], this.grid[this.cols * (h + 1) + w]);
        this.addAdjacents(this.grid[this.cols * h + w], this.grid[this.cols * (h - 1) + w]);
        this.addAdjacents(this.grid[this.cols * h + w], this.grid[this.cols * (h) + (w + 1)]);
        this.addAdjacents(this.grid[this.cols * h + w], this.grid[this.cols * (h) + (w - 1)]);

        //this will be useful for collision detection, didn't test yet, hope works ¯\_(ツ)_/¯

        if(Game.solidTiles.indexOf(this.grid[this.cols * h + w].type) !== -1){

          if(this.grid[this.cols * (h + 1) + w] !== undefined && Game.solidTiles.indexOf(this.grid[this.cols * (h+1) + w].type) !== -1){
            this.grid[this.cols * h + w].edges.push('b');
          }

          if(this.grid[this.cols * (h - 1) + w] !== undefined && Game.solidTiles.indexOf(this.grid[this.cols * (h-1) + w].type) !== -1){
            this.grid[this.cols * h + w].edges.push('t');
          }

          if(this.grid[this.cols * (h) + (w + 1)] !== undefined && Game.solidTiles.indexOf(this.grid[this.cols * h + (w + 1)].type) !== -1){
            this.grid[this.cols * h + w].edges.push('r');
          }

          if(this.grid[this.cols * (h) + (w - 1)] !== undefined && Game.solidTiles.indexOf(this.grid[this.cols * h + (w - 1)].type) !== -1){
            this.grid[this.cols * h + w].edges.push('l');
          }
        }

      }
    }

  };

  Map.prototype.addAdjacents = function(node, adjacent) {

    if(typeof adjacent !== undefined){

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

        this.drawTile(w, h, this.grid[this.cols * h + w].type);

      };
    };

  };

  Map.prototype.update = function() {

  };

  global.Game.Map = Map;

}(window));

