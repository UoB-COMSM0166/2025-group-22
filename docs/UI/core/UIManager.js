class UIManager {
  static loadingInstance = null;
  static currentInstance = null; // ⭐ 保留目前 UI 實例

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
      namePrompt: () => new NameUI()
    };

    const factory = uiMap[gameState];
    if (!factory) return null;

    const nextUI = factory();

    // ⭐ 如果目前 UI 不存在，或不是這個類型，就建立新的
    if (
        !UIManager.currentInstance ||
        !(UIManager.currentInstance instanceof nextUI.constructor)
    ) {
      UIManager.currentInstance = nextUI;
    }

    return UIManager.currentInstance;
  }

  static drawCurrentUI() {
    const ui = UIManager.getCurrentUI();
    if (ui) {
      ui.draw();
    }
  }

  static imageEffect(img, x, y, width, height, {
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
    exploding = false,
    dx = 0,
    dy = 0,
    speed = 0
  } = {}) {
    let drawX = x;
    let drawY = y;

    // ✅ 飛散效果
    if (exploding) {
      drawX += dx * speed;
      drawY += dy * speed;
    }

    // ✅ 浮動效果
    if (float) {
      drawY += Math.sin(frameCount * floatSpeed + floatOffset) *
          (floatAmplitude / originalWidth) * canvasWidth;
    }

    // ✅ 高光
    const isHovered =
        mouseX >= buttonX - buttonWidth / 2 && mouseX <= buttonX + buttonWidth / 2 &&
        mouseY >= buttonY - buttonHeight / 2 && mouseY <= buttonY + buttonHeight / 2;

    push();
    tint(gray, alpha);
    if (highlightOnlyHover && isHovered) {
      blendMode(ADD);
    }

    image(img, drawX, drawY, width, height);
    pop();
  }
}
