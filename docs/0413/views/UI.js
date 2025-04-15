// 📁 views/UI.js
class UI {
  constructor(title, buttons) {
    this.title = title;
    this.buttons = buttons;
  }

  static button(x, y, w, h, label) {
    const isHovered = mouseX >= x && mouseX <= x + w &&
                      mouseY >= y && mouseY <= y + h;
    const isPressed = isHovered && mouseIsPressed;

    const baseColor = color(245, 242, 196);     // 原始
    const hoverColor = color(235, 225, 160);    // 懸停
    const pressedColor = color(210, 200, 140);  // 按下

    fill(isPressed ? pressedColor : isHovered ? hoverColor : baseColor);
    noStroke();
    rect(x, y, w, h, 10);

    fill(0);
    textSize(isPressed ? 24 : 28);  // 按下時文字縮小
    textAlign(CENTER, CENTER);
    text(label, x + w / 2, y + h / 2);
  }

  static textFormat(x, y, size, label) {
    textSize(size);
    textStyle(BOLD);
    textFont("Courier New");
    fill(0);
    text(label, x, y);
  }

  draw() {
    UI.textFormat(400, 150, 80, this.title);

    this.buttons.forEach(btn => {
      const isHovered = mouseX >= btn.x && mouseX <= btn.x + btn.width &&
                        mouseY >= btn.y && mouseY <= btn.y + btn.height;

      if (isHovered) {
        stroke(0);
        strokeWeight(3);
      } else {
        noStroke();
      }

      UI.button(btn.x, btn.y, btn.width, btn.height, btn.text);
    });
  }

  handleMouseClick() {
    this.buttons.forEach(btn => {
      if (mouseIsPressed &&
          mouseX >= btn.x && mouseX <= btn.x + btn.width &&
          mouseY >= btn.y && mouseY <= btn.y + btn.height) {
        btn.action();
      }
    });
  }
}
