(function(global, undefined) {

  'use strict';

  var w = 0, h = 0, i = 0;
  var spriteCoords = {x: 0, y: 0};

  //Each tile
  function MapNode(x,y,i,t) {

    this.type = t;
    this.entity = [];
    this.x = x * Game.tileSize;
    this.y = y * Game.tileSize;
    this.i = i;
    this.adjacents = [];
    this.edges = [];

  };

  //Simple map class
  function Map(map, color, border, bg, index)  {

    this.cols = 20;
    this.rows = 12;
    this.grid = [];
    this.color = color;
    this.border = border;
    this.background = bg;
    this.viewport = {
      width: Game.width,
      height: Game.height
    };
    this.map = map;
    i = 0;
    this.generate();
    this.index = index;

  };


  Map.prototype.generate = function() {

    for (h = 0; h < this.rows; h++) {
      for (w = 0; w < this.cols; w++) {

        this.grid[this.cols * h + w] = new MapNode(w, h, this.cols * h + w, Math.max(0, this.map[this.cols * h + w] - 1));

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

        if(Game.solidTiles.indexOf(this.grid[this.cols * h + w].type) > -1){
        //if(this.grid[this.cols * h + w].type !== 0){

          if(this.grid[this.cols * (h + 1) + w] !== undefined && Game.solidTiles.indexOf(this.grid[this.cols * (h+1) + w].type) === -1){
            this.grid[this.cols * h + w].edges.push('b');
          }

          if(this.grid[this.cols * (h - 1) + w] !== undefined && Game.solidTiles.indexOf(this.grid[this.cols * (h-1) + w].type) === -1){
            this.grid[this.cols * h + w].edges.push('t');
          }

          if(this.grid[this.cols * (h) + (w + 1)] !== undefined && Game.solidTiles.indexOf(this.grid[this.cols * h + (w + 1)].type) === -1){
            this.grid[this.cols * h + w].edges.push('r');
          }

          if(this.grid[this.cols * (h) + (w - 1)] !== undefined && Game.solidTiles.indexOf(this.grid[this.cols * h + (w - 1)].type) === -1){
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
    spriteCoords.y = Math.floor(type / 10);
    spriteCoords.x = (type - spriteCoords.y * 10);

    Game.ctx.drawImage(
      Game.sprite,
      spriteCoords.x * Game.tileSize,
      spriteCoords.y * Game.tileSize,
      Game.tileSize,
      Game.tileSize,
      (w * Game.tileSize),
      (h * Game.tileSize),
      Game.tileSize,
      Game.tileSize
    );

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

