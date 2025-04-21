// 📁 views/StartUI.js
class StartUI extends UI {
  constructor() {
    super(images["startUI_background"], [
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * 0.5,
        width: canvasWidth * 161/800,
        height: canvasHeight * 53/450,
        img: images["start_button"],
        imgLight: images["start_button_light"],
        action: () => {

          // // ❌ 如果還沒有，才 prompt 一次，並儲存
          // if (!playerName) {
          //   playerName = prompt("Please enter a nickname. \nDo not use your real name for privacy reasons:") || "Unknown";
          //   localStorage.setItem("playerName", playerName);
          // }
          //
          // GameController.start("level1");
          console.log("playerName =", playerName)

          if (!playerName) {
            gameState = "namePrompt";
          } else {
            GameController.start("level1");
          }

        }
      },
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * 0.64,
        width: canvasWidth * 161/800,
        height: canvasHeight * 53/450,
        img: images["level_button"],
        imgLight: images["level_button_light"],
        action: () => {
          gameState = "choosingLevel";
        }
      },
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * 0.79,
        width: canvasWidth * 161/800,
        height: canvasHeight * 53/450,
        img: images["exit_button"],
        imgLight: images["exit_button_light"],
        action: () => {
          alert("請手動關閉頁面");
          window.close();
        }
      }
    ]);
    //playerName = localStorage.getItem("playerName");
  }
  draw() {
    super.draw();
    this.imageLight(canvasWidth * 0.5,
        canvasHeight * 0.5,
        canvasWidth * 161/800,
        canvasHeight * 53/450,
        40,
        images["main_character_light"]
    );

    this.imageLight(canvasWidth * 0.5,
        canvasHeight * 0.64,
        canvasWidth * 161/800,
        canvasHeight * 53/450,
        40,
        images["tower_light"]
    );
  }
  imageLight(x, y, width, height, alpha, imageLight){
    const isHovered =
        mouseX >= x - width / 2 && mouseX <= x + width / 2 &&
        mouseY >= y - height / 2 && mouseY <= y + height / 2;
    // 這裡你就可以針對「有被 hover 的按鈕」做額外的效果
    if (isHovered) {
      push();
      tint(255, alpha)
      image(imageLight, 0, 0, canvasWidth, canvasHeight);
      pop();
    }
  }
}
