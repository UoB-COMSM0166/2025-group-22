class StartUI extends UI {
  constructor() {
    super("Twilight Seeker", [
      { x: 80, y: 320, width: 150, height: 90, text: "Level", action: () => { gameState = "choosingLevel"; } },
      { x: 330, y: 320, width: 150, height: 90, text: "Start", action: () => { currentLevel = "level1"; gameState = "playing"; } },
      { x: 580, y: 320, width: 150, height: 90, text: "Exit", action: () => { alert("请手动关闭页面"); window.close(); } }
    ]);
  }
}
