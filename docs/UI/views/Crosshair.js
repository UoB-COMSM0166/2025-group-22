class Crosshair {
  constructor(img) {
    this.img = img;
    this.baseSize = 15;
    this.spriteSize = 64;
  }

  draw() {
    const scaleRatio = (canvasWidth / 800) * drawRatio;

    const logicMouseX = mouseX / scaleRatio;
    const logicMouseY = mouseY / scaleRatio;

    const drawSize = this.baseSize * scaleRatio;

    image(
      images["image_tiles"],
      logicMouseX * scaleRatio - drawSize / 2,
      logicMouseY * scaleRatio - drawSize / 2,
      drawSize,
      drawSize,
      this.img[0] * this.spriteSize,
      this.img[1] * this.spriteSize,
      this.spriteSize,
      this.spriteSize
    );
  }
}
