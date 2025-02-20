class Wall {
  constructor(x, y, img, type) {
    this.pos = createVector(x, y); //2D location
    this.img = img
    this.size = 50; //visible size
    this.spriteSize = 64;
    this.type = type;

  }
  draw(xOffset, yOffset) {
    image(
      tiles_image, 
      this.pos.x - xOffset, //camara offset
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