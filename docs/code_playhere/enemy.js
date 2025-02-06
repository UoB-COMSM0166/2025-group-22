class Enemy {
  constructor(x, y, img, movement) {
    this.pos = createVector(x, y);
    this.velocity = createVector(10, 0);
    this.gravity = 15
    this.img = img
    this.canMove = movement;
    this.size = 50;
    this.spriteSize = 64;
  }

  update() {
    if (this.canMove) {
      this.pos.x += this.velocity.x
      if (this.nextToSolid() || !this.onSolid())
        this.velocity.x = -this.velocity.x;
    }
  }

  draw(offset, yOffset) {
    image(tiles_image, this.pos.x - offset, this.pos.y - yOffset, this.size, this.size, this.img[0] * this.spriteSize, this.img[1] * this.spriteSize, this.spriteSize, this.spriteSize);
    this.update();
  }

  onSolid() {
    if (this.getBlockType(this.getLoc(this.pos.x - map1.offset, this.pos.y + this.size)) == "Solid") {
      if (this.getBlockType(this.getLoc(this.pos.x - map1.offset + this.size - 1, this.pos.y + this.size)) == "Solid") {
        return true;
      }
    }
    return false;
  }

  nextToSolid() {
    if (this.getBlockType(this.getLoc(this.pos.x - map1.offset - 1, this.pos.y)) == "Solid") {
      return true;
    } else if (this.getBlockType(this.getLoc(this.pos.x - map1.offset + this.size, this.pos.y)) == "Solid") {
      return true;
    }
    return false;
  }

  getBlockType(z) {
    return map1.blocks[z[1]][z[0]].constructor.name;
  }

  getLoc(x = this.pos.x, y = this.pos.y) {
    var location = [floor((x + map1.offset) / 50), floor((y) / 50)];
    return location;
  }
}