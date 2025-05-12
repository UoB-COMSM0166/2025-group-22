class NameUI extends UI {
  // Constructor initializes the UI and privacy notice, and handles the start button click action
  constructor() {
    super(images["background_default"], [
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * 0.8,
        width: (canvasWidth * 161) / 800,
        height: (canvasHeight * 53) / 450,
        img: images["button_start"],
        imgLight: images["button_start_hover"],
        action: () => {
          const name = textInput.value();
          if (!/^[a-zA-Z0-9_]{3,16}$/.test(name)) {
            alert(
              "Please enter 3 ~ 16 character, only include letters, digits and _"
            );
            return;
          }

          playerName = name;
          localStorage.setItem("playerName", playerName);
          textInput.remove();
          textInput = null;
          gameState = "guide";
        },
      },
    ]);
    this.privacyAlpha = 0;
    this.privacyTargetAlpha = 0;
    this.privacyFloatOffset = 0;

    this.charCountText = "";
  }

  // Draws the UI elements: text prompts, input field, and privacy notice
  draw() {
    super.draw();
    image(
      images["text_please_enter_a_nick_name"],
      0,
      canvasHeight * 0.15,
      canvasWidth,
      canvasHeight
    );
    push();
    UIManager.textStyle(color(127, 127, 127), 15);
    textAlign(CENTER);
    text("[ Data Privacy Notice ]", canvasWidth * 0.5, canvasHeight * 0.91);
    pop();

    const inputWidth = canvasWidth * (508 / 800) * 0.8;
    const inputHeight = canvasHeight * (76 / 450) * 0.8;

    const posX =
      (windowWidth - canvasWidth) / 2 + (canvasWidth - inputWidth) / 2;
    const posY = (windowHeight - canvasHeight) / 2 + canvasHeight * 0.52;

    if (!textInput) {
      textInput = createInput();
      textInput.class("custom-input");
      textInput.input(() => {
        let val = textInput.value();
        val = val.replace(/[^a-zA-Z0-9_]/g, "");
        val = val.slice(0, 16);
        textInput.value(val);

        this.charCountText = `${val.length}/16`;
      });
    }

    push();
    if (textInput.value().length < 3) {
      UIManager.textStyle(color(255, 165, 0), 12);
      textAlign(CENTER);
      text(
        "Please enter 3 valid character at least!",
        canvasWidth * 0.5,
        canvasHeight * 0.71
      );
    }
    pop();

    const fontSize = (24 / 850) * canvasWidth;
    textInput.style("font-size", `${fontSize}px`);
    textInput.position(posX, posY);
    textInput.size(inputWidth, inputHeight);

    const startBtn = this.buttons[0];
    const isHovered =
      mouseX >= startBtn.x - (startBtn.width * 5) / 6 &&
      mouseX <= startBtn.x + (startBtn.width * 5) / 6 &&
      mouseY >= canvasHeight * 0.91 - startBtn.height / 4 &&
      mouseY <= canvasHeight * 0.91 + startBtn.height / 4;

    if (isHovered) {
      textInput.hide();
    } else {
      textInput.show();
    }

    this.privacyTargetAlpha = isHovered ? 255 : 0;

    this.privacyAlpha = lerp(this.privacyAlpha, this.privacyTargetAlpha, 0.9);

    this.privacyFloatOffset = sin(frameCount * 0.05) * 6;

    if (this.privacyAlpha > 1) {
      push();
      tint(255, this.privacyAlpha);
      const img = images["text_privacy"];
      const popupW = canvasWidth * 0.65;
      const popupH = popupW * (497 / 912);
      const popupX = startBtn.x - popupW / 2;
      const popupY = startBtn.y - startBtn.height * 5 + this.privacyFloatOffset;

      image(img, popupX, popupY, popupW, popupH);

      pop();
    }
  }
}
