// 📁 core/UIManager.js
class UIManager {
  static getCurrentUI() {
    const uiMap = {
      start: () => new StartUI(),
      choosingLevel: () => new LevelUI(),
      pause: () => new PauseUI(),
      gameOver: () => new GameOverUI(),
      win: () => new WinUI(),
      namePrompt: () => new NameUI()
    };
    return uiMap[gameState]?.() || null;
  }

  static drawCurrentUI() {
    const ui = UIManager.getCurrentUI();
    if (ui) {
      ui.draw();
      ui.handleMouseClick();
    }
  }
  static imageEffect(img, x, y, width, height, {
    highlightOnlyHover = false, // 只有 hover 才高光
    alpha = 255,
    float = false,
    floatSpeed = 0.03,
    floatAmplitude = 3,
    floatOffset = 0,
    buttonX,
    buttonY,
    buttonWidth,
    buttonHeight
  } = {}) {
    let drawY = y;

    if (float) {
      drawY = y + Math.sin(frameCount * floatSpeed + floatOffset) * floatAmplitude;
    }

    const isHovered =
        mouseX >= buttonX - buttonWidth / 2 && mouseX <= buttonX + buttonWidth / 2 &&
        mouseY >= buttonY - buttonHeight / 2 && mouseY <= buttonY + buttonHeight / 2;

    push();
    if (highlightOnlyHover && isHovered) {
      blendMode(ADD);
      tint(255, alpha);
    }
    image(img, x, drawY, width, height);
    pop();
  }
  // static imageFloat(img, x, y, width, height, floatOffset, floatSpeed, floatAmplitude) {
  //   let floatY = y + Math.sin(frameCount * floatSpeed + floatOffset) * floatAmplitude;
  //   image(img, x, floatY, width, height);
  // }
  //
  // static imageHover(imageHover, x, y, width, height, alpha){
  //   const isHovered =
  //       mouseX >= x - width / 2 && mouseX <= x + width / 2 &&
  //       mouseY >= y - height / 2 && mouseY <= y + height / 2;
  //   // 這裡你就可以針對「有被 hover 的按鈕」做額外的效果
  //   if (isHovered) {
  //     push();
  //     tint(255, alpha);
  //     image(imageHover, 0, 0, canvasWidth, canvasHeight);
  //     pop();
  //   }
  // }
}
