class LevelUI extends UI {
  constructor() {
    super("Level", [
      { x: 325, y: 140, width: 150, height: 70, text: "1", action: () => { currentLevel = "level1"; gameState = "playing"; loadLevel();} },
      { x: 325, y: 250, width: 150, height: 70, text: "2", action: () => { currentLevel = "level2"; gameState = "playing"; loadLevel();} },
      { x: 325, y: 360, width: 150, height: 70, text: "3", action: () => { currentLevel = "level3"; gameState = "playing"; loadLevel();} }
    ]);
  }
  draw() {
    // 将 Y 坐标修改为 80，不然level几个字太靠下了
    textFormat(400, 80, 80, this.title); 
    this.buttons.forEach(btn => button(btn.x, btn.y, btn.width, btn.height, btn.text));
  }
  
}
