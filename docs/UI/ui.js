class UI {
    constructor(title, buttons) {
      this.title = title;
      this.buttons = buttons;
    }
  
    draw() {
      textFormat(400, 150, 80, this.title);
      this.buttons.forEach(btn => button(btn.x, btn.y, btn.width, btn.height, btn.text));
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
  