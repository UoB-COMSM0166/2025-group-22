class UI {
  // Constructor initializes the background image and button list for the UI
  constructor(backgroundImage, buttons) {
    this.backgroundImage = backgroundImage;
    this.buttons = buttons;
  }

  // Handles the button rendering, hover, and click effects
  static button(btn) {
    btn.isDark = btn.isDark ?? false;
    btn._wasHovered = btn._wasHovered ?? false;

    const isHovered =
      mouseX >= btn.x - btn.width / 2 &&
      mouseX <= btn.x + btn.width / 2 &&
      mouseY >= btn.y - btn.height / 2 &&
      mouseY <= btn.y + btn.height / 2;
    const isPressed = isHovered && mouseIsPressed;

    let imgToShow = btn.img;

    if (btn.isCompleteLevel === undefined || btn.isCompleteLevel === true) {
      if (isHovered && !btn._wasHovered) {
      }

      if (isHovered) {
        imgToShow = btn.imgLight;
      } else if (isPressed) {
        imgToShow = btn.img;
      }
    } else {
      imgToShow = btn.img;
    }

    btn._wasHovered = isHovered;

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
      ...(btn.isDark ? { gray: 50 } : {}),
    });

    pop();
  }

  // Draws the background and buttons to the UI
  draw() {
    image(this.backgroundImage, 0, 0, canvasWidth, canvasHeight);

    this.buttons.forEach((btn) => {
      UI.button(btn);
    });
  }

  // Handles mouse click actions on buttons
  handleMouseClick() {
    this.buttons.forEach((btn) => {
      if (
        mouseX >= btn.x - btn.width / 2 &&
        mouseX <= btn.x + btn.width / 2 &&
        mouseY >= btn.y - btn.height / 2 &&
        mouseY <= btn.y + btn.height / 2
      ) {
        btn.action();
        sounds["buttonPress"].play();
      }
    });
  }
}
