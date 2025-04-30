class LevelController {
  static nextLevel() {
    const next = LevelController.getNextLevel(currentLevel);
    if (next) {
      this.saveLevelTime();
      this.markLevelComplete(currentLevel); // ✅ 标记当前关卡已完成
      currentLevel = next;
      GameController.start(currentLevel);
    } else {
      this.markLevelComplete(currentLevel); // ✅ 最后一关也需要标记
      GameController.win();
    }
  }

  static getNextLevel(level) {
    const levels = ["sample", "level1", "level2", "level3"];
    const index = levels.indexOf(level);
    return index >= 0 && index < levels.length - 1 ? levels[index + 1] : null;
  }

  static resetLevel() {
    GameController.start(currentLevel);
  }

  static goToLevel(level) {
    if (["sample", "level1", "level2", "level3"].includes(level) && this.isLevelUnlocked(level)) {
      currentLevel = level;
      GameController.start(level);
    } else {
      console.warn(`❌ 无法进入 ${level}，前一关尚未通关`);
    }
  }

  static saveLevelTime() {
    const key = `levelTime-${playerName}`;
    const allTimes = JSON.parse(localStorage.getItem(key)) || {};
    allTimes[currentLevel] = elapsedTime;
    localStorage.setItem(key, JSON.stringify(allTimes));
  }

  static markLevelComplete(level) {
    // const key = `levelCompleted-${playerName}`;
    const key = `levelCompleted`;
    const completed = JSON.parse(localStorage.getItem(key)) || {};
    completed[level] = true;
    localStorage.setItem(key, JSON.stringify(completed));
  }

  static isLevelUnlocked(level) {
    const levels = ["sample", "level1", "level2", "level3"];
    const index = levels.indexOf(level);
    if (index === 0 || index === 1) return true; // 第一关永远解锁
    const prevLevel = levels[index - 1];
    // const completed = JSON.parse(localStorage.getItem(`levelCompleted-${playerName}`)) || {};
    const completed = JSON.parse(localStorage.getItem(`levelCompleted`)) || {};

    //                                  ****** for test unlock all level ******
    // return completed[prevLevel];//   ****** for test unlock all level ******
    return true;//                      ****** for test unlock all level ******
    //                                  ****** for test unlock all level ******
  }
}
