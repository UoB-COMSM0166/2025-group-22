// 📁 controllers/LevelController.js
class LevelController {
  static nextLevel() {
    const next = LevelController.getNextLevel(currentLevel);
    if (next) {
      currentLevel = next;
      GameController.start(currentLevel);
    } else {
      GameController.win();
    }
  }

  static getNextLevel(level) {
    const levels = ["level1", "level2", "level3"];
    const index = levels.indexOf(level);
    return index >= 0 && index < levels.length - 1 ? levels[index + 1] : null;
  }

  static resetLevel() {
    GameController.start(currentLevel);
  }

  static goToLevel(level) {
    if (["level1", "level2", "level3"].includes(level)) {
      currentLevel = level;
      GameController.start(level);
    }
  }
}
