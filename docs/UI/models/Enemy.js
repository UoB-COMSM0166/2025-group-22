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
    this.animationFrame = 0;
    this.movingTimer = 0;
  }

  draw(xOffset, yOffset) {
    // if (this.type === "dragon") {
    //   this.drawPart(xOffset, yOffset, 0, 0);
    //   this.drawPart(xOffset, yOffset, -50, 0, -1, 0);
    //   this.drawPart(xOffset, yOffset, -50, -50, -1, -1);
    //   this.drawPart(xOffset, yOffset, 0, -50, 0, -1);
    // } else {
      this.drawPart(xOffset, yOffset);
    // }
    this.update();
  }

  drawPart(xOffset, yOffset, dx = 0, dy = 0, offsetCol = 0, offsetRow = 0) {
    const animCol = this.animationFrame;
    const drawX = this.pos.x + dx - xOffset;
    const drawY = this.pos.y + dy - yOffset;

    push(); // 儲存當前畫布狀態

    if (this.facingLeft) {
      // 當朝左時，水平翻轉
      translate(drawX + this.size, drawY); // 平移畫布到角色位置 + size
      scale(-1, 1); // 水平翻轉
    } else {
      translate(drawX, drawY); // 正常平移
    }

    image(
      images["image_enemies"],
      0, 0, // 畫出位置改為 (0, 0) 因為我們已經 translate 過了
      this.size,
      this.size,
      (this.img[0] + animCol) * this.spriteSize,
      (this.img[1] + offsetRow) * this.spriteSize,
      this.spriteSize,
      this.spriteSize
    );

    pop(); // 還原畫布狀態
  }

  update() {
    if (this.canMove) {
      this.pos.x += this.velocity.x;

      if (this.nextToWall() || !this.onSolidGround()) {
        this.velocity.x *= -1;
        this.facingLeft = this.velocity.x < 0;

      }

      // 移动才动画：走动 1 和 2 两帧轮换
      this.movingTimer++;
      if (this.movingTimer >= 12) { // 每12帧换一次
        this.animationFrame = (this.animationFrame + 1) % 2; // 在 [1, 2] 之间轮换
        this.movingTimer = 0;
      }
    } else {
      this.animationFrame = 0; // 停止时永远用帧0
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
