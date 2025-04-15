class WinUI extends UI {
    constructor() {
      super("YOU WIN !!", [
        {
          x: 170, y: 320, width: 150, height: 90,
          text: "Menu",
          action: () => {
            gameState = "start";
          }
        },
        {
          x: 480, y: 320, width: 150, height: 90,
          text: "Exit",
          action: () => {
            alert("請手動關閉頁面");
            window.close();
          }
        }
      ]);
    }
  }
