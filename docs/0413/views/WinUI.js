// 📁 views/WinUI.js
class WinUI extends UI {
  constructor() {
    super("You Win!!", [
      {
        x: 220,
        y: 360,
        width: 150,
        height: 70,
        text: "Menu",
        action: () => {
          gameState = "start";
          GameController.resetGame();
        }
      },
      {
        x: 430,
        y: 360,
        width: 150,
        height: 70,
        text: "Exit",
        action: () => {
          alert("請手動關閉頁面");
          window.close();
        }
      }
    ]);

    // ✅ 嘗試從 localStorage 讀取玩家名稱
    // playerName = localStorage.getItem("playerName");

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

    const allCompleted = levels.every(lv => typeof allTimes[lv] === "number");

    if (!allCompleted) {
      console.warn("⚠️ 尚未完成三關，成績不會儲存到排行榜。");
      return;
    }

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

    // 打印排行榜到控制台
    // console.log("🏆 Leaderboard (Top 5):");
    // leaderboard.forEach((entry, index) => {
    //   console.log(`${index + 1}. ${entry.name} - ${(entry.total / 1000).toFixed(2)}s`);
    // });


    localStorage.setItem(key, JSON.stringify(leaderboard));
  }

  draw() {
    background(180, 217, 239);

    UI.textFormat(400, 40, 70, this.title);

    fill(0);
    textSize(22);
    textAlign(CENTER, TOP);
    text(`👤 ${playerName}`, 200, 120);

    // 顯示每關成績
    const times = JSON.parse(localStorage.getItem(`levelTime-${playerName}`)) || {};
    const levels = ["level1", "level2", "level3"];
    let total = 0;
    let y = 160;

    levels.forEach(lv => {
      const time = times[lv];
      if (typeof time === "number") {
        total += time;
        text(`${lv.toUpperCase()} Time: ${nf(time / 1000, 0, 2)}s`, 200, y);
        y += 30;
      } else {
        text(`${lv.toUpperCase()} Time: --`, 200, y);
        y += 30;
      }
    });

    // 顯示總時間
    text(`🔥 TOTAL: ${nf(total / 1000, 0, 2)}s`, 200, y + 10);

    // 顯示排行榜
    y = 70
    textSize(20);
    text("🏆 Leaderboard", 600, y + 50);
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard-total")) || [];
    leaderboard.forEach((entry, i) => {
      text(`${i + 1}. ${entry.name} - ${nf(entry.total / 1000, 0, 2)}s`, 600, y + 80 + i * 25);
    });

    // 按鈕
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
  }
}
