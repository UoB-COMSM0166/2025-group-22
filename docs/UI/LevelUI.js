class LevelUI extends UI {
  constructor() {
    super("Level", [
      { x: 325, y: 140, width: 150, height: 70, text: "1", action: () => { currentLevel = "level1"; gameState = "playing"; loadLevel(); } },
      { x: 325, y: 250, width: 150, height: 70, text: "2", action: () => { currentLevel = "level2"; gameState = "playing"; loadLevel(); } },
      { x: 325, y: 360, width: 150, height: 70, text: "3", action: () => { currentLevel = "level3"; gameState = "playing"; loadLevel(); } }
    ]);
  }

  draw() {
    // 调整标题位置，防止过低
    textFormat(400, 80, 80, this.title);

    this.buttons.forEach(btn => {
      let isHovered = mouseX >= btn.x && mouseX <= btn.x + btn.width &&
                      mouseY >= btn.y && mouseY <= btn.y + btn.height;

      if (isHovered) {
        stroke(0); // 设置黑色边框
        strokeWeight(3); // 边框厚度
      } else {
        noStroke(); // 取消边框
      }

      fill(245, 242, 196);
      rect(btn.x, btn.y, btn.width, btn.height, 10);

      noStroke(); // 取消边框，避免文字被描边
      fill(0);
      textSize(28);
      textAlign(CENTER, CENTER);
      text(btn.text, btn.x + btn.width / 2, btn.y + btn.height / 2);
    });
  }
}
