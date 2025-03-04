class Bullet {
  constructor(x,y, mousex, mousey, img, bullettype) {
    this.pos = createVector(x, y);
    this.pos_original = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.size = 50;
    this.mousex = mousex;
    this.mousey = mousey;
    this.img = img;
    this.spriteSize = 64;
    this.lives = 1;
    // this.sprite stuff
    var a = 0;
    var b = 0;
    var v = 0;
    a = this.mousex - this.pos.x - 50/2;
    b = this.mousey - this.pos.y - 50/2;
    v = sqrt(a*a+b*b);
    this.velocity.x = a/v*10;
    this.velocity.y = b/v*10;
    this.bullettype = bullettype;
  }
  draw(offset, yOffset) {
    image(tiles_image, this.pos.x - offset, this.pos.y - yOffset, this.size, this.size, this.img[0] * this.spriteSize, this.img[1] * this.spriteSize, this.spriteSize, this.spriteSize);
  }

  updateGravity() {
    
    this.pos.add(this.velocity);
    
    if (this.bulletonWall() === "In") {
      this.velocity.mult(0);
    }
    else if(this.bulletonWall() === "undefined") {
      return "undefined";
    }

    if(this.bulletonReflectWall() === "undefined") {
      return "undefined";
    }
  }

  update() {
    if(this.updateGravity() == "undefined") {
      return "undefined";
    }
  }

  
  getBlockClass(offX = 0, offY = 0) {   //CHECK
    var gridPos = this.getLoc(this.pos.x + this.size/2 + offX, this.pos.y + this.size/2 + offY);    //CHECK
    if(floor((this.pos.x + this.size/2) / 50) < 0 || floor((this.pos.x + this.size/2) / 50) > currentMap.blocks[0].length - 1 || floor((this.pos.y + this.size/2) / 50) < 0 || floor((this.pos.y + this.size/2) / 50) > currentMap.blocks.length - 1) {
      console.log("undefined");
      return "undefined";
    }
    else {
      return currentMap.blocks[gridPos[1]][gridPos[0]];   //CHECK
    }
  }

  getLoc(x = this.pos.x + this.size/2, y = this.pos.y + this.size/2) {
    var location = [floor(x / 50), floor(y / 50)];
    return location;
  }

  getBlockDir() {
    var block_col = this.getLoc()[0];
    var block_row = this.getLoc()[1];
    currentMap.blocks[block_row][block_col].direction = [];
    //top has air wall
    if(block_row - 1 >= 0 && currentMap.blocks[block_row - 1][block_col] === 0) {
      currentMap.blocks[block_row][block_col].direction.push("top");
    }

    //right has air wall
    if(block_col + 1 <= currentMap.blocks[0].length - 1 && currentMap.blocks[block_row][block_col + 1] === 0) {
      currentMap.blocks[block_row][block_col].direction.push("right");
    }

    //bottom has air wall
    if(block_row + 1 <= currentMap.blocks.length - 1 && currentMap.blocks[block_row + 1][block_col] === 0) {
      currentMap.blocks[block_row][block_col].direction.push("bottom");
    }

    //left has air wall
    if(block_col - 1 >= 0 && currentMap.blocks[block_row][block_col - 1] === 0) {
      currentMap.blocks[block_row][block_col].direction.push("left");
    }
    return currentMap.blocks[block_row][block_col].direction;
  }

  getDir() {
    let wallSize = 50;   //CHECK
    var blockX = this.getLoc()[0] * 50 + wallSize/2;
    var blockY = this.getLoc()[1] * 50 + wallSize/2;

    //子彈從下方打入
    
    //wall 
    //left-bottom
    let A = {x: blockX - wallSize/2, y: blockY + wallSize/2};
    //right-bottom
    let B = {x: blockX + wallSize/2, y: blockY + wallSize/2};
    //right-top
    let C = {x: blockX + wallSize/2, y: blockY - wallSize/2};
    //left-top
    let D = {x: blockX - wallSize/2, y: blockY - wallSize/2};
    
    //bullet
    let E = {x: this.pos.x + this.size/2, y: this.pos.y + this.size/2};
    let F = {x: this.pos_original.x + player.size/2, y: this.pos_original.y + player.size/2};
    //bullet
    if(isIntersecting(A,B,E,F) == true){
      return "bottom";
    }
    
    //子彈從上方打入
    if(isIntersecting(C,D,E,F) == true){
      return "top";
    }

    //子彈從左方打入
    if(isIntersecting(D,A,E,F) == true){
      return "left";
    }

    //子彈從右方打入
    if(isIntersecting(B,C,E,F) == true){
      return "right";
    }
  }

  bulletonWall() {
    // checking if the bullet in the wall
    if (this.getBlockClass(0, 0) == "Wall" || this.getBlockClass(0, 0) == "DirectionWall") {   //CHECK
      var dirFlag = 0;  
      var blockDir = this.getBlockDir();
      var direction = this.getDir();
      for(var col = 0; col < blockDir.length; col++) {
        if(direction === blockDir[col]) {
          dirFlag = 1;
        }
      }

      if(dirFlag === 0) {
        return "undefined";
      }
      this.pos.x = this.getLoc()[0] * 50;
      this.pos.y = this.getLoc()[1] * 50;

      let portalSprites = {
        blue: {
            top: [0, 1], bottom: [1, 1], left: [2, 1], right: [3, 1]
        },
        red: {
            top: [0, 2], bottom: [1, 2], left: [2, 2], right: [2, 3]
        }
      };
      let portalType = this.bullettype;
      let sprite = portalSprites[portalType][direction];

      // remove old portal
      for (let row = 0; row < currentMap.blocks.length; row++) {
        for (let col = 0; col < currentMap.blocks[row].length; col++) {
          let block = currentMap.blocks[row][col];
          if (block.constructor.name === "Portal" && block.type === portalType) {
            currentMap.blocks[row][col] = new DirectionWall(col * 50, row * 50, [1, 0], "standard");
          }
        }
      }

      // put new portal
      currentMap.blocks[this.getLoc()[1]][this.getLoc()[0]] = new Portal(
        this.getLoc()[0] * 50,
        this.getLoc()[1] * 50,
        sprite,
        portalType,
        direction,
      );

      return "In";
    }
    else if(this.getBlockClass(0, 0) == "undefined"){
      return "undefined";
    }
    return false;
  }

  bulletonReflectWall() {
    // checking if the bullet in the "solid"
    if (this.getBlockClass(0, 0).type == "reflectDown" ||    //CHECK
        this.getBlockClass(0, 0).type == "reflectUp"||     //CHECK
        this.getBlockClass(0, 0).type == "reflectLeft"||    //CHECK
        this.getBlockClass(0, 0).type == "reflectRight") {   //CHECK
      var dirFlag = 0;
      var blockDir = this.getBlockDir();
      var direction = this.getDir();
      for(var col = 0; col < blockDir.length; col++) {
        if(direction === blockDir[col]) {
          dirFlag = 1;
        }
      }

      if(dirFlag === 0) {
        return "undefined";
      }
      
      //reflect the bullet
      if(direction === "left" || direction === "right") {
        this.velocity.x = this.velocity.x * (-1);
      }
       
      else if(direction === "top" || direction === "bottom") {
        this.velocity.y = this.velocity.y * (-1);
      }
      return "In";
    }
    else if(this.getBlockClass(0, 0) == "undefined"){    //CHECK
      return "undefined";
    }
    return false;
  }
}

function crossProduct(ax, ay, bx, by) {
  return ax * by - ay * bx;
}

// 计算两个线段是否相交
function isIntersecting(A, B, C, D) {
  // 计算叉积
  function cross(A, B, P) {
      return crossProduct(B.x - A.x, B.y - A.y, P.x - A.x, P.y - A.y);
  }

  // 计算四次叉积
  let cross1 = cross(A, B, C);
  let cross2 = cross(A, B, D);
  let cross3 = cross(C, D, A);
  let cross4 = cross(C, D, B);

  // 判断是否互相跨过
  if (cross1 * cross2 < 0 && cross3 * cross4 < 0) {
      return true;
  }

  // 处理共线情况（判断投影是否重叠）
  return isCollinearAndOverlapping(A, B, C, D);
}

// 处理共线的情况：如果两条线段在同一直线上，检查它们是否有重叠部分
function isCollinearAndOverlapping(A, B, C, D) {
  function isBetween(a, b, c) {
      return Math.min(a, b) <= c && c <= Math.max(a, b);
  }

  return (crossProduct(B.x - A.x, B.y - A.y, C.x - A.x, C.y - A.y) === 0 && isBetween(A.x, B.x, C.x) && isBetween(A.y, B.y, C.y)) 
        ||(crossProduct(B.x - A.x, B.y - A.y, D.x - A.x, D.y - A.y) === 0 && isBetween(A.x, B.x, D.x) && isBetween(A.y, B.y, D.y))
        ||(crossProduct(D.x - C.x, D.y - C.y, A.x - C.x, A.y - C.y) === 0 && isBetween(C.x, D.x, A.x) && isBetween(C.y, D.y, A.y))
        ||(crossProduct(D.x - C.x, D.y - C.y, B.x - C.x, B.y - C.y) === 0 && isBetween(C.x, D.x, B.x) && isBetween(C.y, D.y, B.y));
}