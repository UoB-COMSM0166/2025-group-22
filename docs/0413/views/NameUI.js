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
                    playerName = textInput.value() || "Unknown";
                    localStorage.setItem("playerName", playerName);
                    textInput.remove();
                    textInput=null;
                    gameState = "guide";
                }
            }
        ]);
    }

    draw() {
        super.draw();
        image(images["text_please_enter_a_nick_name"], 0, canvasHeight * 0.15, canvasWidth, canvasHeight);

            let charCountText = '';
            if (!textInput) {

                textInput = createInput();
                textInput.class('custom-input');
                textInput.input(() => {
                    // 你可以在這裡動態監控文字輸入，例如限制長度
                    let val = textInput.value();
                    // 只保留 英文字母、数字、底线
                    val = val.replace(/[^a-zA-Z0-9_]/g, '');
                    // 限制最大長度為 16
                    val = val.slice(0, 16);
                    textInput.value(val);
                    // 顯示目前長度，限制最少 3 個
                    charCountText = `${val.length}/16`;
                });
            }
            // if (charCountText) {
            //     textAlign(CENTER);
            //     textSize(16);
            //     if (textInput.value().length < 3) {
            //         fill(255, 100, 100); // 紅色提示
            //         text("請輸入至少 3 個有效字符", width / 2, height * 0.72);
            //     } else {
            //         fill(255);
            //     }
            //     text(charCountText, width / 2, height * 0.75);
            // }

            const inputWidth = canvasWidth * 508 / 800 * 0.8;
            const inputHeight = canvasHeight * 76 / 450 * 0.8;
            const posX = (windowWidth - canvasWidth) / 2 + (canvasWidth - inputWidth) / 2;
            const posY = (windowHeight - canvasHeight) / 2 + canvasHeight * 0.52;
            var fontSize = 24 /850 * canvasWidth
            textInput.style('font-size', `${fontSize}px`);
            textInput.position(posX, posY);
            textInput.size(inputWidth, inputHeight);
    }

}
