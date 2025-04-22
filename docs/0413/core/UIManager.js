class UIManager {
  static getCurrentUI() {
    const uiMap = {
      start: () => new StartUI(),
      guide: () => new GuideUI(),
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
}
