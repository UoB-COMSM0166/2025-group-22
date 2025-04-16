// 📁 views/NamePromptUI.js
class NameUI extends UI {
    constructor() {
        super("Enter Your Name", []);
    }

    draw() {
        if (!textBoxFlag) {
            this.input = createInput();

            this.input.position(width / 2 - 100, height / 2 + 25);
            this.input.size(200);
            this.input.style('font-size', '16px');
            this.input.style('padding', '8px');
            this.input.style('border-radius', '6px');
            this.input.style('border', '1px solid #ccc');
            this.input.style('text-align', 'center');
            this.input.style('outline', 'none');

            this.button = createButton("Start");
            this.button.position(width / 2 - 30, height / 2 + 80);
            this.button.style('font-size', '16px');
            this.button.style('padding', '8px 20px');
            this.button.style('border-radius', '6px');
            this.button.style('background-color', '#4CAF50');
            this.button.style('color', 'white');
            this.button.style('border', 'none');
            this.button.style('cursor', 'pointer');
            this.button.mouseOver(() => this.button.style('background-color', '#45a049'));
            this.button.mouseOut(() => this.button.style('background-color', '#4CAF50'));
            this.button.mousePressed(() => this.submitName());

            textBoxFlag = true;
        }
        push();
        fill(255);
        rectMode(CENTER);
        rect(width / 2, height / 2, 600, 300, 10);
        fill(0);
        textSize(20);
        textAlign(CENTER);
        // Please enter a nickname.\nDo not use your real name for privacy reasons.\nYour nickname will be shown on the leaderboard at the end of the game:
        text("Please enter a nickname", width / 2, height / 2 - 50);
        textSize(14);
        text("Do not use your real name for privacy reasons.", width / 2, height / 2 - 25);
        text("Your nickname will be shown on the leaderboard at the end of the game:", width / 2, height / 2);
        pop();
    }

    submitName() {
        playerName = this.input.value() || "Unknown";
        localStorage.setItem("playerName", playerName);

        // 移除輸入 UI
        this.input.remove();
        this.button.remove();

        GameController.start("level1");
    }
}
