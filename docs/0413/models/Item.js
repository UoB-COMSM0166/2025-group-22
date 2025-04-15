// 📁 models/Item.js
class Item {
  constructor(x, y, img, type) {
    this.pos = createVector(x, y);
    this.img = img;        // [col, row] in tileset
    this.type = type;      // "heart", "key", "door", etc.
    this.size = 50;
    this.spriteSize = 64;
  }

  draw(xOffset, yOffset) {
    const x = this.pos.x - xOffset;
    const y = this.pos.y - yOffset;
    const sx = this.img[0] * this.spriteSize;
    const sy = this.img[1] * this.spriteSize;

    if (this.type === "door") {
      image(tiles_image, x, y - 50, this.size, this.size, sx, sy - this.spriteSize, this.spriteSize, this.spriteSize);
      image(tiles_image, x, y, this.size, this.size, sx, sy, this.spriteSize, this.spriteSize);
    } else {
      image(tiles_image, x, y, this.size, this.size, sx, sy, this.spriteSize, this.spriteSize);
    }
  }
}