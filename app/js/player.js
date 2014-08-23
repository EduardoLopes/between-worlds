(function(global, undefined) {

  'use strict';

  function Player() {
    this.x = 32;
    this.y = 32;
    this.next = {
      x: this.x,
      y: this.y
    };
    this.speed = 3;
    this.vx = 0;
    this.vy = 0;
    this.size = 16;
    this.jump = -9;
    this.overlaping = [];
  };

  Player.prototype.addOverlaping = function(node) {

    if(node !== undefined && this.overlaping.indexOf(node) === -1){
      this.overlaping.push(node);
    }

  };


  Player.prototype.update = function() {
    this.overlaping.length = 0;

    this.vy += 1;
    this.vx *= 0.62;

    if(Game.Key.left){
      this.vx += -this.speed;
    }

    if(Game.Key.right){
      this.vx += this.speed;
    }

    this.next.x += this.vx;
    this.next.y += this.vy;

    this.addOverlaping(Game.currentMap.grid[Game.currentMap.cols * Math.floor((this.next.y + this.size) / Game.tileSize) + Math.floor((this.next.x + this.size) / Game.tileSize)]);
    this.addOverlaping(Game.currentMap.grid[Game.currentMap.cols * Math.floor((this.next.y) / Game.tileSize) + Math.floor((this.next.x) / Game.tileSize)]);
    this.addOverlaping(Game.currentMap.grid[Game.currentMap.cols * Math.floor((this.next.y) / Game.tileSize) + Math.floor((this.next.x + this.size) / Game.tileSize)]);
    this.addOverlaping(Game.currentMap.grid[Game.currentMap.cols * Math.floor((this.next.y + this.size) / Game.tileSize) + Math.floor((this.next.x) / Game.tileSize)]);

  for (var i = 0; i < this.overlaping.length; i++) {

    if(Game.solidTiles.indexOf(this.overlaping[i].type) > -1){

      if(Game.Collision.intercects(this.overlaping[i], this)){

        if(this.overlaping[i].edges.indexOf('t') > -1 && Game.Collision.intecectsTop(this.overlaping[i], this)){

          var y = Math.floor(this.next.y);

          while(!Game.Collision.intecectsTop(this.overlaping[i], this, y)){
            y--;
          }

          this.next.y = y;
          this.vy = 0;

          if(Game.Key.up){
            this.vy = this.jump;
          }

        }

      }

      if(this.overlaping[i].edges.indexOf('b') > -1 && Game.Collision.intercectsBottom(this.overlaping[i], this)){

        var y = Math.floor(this.next.y);

        while(!Game.Collision.intercectsBottom(this.overlaping[i], this, y)){
          y++;
        }

        this.next.y = y;
        this.vy = 0;

      }

      if ( this.overlaping[i].edges.indexOf('l') > -1 && Game.Collision.intercectsLeft( this.overlaping[i], this ) ){

          var x = Math.floor(this.next.x);

          while(!Game.Collision.intercectsLeft(this.overlaping[i], this, x)){

            x--;

          }

          this.next.x = x;
          this.vx = 0;

        }

        if(this.overlaping[i].edges.indexOf('r') > -1 && Game.Collision.intercectsRight( this.overlaping[i], this ) ){

          var x = Math.floor(this.next.x);

          while(!Game.Collision.intercectsRight(this.overlaping[i], this, x)){

            x++;

          }

          this.next.x = x;
          this.vx = 0;

        }

    }

  }


  this.x = this.next.x;
  this.y = this.next.y;


  };

  Player.prototype.draw = function() {

    Game.ctx.fillRect(this.x, this.y, this.size, this.size);

  };

  global.Game.Player = Player;

}(window));