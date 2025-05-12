class LevelUI extends UI {
  static topY = 0.329;
  static gap = 0.159;

  constructor() {
    super(images["background_level"], [
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * LevelUI.topY,
        width: (canvasWidth * 161) / 800,
        height: (canvasHeight * 53) / 450,
        img: images["button_level3"],
        imgLight: images["button_level3_hover"],
        floatAmplitude: 1,
        floatOffset: 0,
        isDark: !LevelController.isLevelUnlocked("level3") ?? true,
        action: () => {
          LevelController.goToLevel("level3");
        },
      },
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * (LevelUI.topY + LevelUI.gap),
        width: (canvasWidth * 161) / 800,
        height: (canvasHeight * 53) / 450,
        img: images["button_level2"],
        imgLight: images["button_level2_hover"],
        floatAmplitude: 1,
        floatOffset: Math.PI / 2,
        isDark: !LevelController.isLevelUnlocked("level2") ?? true,
        action: () => {
          LevelController.goToLevel("level2");
        },
      },
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * (LevelUI.topY + LevelUI.gap * 2),
        width: (canvasWidth * 161) / 800,
        height: (canvasHeight * 53) / 450,
        img: images["button_level1"],
        imgLight: images["button_level1_hover"],
        floatAmplitude: 1,
        floatOffset: Math.PI,
        action: () => {
          LevelController.goToLevel("level1");
        },
      },
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * (LevelUI.topY + LevelUI.gap * 3),
        width: (canvasWidth * 161) / 800,
        height: (canvasHeight * 53) / 450,
        img: images["button_sample"],
        imgLight: images["button_sample_hover"],
        floatAmplitude: 1,
        floatOffset: Math.PI * 1.5,
        action: () => {
          LevelController.goToLevel("sample");
        },
      },
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * (LevelUI.topY + LevelUI.gap * 4 - (53 / 450) * 0.25),
        width: ((canvasWidth * 161) / 800) * 0.5,
        height: ((canvasHeight * 53) / 450) * 0.5,
        img: images["button_menu"],
        imgLight: images["button_menu_hover"],
        floatAmplitude: 1,
        floatOffset: Math.PI / 4,
        action: () => {
          gameState = "start";
          GameController.resetGame();
        },
      },
    ]);
  }

  draw() {
    super.draw();

    push();
    fill(0);
    textSize((10 / 850) * canvasWidth);
    textAlign(CENTER, CENTER);

    const levels = ["level1", "level2", "level3"];
    const bestTimes = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("levelTime-")) {
        const times = JSON.parse(localStorage.getItem(key)) || {};
        levels.forEach((level) => {
          const time = times[level];
          if (typeof time === "number") {
            if (!bestTimes[level] || time < bestTimes[level]) {
              bestTimes[level] = time;
            }
          }
        });
      }
    }

    let y = canvasHeight * (LevelUI.topY + LevelUI.gap * 2.5);
    levels.forEach((lv) => {
      push();

      UIManager.textStyle(color(86, 96, 97), 10);
      translate(canvasWidth * 0.5, y);
      const time = bestTimes[lv];
      if (typeof time === "number") {
        text(`${lv.toUpperCase()} Best: ${nf(time / 1000, 0, 2)}s`, 0, 0);
        y -= canvasHeight * LevelUI.gap;
      }
      pop();
    });
    pop();
  }
}
