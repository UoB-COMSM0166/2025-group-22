// 📁 models/Item.js
class Item {
  constructor(x, y, img, type) {
    this.pos = createVector(x, y);
    this.img = img;        // [col, row] in tileset
    this.type = type;      // "heart", "key", "door", etc.
    this.size = 50;
    this.spriteSize = 64;
  }

  draw(xOffset, yOffset) {
    var imagePadding = 1;
    const x = this.pos.x - xOffset;
    const y = this.pos.y - yOffset;
    const sx = this.img[0] * this.spriteSize;
    const sy = this.img[1] * this.spriteSize + imagePadding;

    if (this.type === "door") {
      image(images["image_tiles"], x, y - 50, this.size, this.size, sx, sy - this.spriteSize, this.spriteSize, this.spriteSize);
      image(images["image_tiles"], x, y, this.size, this.size, sx, sy, this.spriteSize, this.spriteSize);
    }
    else if(this.type === "key" || this.type === "heart") {
      const tileX = this.img[0];
      const tileY = this.img[1];

      iconEffect(
          images["image_tiles"],
          x, y,
          this.size, this.size,
          {
            float: true,
            floatSpeed: 0.03,
            floatAmplitude: 3,
            floatOffset: 0,
            highlightOnlyHover: false,
            alpha: 255,
            buttonX: x,
            buttonY: y,
            buttonWidth: this.size,
            buttonHeight: this.size
          },
          [tileX, tileY],
          this.spriteSize
      );
    }

  }
}
