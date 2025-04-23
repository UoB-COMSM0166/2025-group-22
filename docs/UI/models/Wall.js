// 📁 models/Wall.js
class Wall {
  constructor(x, y, img, type = "solid") {
    this.pos = createVector(x, y);
    this.img = img;          // [col, row] in tileset
    this.size = 50;          // tile size
    this.spriteSize = 64;    // source sprite size
    this.type = type;        // block type, e.g., "solid"
  }

  draw(xOffset = 0, yOffset = 0) {
    image(
      images["image_tiles"],
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
}
