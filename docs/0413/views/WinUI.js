// 📁 views/WinUI.js
class WinUI extends UI {
  constructor() {
    super(images["background_default"], [
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * 0.88,
        width: canvasWidth * 161/800 * 0.9,
        height: canvasHeight * 53/450 * 0.9,
        img: images["button_menu"],
        imgLight: images["button_menu_hover"],
        action: () => {
          gameState = "start";
          GameController.resetGame();
        }
      }
    ]);

    // ✅ 嘗試從 localStorage 讀取玩家名稱

    LevelController.saveLevelTime();

    if (this.isFinalLevel() &&
        !saveScoreFlag &&
        playerName !== null &&
        playerName !== undefined) {
      this.saveToLeaderboard();
      saveScoreFlag = true;
    }
  }


  isFinalLevel() {
    return currentLevel === "level3"; // ✅ 根據你目前是三關的設計
  }
  saveToLeaderboard() {
    const allTimes = JSON.parse(localStorage.getItem(`levelTime-${playerName}`)) || {};
    const levels = ["level1", "level2", "level3"];


    const totalTime = levels.map(lv => allTimes[lv]).reduce((a, b) => a + b, 0);

    const playerData = {
      name: playerName,
      levelTimes: allTimes,
      total: totalTime
    };

    const key = `leaderboard-total`;
    let leaderboard = JSON.parse(localStorage.getItem(key)) || [];

    leaderboard.push(playerData);
    leaderboard.sort((a, b) => a.total - b.total);
    leaderboard = leaderboard.slice(0, 5); // 只保留前五名

    localStorage.setItem(key, JSON.stringify(leaderboard));
  }

  draw() {
    super.draw();
    image(images["background_scoreboard"], 0, 0, canvasWidth, canvasHeight);
    image(images["text_youwin"], 0, 0, canvasWidth, canvasHeight);
    image(images["text_leaderboard"], 0, 0, canvasWidth, canvasHeight);
    image(images["text_name"], 0, 0, canvasWidth, canvasHeight);
    // background(180, 217, 239);

    // UI.textFormat(400, 40, 70, this.title);
    textFont("Georgia"); // 或自訂 retro 遊戲字體
    textStyle(BOLD);
    fill("#3C5058"); // 類似 LEADER BOARD 那種深灰藍
    // textAlign(CENTER, CENTER);
    textSize(canvasWidth * 20 / 800);
    textAlign(CENTER, TOP);
    text(`${playerName}`, canvasWidth * 0.25, canvasHeight * 0.35);

    // 顯示每關成績
    const times = JSON.parse(localStorage.getItem(`levelTime-${playerName}`)) || {};
    const levels = ["level1", "level2", "level3"];
    let total = 0;
    let y = canvasHeight * 0.45;

    levels.forEach(lv => {
      const time = times[lv];
      if (typeof time === "number") {
        total += time;
        text(`${lv.toUpperCase()} Time: ${nf(time / 1000, 0, 2)}s`, canvasWidth * 0.25, y );
        y += canvasHeight * 0.09;
      } else {
        text(`${lv.toUpperCase()} Time: --`, canvasWidth * 0.25, y);
        y += canvasHeight * 0.07;
      }
    });

    // 顯示總時間
    text(`TOTAL: ${nf(total / 1000, 0, 2)}s`, canvasWidth * 0.25, y + canvasHeight * 0.001);

    // 顯示排行榜
    y = canvasHeight * 70/450
    textSize(canvasWidth * 20 / 800);
    // text("Leaderboard", canvasWidth * 0.75, y);
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard-total")) || [];
    leaderboard.forEach((entry, i) => {
      text(`${i + 1}. ${entry.name} - ${nf(entry.total / 1000, 0, 2)}s`, canvasWidth * 600/800, canvasHeight * 0.35 + i * canvasHeight * 0.09);
    });
  }
}
