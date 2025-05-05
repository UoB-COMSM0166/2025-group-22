// 📁 controllers/InputController.js
class InputController {
  static handleKeyPressed(key) {
    if (gameState === "playing" && !timerRunning && player.isAlive()) {
      startTime = millis() - pausedTime;
      timerRunning = true;
    }
    else if (gameState === "guide") {
      GameController.start("sample");
    }

    if (!player || !player.isAlive()) return;

    const keyLower = key.toLowerCase();

    if (key === " ") {
      player.jump();
    } else if (keyLower === "p") {
      GameController.isPaused() ? GameController.resume() : GameController.pause();
    } else if (keyLower === "c") {
      player.togglePistol();
    } else if (keyLower === "e") {
      player.teleport();
    }else if (keyLower === "m") {
      GameController.isGuided() ? GameController.guidOff() : GameController.guideOn();
    }
  }

  static handleMousePressed(mouseBtn) {
    if (gameState === "playing" && player && player.isAlive()) {
      const pistolType = pistol === 0 ? "blue" : "red";
      player.shoot(pistolType);
      // console.log("Mouse clicked -> try shoot", gameState, player);
    }
  }

  static handleHeldKeys() {
    if (gameState === "playing" && player && player.isAlive()) {
      if (keyIsDown(65)) {
        // playerIsMovingLeft = true;
        player.moveLeft(); // A
      }
      else{
        player.stopLeft(); // A
        // playerIsMovingLeft = false;
      }
      if (keyIsDown(68)) {
        // playerIsMovingRight = true;
        player.moveRight(); // D
      }
      else{
        player.stopRight(); // D
        // playerIsMovingRight = false;
      }
    }
  }
}
