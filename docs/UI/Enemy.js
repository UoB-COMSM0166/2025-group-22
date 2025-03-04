class Enemy {
  constructor(x, y, img, type, movement) {
    this.pos = createVector(x, y);
    this.velocity = createVector(5, 0);
    //this.gravity = 15;
    this.img = img;
    this.type = type;
    this.canMove = movement;
    this.size = 50;
    this.spriteSize = 64;
  }

  update() {
    if (this.canMove) {
      this.pos.x += this.velocity.x
      if (this.nextToWall() || !this.onWall())
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
      image(
        enemies_image, 
        this.pos.x - xOffset, 
        this.pos.y - yOffset, 
        this.size, this.size, 
        this.img[0] * this.spriteSize, 
        this.img[1] * this.spriteSize, 
        this.spriteSize, 
        this.spriteSize);
    }else{
      image(
        enemies_image, 
        this.pos.x - xOffset, 
        this.pos.y - yOffset, 
        this.size, this.size, 
        this.img[0] * this.spriteSize, 
        this.img[1] * this.spriteSize, 
        this.spriteSize, 
        this.spriteSize);
    }
    this.update();
  }

  onWall() {
    if (this.getBlockClass(this.getLoc(this.pos.x - currentMap.xOffset, this.pos.y + this.size)) instanceof Wall) {
      if (this.getBlockClass(this.getLoc(this.pos.x - currentMap.xOffset + this.size - 1, this.pos.y + this.size)) instanceof Wall) {
        return true;
      }
    }
    return false;
  }

  nextToWall() {
    if (this.getBlockClass(this.getLoc(this.pos.x - currentMap.xOffset - 1, this.pos.y)) instanceof Wall) {
      return true;
    } else if (this.getBlockClass(this.getLoc(this.pos.x - currentMap.xOffset + this.size, this.pos.y)) instanceof Wall) {
      return true;
    }
    return false;
  }

  getBlockClass(gridPos) {
    return currentMap.blocks[gridPos[1]][gridPos[0]];
  }

  getLoc(x = this.pos.x, y = this.pos.y) {
    var location = [floor((x + currentMap.xOffset) / 50), floor((y + currentMap.yOffset) / 50)];
    return location;
  }
}