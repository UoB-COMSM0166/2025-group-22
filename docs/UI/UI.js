class UI {
  constructor(title, buttons) {
      this.title = title;
      this.buttons = buttons;
  }

  draw() {
      textFormat(400, 150, 80, this.title);
      
      this.buttons.forEach(btn => {
          let isHovered = mouseX >= btn.x && mouseX <= btn.x + btn.width &&
                          mouseY >= btn.y && mouseY <= btn.y + btn.height;

          if (isHovered) {
              stroke(0); // 只对矩形设置黑色边框
              strokeWeight(3); // 设置边框厚度
          } else {
              noStroke(); // 取消边框
          }

          fill(245, 242, 196);
          rect(btn.x, btn.y, btn.width, btn.height, 10);

          noStroke(); // 取消边框，确保文字不会被描边
          fill(0);
          textSize(28);
          textAlign(CENTER, CENTER);
          text(btn.text, btn.x + btn.width / 2, btn.y + btn.height / 2);
      });
  }

  handleMouseClick() {
      this.buttons.forEach(btn => {
          if (mouseIsPressed && mouseX >= btn.x && mouseX <= btn.x + btn.width &&
              mouseY >= btn.y && mouseY <= btn.y + btn.height) {
              btn.action();
          }
      });
  }
}
