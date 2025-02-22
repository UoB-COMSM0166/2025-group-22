class Enemy {
  constructor(x, y, img, type, movement) {
    this.pos = createVector(x, y);
    this.velocity = createVector(10, 0);
    this.gravity = 15;
    this.img = img;
    this.type = type;
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

  draw(xOffset, yOffset) {
    if(this.type == "dragon"){
      image(
        enemies_image, 
        this.pos.x - xOffset, 
        this.pos.y - yOffset - 50, 
        this.size, this.size, 
        this.img[0] * this.spriteSize, 
        (this.img[1] - 1) * this.spriteSize, 
        this.spriteSize, 
        this.spriteSize);
      image(
        enemies_image, 
        this.pos.x - xOffset - 50, 
        this.pos.y - yOffset, 
        this.size, this.size, 
        (this.img[0] - 1) * this.spriteSize, 
        this.img[1] * this.spriteSize, 
        this.spriteSize, 
        this.spriteSize);
      image(
        enemies_image, 
        this.pos.x - xOffset - 50, 
        this.pos.y - yOffset - 50, 
        this.size, this.size, 
        (this.img[0] - 1) * this.spriteSize, 
        (this.img[1] - 1) * this.spriteSize, 
        this.spriteSize, 
        this.spriteSize);
    }

    image(
      enemies_image, 
      this.pos.x - xOffset, 
      this.pos.y - yOffset, 
      this.size, this.size, 
      this.img[0] * this.spriteSize, 
      this.img[1] * this.spriteSize, 
      this.spriteSize, 
      this.spriteSize);
    this.update();
  }

  onSolid() {
    if (this.getBlockType(this.getLoc(this.pos.x - currentMap.xOffset, this.pos.y + this.size)) == "Wall" || this.getBlockType(this.getLoc(this.pos.x - currentMap.xOffset, this.pos.y + this.size)) == "DirectionWall") {
      if (this.getBlockType(this.getLoc(this.pos.x - currentMap.xOffset + this.size - 1, this.pos.y + this.size)) == "Wall" || this.getBlockType(this.getLoc(this.pos.x - currentMap.xOffset, this.pos.y + this.size)) == "DirectionWall") {
        return true;
      }
    }
    return false;
  }

  nextToSolid() {
    if (this.getBlockType(this.getLoc(this.pos.x - currentMap.xOffset - 1, this.pos.y)) == "Wall" || this.getBlockType(this.getLoc(this.pos.x - currentMap.xOffset, this.pos.y + this.size)) == "DirectionWall") {
      return true;
    } else if (this.getBlockType(this.getLoc(this.pos.x - currentMap.xOffset + this.size, this.pos.y)) == "Wall" || this.getBlockType(this.getLoc(this.pos.x - currentMap.xOffset, this.pos.y + this.size)) == "DirectionWall") {
      return true;
    }
    return false;
  }

  getBlockType(z) {
    return currentMap.blocks[z[1]][z[0]].constructor.name;
  }

  getLoc(x = this.pos.x, y = this.pos.y) {
    var location = [floor((x + currentMap.xOffset) / 50), floor((y) / 50)];
    return location;
  }
}