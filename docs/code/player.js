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
    this.lives = 1;
    // items/keys/etc...
    this.keys = 0;
    this.movingState = 0;
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
      if (map1.itemList[item].type == "heart") {
        // remove item from map
        map1.blocks[map1.itemList[item].pos.y / 50][map1.itemList[item].pos.x / 50] = 0;
        // increase heartcount & remove item from map's itemList
        this.lives++;
        map1.itemList.splice(item, 1);
      } else if (map1.itemList[item].type == "key") {
        // remove item from map
        map1.blocks[map1.itemList[item].pos.y / 50][map1.itemList[item].pos.x / 50] = 0;
        // increase keycount & remove item from map's itemList
        this.keys++;
        map1.itemList.splice(item, 1);
      } else if (map1.itemList[item].type == "door") {
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
    return map1.blocks[z[1]][z[0]].constructor.name;
  }

  getLoc(x = this.pos.x, y = this.pos.y) {
    var location = [floor((x + map1.offset) / 50), floor(y / 50)];
    return location;
  }

  touchingEnemy() {
    for (var i = 0; i < map1.enemyList.length; i++) {
      var distance = dist(this.pos.x + map1.offset, this.pos.y, map1.enemyList[i].pos.x, map1.enemyList[i].pos.y)
      if (distance < 40) {
        return true;
      }
    }
    return false;
  }

  touchingItem() {
    for (var i = 0; i < map1.itemList.length; i++) {
      var distance = dist(this.pos.x + map1.offset, this.pos.y, map1.itemList[i].pos.x, map1.itemList[i].pos.y)
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

  updateGravity() {
    this.pos.add(this.velocity);

    if (this.isFalling()) {
      this.pos.add(0, this.gravity);
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
    if (this.onSolid() != "bottom")
      return true;
    return false;
  }

  processInput() {
    if (keyIsDown(LEFT_ARROW)) {
      if (this.getBlockType(-1, 25) != "Solid") {
        if (this.pos.x < width / 4) {
          this.pos.x -= 5;
        } else {
          map1.offset -= 5

        }
      }
    }
    if (keyIsDown(RIGHT_ARROW)) {
      if (this.getBlockType(this.size, 25) != "Solid") {
        if (this.pos.x < width / 2) {
          this.pos.x += 5;
        } else {
          map1.offset += 5

        }
      }
    }
    if (keyIsDown(UP_ARROW)) {
      this.jump();

      
    }
  }
  
  draw() {
    for (var i = 0; i < this.lives; i++) {
      image(tiles_image, i * 25, 10, 50, 50, 11 * 64, 4 * 64, 64, 64)

    }
    if(this.injured && this.injuryTimer % 6 == 0){
      image(player_injured_image, this.pos.x, this.pos.y, this.size, this.size, 0, 0, this.spriteSize, this.spriteSize);
    }else{
    image(player_image, this.pos.x, this.pos.y, this.size, this.size, 0, 0, 
this.spriteSize, this.spriteSize);
    }
  }
}