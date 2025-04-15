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
}
