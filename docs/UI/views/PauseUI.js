class PauseUI extends UI {
  constructor() {
    super(images["background_default"], [
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * (0.65 - LevelUI.gap),
        width: (canvasWidth * 161) / 800,
        height: (canvasHeight * 53) / 450,
        img: images["button_resume"],
        imgLight: images["button_resume_hover"],
        action: () => {
          GameController.resume();
        },
      },
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * 0.65,
        width: (canvasWidth * 161) / 800,
        height: (canvasHeight * 53) / 450,
        img: images["button_restart"],
        imgLight: images["button_restart_hover"],
        action: () => {
          GameController.restart();
        },
      },
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * (0.65 + LevelUI.gap),
        width: (canvasWidth * 161) / 800,
        height: (canvasHeight * 53) / 450,
        img: images["button_menu"],
        imgLight: images["button_menu_hover"],
        action: () => {
          gameState = "start";
          GameController.resetGame();
        },
      },
    ]);
  }

  draw() {
    super.draw();
    image(
      images["text_pause"],
      0,
      canvasHeight * 0.12,
      canvasWidth,
      canvasHeight
    );
  }
}
