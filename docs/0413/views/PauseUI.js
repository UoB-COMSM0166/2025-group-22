// 📁 views/PauseUI.js
class PauseUI extends UI {
    constructor() {
        super("Paused", [
            {
                x: 325,
                y: 140,
                width: 150,
                height: 70,
                text: "Resume",
                action: () => {
                    GameController.resume();
                }
            },
            {
                x: 325,
                y: 250,  // 第二顆按鈕
                width: 150,
                height: 70,
                text: "Restart",
                action: () => {
                    GameController.restart();
                }
            },
            {
                x: 325,
                y: 360,  // 第三顆按鈕
                width: 150,
                height: 70,
                text: "Menu",
                action: () => {
                    gameState = "start";
                }
            }
        ]);
    }

    draw() {
        UI.textFormat(400, 80, 80, this.title); // 對齊 LevelUI 的標題位置

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
