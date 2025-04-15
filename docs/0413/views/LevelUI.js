// 📁 views/LevelUI.js
class LevelUI extends UI {
  constructor() {
    super("Level", [
      {
        x: 325,
        y: 140,
        width: 150,
        height: 70,
        text: "1",
        action: () => {
          LevelController.goToLevel("level1");
        }
      },
      {
        x: 325,
        y: 250,
        width: 150,
        height: 70,
        text: "2",
        action: () => {
          LevelController.goToLevel("level2");
        }
      },
      {
        x: 325,
        y: 360,
        width: 150,
        height: 70,
        text: "3",
        action: () => {
          LevelController.goToLevel("level3");
        }
      }
    ]);
  }

  draw() {
    UI.textFormat(400, 80, 80, this.title);

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
}