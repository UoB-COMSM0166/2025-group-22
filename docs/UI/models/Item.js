class Item {
  constructor(x, y, img, type) {
    this.pos = createVector(x, y);
    this.img = img;        // [col, row] in tileset or enemy sheet
    this.type = type;      // "heart", "key", "door", "dragon" etc.
    this.size = 50;
    this.spriteSize = 64;
  }

  update() {
    // 🔥 移除 fireball 相关逻辑
  }

  draw(xOffset, yOffset) {
    const x = this.pos.x - xOffset;
    const y = this.pos.y - yOffset;

    if (this.type === "dragon") {
      // ✅ 2×2 拼图绘制龙 (0,2), (1,2), (0,3), (1,3)
      image(images["image_enemies"], x, y, this.size, this.size, 0 * this.spriteSize, 2 * this.spriteSize, this.spriteSize, this.spriteSize);         // 左上
      image(images["image_enemies"], x + 50, y, this.size, this.size, 1 * this.spriteSize, 2 * this.spriteSize, this.spriteSize, this.spriteSize);     // 右上
      image(images["image_enemies"], x, y + 50, this.size, this.size, 0 * this.spriteSize, 3 * this.spriteSize, this.spriteSize, this.spriteSize);     // 左下
      image(images["image_enemies"], x + 50, y + 50, this.size, this.size, 1 * this.spriteSize, 3 * this.spriteSize, this.spriteSize, this.spriteSize); // 右下
      return;
    }

    // ✅ 普通道具绘制逻辑
    const imagePadding = 1;
    const sx = this.img[0] * this.spriteSize;
    const sy = this.img[1] * this.spriteSize + imagePadding;

    if (this.type === "door") {
      image(images["image_tiles"], x, y - 50, this.size, this.size, sx, sy - this.spriteSize, this.spriteSize, this.spriteSize);
      image(images["image_tiles"], x, y, this.size, this.size, sx, sy, this.spriteSize, this.spriteSize);
    } else if (this.type === "key" || this.type === "heart") {
      iconEffect(
        images["image_tiles"],
        x, y,
        this.size, this.size,
        {
          float: true,
          floatSpeed: 0.03,
          floatAmplitude: 3,
          floatOffset: 0,
          highlightOnlyHover: false,
          alpha: 255,
          buttonX: x,
          buttonY: y,
          buttonWidth: this.size,
          buttonHeight: this.size
        },
        [this.img[0], this.img[1]],
        this.spriteSize
      );
    } else {
      image(images["image_tiles"], x, y, this.size, this.size, sx, sy, this.spriteSize, this.spriteSize);
    }
  }
}
