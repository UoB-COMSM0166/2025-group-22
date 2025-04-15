// 📁 views/NamePromptUI.js
class NameUI extends UI {
    constructor() {
        super("Enter Your Name", []);
        this.input = createInput();
        this.input.position(width / 2 - 100, height / 2 - 30);
        this.input.size(200);

        this.button = createButton("Start");
        this.button.position(width / 2 - 50, height / 2 + 20);
        this.button.mousePressed(() => this.submitName());
    }

    submitName() {
        playerName = this.input.value() || "Unknown";
        localStorage.setItem("playerName", playerName);

        // 移除輸入 UI
        this.input.remove();
        this.button.remove();

        GameController.start("level1");
    }

    draw() {
        fill(255);
        rect(width / 2 - 150, height / 2 - 80, 300, 150, 10);
        fill(0);
        textSize(20);
        textAlign(CENTER);
        text("Please enter a nickname", width / 2, height / 2 - 50);
        textSize(14);
        text("Do not use your real name", width / 2, height / 2 - 25);
    }
}
