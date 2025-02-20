class PauseUI extends UI {
  constructor() {
    super("Pause", [
      { x: 170, y: 320, width: 150, height: 90, text: "Continue", action: () => { gameState = "playing"; } },
      { x: 480, y: 320, width: 150, height: 90, text: "Exit", action: () => { alert("请手动关闭页面"); window.close(); } }
    ]);
  }
}
