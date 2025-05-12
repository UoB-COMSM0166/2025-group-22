class WinUI extends UI {
  // Constructor for the WinUI screen, including button setup and leaderboard functionality
  constructor() {
    super(images["background_default"], [
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * 0.88,
        width: ((canvasWidth * 161) / 800) * 0.9,
        height: ((canvasHeight * 53) / 450) * 0.9,
        img: images["button_menu"],
        imgLight: images["button_menu_hover"],
        action: () => {
          gameState = "start";
          GameController.resetGame();
        },
      },
    ]);

    // Save the level time after winning the game
    LevelController.saveLevelTime();

    // If it's the final level and the score hasn't been saved yet, save to leaderboard
    if (
      this.isFinalLevel() &&
      !saveScoreFlag &&
      playerName !== null &&
      playerName !== undefined
    ) {
      this.saveToLeaderboard();
      saveScoreFlag = true;
    }
  }

  // Check if the current level is the final level
  isFinalLevel() {
    return currentLevel === "level3";
  }

  // Save the player's score to the leaderboard
  saveToLeaderboard() {
    const allTimes =
      JSON.parse(localStorage.getItem(`levelTime-${playerName}`)) || {};
    const levels = ["level1", "level2", "level3"];

    const totalTime = levels
      .map((lv) => allTimes[lv])
      .reduce((a, b) => a + b, 0);

    const playerData = {
      name: playerName,
      levelTimes: allTimes,
      total: totalTime,
    };

    const key = `leaderboard-total`;
    let leaderboard = JSON.parse(localStorage.getItem(key)) || [];

    leaderboard.push(playerData);
    leaderboard.sort((a, b) => a.total - b.total);
    leaderboard = leaderboard.slice(0, 5); // Keep top 5

    localStorage.setItem(key, JSON.stringify(leaderboard));
  }

  // Draw the WinUI screen, including the leaderboard and player stats
  draw() {
    super.draw();
    image(images["background_scoreboard"], 0, 0, canvasWidth, canvasHeight);
    image(images["text_youwin"], 0, 0, canvasWidth, canvasHeight);
    image(images["text_leaderboard"], 0, 0, canvasWidth, canvasHeight);
    image(images["text_name"], 0, 0, canvasWidth, canvasHeight);

    // Display the player's name
    UIManager.textStyle(color(255));
    textAlign(CENTER, TOP);
    text(`${playerName}`, canvasWidth * 0.25, canvasHeight * 0.35);

    // Get the player's level times and display them
    const times =
      JSON.parse(localStorage.getItem(`levelTime-${playerName}`)) || {};
    const levels = ["level1", "level2", "level3"];
    let total = 0;
    let y = canvasHeight * 0.45;

    levels.forEach((lv) => {
      const time = times[lv];
      if (typeof time === "number") {
        total += time;
        text(
          `${lv.toUpperCase()} Time: ${nf(time / 1000, 0, 2)}s`,
          canvasWidth * 0.25,
          y
        );
        y += canvasHeight * 0.09;
      } else {
        text(`${lv.toUpperCase()} Time: --`, canvasWidth * 0.25, y);
        y += canvasHeight * 0.07;
      }
    });

    // Display the total time
    text(
      `TOTAL: ${nf(total / 1000, 0, 2)}s`,
      canvasWidth * 0.25,
      y + canvasHeight * 0.001
    );

    // Display the leaderboard
    y = (canvasHeight * 70) / 450;
    textSize((canvasWidth * 20) / 800);
    const leaderboard =
      JSON.parse(localStorage.getItem("leaderboard-total")) || [];
    leaderboard.forEach((entry, i) => {
      text(
        `${i + 1}. ${entry.name} - ${nf(entry.total / 1000, 0, 2)}s`,
        (canvasWidth * 600) / 800,
        canvasHeight * 0.35 + i * canvasHeight * 0.09
      );
    });
  }
}
