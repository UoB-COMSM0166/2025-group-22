class PortalSolid {
  constructor(x, y, img, direction, type) {
    //this.direction = direction;
    this.pos = createVector(x, y);
    this.img = img
    this.size = 50;
    this.spriteSize = 64;
    this.type = type;
    this.direction = direction;
    //this.sprites

  }
  draw(offset, yOffset) {
    image(tiles_image, this.pos.x - offset, this.pos.y - yOffset, this.size, this.size, this.img[0] * this.spriteSize, this.img[1] * this.spriteSize, this.spriteSize, this.spriteSize);
  }

}