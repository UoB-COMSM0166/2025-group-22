class WinUI extends UI {
  constructor() {
    super("WIN !!", [
      { x: 170, y: 320, width: 150, height: 90, text: "New", action: () => { gameState = "start"; } },
      { x: 480, y: 320, width: 150, height: 90, text: "Exit", action: () => { alert("请手动关闭页面"); window.close(); } }
    ]);
  }
}
