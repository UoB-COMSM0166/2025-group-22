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
          GameController.start("level1");
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
  }
}