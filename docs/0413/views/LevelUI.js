// 📁 views/LevelUI.js
class LevelUI extends UI {
  constructor() {
    super(images["background_default"], [
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * 0.429,
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
        y: canvasHeight * 0.585,
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
        y: canvasHeight * 0.757,
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
        y: canvasHeight * 0.919,
        width: canvasWidth * 161/800,
        height: canvasHeight * 53/450,
        img: images["button_level3"],
        imgLight: images["button_level3_hover"],
        action: () => {
          LevelController.goToLevel("level3");
        }
      }
    ]);
  }

//   draw() {
//     super.draw();
//     push();
//     // 顯示每關成績
//     fill(0);
//     // textSize(20);
//     textSize(15 /850 * canvasWidth);
//     // textSize(20 / (800 * 450) * canvasWidth * canvasHeight);
//     textAlign(CENTER, CENTER);
//
//     const leaderboard = JSON.parse(localStorage.getItem("leaderboard-total")) || [];
//     const levels = ["level1", "level2", "level3"];
//
// // 統計每關的最快時間
//     const bestTimes = {};
//     levels.forEach(lv => {
//       const validTimes = leaderboard
//           .map(entry => entry.levelTimes?.[lv])
//           .filter(t => typeof t === "number");
//       bestTimes[lv] = validTimes.length > 0 ? Math.min(...validTimes) : null;
//     });
//
//     let total = 0;
//     let y = canvasHeight * 0.6;
//
//     levels.forEach(lv => {
//       push();
//       // fill("#e88504");
//       // fill(44, 65, 66);
//       // fill(127, 127, 127);
//       fill(86, 96, 97);
//       textStyle(BOLD);
//       textFont("Courier New");
//       // textFont(gameFont);
//       translate(canvasWidth * 0.7, y);
//       // rotate(radians(30));
//       const time = bestTimes[lv];
//       if (typeof time === "number") {
//         total += time;
//         // text(`${lv.toUpperCase()} Time: ${nf(time / 1000, 0, 2)}s`, 600, y);
//
//         text(`${lv.toUpperCase()} Time: \n${nf(time / 1000, 0, 2)}s`, 0, 0);
//         y += canvasHeight * 0.17;
//       }
//       // else {
//       //   // text(`${lv.toUpperCase()} Time: --`, 600, y);
//       //
//       //   text(`${lv.toUpperCase()} Time: \n--`, 0, 0);
//       //
//       //   y += 110;
//       // }
//       pop()
//     });
//
//     pop()
//   }
  draw() {
    super.draw();
    push();
    // 顯示每關成績
    fill(0);
    // textSize(20);
    textSize(10 /850 * canvasWidth);
    // textSize(20 / (800 * 450) * canvasWidth * canvasHeight);
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
    let y = canvasHeight * 0.51;

    levels.forEach(lv => {
      push();
      // fill("#e88504");
      // fill(44, 65, 66);
      // fill(127, 127, 127);
      fill(86, 96, 97);
      textStyle(BOLD);
      textFont("Courier New");
      // textFont(gameFont);
      translate(canvasWidth * 0.5, y);
      // rotate(radians(30));
      const time = bestTimes[lv];
      if (typeof time === "number") {
        total += time;
        // text(`${lv.toUpperCase()} Time: ${nf(time / 1000, 0, 2)}s`, 600, y);

        text(`${lv.toUpperCase()} Best: ${nf(time / 1000, 0, 2)}s`, 0, 0);
        y += canvasHeight * 0.165;
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
