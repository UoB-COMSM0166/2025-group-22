class UI {
  constructor(backgroundImage, buttons) {
    this.backgroundImage = backgroundImage;
    this.buttons = buttons;

    this.fragmentingButton = null;
    this.fragments = [];
    this.explosionStart = null;
    this.__pendingAction = null;
  }

  static button(btn) {
    const isHovered = mouseX >= btn.x - btn.width / 2 && mouseX <= btn.x + btn.width / 2 &&
        mouseY >= btn.y - btn.height / 2 && mouseY <= btn.y + btn.height / 2;
    const isPressed = isHovered && mouseIsPressed;

    let imgToShow = btn.img;
    if (btn.isCompleteLevel === undefined || btn.isCompleteLevel === true) {
      if (isHovered) {
        imgToShow = btn.imgLight;
      } else if (isPressed) {
        imgToShow = btn.img;
      }
    } else {
      imgToShow = btn.img;
    }

    push();
    imageMode(CENTER);

    UIManager.imageEffect(imgToShow, btn.x, btn.y, btn.width, btn.height, {
      highlightOnlyHover: false,
      float: true,
      floatSpeed: btn.floatSpeed ?? 0.02,
      floatAmplitude: btn.floatAmplitude ?? 1,
      floatOffset: btn.floatOffset ?? 0,
      buttonX: btn.x,
      buttonY: btn.y,
      buttonWidth: btn.width,
      buttonHeight: btn.height,
      gray: btn.isDark ? 50 : 255
    });

    pop();
  }

  draw() {
    image(this.backgroundImage, 0, 0, canvasWidth, canvasHeight);

    this.buttons.forEach(btn => {
      if (this.fragmentingButton !== btn) {
        UI.button(btn);
      }
    });

    // 畫碎片動畫
    this.drawFragments();

    // 爆炸動畫完成後執行 action
    if (this.fragments.length === 0 && this.__pendingAction) {
      const fn = this.__pendingAction;
      this.__pendingAction = null;
      fn();
    }
  }

  handleMouseClick() {
    if (this.fragmentingButton || this.fragments.length > 0) return;

    for (const btn of this.buttons) {
      const isHovered = mouseX >= btn.x - btn.width / 2 &&
          mouseX <= btn.x + btn.width / 2 &&
          mouseY >= btn.y - btn.height / 2 &&
          mouseY <= btn.y + btn.height / 2;

      if (isHovered) {
        this.fragmentingButton = btn;
        this.fragments = this.createFragments(btn);
        this.__pendingAction = btn.action;
        break;
      }
    }
  }

  createFragments(btn) {
    const pieces = [];
    const pieceCount = 12;
    for (let i = 0; i < pieceCount; i++) {
      pieces.push({
        x: btn.x,
        y: btn.y,
        dx: random(-3, 3),
        dy: random(-3, 3),
        size: random(8, 14),
        alpha: 255
      });
    }
    return pieces;
  }

  drawFragments() {
    if (this.fragments.length === 0) return;

    push();
    noStroke();
    fill(255);
    for (let i = this.fragments.length - 1; i >= 0; i--) {
      const f = this.fragments[i];
      f.x += f.dx;
      f.y += f.dy;
      f.alpha -= 8;
      fill(255, f.alpha);
      ellipse(f.x, f.y, f.size);

      if (f.alpha <= 0) {
        this.fragments.splice(i, 1);
      }
    }
    pop();
  }

  textStyle(color = 255, sizeRatio = 20) {
    textFont("Lucida Console");
    textStyle(BOLD);
    fill(color);
    textSize(canvasWidth * sizeRatio / 800);
  }
}
