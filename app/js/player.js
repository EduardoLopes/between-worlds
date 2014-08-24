(function(global, undefined) {

  'use strict';

  function Player() {
    this.x = 15 * 32;
    this.y = 0;
    this.next = {
      x: this.x,
      y: this.y
    };
    this.speed = 2;
    this.maxSpeed = 20;
    this.vx = 0;
    this.vy = 0;
    this.size = 16;
    this.jump = -9;
    this.overlaping = [];
    this.jumping = true;
  };

  Player.prototype.addOverlaping = function(node) {

    if(node !== undefined && this.overlaping.indexOf(node) === -1){
      this.overlaping.push(node);
    }

  };


  Player.prototype.update = function() {
    this.overlaping.length = 0;

        // if(this.x + this.size < 0){
    //   this.x = Game.width;
    //   this.next.x = this.x;
    //   Game.fall.play();
    // };

    // if(this.x > Game.width){
    //   this.x = -this.size;
    //   this.next.x = this.x;
    //   Game.fall.play();
    // };

    if(this.y > Game.height){
      this.next.y = -10;
      this.y = -10;
      Game.fall.play();
    };


    if(this.vy < this.maxSpeed){
      this.vy += 1;
    }

    this.vx *= 0.62;

    this.next.x += this.vx;
    this.next.y += this.vy;

    if(Game.Key.left){
      this.vx += -this.speed;
    }

    if(Game.Key.right){
      this.vx += this.speed;
    }

    this.addOverlaping(Game.currentMap.grid[Game.currentMap.cols * Math.floor((this.next.y + this.size) / Game.tileSize) + Math.floor((this.next.x + this.size) / Game.tileSize)]);
    this.addOverlaping(Game.currentMap.grid[Game.currentMap.cols * Math.floor((this.next.y) / Game.tileSize) + Math.floor((this.next.x) / Game.tileSize)]);
    this.addOverlaping(Game.currentMap.grid[Game.currentMap.cols * Math.floor((this.next.y) / Game.tileSize) + Math.floor((this.next.x + this.size) / Game.tileSize)]);
    this.addOverlaping(Game.currentMap.grid[Game.currentMap.cols * Math.floor((this.next.y + this.size) / Game.tileSize) + Math.floor((this.next.x) / Game.tileSize)]);

    for (var i = 0; i < this.overlaping.length; i++) {

      if(Game.solidTiles.indexOf(this.overlaping[i].type) > -1){


        if(Game.Collision.intercects(this.overlaping[i], this)){
          this.jumping = false;

          if(this.overlaping[i].edges.indexOf('t') > -1 && Game.Collision.intecectsTop(this.overlaping[i], this)){

            var y = Math.floor(this.next.y);

            while(!Game.Collision.intecectsTop(this.overlaping[i], this, y)){
              y--;
            }

            this.next.y = y;
            this.vy = 0;

            if(Game.Key.up){
              Game.jump.play();
              this.vy = this.jump;
              this.jumping = true;
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

      } else if(this.overlaping[i].type === 163){

        if(distance(this.x + (this.size / 2), this.y + (this.size / 2), this.overlaping[i].x + (Game.tileSize / 2 ), this.overlaping[i].y + (Game.tileSize / 2))<=10){
          this.overlaping[i].type = 164;
          Game.setNextMap();
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