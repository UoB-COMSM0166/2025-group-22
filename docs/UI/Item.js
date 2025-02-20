class Item {
  constructor(x, y, img, type) {
    this.pos = createVector(x, y);
    this.size = 50;
    this.spriteSize = 64
    this.img = img;
    this.type = type;


  }
  draw(xOffset, yOffset) {
    if (this.type === "door") {
      image(
        tiles_image, 
        this.pos.x - xOffset,
        this.pos.y - yOffset - 50, 
        this.size, 
        this.size, 
        (this.img[0]) * this.spriteSize, 
        (this.img[1] - 1) * this.spriteSize, 
        this.spriteSize, 
        this.spriteSize)
      image(
        tiles_image, 
        this.pos.x - xOffset, 
        this.pos.y - yOffset, 
        this.size, 
        this.size, 
        (this.img[0]) * this.spriteSize, 
        this.img[1]  * this.spriteSize, 
        this.spriteSize, 
        this.spriteSize);
    } else {
      image(
        tiles_image, 
        this.pos.x - xOffset, 
        this.pos.y - yOffset, 
        this.size, this.size, 
        this.img[0] * this.spriteSize, 
        this.img[1] * this.spriteSize, 
        this.spriteSize, 
        this.spriteSize);
    }
  }








}