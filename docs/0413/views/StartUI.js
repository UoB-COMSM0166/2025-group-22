// 📁 views/StartUI.js
class StartUI extends UI {
  constructor() {
    super(images["background_start"], [
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * 0.5,
        width: canvasWidth * 161/800,
        height: canvasHeight * 53/450,
        img: images["button_start"],
        imgLight: images["button_start_hover"],
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
        img: images["button_level"],
        imgLight: images["button_level_hover"],
        action: () => {
          gameState = "choosingLevel";
        }
      },
      {
        x: canvasWidth * 0.5,
        y: canvasHeight * 0.79,
        width: canvasWidth * 161/800,
        height: canvasHeight * 53/450,
        img: images["button_exit"],
        imgLight: images["button_exit_hover"],
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
    // UIManager.imageFloat(images["icon_main_character"], 0, 0, canvasWidth, canvasHeight, 0, 0.05, 10);
    // image(images["icon_main_character"], 0, 0, canvasWidth, canvasHeight);
    image(images["icon_tower"], 0, 0, canvasWidth, canvasHeight);
    UIManager.imageEffect(
      images["text_twilight_seeker"],
      0,
      0,
      canvasWidth,
      canvasHeight,
      {
          highlightOnlyHover: false,
          float: true,
      }
    );
    UIManager.imageEffect(
      images["icon_bloodmoon"],
      0,
      0,
      canvasWidth,
      canvasHeight,
      {
          highlightOnlyHover: false,
          float: true
      }
    );
    UIManager.imageEffect(
        images["icon_main_character"],
        0,
        0,
        canvasWidth,
        canvasHeight,
        {
            highlightOnlyHover: true,
          float: true,
          buttonX: canvasWidth * 0.5,
          buttonY: canvasHeight * 0.5,
          buttonWidth: canvasWidth * 161/800,
          buttonHeight: canvasHeight * 53/450,
        }
    );
    UIManager.imageEffect(
        images["icon_tower"],
        0,
        0,
        canvasWidth,
        canvasHeight,
        {
            highlightOnlyHover: true,
          float: false,
          buttonX: canvasWidth * 0.5,
          buttonY: canvasHeight * 0.64,
          buttonWidth: canvasWidth * 161/800,
          buttonHeight: canvasHeight * 53/450,
        }
    );
    // UIManager.imageHover(
    //     images["icon_main_character_hover"],
    //     canvasWidth * 0.5,
    //     canvasHeight * 0.5,
    //     canvasWidth * 161/800,
    //     canvasHeight * 53/450,
    //     40
    // );
    //
    // UIManager.imageHover(
    //     images["icon_tower_hover"],
    //     canvasWidth * 0.5,
    //     canvasHeight * 0.64,
    //     canvasWidth * 161/800,
    //     canvasHeight * 53/450,
    //     40
    // );


  }



}
