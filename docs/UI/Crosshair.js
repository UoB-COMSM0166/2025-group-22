class Crosshair {
  constructor(img) {
    this.img = img
    this.size = 15;
    this.spriteSize = 64;
    //this.sprites

  }
  draw(offset, yOffset) {
    image(tiles_image, 
      mouseX - this.size/2, 
      mouseY - this.size/2, 
      this.size, 
      this.size, 
      this.img[0] * this.spriteSize, 
      this.img[1] * this.spriteSize, 
      this.spriteSize, 
      this.spriteSize);
  }

}