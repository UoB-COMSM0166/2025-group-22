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

    if (this.bulletonSolid() == "In") {
      this.velocity.mult(0);
    }
    else if(this.bulletonSolid() == "undefined") {
      return "undefined";
    }
  }

  update() {
  //   if (this.isAlive()) {
  //     this.updateInjured()
  //     this.processInput();
  //     // update position
  if(this.updateGravity() == "undefined") {
    return "undefined";
  }
  // console.log(floor((this.pos.x + this.size/2) / 50));
  // console.log(floor((this.pos.y + this.size/2) / 50));
  //     if (this.touchingEnemy()) {
  //       this.injured = true;
  //       if (this.injuryTimer == 0) {
  //         this.lives--;
  //       }
  //     }
  //     this.touchingItem();
  //   } else {
  //     //處理碰到牆的子彈
  //     textSize(50);
  //     fill(255);
  //     text(this.endingMessage, 250, 200);
  //   }
  }

  getBlockType(offX = 0, offY = 0) {
    var z = this.getLoc(this.pos.x + this.size/2 + offX, this.pos.y + this.size/2 + offY);
    if(floor((this.pos.x + this.size/2) / 50) < 0 || floor((this.pos.x + this.size/2) / 50) > map1.blocks[0].length - 1 || floor((this.pos.y + this.size/2) / 50) < 0 || floor((this.pos.y + this.size/2) / 50) > map1.blocks.length - 1) {
      console.log("undefined");
      return "undefined";
    }
    else {
      return map1.blocks[z[1]][z[0]].constructor.name;
    }
  }

  getLoc(x = this.pos.x + this.size/2, y = this.pos.y + this.size/2) {
    var location = [floor(x / 50), floor(y / 50)];
    return location;
  }

  getBlockDir() {
    var block_col = this.getLoc()[0];
    var block_row = this.getLoc()[1];
    map1.blocks[block_row][block_col].direction = [];
    //top has air wall
    if(block_row - 1 >= 0 && map1.blocks[block_row - 1][block_col] === 0) {
      map1.blocks[block_row][block_col].direction.push("top");
    }

    //right has air wall
    if(block_col + 1 <= map1.blocks[0].length - 1 && map1.blocks[block_row][block_col + 1] === 0) {
      map1.blocks[block_row][block_col].direction.push("right");
    }

    //bottom has air wall
    if(block_row + 1 <= map1.blocks.length - 1 && map1.blocks[block_row + 1][block_col] === 0) {
      map1.blocks[block_row][block_col].direction.push("bottom");
    }

    //left has air wall
    if(block_col - 1 >= 0 && map1.blocks[block_row][block_col - 1] === 0) {
      map1.blocks[block_row][block_col].direction.push("left");
    }
    return map1.blocks[block_row][block_col].direction;
  }

  getDir() {
    var solidsize = new Solid();
    var block_x = this.getLoc()[0] * 50 + solidsize.size/2;
    var block_y = this.getLoc()[1] * 50 + solidsize.size/2;
    console.log("getDir")

    //子彈從下方打入
    
    //wall 
    //left-bottom
    let A = {x: block_x - solidsize.size/2, y: block_y + solidsize.size/2};
    //right-bottom
    let B = {x: block_x + solidsize.size/2, y: block_y + solidsize.size/2};
    //right-top
    let C = {x: block_x + solidsize.size/2, y: block_y - solidsize.size/2};
    //left-top
    let D = {x: block_x - solidsize.size/2, y: block_y - solidsize.size/2};
    
    //bullet
    let E = {x: this.pos.x + this.size/2, y: this.pos.y + this.size/2};
    let F = {x: this.pos_original.x + player.size/2, y: this.pos_original.y + player.size/2};
    //bullet
    if(isIntersecting(A,B,E,F) == true){
      // console.log(bullet_x);
      // console.log(bullet_y);
      // console.log(block_x);
      // console.log(block_y);
      // console.log("bulletx-blockx="+ (bullet_x-block_x));
      // console.log("bullety-blocky="+ (bullet_y-block_y));
      console.log("bottom");
      return "bottom";
    }
    
    //子彈從上方打入
    if(isIntersecting(C,D,E,F) == true){
      console.log("top");
      return "top";
    }

    //子彈從左方打入
    if(isIntersecting(D,A,E,F) == true){
      console.log("left");
      return "left";
    }

    //子彈從右方打入
    if(isIntersecting(B,C,E,F) == true){
      console.log("right");
      return "right";
    }
  }



  bulletonSolid() {
    
    // checking if the bullet in the "solid"
    if (this.getBlockType(0, 0) == "Solid") {
      console.log(this.getBlockDir());
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
      
      //blue bullet generate blue portal
      if(this.bullettype === "blue") {
        for (var row = 0; row < map1.blocks.length; row++) {
          for (var col = 0; col < map1.blocks[row].length; col++) {
            if(map1.blocks[row][col].constructor.name == "PortalSolid" && map1.blocks[row][col].type == "blue") {
              map1.blocks[row][col] = new Solid(col * 50, row * 50, [3, 0]);
            }
          }
        }
        map1.blocks[this.getLoc()[1]][this.getLoc()[0]] = new PortalSolid(this.getLoc()[0] * 50, this.getLoc()[1] * 50, [6, 0], direction,"blue");
      }
      
      //red bullet generate red portal
      else if(this.bullettype === "red") {
        for (var row = 0; row < map1.blocks.length; row++) {
          for (var col = 0; col < map1.blocks[row].length; col++) {
            if(map1.blocks[row][col].constructor.name == "PortalSolid" && map1.blocks[row][col].type == "red") {
              map1.blocks[row][col] = new Solid(col * 50, row * 50, [3, 0]);
            }
          }
        }
        map1.blocks[this.getLoc()[1]][this.getLoc()[0]] = new PortalSolid(this.getLoc()[0] * 50, this.getLoc()[1] * 50, [7, 1], direction,"red");
      }

      return "In";
    }
    else if(this.getBlockType(0, 0) == "undefined"){
      return "undefined";
    }
    return false;
  }

//   crossProduct(ax, ay, bx, by) {
//     return ax * by - ay * bx;
//   }

// // 计算两个线段是否相交
//   isIntersecting(A, B, C, D) {
//     // 计算叉积
//     function cross(A, B, P) {
//         return crossProduct(B.x - A.x, B.y - A.y, P.x - A.x, P.y - A.y);
//     }

//     // 计算四次叉积
//     let cross1 = cross(A, B, C);
//     let cross2 = cross(A, B, D);
//     let cross3 = cross(C, D, A);
//     let cross4 = cross(C, D, B);

//     // 判断是否互相跨过
//     if (cross1 * cross2 < 0 && cross3 * cross4 < 0) {
//         return true;
//     }

//     // 处理共线情况（判断投影是否重叠）
//     return isCollinearAndOverlapping(A, B, C, D);
//   }

// // 处理共线的情况：如果两条线段在同一直线上，检查它们是否有重叠部分
//   isCollinearAndOverlapping(A, B, C, D) {
//     function isBetween(a, b, c) {
//         return Math.min(a, b) <= c && c <= Math.max(a, b);
//     }

//     return (crossProduct(B.x - A.x, B.y - A.y, C.x - A.x, C.y - A.y) === 0 && isBetween(A.x, B.x, C.x) && isBetween(A.y, B.y, C.y)) 
//           ||(crossProduct(B.x - A.x, B.y - A.y, D.x - A.x, D.y - A.y) === 0 && isBetween(A.x, B.x, D.x) && isBetween(A.y, B.y, D.y))
//           ||(crossProduct(D.x - C.x, D.y - C.y, A.x - C.x, A.y - C.y) === 0 && isBetween(C.x, D.x, A.x) && isBetween(C.y, D.y, A.y))
//           ||(crossProduct(D.x - C.x, D.y - C.y, B.x - C.x, B.y - C.y) === 0 && isBetween(C.x, D.x, B.x) && isBetween(C.y, D.y, B.y));
//   }
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