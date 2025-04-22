class NameUI extends UI {
    constructor() {
        super(images["background_default"], [
            {
                x: canvasWidth * 0.5,
                y: canvasHeight * 0.8,
                width: canvasWidth * 161/800,
                height: canvasHeight * 53/450,
                img: images["button_start"],
                imgLight: images["button_start_hover"],
                action: () => {
                    const name = textInput.value();
                    if (!/^[a-zA-Z0-9_]{3,16}$/.test(name)) {
                        alert("Please enter 3 ~ 16 character, only include letters, digits and _");
                        return;
                    }

                    playerName = name;
                    localStorage.setItem("playerName", playerName);
                    textInput.remove();
                    textInput = null;
                    gameState = "guide";
                }
            }
        ]);

        this.charCountText = "";
    }

    draw() {
        super.draw();
        image(images["text_please_enter_a_nick_name"], 0, canvasHeight * 0.15, canvasWidth, canvasHeight);

        const inputWidth = canvasWidth * 508 / 800 * 0.8;
        const inputHeight = canvasHeight * 76 / 450 * 0.8;
        const posX = (windowWidth - canvasWidth) / 2 + (canvasWidth - inputWidth) / 2;
        const posY = (windowHeight - canvasHeight) / 2 + canvasHeight * 0.52;

        if (!textInput) {
            textInput = createInput();
            textInput.class('custom-input');
            textInput.input(() => {
                let val = textInput.value();
                val = val.replace(/[^a-zA-Z0-9_]/g, ''); // ✅ 過濾非法字符
                val = val.slice(0, 16); // ✅ 最長 16
                textInput.value(val);

                this.charCountText = `${val.length}/16`;
            });
        }

        // ✅ 顯示長度與錯誤提示
        push();
        textAlign(CENTER);
        textFont("Georgia"); // 或自訂 retro 遊戲字體
        textStyle(BOLD);
        textSize(canvasWidth * 20 / 800);
        if (textInput.value().length < 3) {
            fill(255, 100, 100); // 紅色
            text("Please enter 3 valid character at least!", canvasWidth * 0.5, canvasHeight * 0.72);
        }
        pop();

        const fontSize = 24 / 850 * canvasWidth;
        textInput.style('font-size', `${fontSize}px`);
        textInput.position(posX, posY);
        textInput.size(inputWidth, inputHeight);
    }
}
