class Crosshair {
  constructor(img) {
    this.img = img;
    this.baseSize = 15;       // 基础准心尺寸，逻辑单位
    this.spriteSize = 64;
  }

  draw() {
    const scaleRatio = (canvasWidth / 800) * 0.5;

    // 将 mouseX/mouseY 映射回逻辑世界坐标
    const logicMouseX = mouseX / scaleRatio;
    const logicMouseY = mouseY / scaleRatio;

    // 绘制用缩放后的准心大小
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
