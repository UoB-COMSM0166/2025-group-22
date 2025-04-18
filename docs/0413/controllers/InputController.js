// 📁 controllers/InputController.js
class InputController {
  static handleKeyPressed(key) {
    if (gameState === "playing" && !timerRunning) {
      startTime = millis() - pausedTime;
      timerRunning = true;
    }

    if (!player) return;

    const keyLower = key.toLowerCase();

    if (key === " ") {
      player.jump();
    } else if (keyLower === "p") {
      GameController.isPaused() ? GameController.resume() : GameController.pause();
    } else if (keyLower === "c") {
      player.togglePistol();
    } else if (keyLower === "e") {
      player.teleport();
    }
  }

  static handleMousePressed(mouseBtn) {
    if (gameState === "playing" && player) {
      const pistolType = pistol === 0 ? "blue" : "red";
      player.shoot(pistolType);
      // console.log("Mouse clicked -> try shoot", gameState, player);
    }
  }

  static handleHeldKeys() {
    if (gameState === "playing" && player) {
      if (keyIsDown(65)) player.moveLeft();   // A
      if (keyIsDown(68)) player.moveRight();  // D
    }
  }
}
