// 📁 views/StartUI.js
class StartUI extends UI {
  constructor() {
    super("Twilight Seeker", [
      {
        x: 80,
        y: 320,
        width: 150,
        height: 90,
        text: "Level",
        action: () => {
          gameState = "choosingLevel";
        }
      },
      {
        x: 330,
        y: 320,
        width: 150,
        height: 90,
        text: "Start",
        action: () => {

          // // ❌ 如果還沒有，才 prompt 一次，並儲存
          // if (!playerName) {
          //   playerName = prompt("Please enter a nickname. \nDo not use your real name for privacy reasons:") || "Unknown";
          //   localStorage.setItem("playerName", playerName);
          // }
          //
          // GameController.start("level1");
          console.log("playerName =", playerName)

          if (!playerName) {
            gameState = "namePrompt";
          } else {
            GameController.start("level1");
          }

        }
      },
      {
        x: 580,
        y: 320,
        width: 150,
        height: 90,
        text: "Exit",
        action: () => {
          alert("請手動關閉頁面");
          window.close();
        }
      }
    ]);
    //playerName = localStorage.getItem("playerName");
  }
}
