// 📁 models/Enemy.js
class Enemy {
  constructor(x, y, img, type, canMove) {
    this.pos = createVector(x, y);
    this.velocity = createVector(5, 0);
    this.img = img;
    this.type = type;
    this.canMove = canMove;
    this.size = 50;
    this.spriteSize = 64;
  }

  draw(xOffset, yOffset) {
    if (this.type === "dragon") {
      this.drawPart(xOffset, yOffset, 0, 0);
      this.drawPart(xOffset, yOffset, -50, 0, -1, 0);
      this.drawPart(xOffset, yOffset, -50, -50, -1, -1);
      this.drawPart(xOffset, yOffset, 0, -50, 0, -1);
    } else {
      this.drawPart(xOffset, yOffset);
    }
    this.update();
  }

  drawPart(xOffset, yOffset, dx = 0, dy = 0, offsetCol = 0, offsetRow = 0) {
    image(
      enemies_image,
      this.pos.x + dx - xOffset,
      this.pos.y + dy - yOffset,
      this.size,
      this.size,
      (this.img[0] + (offsetCol || 0)) * this.spriteSize,
      (this.img[1] + (offsetRow || 0)) * this.spriteSize,
      this.spriteSize,
      this.spriteSize
    );
  }

  update() {
    if (this.canMove) {
      this.pos.x += this.velocity.x;
      if (this.nextToWall() || !this.onSolidGround()) {
        this.velocity.x *= -1;
      }
    }
  }

  onSolidGround() {
    const leftFoot = CollisionController.isSolid(this.pos.x, this.pos.y + this.size, false);
    const rightFoot = CollisionController.isSolid(this.pos.x + this.size - 1, this.pos.y + this.size, false);
    return leftFoot && rightFoot;
  }

  nextToWall() {
    const left = CollisionController.isSolid(this.pos.x - 1, this.pos.y, false);
    const right = CollisionController.isSolid(this.pos.x + this.size, this.pos.y, false);
    return left || right;
  }
}