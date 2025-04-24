class Bullet {
  constructor(x, y, mouseX, mouseY, img, type) {
    this.size = 50;
    this.spriteSize = 64;
    this.pos = createVector(x, y);
    this.origin = createVector(x + this.size / 2, y + this.size / 2); // 修正為中心點
    this.velocity = p5.Vector.sub(createVector(mouseX, mouseY), this.origin).setMag(10); // 使用 origin 計算方向
    this.img = img;
    this.type = type;
  }

  draw(xOffset, yOffset) {
    const scaleRatio = (canvasWidth / 800)*0.5;
    const drawX = (this.pos.x - xOffset) * scaleRatio;
    const drawY = (this.pos.y - yOffset) * scaleRatio;
    const drawSize = this.size * scaleRatio;
    var imagePadding = 1;
    image(
      images["image_tiles"],
      drawX,
      drawY,
      drawSize,
      drawSize,
      this.img[0] * this.spriteSize,
      this.img[1] * this.spriteSize + imagePadding,
      this.spriteSize,
      this.spriteSize
    );
  }


  update() {
    this.pos.add(this.velocity);

    // 超出邊界
    if (
      this.pos.x < 0 || this.pos.x > currentMap.blocks[0].length * 50 ||
      this.pos.y < 0 || this.pos.y > currentMap.blocks.length * 50
    ) {
      return "undefined";
    }


    const block = this.getBlock();
    if (block === null || block === undefined) {
      return;
    }


    // 傳送門牆邏輯
    if (block instanceof DirectionWall && block.type === "standard") {
      // 把block有空气的方向push到block.direction
      this.getNotBlockedSides();

      if (!this.isEnteringAllowed(block)) {
        console.warn("Direction mismatch — no portal placed.");
        return "undefined";
      }
      this.placePortal(block);
      console.log("33333333333");
      return "inStandard";
    }
    // 子弹打到Wall返回undefined, 子弹消除
    else if (block instanceof Wall && block.type === "solid") {
      console.log("44444444444444");
      return "undefined";
    }
    // 子弹打到Portal返回undefined, 子弹消除
    else if (block instanceof Portal) {
      const incomingDir = this.getEntryDirection() || "top";

      // 如果颜色不同，或方向不同，就允许替换
      if (block.type !== this.type || block.direction !== incomingDir) {
        console.log("🛠 Portal override by bullet at", this.getLoc());
        this.placePortal(block); // 使用新规则放置
        return "inStandard";     // 保持子弹不立即销毁（你可以也设 velocity = 0）
      }

      // 颜色和方向都一样，就销毁子弹
      return "undefined";
    }

    // 反彈牆邏輯
    if (block.type?.startsWith("reflect")) {

      // 把block有空气的方向push到block.direction
      this.getNotBlockedSides();

      if (!this.isEnteringAllowed(block)) return "undefined"
      // 反弹音效
      sounds["bulletBounceSoundEffect"].play();
      return this.reflect(block);
    }

  }

  getNotBlockedSides() {
    var block_col = this.getLoc()[0];
    var block_row = this.getLoc()[1];
    // currentMap.blocks[block_row][block_col].direction = [];
    //top has air wall
    if(block_row - 1 >= 0 &&
        !(currentMap.blocks[block_row - 1][block_col] instanceof Wall ||
        currentMap.blocks[block_row - 1][block_col] instanceof DirectionWall)) {
        //     currentMap.blocks[block_row - 1][block_col] === 0) {
      currentMap.blocks[block_row][block_col].direction.push("top");
    }

    //right has air wall
    if(block_col + 1 <= currentMap.blocks[0].length - 1 &&
        !(currentMap.blocks[block_row][block_col + 1] instanceof Wall ||
            currentMap.blocks[block_row][block_col + 1] instanceof DirectionWall)) {
        // currentMap.blocks[block_row][block_col + 1] === 0) {
      currentMap.blocks[block_row][block_col].direction.push("right");
    }

    //bottom has air wall
    if(block_row + 1 <= currentMap.blocks.length - 1 &&
        !(currentMap.blocks[block_row + 1][block_col] instanceof Wall ||
            currentMap.blocks[block_row + 1][block_col] instanceof DirectionWall)) {
        // currentMap.blocks[block_row + 1][block_col] === 0) {
      currentMap.blocks[block_row][block_col].direction.push("bottom");
    }

    //left has air wall
    if(block_col - 1 >= 0 &&
        !(currentMap.blocks[block_row][block_col - 1] instanceof Wall ||
            currentMap.blocks[block_row][block_col - 1] instanceof DirectionWall)) {
        // currentMap.blocks[block_row][block_col - 1] === 0) {
      currentMap.blocks[block_row][block_col].direction.push("left");
    }
  }

  getBlock() {
    const [col, row] = this.getLoc();
    if (
      row < 0 || row >= currentMap.blocks.length ||
      col < 0 || col >= currentMap.blocks[0].length
    ) return null;
    return currentMap.blocks[row][col];
  }

  getLoc(x = this.pos.x + this.size / 2, y = this.pos.y + this.size / 2) {
    return [floor(x / 50), floor(y / 50)];
  }

  isEnteringAllowed(block) {
    const direction = this.getEntryDirection();
    if (!direction) {
      console.warn("No entry direction detected, allowing fallback.");
      return true;
    }
    return block.direction?.includes(direction);
  }

  getEntryDirection() {
    const center = this.getBlockCenter();
    const A = this.origin;
    const B = p5.Vector.add(this.pos, createVector(this.size / 2, this.size / 2)); // 中心點路徑
    const offset = 50 / 2;

    const sides = {
      top:    [{ x: center.x - offset, y: center.y - offset }, { x: center.x + offset, y: center.y - offset }],
      bottom: [{ x: center.x - offset, y: center.y + offset }, { x: center.x + offset, y: center.y + offset }],
      left:   [{ x: center.x - offset, y: center.y - offset }, { x: center.x - offset, y: center.y + offset }],
      right:  [{ x: center.x + offset, y: center.y - offset }, { x: center.x + offset, y: center.y + offset }]
    };

    for (const dir in sides) {
      const [P1, P2] = sides[dir];
      if (isIntersecting(P1, P2, A, B)) {
        return dir;
      }
    }

    // fallback 回傳：預設使用 top
    return "top";
  }


  getBlockCenter() {
    const [col, row] = this.getLoc();
    return { x: col * 50 + 25, y: row * 50 + 25 };
  }

  placePortal(block) {
    const [col, row] = this.getLoc();
    const incomingDir = this.getEntryDirection() || "top";

    const spriteMap = {
      blue:  { top: [6, 0], bottom: [7, 0], left: [8, 0], right: [9, 0] },
      red:   { top: [10, 0], bottom: [11, 0], left: [12, 0], right: [13, 0] }
    };
    const sprite = spriteMap[this.type][incomingDir];

    // 如果当前格子已有 portal，做处理
    const existingBlock = currentMap.blocks[row][col];
    if (existingBlock instanceof Portal) {
      // 不同颜色：直接替换
      if (existingBlock.type !== this.type) {
        console.log("🟥 Replacing portal with different color");
      }
      // 同颜色但方向不同：更新方向
      else if (existingBlock.direction !== incomingDir) {
        console.log("🔄 Updating same-color portal to new direction");
      }
      // 同颜色且方向相同：不动
      else {
        console.log("🔵 Same portal and direction exist. No update.");
        return;
      }
    }

    // 移除旧的同色 portal（其他格子）
    for (let r = 0; r < currentMap.blocks.length; r++) {
      for (let c = 0; c < currentMap.blocks[r].length; c++) {
        if (r === row && c === col) continue;
        const b = currentMap.blocks[r][c];
        if (b instanceof Portal && b.type === this.type) {
          currentMap.blocks[r][c] = new DirectionWall(c * 50, r * 50, [1, 0], "standard");
        }
      }
    }

    // 放置新 portal
    currentMap.blocks[row][col] = new Portal(col * 50, row * 50, sprite, this.type, incomingDir);
  }


  reflect(block) {
    const direction = this.getEntryDirection();
    if ((direction === "left" && block.type === "reflectLeft") ||
        direction === "right" && block.type === "reflectRight") {
      this.velocity.x *= -1;
      return "inReflect";
    }
    if ((direction === "top" && block.type === "reflectUp") ||
        direction === "bottom" && block.type === "reflectDown") {
      this.velocity.y *= -1;
      return "inReflect";
    }
    return "undefined";
  }
}

// 工具函式：線段交集判斷
function isIntersecting(A, B, C, D) {
  function cross(ax, ay, bx, by) {
    return ax * by - ay * bx;
  }
  function crossVec(A, B, P) {
    return cross(B.x - A.x, B.y - A.y, P.x - A.x, P.y - A.y);
  }

  const cross1 = crossVec(A, B, C);
  const cross2 = crossVec(A, B, D);
  const cross3 = crossVec(C, D, A);
  const cross4 = crossVec(C, D, B);

  return cross1 * cross2 < 0 && cross3 * cross4 < 0;
}
