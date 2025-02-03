class Bullet {
  constructor(x,y, mousex, mousey, img) {
    this.pos = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.size = 50;
    this.mousex = mousex;
    this.mousey = mousey;
    this.img = img;
    this.spriteSize = 64;
    // this.sprite stuff
  }
  draw(offset, yOffset) {
    image(tiles_image, this.pos.x-offset, this.pos.y-yOffset, this.size, this.size, this.img[0] * this.spriteSize, this.img[1] * this.spriteSize, this.spriteSize, this.spriteSize);
  }
  
}