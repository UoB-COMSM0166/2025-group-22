class Player {
  constructor() {
    this.pos = createVector(200, 200);
    this.velocity = createVector(0, 0);
    this.gravity = 10;
    this.size = 50;
    // this.sprite stuff
    this.spriteSize = 96
    this.injured = false;
    this.injuryTimer = 0;
    this.animationTimer = 0;
    this.lives = 3;
    // items/keys/etc...
    this.keys = 0;
    this.movingState = 0;
    this.bullet = 0;
  }

  update() {
    if (this.isAlive()) {
      this.updateInjured()
      this.processInput();
      // update position
      this.updateGravity();
      if (this.touchingEnemy()) {
        this.injured = true;
        if (this.injuryTimer == 0) {
          this.lives--;
        }
      }
      this.touchingItem();
    } else {
      gameState = "gameOver";
    }

  }
   collectItem(item) {
      if (currentMap.itemList[item].type == "heart") {
        // remove item from map
        currentMap.blocks[currentMap.itemList[item].pos.y / 50][currentMap.itemList[item].pos.x / 50] = 0;
        // increase heartcount & remove item from map's itemList
        this.lives++;
        currentMap.itemList.splice(item, 1);
      } else if (currentMap.itemList[item].type == "key") {
        // remove item from map
        currentMap.blocks[currentMap.itemList[item].pos.y / 50][currentMap.itemList[item].pos.x / 50] = 0;
        // increase keycount & remove item from map's itemList
        this.keys++;
        currentMap.itemList.splice(item, 1);
      } else if (currentMap.itemList[item].type == "door") {
        // switch to the next level!!!!!
        if (this.keys > 0) {
          if(currentLevel == "level1"){
            this.keys = 0;
            currentLevel = "level2";
          }else if(currentLevel == "level2"){
            this.keys = 0;
            currentLevel = "level3";
          }else{
            this.keys = 0;
            this.lives = 0;
            gameState = "win";
          }
        }
      }
    }
  
  isAlive() {
    if (this.lives > 0)
      return true;
    return false;
  }

  updateInjured() {
    if (this.injured) {
      //FPS: 60
      if (this.injuryTimer < 120) {
        this.injuryTimer++;
      } else {
        this.injured = false;
        this.injuryTimer = 0;
      }
    }
  }

  getBlockClass(offX = 0, offY = 0) {
    var gridPos = this.getLoc(this.pos.x + offX, this.pos.y + offY);
    return currentMap.blocks[gridPos[1]][gridPos[0]];
  }

  getLoc(x = this.pos.x, y = this.pos.y) {
    var location = [floor((x + currentMap.xOffset) / 50), floor((y + currentMap.yOffset) / 50)];
    return location;
  }

  getBlockDir(offX = 0, offY = 0) {
    var gridPos = this.getLoc(this.pos.x + offX, this.pos.y + offY);
    if(currentMap.blocks[gridPos[1]][gridPos[0]].type === "standard") {
      return currentMap.blocks[gridPos[1]][gridPos[0]].direction;
    }
  }

  touchingEnemy() {
    for (var i = 0; i < currentMap.enemyList.length; i++) {
      var distance = dist(
        this.pos.x + currentMap.xOffset, 
        this.pos.y + currentMap.yOffset, 
        currentMap.enemyList[i].pos.x, 
        currentMap.enemyList[i].pos.y)
      if (distance < 40) {
        return true;
      }
    }
    return false;
  }

  touchingItem() {
    for (var i = 0; i < currentMap.itemList.length; i++) {
      var distance = dist(
        this.pos.x + currentMap.xOffset, 
        this.pos.y + currentMap.yOffset, 
        currentMap.itemList[i].pos.x, 
        currentMap.itemList[i].pos.y)
      if (distance < 40) {
        this.collectItem(i);
      }
    }
  }

  onWall() {
    // checking bottom left
    if (this.getBlockClass(0, this.size) == "Wall" || this.getBlockClass(0, this.size) == "DirectionWall" ) {
      this.pos.y = this.getLoc()[1] * 50
      return "bottom";
    }
    // checking bottom right
    if (this.getBlockClass(this.size - 1, this.size) == "Wall" || this.getBlockClass(this.size - 1, this.size) == "DirectionWall") {
      this.pos.y = this.getLoc()[1] * 50
      return "bottom";
    }
    // checking top left
    if (this.getBlockClass(0, 0) == "Wall" || this.getBlockClass(0, 0) == "DirectionWall") {
      this.pos.y = this.getLoc()[1] * 50 + 50
      return "top";
    }
    // checking top right
    if (this.getBlockClass(this.size - 1, 0) == "Wall" || this.getBlockClass(this.size - 1, 0) == "DirectionWall") {
      this.pos.y = this.getLoc()[1] * 50 + 50
      return "top";
    }
    return false;
  }

  updateGravity() {
    this.pos.add(this.velocity);

    if (this.isFalling()) {
      this.pos.add(0, this.gravity);
    }

    // 根据玩家的垂直位置调整地图的垂直偏移量
    if (this.pos.y < height / 3) {
      currentMap.yOffset = this.pos.y - height / 3;
    } else if (this.pos.y > (2 * height) / 3) {
      currentMap.yOffset = this.pos.y - (2 * height) / 3;
    } else {
      currentMap.yOffset = 0;
    }

    if (this.isFalling() && this.onWall() != "top") {
      this.velocity.mult(0.9);
    } else if (this.isFalling() && this.onWall() == "top") {
      this.velocity.y = 0;
    } else {
      this.velocity.mult(0);
    }
  }

  jump() {
    if (!this.isFalling()) {
      this.velocity.y = -30
    }
  }

  isFalling() {
    if (this.onWall() != "bottom")
      return true;
    return false;
  }

  processInput(key) {
    //A
    if (keyIsDown(65)) {
      if (this.getBlockClass(-1, 25) != "Wall" && this.getBlockClass(-1, 25) != "DirectionWall") {
        if (this.pos.x < width / 6) {
          this.pos.x -= 5;
        } else {
          currentMap.xOffset -= 5

        }
      }
    }
    //D
    if (keyIsDown(68)) {
      if (this.getBlockClass(this.size, 25) != "Wall" && this.getBlockClass(this.size, 25) != "DirectionWall") {
        if (this.pos.x < width / 3) {
          this.pos.x += 5;
        } else {
          currentMap.xOffset += 5

        }
      }
    }
    //W
    if (keyIsDown(87)) {
      this.jump();
    }

    if(key === "P" || key === "p"){
      if(gameState === "pause"){
        gameState = "playing";
      }else if(gameState === "playing"){
        gameState = "pause";
      }
    }
    
    //press 'E' to teleport
    if(key === 'e' || key === 'E'){

      //teleport from the right of the standard wall
      if(this.getBlockClass(-1, 25).type === "standard" && this.getBlockDir(-1, 25) === "right"){
        var current_x = this.getLoc(this.pos.x -1, this.pos.y + 25)[0];
        var current_y = this.getLoc(this.pos.x -1, this.pos.y + 25)[1];
        for (var row = 0; row < currentMap.blocks.length; row++) {
          for (var col = 0; col < currentMap.blocks[row].length; col++) {
            if(currentMap.blocks[row][col].type == "standard") {
              if(col != current_x || row != current_y) {

                //teleport to the right of the standard wall
                if(currentMap.blocks[row][col].direction === "right") {
                  this.pos.x = 50 * col + 50 - currentMap.xOffset;
                  this.pos.y = 50* row;
                  currentMap.xOffset += (col - current_x)*50;
                  this.pos.x -= (col - current_x)*50;
                }
                //teleport to the left of the standard wall
                if(currentMap.blocks[row][col].direction === "left") {
                  this.pos.x = 50 * col - 50 - currentMap.xOffset;
                  this.pos.y = 50 * row;
                  currentMap.xOffset += (col - current_x)*50 - 100;
                  this.pos.x -= (col - current_x)*50 - 100;
                }

                //teleport to the top of the standard wall
                if(currentMap.blocks[row][col].direction === "top") {
                  this.pos.x = 50 * col - currentMap.xOffset;
                  this.pos.y = 50* row - 50;
                  currentMap.xOffset += (col - current_x)*50 - 50;
                  this.pos.x -= (col - current_x)*50 - 50;
                }

                //teleport to the bottom of the standard wall
                if(currentMap.blocks[row][col].direction === "bottom") {
                  this.pos.x = 50 * col - currentMap.xOffset;
                  this.pos.y = 50* row + 50;
                  currentMap.xOffset += (col - current_x)*50 - 50;
                  this.pos.x -= (col - current_x)*50 - 50; 
                }
              }
            }
          }
        }
      }

      //teleport from the left of the standard wall
      else if(this.getBlockClass(this.size, 25).type === "standard" && this.getBlockDir(this.size, 25) === "left"){
        var current_x = this.getLoc(this.pos.x + this.size, this.pos.y + 25)[0];
        var current_y = this.getLoc(this.pos.x + this.size, this.pos.y + 25)[1];
        for (var row = 0; row < currentMap.blocks.length; row++) {
          for (var col = 0; col < currentMap.blocks[row].length; col++) {
            if(currentMap.blocks[row][col].type == "standard") {
              if(col != current_x || row != current_y) {
                if(currentMap.blocks[row][col].direction === "right") {
                  this.pos.x = 50 * col + 50 - currentMap.xOffset;
                  this.pos.y = 50* row;
                  currentMap.xOffset += (col - current_x)*50 + 100;
                  this.pos.x -= (col - current_x)*50 + 100;
                  break;
                }
                else if(currentMap.blocks[row][col].direction === "left") {
                  this.pos.x = 50 * col - 50 - currentMap.xOffset;
                  this.pos.y = 50* row;
                  currentMap.xOffset += (col - current_x)*50;
                  this.pos.x -= (col - current_x)*50; 
                  break
                }
                else if(currentMap.blocks[row][col].direction === "top") {
                  this.pos.x = 50 * col - currentMap.xOffset;
                  this.pos.y = 50* row - 50;
                  currentMap.xOffset += (col - current_x)*50 + 50;
                  this.pos.x -= (col - current_x)*50 + 50;
                  break
                }
                else if(currentMap.blocks[row][col].direction === "bottom") {
                  this.pos.x = 50 * col - currentMap.xOffset;
                  this.pos.y = 50* row + 50;
                  currentMap.xOffset += (col - current_x)*50 + 50;
                  this.pos.x -= (col - current_x)*50 + 50;
                  break
                }
              }
            }
          }
        }
      }

      //teleport from the top of the standard
      else if(this.getBlockClass(25, this.size + 1).type === "standard" && this.getBlockDir(25, this.size+1) === "top"){
        var current_x = this.getLoc(this.pos.x + 25, this.pos.y + this.size + 1)[0];
        var current_y = this.getLoc(this.pos.x + 25, this.pos.y + this.size + 1)[1];
        for (var row = 0; row < currentMap.blocks.length; row++) {
          for (var col = 0; col < currentMap.blocks[row].length; col++) {
            if(currentMap.blocks[row][col].type == "standard") {
              if(col != current_x || row != current_y) {

                if(currentMap.blocks[row][col].direction === "right") {
                  this.pos.x = 50 * col + 50 - currentMap.xOffset;
                  this.pos.y = 50* row;
                  currentMap.xOffset += (col - current_x)*50 + 50;
                  this.pos.x -= (col - current_x)*50 + 50;
                }
                if(currentMap.blocks[row][col].direction === "left") {
                  this.pos.x = 50 * col - 50 - currentMap.xOffset;
                  this.pos.y = 50* row;
                  currentMap.xOffset += (col - current_x)*50 -50;
                  this.pos.x -= (col - current_x)*50 -50;
                }
                if(currentMap.blocks[row][col].direction === "top") {
                  this.pos.x = 50 * col - currentMap.xOffset;
                  this.pos.y = 50* row - 100;
                  currentMap.xOffset += (col - current_x)*50;
                  this.pos.x -= (col - current_x)*50;
                }
                if(currentMap.blocks[row][col].direction === "bottom") {
                  this.pos.x = 50 * col - currentMap.xOffset;
                  this.pos.y = 50* row + 50;
                  currentMap.xOffset += (col - current_x)*50;
                  this.pos.x -= (col - current_x)*50;
                }
              }
            }
          }
        }
      }

      //teleport from the bottom of the standard wall
      else if(this.getBlockClass(25, -1).type === "standard" && this.getBlockDir(25, -1) === "bottom"){
        var current_x = this.getLoc(this.pos.x + 25, this.pos.y - 1)[0];
        var current_y = this.getLoc(this.pos.x + 25, this.pos.y - 1)[1];
        for (var row = 0; row < currentMap.blocks.length; row++) {
          for (var col = 0; col < currentMap.blocks[row].length; col++) {
            if(currentMap.blocks[row][col].type == "standard") {
              if(col != current_x || row != current_y) {

                if(currentMap.blocks[row][col].direction === "right") {
                  this.pos.x = 50 * col + 50 - currentMap.xOffset;
                  this.pos.y = 50* row;
                  currentMap.xOffset += (col - current_x)*50 +50;
                  this.pos.x -= (col - current_x)*50 +50; 
                }
                if(currentMap.blocks[row][col].direction === "left") {
                  this.pos.x = 50 * col - 50 - currentMap.xOffset;
                  this.pos.y = 50* row;
                  currentMap.xOffset += (col - current_x)*50 - 50;
                  this.pos.x -= (col - current_x)*50 - 50; 
                }
                if(currentMap.blocks[row][col].direction === "top") {
                  this.pos.x = 50 * col - currentMap.xOffset;
                  this.pos.y = 50* row - 50;
                  currentMap.xOffset += (col - current_x)*50;
                  this.pos.x -= (col - current_x)*50; 
                }
                if(currentMap.blocks[row][col].direction === "bottom") {
                  this.pos.x = 50 * col - currentMap.xOffset;
                  this.pos.y = 50* row + 50;
                  currentMap.xOffset += (col - current_x)*50;
                  this.pos.x -= (col - current_x)*50; 
                }
              }
            }
          }
        }
      }
    }

    if(key === " ") {
      pistol = 1 - pistol;
    }
    if(key === 'blue pistol click'){
      this.bullet = new Bullet(this.pos.x + currentMap.xOffset, this.pos.y, mouseX + currentMap.xOffset, mouseY + currentMap.yOffset, [0,5], "blue");
    }

    if(key === 'red pistol click'){
      this.bullet = new Bullet(this.pos.x + currentMap.xOffset, this.pos.y, mouseX + currentMap.xOffset, mouseY + currentMap.yOffset, [0,5], "red");
    }
  }
  
  draw() {
    for (var i = 0; i < this.lives; i++) {
      image(tiles_image, i * 25, 10, 50, 50, 11 * 64, 4 * 64, 64, 64)
    }
    if(this.injured && this.injuryTimer % 6 == 0){
      image(player_image, this.pos.x, this.pos.y - currentMap.yOffset, this.size, this.size, 0, 0, this.spriteSize, this.spriteSize);
    }
    else{
      image(player_image, this.pos.x, this.pos.y - currentMap.yOffset, this.size, this.size, 0, 0, this.spriteSize, this.spriteSize);
    }
  }
}