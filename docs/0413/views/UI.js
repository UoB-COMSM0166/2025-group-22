// 📁 views/UI.js
class UI {
  // constructor(title, buttons) {
  constructor(backgroundImage, buttons) {
    // this.title = title;
    this.backgroundImage = backgroundImage;
    this.buttons = buttons;
  }

  static button(x, y, w, h, img, imgLight) {
    const isHovered = mouseX >= x - w / 2 && mouseX <= x + w / 2 &&
                      mouseY >= y - h / 2 && mouseY <= y + h / 2;
    const isPressed = isHovered && mouseIsPressed;

    // const baseColor = color(245, 242, 196);     // 原始
    // const hoverColor = color(235, 225, 160);    // 懸停
    // const pressedColor = color(210, 200, 140);  // 按下

    let imgToShow = img;
    if (isHovered) {
      imgToShow = imgLight;
     } else if (isPressed) {
      imgToShow = img;
    }
    push();
    imageMode(CENTER);
    image(imgToShow, x, y, w, h);
    pop();
    // fill(isPressed ? pressedColor : isHovered ? hoverColor : baseColor);
    // noStroke();
    // rect(x, y, w, h, 10);

    // fill(0);
    // textSize(isPressed ? 24 : 28);  // 按下時文字縮小
    // textAlign(CENTER, CENTER);
    // text(label, x + w / 2, y + h / 2);
  }

  // static textFormat(x, y, size, label) {
  //   textSize(size);
  //   textStyle(BOLD);
  //   textFont("Courier New");
  //   fill(0);
  //   text(label, x, y);
  // }

  draw() {
    // UI.textFormat(400, 150, 80, this.title);
    image(this.backgroundImage, 0, 0, canvasWidth, canvasHeight);

    this.buttons.forEach(btn => {
      // const isHovered = mouseX >= btn.x && mouseX <= btn.x + btn.width &&
      //                   mouseY >= btn.y && mouseY <= btn.y + btn.height;
      // if (isHovered) {
      //   stroke(0);
      //   strokeWeight(3);
      // } else {
      //   noStroke();
      // }

      UI.button(btn.x, btn.y, btn.width, btn.height, btn.img, btn.imgLight);
    });
  }

  handleMouseClick() {
    this.buttons.forEach(btn => {
      if (mouseIsPressed &&
          mouseX >= btn.x - btn.width / 2 && mouseX <= btn.x + btn.width / 2 &&
          mouseY >= btn.y - btn.height / 2 && mouseY <= btn.y + btn.height / 2 ){
        btn.action();
      }
    });
  }
}
