class InputController {
  /** Handles all keyboard input events. */
  static handleKeyPressed(key) {
    if (gameState === "namePrompt" && key === "Enter") {
      const currentUI = UIManager.getCurrentUI();
      if (currentUI instanceof NameUI) {
        currentUI.buttons[0].action();
        return;
      }
    }
    if (gameState === "playing" && !timerRunning && player.isAlive()) {
      startTime = millis() - pausedTime;
      timerRunning = true;
    } else if (gameState === "guide") {
      const videoKey = "start";
      if (videoKey && videos[videoKey]) {
        LevelController.playPreloadedCutscene(videoKey, () => {
          GameController.start("sample");
        });
      }
    }

    if (
      gameState === "playing" &&
      currentMap.currentAnimation &&
      currentMap.currentAnimation !== "dfinished"
    ) {
      cancelAnimationFrame(currentMap.currentAnimation.animationId);
      currentMap.currentAnimation = "finished";

      currentMap.xOffset = 0;
      currentMap.yOffset = 0;
      drawRatio = 0.5;
      return;
    }

    if (!player || !player.isAlive() || !inputAllowed) return;

    const keyLower = key.toLowerCase();

    if (key === " ") {
      player.jump();
    } else if (keyLower === "p") {
      GameController.isPaused()
        ? GameController.resume()
        : GameController.pause();
    } else if (keyLower === "c") {
      player.togglePistol();
    } else if (keyLower === "e") {
      player.teleport();
    } else if (keyLower === "m") {
      GameController.isGuided()
        ? GameController.guidOff()
        : GameController.guideOn();
    }
  }

  /** Handles mouse click events. */
  static handleMousePressed(mouseBtn) {
    if (gameState === "playing" && player && player.isAlive() && inputAllowed) {
      const pistolType = pistol === 0 ? "blue" : "red";
      player.shoot(pistolType);
    }
  }

  /** Handles continuous key presses (movement controls). */
  static handleHeldKeys() {
    if (gameState === "playing" && player && player.isAlive() && inputAllowed) {
      if (keyIsDown(65)) {
        player.moveLeft();
      } else {
        player.stopLeft();
      }
      if (keyIsDown(68)) {
        player.moveRight();
      } else {
        player.stopRight();
      }
    }
  }
}