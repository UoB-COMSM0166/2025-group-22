// 📁 views/LevelUI.js
class LevelUI extends UI {
  static topY=0.329;
  static gap=0.159;
  constructor() {

    super(images["background_level"], [
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * (LevelUI.topY),
        width: canvasWidth * 161/800,
        height: canvasHeight * 53/450,
        img: images["button_sample"],
        imgLight: images["button_sample_hover"],
        action: () => {
          LevelController.goToLevel("sample");
        }
      },
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * (LevelUI.topY + LevelUI.gap),
        width: canvasWidth * 161/800,
        height: canvasHeight * 53/450,
        img: images["button_level1"],
        imgLight: images["button_level1_hover"],
        action: () => {
          LevelController.goToLevel("level1");
        }
      },
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * (LevelUI.topY + LevelUI.gap * 2),
        width: canvasWidth * 161/800,
        height: canvasHeight * 53/450,
        img: images["button_level2"],
        imgLight: images["button_level2_hover"],
        action: () => {
          LevelController.goToLevel("level2");
        }
      },
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * (LevelUI.topY + LevelUI.gap * 3),
        width: canvasWidth * 161/800,
        height: canvasHeight * 53/450,
        img: images["button_level3"],
        imgLight: images["button_level3_hover"],
        action: () => {
          LevelController.goToLevel("level3");
        }
      },
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * (LevelUI.topY + LevelUI.gap * 4 - 53 / 450 * 0.25),
        width: canvasWidth * 161/800 * 0.5,
        height: canvasHeight * 53/450 * 0.5,
        img: images["button_menu"],
        imgLight: images["button_menu_hover"],
        action: () => {
          gameState = "start";
          GameController.resetGame();
        }
      }
    ]);
  }

  draw() {
    super.draw();
    push();
    // 顯示每關成績
    fill(0);
    textSize(10 /850 * canvasWidth);
    textAlign(CENTER, CENTER);

    const leaderboard = JSON.parse(localStorage.getItem("leaderboard-total")) || [];
    const levels = ["level1", "level2", "level3"];

// 統計每關的最快時間
    const bestTimes = {};
    levels.forEach(lv => {
      const validTimes = leaderboard
          .map(entry => entry.levelTimes?.[lv])
          .filter(t => typeof t === "number");
      bestTimes[lv] = validTimes.length > 0 ? Math.min(...validTimes) : null;
    });

    let total = 0;
    let y = canvasHeight * (LevelUI.topY + LevelUI.gap * 0.5);

    levels.forEach(lv => {
      push();
      fill(86, 96, 97);
      textStyle(BOLD);
      textFont("Courier New");
      // textFont(gameFont);
      translate(canvasWidth * 0.5, y);
      // rotate(radians(30));
      const time = bestTimes[lv];
      if (typeof time === "number") {
        total += time;
        text(`${lv.toUpperCase()} Best: ${nf(time / 1000, 0, 2)}s`, 0, 0);
        y += canvasHeight * LevelUI.gap;
      }
      pop()
    });
    pop()
  }
}
