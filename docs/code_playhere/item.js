class Item {
  constructor(x, y, img, type) {
    this.pos = createVector(x, y);
    this.size = 50;
    this.type = type;
    this.img = img;
    this.spriteSize = 64


  }
  draw(offset, yOffset) {
    if (this.type == "door") {
      var doorType = player.keys == 0 ? 0 : 4;
      //image(tiles_image, this.pos.x - offset, this.pos.y - yOffset - 25, this.size, this.size, (this.img[0]) * this.spriteSize, (this.img[1] -  0) * this.spriteSize, this.spriteSize, this.spriteSize)
      image(tiles_image, this.pos.x - offset, this.pos.y - yOffset, this.size, this.size, (this.img[0]) * this.spriteSize, this.img[1]  * this.spriteSize, this.spriteSize, this.spriteSize);
    } else {
      image(tiles_image, this.pos.x - offset, this.pos.y - yOffset, this.size, this.size, this.img[0] * this.spriteSize, this.img[1] * this.spriteSize, this.spriteSize, this.spriteSize);
    }
  }








}