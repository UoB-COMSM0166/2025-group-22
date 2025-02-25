class GameOverUI extends UI {
  constructor() {
    super("Game Over", [
      { x: 170, y: 320, width: 150, height: 90, text: "Restart", action: () => { gameState = "playing"; restartLevel(); } },
      { x: 480, y: 320, width: 150, height: 90, text: "Exit", action: () => window.close() }
    ]);
  }
}
