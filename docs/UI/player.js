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
    this.endingMessage = "GAME OVER";
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
      textSize(50);
      fill(255);
      text(this.endingMessage, 250, 200);
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
          this.lives = 0;
          this.endingMessage = "YOU DID IT!!!!";
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

  getBlockType(offX = 0, offY = 0) {
    var z = this.getLoc(this.pos.x + offX, this.pos.y + offY);
    return currentMap.blocks[z[1]][z[0]].constructor.name;
  }

  getLoc(x = this.pos.x, y = this.pos.y) {
    var location = [floor((x + currentMap.xOffset) / 50), floor(y / 50)];
    return location;
  }

  getBlockDir(offX = 0, offY = 0) {
    var z = this.getLoc(this.pos.x + offX, this.pos.y + offY);
    if(currentMap.blocks[z[1]][z[0]].constructor.name === "PortalSolid") {
      return currentMap.blocks[z[1]][z[0]].direction;
    }
  }

  touchingEnemy() {
    for (var i = 0; i < currentMap.enemyList.length; i++) {
      var distance = dist(this.pos.x + currentMap.xOffset, this.pos.y, currentMap.enemyList[i].pos.x, currentMap.enemyList[i].pos.y)
      if (distance < 40) {
        return true;
      }
    }
    return false;
  }

  touchingItem() {
    for (var i = 0; i < currentMap.itemList.length; i++) {
      var distance = dist(this.pos.x + currentMap.xOffset, this.pos.y, currentMap.itemList[i].pos.x, currentMap.itemList[i].pos.y)
      if (distance < 40) {
        this.collectItem(i);
      }
    }

  }

  onSolid() {
    // checking bottom left
    if (this.getBlockType(0, this.size) == "Solid") {
      this.pos.y = this.getLoc()[1] * 50
      return "bottom";
    }
    // checking bottom right
    if (this.getBlockType(this.size - 1, this.size) == "Solid") {
      this.pos.y = this.getLoc()[1] * 50
      return "bottom";
    }
    // checking top left
    if (this.getBlockType() == "Solid") {
      this.pos.y = this.getLoc()[1] * 50 + 50
      return "top";
    }
    // checking top right
    if (this.getBlockType(this.size - 1, 0) == "Solid") {
      this.pos.y = this.getLoc()[1] * 50 + 50
      return "top";
    }
    return false;
  }

  //傳送
  onPortalSolid() {
    if (this.getBlockType(0, this.size) == "PortalSolid") {
      this.pos.y = this.getLoc()[1] * 50
      return "bottom";
    }
    // checking bottom right
    if (this.getBlockType(this.size - 1, this.size) == "PortalSolid") {
      this.pos.y = this.getLoc()[1] * 50
      return "bottom";
    }
    // checking top left
    if (this.getBlockType() == "PortalSolid") {
      this.pos.y = this.getLoc()[1] * 50 + 50
      return "top";
    }
    // checking top right
    if (this.getBlockType(this.size - 1, 0) == "PortalSolid") {
      this.pos.y = this.getLoc()[1] * 50 + 50
      return "top";
    }
    return false;
  }

  onNonPortalSolid() {
    // checking bottom left
    if (this.getBlockType(0, this.size) == "NonPortalSolid") {
      this.pos.y = this.getLoc()[1] * 50
      return "bottom";
    }
    // checking bottom right
    if (this.getBlockType(this.size - 1, this.size) == "NonPortalSolid") {
      this.pos.y = this.getLoc()[1] * 50
      return "bottom";
    }
    // checking top left
    if (this.getBlockType() == "NonPortalSolid") {
      this.pos.y = this.getLoc()[1] * 50 + 50
      return "top";
    }
    // checking top right
    if (this.getBlockType(this.size - 1, 0) == "NonPortalSolid") {
      this.pos.y = this.getLoc()[1] * 50 + 50
      return "top";
    }
    return false;
  }

  onReflectSolid() {
    // checking bottom left
    if (this.getBlockType(0, this.size) == "ReflectSolid") {
      this.pos.y = this.getLoc()[1] * 50
      return "bottom";
    }
    // checking bottom right
    if (this.getBlockType(this.size - 1, this.size) == "ReflectSolid") {
      this.pos.y = this.getLoc()[1] * 50
      return "bottom";
    }
    // checking top left
    if (this.getBlockType() == "ReflectSolid") {
      this.pos.y = this.getLoc()[1] * 50 + 50
      return "top";
    }
    // checking top right
    if (this.getBlockType(this.size - 1, 0) == "ReflectSolid") {
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

    if (this.isFalling() && this.onSolid() != "top") {
      this.velocity.mult(0.9);
    } else if (this.isFalling() && this.onSolid() == "top") {
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
    // console.log(this.getBlockType());
    if (this.onSolid() != "bottom" && this.onPortalSolid() != "bottom" && this.onNonPortalSolid() != "bottom" && this.onReflectSolid() != "bottom")
      return true;
    return false;
  }

//懂了
  processInput(key) {
    //A
    if (keyIsDown(65)) {
      // console.log(this.pos.x);
      // console.log(this.pos.y);
      if (this.getBlockType(-1, 25) != "Solid" && this.getBlockType(-1, 25) != "PortalSolid" && this.getBlockType(-1, 25) != "NonPortalSolid" && this.getBlockType(-1, 25) != "ReflectSolid") {
        if (this.pos.x < width / 6) {
          this.pos.x -= 5;
        } else {
          currentMap.xOffset -= 5

        }
      }
    }
    //D
    if (keyIsDown(68)) {
      if (this.getBlockType(this.size, 25) != "Solid" && this.getBlockType(this.size, 25) != "PortalSolid" && this.getBlockType(this.size, 25) != "NonPortalSolid" && this.getBlockType(this.size, 25) != "ReflectSolid") {
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
    
    //press 'E' to teleport
    if(key === 'e' || key === 'E'){

      //teleport from the right of the portalsolid
      if(this.getBlockType(-1, 25) === "PortalSolid" && this.getBlockDir(-1, 25) === "right"){
        var current_x = this.getLoc(this.pos.x -1, this.pos.y + 25)[0];
        var current_y = this.getLoc(this.pos.x -1, this.pos.y + 25)[1];
        // console.log(this.pos.x/50 -1);
        // console.log(this.pos.y/50);
        // console.log(currentMap.blocks[10][0]);
        console.log("from right");
        for (var row = 0; row < currentMap.blocks.length; row++) {
          for (var col = 0; col < currentMap.blocks[row].length; col++) {
            if(currentMap.blocks[row][col].constructor.name == "PortalSolid") {
              console.log("row: "+row);
              console.log("col: "+col);
              console.log(currentMap.blocks[row][col].direction);
              if(col != current_x || row != current_y) {
                // console.log((col != (this.pos.x/50 -1)));
                // console.log(row != this.pos.y/50);
                // console.log(this.pos.x/50 -1);
                // console.log(this.pos.y/50);
                // console.log(row);
                // console.log(col);
                

                //teleport to the right of the portalsolid
                if(currentMap.blocks[row][col].direction === "right") {
                  this.pos.x = 50 * col + 50 - currentMap.xOffset;
                  this.pos.y = 50* row;
                  currentMap.xOffset += (col - current_x)*50;
                  this.pos.x -= (col - current_x)*50;
                  console.log("from right to right");
                }
                //teleport to the left of the portalsolid
                if(currentMap.blocks[row][col].direction === "left") {
                  this.pos.x = 50 * col - 50 - currentMap.xOffset;
                  this.pos.y = 50 * row;
                  currentMap.xOffset += (col - current_x)*50 - 100;
                  this.pos.x -= (col - current_x)*50 - 100;
                  console.log("from right to left");
                }

                //teleport to the top of the portalsolid
                if(currentMap.blocks[row][col].direction === "top") {
                  this.pos.x = 50 * col - currentMap.xOffset;
                  this.pos.y = 50* row - 50;
                  currentMap.xOffset += (col - current_x)*50 - 50;
                  this.pos.x -= (col - current_x)*50 - 50;
                  console.log("from right to top");
                }

                //teleport to the bottom of the portalsolid
                if(currentMap.blocks[row][col].direction === "bottom") {
                  this.pos.x = 50 * col - currentMap.xOffset;
                  this.pos.y = 50* row + 50;
                  currentMap.xOffset += (col - current_x)*50 - 50;
                  this.pos.x -= (col - current_x)*50 - 50; 
                  console.log("from right to bottom");
                }
              }
            }
          }
        }
      }

      //teleport from the left of the portalsolid
      else if(this.getBlockType(this.size, 25) === "PortalSolid" && this.getBlockDir(this.size, 25) === "left"){
        var current_x = this.getLoc(this.pos.x + this.size, this.pos.y + 25)[0];
        var current_y = this.getLoc(this.pos.x + this.size, this.pos.y + 25)[1];
        console.log("from left");
        for (var row = 0; row < currentMap.blocks.length; row++) {
          for (var col = 0; col < currentMap.blocks[row].length; col++) {
            if(currentMap.blocks[row][col].constructor.name == "PortalSolid") {
              console.log("row: "+row);
              console.log("col: "+col);
              console.log(currentMap.blocks[row][col].direction)
              console.log("current_x: " + current_x + "current_y: " + current_y);
              if(col != current_x || row != current_y) {
                console.log(currentMap.blocks[row][col]);
                if(currentMap.blocks[row][col].direction === "right") {
                  this.pos.x = 50 * col + 50 - currentMap.xOffset;
                  this.pos.y = 50* row;
                  currentMap.xOffset += (col - current_x)*50 + 100;
                  this.pos.x -= (col - current_x)*50 + 100;
                  console.log("from left to rigt");
                  break;
                }
                else if(currentMap.blocks[row][col].direction === "left") {
                  console.log("this.pos before : "+this.pos);
                  console.log("currentMap.xOffset before : "+currentMap.xOffset);
                  this.pos.x = 50 * col - 50 - currentMap.xOffset;
                  console.log("this.pos after: "+this.pos);
                  console.log("currentMap.xOffset after : "+currentMap.xOffset);
                  this.pos.y = 50* row;
                  currentMap.xOffset += (col - current_x)*50;
                  this.pos.x -= (col - current_x)*50; 
                  console.log("from left to left");
                  break
                }
                else if(currentMap.blocks[row][col].direction === "top") {
                  this.pos.x = 50 * col - currentMap.xOffset;
                  this.pos.y = 50* row - 50;
                  currentMap.xOffset += (col - current_x)*50 + 50;
                  this.pos.x -= (col - current_x)*50 + 50;
                  console.log("from left to top");
                  break
                }
                else if(currentMap.blocks[row][col].direction === "bottom") {
                  this.pos.x = 50 * col - currentMap.xOffset;
                  this.pos.y = 50* row + 50;
                  currentMap.xOffset += (col - current_x)*50 + 50;
                  this.pos.x -= (col - current_x)*50 + 50;
                  console.log("from left to bottom");
                  break
                }
              }
            }
          }
        }
      }

      //teleport from the top of the portalsolid
      else if(this.getBlockType(25, this.size + 1) === "PortalSolid" && this.getBlockDir(25, this.size+1) === "top"){
        var current_x = this.getLoc(this.pos.x + 25, this.pos.y + this.size + 1)[0];
        var current_y = this.getLoc(this.pos.x + 25, this.pos.y + this.size + 1)[1];
        console.log("from top");
        for (var row = 0; row < currentMap.blocks.length; row++) {
          for (var col = 0; col < currentMap.blocks[row].length; col++) {
            if(currentMap.blocks[row][col].constructor.name == "PortalSolid") {
              console.log("row: "+row);
              console.log("col: "+col);
              console.log(currentMap.blocks[row][col].direction)
              if(col != current_x || row != current_y) {
                console.log(currentMap.blocks[row][col]);

                if(currentMap.blocks[row][col].direction === "right") {
                  this.pos.x = 50 * col + 50 - currentMap.xOffset;
                  this.pos.y = 50* row;
                  currentMap.xOffset += (col - current_x)*50 + 50;
                  this.pos.x -= (col - current_x)*50 + 50;
                  console.log("from top to right"); 
                }
                if(currentMap.blocks[row][col].direction === "left") {
                  this.pos.x = 50 * col - 50 - currentMap.xOffset;
                  this.pos.y = 50* row;
                  currentMap.xOffset += (col - current_x)*50 -50;
                  this.pos.x -= (col - current_x)*50 -50;
                  console.log("from top to left");
                }
                if(currentMap.blocks[row][col].direction === "top") {
                  this.pos.x = 50 * col - currentMap.xOffset;
                  this.pos.y = 50* row - 100;
                  currentMap.xOffset += (col - current_x)*50;
                  this.pos.x -= (col - current_x)*50;
                  console.log("from top to top");
                }
                if(currentMap.blocks[row][col].direction === "bottom") {
                  this.pos.x = 50 * col - currentMap.xOffset;
                  this.pos.y = 50* row + 50;
                  currentMap.xOffset += (col - current_x)*50;
                  this.pos.x -= (col - current_x)*50;
                  console.log("from top to bottom");
                }
              }
            }
          }
        }
      }

      //teleport from the bottom of the portalsolid
      else if(this.getBlockType(25, -1) === "PortalSolid" && this.getBlockDir(25, -1) === "bottom"){
        var current_x = this.getLoc(this.pos.x + 25, this.pos.y - 1)[0];
        var current_y = this.getLoc(this.pos.x + 25, this.pos.y - 1)[1];
        console.log("from bottom ");
        for (var row = 0; row < currentMap.blocks.length; row++) {
          for (var col = 0; col < currentMap.blocks[row].length; col++) {
            if(currentMap.blocks[row][col].constructor.name == "PortalSolid") {
              console.log("row: "+row);
              console.log("col: "+col);
              console.log(currentMap.blocks[row][col].direction)
              if(col != current_x || row != current_y) {
                console.log(currentMap.blocks[row][col]);

                if(currentMap.blocks[row][col].direction === "right") {
                  this.pos.x = 50 * col + 50 - currentMap.xOffset;
                  this.pos.y = 50* row;
                  currentMap.xOffset += (col - current_x)*50 +50;
                  this.pos.x -= (col - current_x)*50 +50; 
                  console.log("from bottom to right");
                }
                if(currentMap.blocks[row][col].direction === "left") {
                  this.pos.x = 50 * col - 50 - currentMap.xOffset;
                  this.pos.y = 50* row;
                  currentMap.xOffset += (col - current_x)*50 - 50;
                  this.pos.x -= (col - current_x)*50 - 50; 
                  console.log("from bottom to left");
                }
                if(currentMap.blocks[row][col].direction === "top") {
                  this.pos.x = 50 * col - currentMap.xOffset;
                  this.pos.y = 50* row - 50;
                  currentMap.xOffset += (col - current_x)*50;
                  this.pos.x -= (col - current_x)*50; 
                  console.log("from bottom to top");
                }
                if(currentMap.blocks[row][col].direction === "bottom") {
                  this.pos.x = 50 * col - currentMap.xOffset;
                  this.pos.y = 50* row + 50;
                  currentMap.xOffset += (col - current_x)*50;
                  this.pos.x -= (col - current_x)*50; 
                  console.log("from bottom to bottom");
                }
              }
            }
          }
        }
      }
    }

    if(key === " ") {
      pistol = 1 - pistol;
      console.log(pistol);
    }
    if(key === 'blue pistol click'){
      console.log("left button");
      console.log("pos.x: " + this.pos.x + " pos.y" + this.pos.y);
      this.bullet = new Bullet(this.pos.x + currentMap.xOffset, this.pos.y, mouseX + currentMap.xOffset, mouseY + currentMap.yOffset, [7,3], "blue");
    }

    if(key === 'red pistol click'){
      console.log("left button");
      console.log("pos.x: " + this.pos.x + " pos.y" + this.pos.y);
      this.bullet = new Bullet(this.pos.x + currentMap.xOffset, this.pos.y, mouseX + currentMap.xOffset, mouseY + currentMap.yOffset, [10,3], "red");
    }
  }
  
  draw() {
    for (var i = 0; i < this.lives; i++) {
      image(tiles_image, i * 25, 10, 50, 50, 11 * 64, 4 * 64, 64, 64)
    }
    if(this.injured && this.injuryTimer % 6 == 0){
      image(player_injured_image, this.pos.x, this.pos.y - currentMap.yOffset, this.size, this.size, 0, 0, this.spriteSize, this.spriteSize);
    }
    else{
      image(player_image, this.pos.x, this.pos.y - currentMap.yOffset, this.size, this.size, 0, 0, this.spriteSize, this.spriteSize);
    }
    // if(this.bullet != 0){
    //   this.bullet.draw(currentMap.xOffset, currentMap.yOffset);
    // }
  }

}