class Item {
  constructor(x, y, img, type) {
    this.pos = createVector(x, y);
    this.img = img;
    this.type = type;
    this.size = 50;
    this.spriteSize = 64;
    this.animationFrame = 0;
    this.movingTimer = 0;
  }

  update() {
    this.movingTimer++;
    if (this.movingTimer >= 18) {
      this.animationFrame = (this.animationFrame + 1) % 3;
      this.movingTimer = 0;
    }
  }

  draw(xOffset, yOffset) {
    const x = this.pos.x - xOffset;
    const y = this.pos.y - yOffset;

    const imagePadding = 1;
    const sx = this.img[0] * this.spriteSize;
    const sy = this.img[1] * this.spriteSize + imagePadding;

    this.update();
    if (this.type === "dragon") {
      const dragonFloatOption = {
        float: true,
        floatAmplitude: 2,
        floatOffset: 0.1,
      };
      iconEffect(
        images["image_enemies"],
        x,
        y,
        this.size,
        this.size,
        (0 + 2 * this.animationFrame) * this.spriteSize,
        2 * this.spriteSize,
        this.spriteSize,
        this.spriteSize,
        dragonFloatOption
      );
      iconEffect(
        images["image_enemies"],
        x + 50,
        y,
        this.size,
        this.size,
        (1 + 2 * this.animationFrame) * this.spriteSize +
          2 * this.animationFrame,
        2 * this.spriteSize,
        this.spriteSize,
        this.spriteSize,
        dragonFloatOption
      );
      iconEffect(
        images["image_enemies"],
        x,
        y + 50,
        this.size,
        this.size,
        (0 + 2 * this.animationFrame) * this.spriteSize +
          2 * this.animationFrame,
        3 * this.spriteSize,
        this.spriteSize,
        this.spriteSize,
        dragonFloatOption
      );
      iconEffect(
        images["image_enemies"],
        x + 50,
        y + 50,
        this.size,
        this.size,
        (1 + 2 * this.animationFrame) * this.spriteSize +
          2 * this.animationFrame,
        3 * this.spriteSize,
        this.spriteSize,
        this.spriteSize,
        dragonFloatOption
      );
    } else if (this.type === "door") {
      image(
        images["image_tiles"],
        x,
        y - 50,
        this.size,
        this.size,
        sx,
        sy - this.spriteSize,
        this.spriteSize,
        this.spriteSize
      );
      image(
        images["image_tiles"],
        x,
        y,
        this.size,
        this.size,
        sx,
        sy,
        this.spriteSize,
        this.spriteSize
      );
    } else if (this.type === "key") {
      iconEffect(
        images["image_tiles"],
        x,
        y,
        this.size,
        this.size,
        this.img[0] * this.spriteSize,
        this.img[1] * this.spriteSize,
        this.spriteSize,
        this.spriteSize,
        {
          float: true,
          floatOffset: 0.7,
        }
      );
    } else if (this.type === "potion") {
      iconEffect(
        images["image_tiles"],
        x,
        y,
        this.size,
        this.size,
        this.img[0] * this.spriteSize,
        this.img[1] * this.spriteSize,
        this.spriteSize,
        this.spriteSize,
        {
          float: true,
          floatOffset: 1.4,
        }
      );
    } else {
      image(
        images["image_tiles"],
        x,
        y,
        this.size,
        this.size,
        sx,
        sy,
        this.spriteSize,
        this.spriteSize
      );
    }
  }
}
