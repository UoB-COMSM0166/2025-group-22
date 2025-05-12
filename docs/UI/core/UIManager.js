class UIManager {
  static loadingInstance = null;
  /** Returns the current UI instance based on game state. */
  static getCurrentUI() {
    const uiMap = {
      loading: () => {
        if (!UIManager.loadingInstance) {
          UIManager.loadingInstance = new LoadingUI();
        }
        return UIManager.loadingInstance;
      },
      start: () => new StartUI(),
      guide: () => new GuideUI(),
      choosingLevel: () => new LevelUI(),
      pause: () => new PauseUI(),
      gameOver: () => new GameOverUI(),
      win: () => new WinUI(),
      namePrompt: () => new NameUI(),
    };
    return uiMap[gameState]?.() || null;
  }
  /** Draws the current active UI. */
  static drawCurrentUI() {
    const ui = UIManager.getCurrentUI();
    if (ui) {
      ui.draw();
    }
  }
  /** Renders an image with visual effects (hover, float, tint). */
  static imageEffect(
    img,
    x,
    y,
    width,
    height,
    {
      highlightOnlyHover = false,
      gray = 255,
      alpha = 255,
      float = false,
      floatSpeed = 0.03,
      floatAmplitude = 3,
      floatOffset = 0,
      buttonX,
      buttonY,
      buttonWidth,
      buttonHeight,
    } = {}
  ) {
    let drawY = y;

    if (float) {
      drawY =
        y +
        ((Math.sin(frameCount * floatSpeed + floatOffset) * floatAmplitude) /
          originalWidth) *
          canvasWidth;
    }

    const isHovered =
      mouseX >= buttonX - buttonWidth / 2 &&
      mouseX <= buttonX + buttonWidth / 2 &&
      mouseY >= buttonY - buttonHeight / 2 &&
      mouseY <= buttonY + buttonHeight / 2;

    push();
    tint(gray, alpha);
    if (highlightOnlyHover && isHovered) {
      blendMode(ADD);
    }

    image(img, x, drawY, width, height);
    pop();
  }
  
  /** Applies consistent text styling for UI elements. */
  static textStyle(color = 255, sizeRatio = 20) {
    textFont("Lucida Console");
    textStyle(BOLD);
    fill(color);
    textSize((canvasWidth * sizeRatio) / 800);
  }
}
