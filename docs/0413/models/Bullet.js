// 📁 models/Bullet.js
class Bullet {
  constructor(x, y, mouseX, mouseY, img, type) {
    this.size = 50;
    this.spriteSize = 64;
    this.pos = createVector(x, y);
    this.origin = createVector(x + this.size / 2, y + this.size / 2); // ✅ 修正為中心點
    this.velocity = p5.Vector.sub(createVector(mouseX, mouseY), this.origin).setMag(10); // ✅ 使用 origin 計算方向
    this.img = img;
    this.type = type;
  }

  draw(xOffset, yOffset) {
    image(
      images["tiles_image"],
      this.pos.x - xOffset,
      this.pos.y - yOffset,
      this.size,
      this.size,
      this.img[0] * this.spriteSize,
      this.img[1] * this.spriteSize,
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
      console.log("1111111111111");
      return "undefined";
    }


    const block = this.getBlock();
    console.log("Block hit by bullet:", block?.constructor?.name, "at", this.getLoc());

    if (block === null || block === undefined) {
      console.log("222222222222");
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
      console.log("555555555555");
      return "undefined";
    }

    // 反彈牆邏輯
    if (block.type?.startsWith("reflect")) {

      // 把block有空气的方向push到block.direction
      this.getNotBlockedSides();
      console.log("6666666666");

      if (!this.isEnteringAllowed(block)) return "undefined"
      // 反弹音效
      sounds["bulletBounceSoundEffect"].play();

      console.log("77777777777");
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
      console.warn("⚠️ No entry direction detected, allowing fallback.");
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
        console.log("🧭 Bullet entering from:", dir);
        return dir;
      }
    }

    // fallback 回傳：預設使用 top
    console.warn("⚠️ 無法判斷子彈方向，使用 fallback → 'top'");
    return "top";
  }


  getBlockCenter() {
    const [col, row] = this.getLoc();
    return { x: col * 50 + 25, y: row * 50 + 25 };
  }

  placePortal(block) {
    const [col, row] = this.getLoc();
    const incomingDir = this.getEntryDirection() || "top";
    // console.log("Entry Direction", this.getEntryDirection());

    this.pos.x = this.getLoc()[0] * 50;
    this.pos.y = this.getLoc()[1] * 50;

    const spriteMap = {
      blue:  { top: [0, 1], bottom: [1, 1], left: [2, 1], right: [3, 1] },
      red:   { top: [0, 2], bottom: [1, 2], left: [2, 2], right: [3, 2] }
    };
    const sprite = spriteMap[this.type][incomingDir];

    // 移除舊的同色傳送門
    for (let r = 0; r < currentMap.blocks.length; r++) {
      for (let c = 0; c < currentMap.blocks[r].length; c++) {
        const b = currentMap.blocks[r][c];
        if (b instanceof Portal && b.type === this.type) {
          currentMap.blocks[r][c] = new DirectionWall(c * 50, r * 50, [1, 0], "standard");
        }
      }
    }

    currentMap.blocks[row][col] = new Portal(col * 50, row * 50, sprite, this.type, incomingDir);
    console.log("✅ Portal placed at", col, row, "with direction:", incomingDir);
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

// 🔧 工具函式：線段交集判斷
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
