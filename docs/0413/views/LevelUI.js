// 📁 views/LevelUI.js
class LevelUI extends UI {
  constructor() {
    super("Level", [
      {
        x: 325,
        y: 140,
        width: 150,
        height: 70,
        text: "1",
        action: () => {
          LevelController.goToLevel("level1");
        }
      },
      {
        x: 325,
        y: 250,
        width: 150,
        height: 70,
        text: "2",
        action: () => {
          LevelController.goToLevel("level2");
        }
      },
      {
        x: 325,
        y: 360,
        width: 150,
        height: 70,
        text: "3",
        action: () => {
          LevelController.goToLevel("level3");
        }
      }
    ]);
  }

  draw() {
    UI.textFormat(400, 80, 80, this.title);

    this.buttons.forEach(btn => {
      const isHovered = mouseX >= btn.x && mouseX <= btn.x + btn.width &&
          mouseY >= btn.y && mouseY <= btn.y + btn.height;

      if (isHovered) {
        stroke(0);
        strokeWeight(3);
      } else {
        noStroke();
      }

      UI.button(btn.x, btn.y, btn.width, btn.height, btn.text);
    });
    push()
    // 顯示每關成績
    fill(0);
    textSize(20);
    textAlign(CENTER, TOP);

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
    let y = 160;

    levels.forEach(lv => {
      push();
      fill(204, 0, 0);
      textFont(gameFont);
      translate(480, y);
      rotate(radians(30));
      const time = bestTimes[lv];
      if (typeof time === "number") {
        total += time;
        // text(`${lv.toUpperCase()} Time: ${nf(time / 1000, 0, 2)}s`, 600, y);

        text(`${lv.toUpperCase()} Time: \n${nf(time / 1000, 0, 2)}s`, 0, 0);
        y += 110;
      }
      // else {
      //   // text(`${lv.toUpperCase()} Time: --`, 600, y);
      //
      //   text(`${lv.toUpperCase()} Time: \n--`, 0, 0);
      //
      //   y += 110;
      // }
      pop()
    });

    pop()
  }
}
