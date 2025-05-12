class Bullet {
  /** Initializes the bullet's position, size, and velocity. */
  constructor(x, y, mouseX, mouseY, img, type) {
    this.size = 50;
    this.spriteSize = 64;
    this.pos = createVector(x, y);
    this.origin = createVector(x + this.size / 2, y + this.size / 2);
    this.lastReflect = null;
    this.lastReflectBlock = null;
    this.velocity = p5.Vector.sub(
      createVector(mouseX, mouseY),
      this.origin
    ).setMag(10);
    this.img = img;
    this.type = type;
  }

  draw(xOffset, yOffset) {
    const scaleRatio = (canvasWidth / 800) * drawRatio;
    const drawX = (this.pos.x - xOffset) * scaleRatio;
    const drawY = (this.pos.y - yOffset) * scaleRatio;
    const drawSize = this.size * scaleRatio;
    if (this.velocity != 0) {
      const angle = this.velocity.heading();
      push();
      translate(drawX + drawSize / 2, drawY + drawSize / 2);
      rotate(angle);
      imageMode(CENTER);
      image(
        images["image_tiles"],
        0,
        0,
        drawSize,
        drawSize,
        this.img[0] * this.spriteSize,
        this.img[1] * this.spriteSize,
        this.spriteSize,
        this.spriteSize
      );
      pop();
    }
  }

  /** Updates the bullet's position and handles interactions with blocks. */
  update() {
    this.pos.add(this.velocity);
    if (
      this.pos.x < 0 ||
      this.pos.x > currentMap.blocks[0].length * 50 ||
      this.pos.y < 0 ||
      this.pos.y > currentMap.blocks.length * 50
    ) {
      return "undefined";
    }
    const block = this.getBlock();
    if (block === null || block === undefined) {
      return;
    }
    if (block instanceof DirectionWall && block.type === "standard") {
      this.getNotBlockedSides();
      if (!this.isEnteringAllowed(block)) {
        console.warn("Direction mismatch — no portal placed111.");
        return "undefined";
      }
      this.placePortal(block);
      return "inStandard";
    } else if (block instanceof Wall && block.type === "solid") {
      return "undefined";
    } else if (block instanceof Portal) {
      const incomingDir = this.getEntryDirection();
      this.getNotBlockedSides();
      if (!this.isEnteringAllowed(block)) {
        console.warn("Direction mismatch — no portal placed222.");
        return "undefined";
      }
      if (block.type !== this.type || block.direction !== incomingDir) {
        console.log("Portal override by bullet at", this.getLoc());
        this.placePortal(block);
        return "undefined";
      }
      return "undefined";
    }
    if (block.type?.startsWith("reflect")) {
      this.getNotBlockedSides();
      if (!this.isEnteringAllowed(block)) return "undefined";
      sounds["bulletBounceSoundEffect"].play();
      return this.reflect(block);
    }
  }

  /** Determines the available directions the bullet can move based on nearby blocks. */
  getNotBlockedSides() {
    var block_col = this.getLoc()[0];
    var block_row = this.getLoc()[1];
    if (
      block_row - 1 >= 0 &&
      !(
        currentMap.blocks[block_row - 1][block_col] instanceof Wall ||
        currentMap.blocks[block_row - 1][block_col] instanceof DirectionWall
      )
    ) {
      currentMap.blocks[block_row][block_col].direction.push("top");
    }
    if (
      block_col + 1 <= currentMap.blocks[0].length - 1 &&
      !(
        currentMap.blocks[block_row][block_col + 1] instanceof Wall ||
        currentMap.blocks[block_row][block_col + 1] instanceof DirectionWall
      )
    ) {
      currentMap.blocks[block_row][block_col].direction.push("right");
    }
    if (
      block_row + 1 <= currentMap.blocks.length - 1 &&
      !(
        currentMap.blocks[block_row + 1][block_col] instanceof Wall ||
        currentMap.blocks[block_row + 1][block_col] instanceof DirectionWall
      )
    ) {
      currentMap.blocks[block_row][block_col].direction.push("bottom");
    }
    if (
      block_col - 1 >= 0 &&
      !(
        currentMap.blocks[block_row][block_col - 1] instanceof Wall ||
        currentMap.blocks[block_row][block_col - 1] instanceof DirectionWall
      )
    ) {
      currentMap.blocks[block_row][block_col].direction.push("left");
    }
  }

  /** Returns the block at the bullet's current location. */
  getBlock() {
    const [col, row] = this.getLoc();
    if (
      row < 0 ||
      row >= currentMap.blocks.length ||
      col < 0 ||
      col >= currentMap.blocks[0].length
    )
      return null;
    return currentMap.blocks[row][col];
  }

  /** Returns the block coordinates for the bullet's current location. */
  getLoc(x = this.pos.x + this.size / 2, y = this.pos.y + this.size / 2) {
    return [floor(x / 50), floor(y / 50)];
  }

  /** Checks if the bullet is allowed to enter a specific block based on its entry direction. */
  isEnteringAllowed(block) {
    const direction = this.getEntryDirection();
    if (!direction) {
      console.warn("No entry direction detected, allowing fallback.");
      return true;
    }
    return block.direction?.includes(direction);
  }

  /** Determines the direction the bullet is entering a block from. */
  getEntryDirection() {
    const center = this.getBlockCenter();
    let A;
    if (this.lastReflect != null) {
      A = this.lastReflect;
    } else {
      A = this.origin;
    }
    const B = p5.Vector.add(
      this.pos,
      createVector(this.size / 2, this.size / 2)
    );
    const offset = 50 / 2;
    const sides = {
      top: [
        { x: center.x - offset, y: center.y - offset },
        { x: center.x + offset, y: center.y - offset },
      ],
      bottom: [
        { x: center.x - offset, y: center.y + offset },
        { x: center.x + offset, y: center.y + offset },
      ],
      left: [
        { x: center.x - offset, y: center.y - offset },
        { x: center.x - offset, y: center.y + offset },
      ],
      right: [
        { x: center.x + offset, y: center.y - offset },
        { x: center.x + offset, y: center.y + offset },
      ],
    };

    for (const dir in sides) {
      const [P1, P2] = sides[dir];
      if (isIntersecting(P1, P2, A, B)) {
        return dir;
      }
    }
  }

  /** Returns the center position of the block the bullet is in. */
  getBlockCenter() {
    const [col, row] = this.getLoc();
    return { x: col * 50 + 25, y: row * 50 + 25 };
  }

  /** Places a portal at the bullet's current location and updates the map. */
  placePortal(block) {
    const [col, row] = this.getLoc();
    const incomingDir = this.getEntryDirection();

    const spriteMap = {
      blue: { top: [6, 0], bottom: [7, 0], left: [8, 0], right: [9, 0] },
      red: { top: [10, 0], bottom: [11, 0], left: [12, 0], right: [13, 0] },
    };
    const sprite = spriteMap[this.type][incomingDir];
    const existingBlock = currentMap.blocks[row][col];
    if (existingBlock instanceof Portal) {
      if (existingBlock.type !== this.type) {
        console.log("Replacing portal with different color");
      } else if (existingBlock.facingDirection !== incomingDir) {
        console.log("Updating same-color portal to new direction");
      } else {
        console.log("Same portal and direction exist. No update.");
        return;
      }
    }
    for (let r = 0; r < currentMap.blocks.length; r++) {
      for (let c = 0; c < currentMap.blocks[r].length; c++) {
        if (r === row && c === col) continue;
        const b = currentMap.blocks[r][c];
        if (b instanceof Portal && b.type === this.type) {
          currentMap.blocks[r][c] = new DirectionWall(
            c * 50,
            r * 50,
            [1, 0],
            "standard"
          );
        }
      }
    }
    currentMap.blocks[row][col] = new Portal(
      col * 50,
      row * 50,
      sprite,
      this.type,
      incomingDir
    );
  }
  /** Reflects the bullet's velocity based on the block's type and entry direction. */
  reflect(block) {
    const direction = this.getEntryDirection();
    const [col, row] = this.getLoc();

    if (
      this.lastReflectBlock &&
      this.lastReflectBlock[0] === col &&
      this.lastReflectBlock[1] === row
    ) {
      return "undefined";
    }
    let reflected = false;
    if (
      (direction === "left" && block.type === "reflectLeft") ||
      (direction === "right" && block.type === "reflectRight")
    ) {
      this.velocity.x *= -1;
      reflected = true;
    } else if (
      (direction === "top" && block.type === "reflectUp") ||
      (direction === "bottom" && block.type === "reflectDown")
    ) {
      this.velocity.y *= -1;
      reflected = true;
    }
    if (reflected) {
      this.lastReflect = this.pos.copy();
      this.lastReflectBlock = [col, row];
      return "inReflect";
    }
    return "undefined";
  }
}

/** Determines if two line segments (AB and CD) intersect. */
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
