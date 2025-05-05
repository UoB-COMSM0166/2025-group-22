class UI {
  constructor(backgroundImage, buttons) {
    this.backgroundImage = backgroundImage;
    this.buttons = buttons;
  }

  static button(btn) {
    btn.isDark = btn.isDark ?? false;// 默认 true
    const isHovered = mouseX >= btn.x - btn.width / 2 && mouseX <= btn.x + btn.width / 2 &&
        mouseY >= btn.y - btn.height / 2 && mouseY <= btn.y + btn.height / 2;
    const isPressed = isHovered && mouseIsPressed;

    let imgToShow = btn.img;
    // console.log("btn.isCompleteLevel: " + btn.isCompleteLevel);
    if (btn.isCompleteLevel===undefined || btn.isCompleteLevel===true) {
      if (isHovered) {// 根据是否通关上一关来决定画可互动按钮还是黑按钮
        imgToShow = btn.imgLight;
      } else if (isPressed) {
        imgToShow = btn.img;
      }
    }else {
      imgToShow = btn.img;
    }
    // if (isHovered) {
    //   imgToShow = btn.imgLight;
    // } else if (isPressed) {
    //   imgToShow = btn.img;
    // }
    push();
    imageMode(CENTER);
    // 根据是否通关上一关来决定画可互动按钮还是黑按钮
    if(btn.isDark === false){
      UIManager.imageEffect(imgToShow, btn.x, btn.y, btn.width, btn.height, {
        highlightOnlyHover: false,
        float: true,
        floatSpeed: btn.floatSpeed ?? 0.02,
        floatAmplitude: btn.floatAmplitude ?? 1,
        floatOffset: btn.floatOffset ?? 0,
        buttonX: btn.x,
        buttonY: btn.y,
        buttonWidth: btn.width,
        buttonHeight: btn.height
      });
    }
    else if (btn.isDark === true) {
      console.log("22222222222222");
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
        gray: 50
      });
    }

    pop();

  }

  draw() {
    // UI.textFormat(400, 150, 80, this.title);
    image(this.backgroundImage, 0, 0, canvasWidth, canvasHeight);

    this.buttons.forEach(btn => {


      UI.button(btn);
    });
  }

  handleMouseClick() {
    this.buttons.forEach(btn => {
      if (mouseX >= btn.x - btn.width / 2 && mouseX <= btn.x + btn.width / 2 &&
          mouseY >= btn.y - btn.height / 2 && mouseY <= btn.y + btn.height / 2 ){
        btn.action();
      }
    });
  }
}
