// 📁 views/GameOverUI.js
class GameOverUI extends UI {
    constructor() {
        super("Game Over", [
            {
                x: 170,
                y: 320,
                width: 150,
                height: 90,
                text: "Restart",
                action: () => GameController.restart()
            },
            {
                x: 480,
                y: 320,
                width: 150,
                height: 90,
                text: "Exit",
                action: () => {
                    alert("請手動關閉頁面");
                    window.close();
                }
            }
        ]);
    }

    draw() {
        UI.textFormat(400, 150, 80, this.title);

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
