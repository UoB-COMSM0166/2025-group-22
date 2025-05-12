class Wall {
  constructor(x, y, img, type = "solid") {
    this.pos = createVector(x, y);
    this.img = img;
    this.size = 50;
    this.spriteSize = 64;
    this.type = type;
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
