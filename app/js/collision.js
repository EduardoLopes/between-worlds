(function(global) {

  'use strict';

  var Collision = {};

  Collision.intercects = function(obj1, obj2){

      if(obj1.x < obj2.next.x + obj2.size && obj1.y < obj2.next.y + obj2.size &&
         obj1.x + Game.tileSize > obj2.next.x && obj1.y + Game.tileSize > obj2.next.y ){

        return true;
      }
      return false;
  };

  Collision.intecectsTop = function(obj1, obj2, y) {
    y = y || obj2.y;

    if(obj1.x <= obj2.x + obj2.size &&
       obj1.x + Game.tileSize >= obj2.x && obj1.y >= y + obj2.size){
      return true;
    }
    return false;

  };

  Collision.intercectsRight = function(obj1, obj2, x) {
    x = x || obj2.x;

    if(obj1.x + Game.tileSize <= x){
      return true;
    }

    return false;
  };

  Collision.intercectsLeft = function(obj1, obj2, x) {
    x = x || obj2.x;

    if(obj1.x >= x + obj2.size){
      return true;
    }

    return false;

  };

  Collision.intercectsBottom = function(obj1, obj2, y) {
    y = y || obj2.y;

    if(obj1.x + Game.tileSize >= obj2.x && obj1.y + Game.tileSize <= y){
      return true;
    }

    return false;

  };

  global.Game.Collision = Collision;

}(window));