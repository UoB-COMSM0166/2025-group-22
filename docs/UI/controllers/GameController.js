class GameController {
  /** Starts the game with specified level. */
  static start(level = "sample") {
    currentLevel = level;
    this.loadLevel();
    this.initPlayer();
    if (currentLevel !== "sample") {
      Guide.playGuideAnimation();
    }
    gameState = "playing";
  }

  /** Loads level data into current map. */
  static loadLevel() {
    const levels = {
      sample: sample.map((row) => [...row]),
      level1: level1.map((row) => [...row]),
      level2: level2.map((row) => [...row]),
      level3: level3.map((row) => [...row]),
    };
    currentMap = new Maps(levels[currentLevel]);
  }

  /** Initializes player at level-specific starting position. */
  static initPlayer() {
    player = new Player();
    if (currentLevel === "sample") {
      player.pos = createVector(200, 750);
    } else if (currentLevel === "level1") {
      player.pos = createVector(250, 300);
    } else if (currentLevel === "level2") {
      player.pos = createVector(250, 250);
    } else if (currentLevel === "level3") {
      player.pos = createVector(200, 200);
    }
  }

  /** Starts the game timer. */
  static startTimer() {
    startTime = millis();
    elapsedTime = 0;
    pausedTime = 0;
    timerRunning = true;
  }

  /** Pauses the game. */
  static pause() {
    gameState = "pause";
    timerRunning = false;
    pausedTime = elapsedTime;
  }

  /** Resumes the paused game. */
  static resume() {
    gameState = "playing";
    startTime = millis() - pausedTime;
    timerRunning = true;
  }

  /** Restarts current level. */
  static restart() {
    this.start(currentLevel);
  }

  /** Resets game to initial state. */
  static resetGame() {
    saveScoreFlag = false;
    playerName = null;
  }

  /** Triggers win state. */
  static win() {
    gameState = "win";
    timerRunning = false;
  }

  /** Triggers game over state. */
  static gameOver() {
    gameState = "gameOver";
    timerRunning = false;
  }

  /** Checks if game is in specified state. */
  static is(state) {
    return gameState === state;
  }

  /** Checks if game has ended (win/lose). */
  static isOver() {
    return ["win", "gameOver"].includes(gameState);
  }

  /** Checks if game is paused. */
  static isPaused() {
    return gameState === "pause";
  }

  /** Checks if guide is active. */
  static isGuided() {
    return guideWindowShowing === true;
  }

  /** Hides the guide. */
  static guidOff() {
    guideWindowShowing = false;
  }

  /** Shows the guide. */
  static guideOn() {
    guideWindowShowing = true;
  }
}