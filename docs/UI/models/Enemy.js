class Enemy {
  constructor(x, y, img, type, canMove) {
    this.pos = createVector(x, y);
    this.initialPos = createVector(x, y);

    this.img = img;
    this.type = type;
    this.canMove = canMove;
    this.size = 50;
    this.spriteSize = 64;
    this.animationFrame = 0;
    this.movingTimer = 0;

    if (this.type === "slime") {
      this.velocity = createVector(3, 0);
    } else if (this.type === "saw") {
      this.velocity = createVector(5, 0);
    } else if (this.type === "fireBall") {
      this.velocity = createVector(5, 0);
    }
  }

  draw(xOffset, yOffset) {
    this.drawPart(xOffset, yOffset);
    this.update();
  }

  /** Draws a specific part of the enemy with an optional offset and animation frame. */
  drawPart(xOffset, yOffset, dx = 0, dy = 0, offsetCol = 0, offsetRow = 0) {
    const animCol = this.animationFrame;
    const drawX = this.pos.x + dx - xOffset;
    const drawY = this.pos.y + dy - yOffset;
    push();
    if (this.facingLeft) {
      translate(drawX + this.size, drawY);
      scale(-1, 1);
    } else {
      translate(drawX, drawY);
    }
    image(
      images["image_enemies"],
      0,
      0,
      this.size,
      this.size,
      (this.img[0] + animCol) * this.spriteSize,
      (this.img[1] + offsetRow) * this.spriteSize,
      this.spriteSize,
      this.spriteSize
    );
    pop();
  }

  /** Updates the enemy's position, checks for collisions, and handles animation. */
  update() {
    if (this.canMove) {
      this.pos.x += this.velocity.x;
      const hitWall = this.nextToWall();
      const noGround = !this.onSolidGround();
      if (this.type === "fireBall" && hitWall) {
        this.resetToInitial();
        return;
      }
      if (this.type !== "fireBall" && (hitWall || noGround)) {
        this.velocity.x *= -1;
        this.facingLeft = this.velocity.x < 0;
      }
      this.movingTimer++;
      if (this.movingTimer >= 12) {
        this.animationFrame = (this.animationFrame + 1) % 2;
        this.movingTimer = 0;
      }
    } else {
      this.animationFrame = 0;
    }
  }

  /** Resets the enemy's position to its initial spawn location. */
  resetToInitial() {
    this.pos = this.initialPos.copy();
  }

  /** Checks if the enemy is standing on solid ground. */
  onSolidGround() {
    const leftFoot = CollisionController.isSolid(
      this.pos.x,
      this.pos.y + this.size,
      false
    );
    const rightFoot = CollisionController.isSolid(
      this.pos.x + this.size - 1,
      this.pos.y + this.size,
      false
    );
    return leftFoot && rightFoot;
  }

  /** Checks if the enemy is next to a wall. */
  nextToWall() {
    const left = CollisionController.isSolid(this.pos.x - 1, this.pos.y, false);
    const right = CollisionController.isSolid(
      this.pos.x + this.size,
      this.pos.y,
      false
    );
    return left || right;
  }
}
