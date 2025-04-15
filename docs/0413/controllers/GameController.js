// 📁 controllers/GameController.js
class GameController {
  static start(level = "level1") {
    currentLevel = level;
    gameState = "playing";
    this.loadLevel();
    this.initPlayer();
    this.startTimer();
  }

  static loadLevel() {
    // 浅拷贝一层就够了，但要注意拷贝每一行子数组，否则还是引用
    const levels = {
      level1: level1.map(row => [...row]),
      level2: level2.map(row => [...row]),
      level3: level3.map(row => [...row])
    };
    currentMap = new Maps(levels[currentLevel]);
  }

  static initPlayer() {
    player = new Player();
  }

  static startTimer() {
    startTime = millis();
    elapsedTime = 0;
    pausedTime = 0;
    timerRunning = true;
  }

  static pause() {
    gameState = "pause";
    timerRunning = false;
    pausedTime = elapsedTime;
  }

  static resume() {
    gameState = "playing";
    startTime = millis() - pausedTime;
    timerRunning = true;
  }

  static restart() {
    // console.log("currentLevel: by restart", currentLevel);
    this.start(currentLevel);
  }

  static win() {
    gameState = "win";
    timerRunning = false;
  }

  static gameOver() {
    gameState = "gameOver";
    timerRunning = false;
  }

  static is(state) {
    return gameState === state;
  }

  static isOver() {
    return ["win", "gameOver"].includes(gameState);
  }

  static isPlaying() {
    return gameState === "playing";
  }

  static isPaused() {
    return gameState === "pause";
  }
}
