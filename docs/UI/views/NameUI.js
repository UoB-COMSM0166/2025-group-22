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
        this.privacyAlpha = 0;         // 当前透明度
        this.privacyTargetAlpha = 0;   // 目标透明度
        this.privacyFloatOffset = 0;   // 浮动动画

        this.charCountText = "";
    }

    draw() {
        super.draw();
        image(images["text_please_enter_a_nick_name"], 0, canvasHeight * 0.15, canvasWidth, canvasHeight);
        push();
        UIManager.textStyle(color(127, 127, 127), 15);
        textAlign(CENTER);
        text("[ Data Privacy Notice ]", canvasWidth * 0.5, canvasHeight * 0.91 )
        pop();       

        const inputWidth = canvasWidth * (508 / 800) * 0.8;
        const inputHeight = canvasHeight * (76 / 450) * 0.8;
        // console.log("canvasHeight :inputHeight: " + canvasHeight + ":" + inputHeight);
        const posX = (windowWidth - canvasWidth) / 2 + (canvasWidth - inputWidth) / 2;
        const posY = (windowHeight - canvasHeight) / 2 + canvasHeight * 0.52;

        if (!textInput) {
            textInput = createInput();
            textInput.class('custom-input');
            textInput.input(() => {
                let val = textInput.value();
                val = val.replace(/[^a-zA-Z0-9_]/g, ''); // 過濾非法字符
                val = val.slice(0, 16); // 最長 16
                textInput.value(val);

                this.charCountText = `${val.length}/16`;
            });
        }

        // 顯示長度與錯誤提示
        push();
        if (textInput.value().length < 3) {
            UIManager.textStyle(color(255, 165, 0), 12);
            textAlign(CENTER);
            text("Please enter 3 valid character at least!", canvasWidth * 0.5, canvasHeight * 0.71);
        }
        pop();

        const fontSize = 24 / 850 * canvasWidth;
        textInput.style('font-size', `${fontSize}px`);
        textInput.position(posX, posY);
        textInput.size(inputWidth, inputHeight);

    
        const startBtn = this.buttons[0];
        const isHovered = mouseX >= startBtn.x - startBtn.width * 5 / 6 &&
                        mouseX <= startBtn.x + startBtn.width * 5 / 6 &&
                        mouseY >= canvasHeight * 0.91 - startBtn.height / 4 &&
                        mouseY <= canvasHeight * 0.91 + startBtn.height / 4;

        if (isHovered) {
            textInput.hide();
        }else {
            textInput.show();
        }
        // ✅ 控制透明度目标
        this.privacyTargetAlpha = isHovered ? 255 : 0;

        // ✅ 透明度逐帧平滑变化（lerp）
        this.privacyAlpha = lerp(this.privacyAlpha, this.privacyTargetAlpha, 0.9);

        // ✅ 浮动效果（上下轻轻漂）
        this.privacyFloatOffset = sin(frameCount * 0.05) * 6;

        if (this.privacyAlpha > 1) { // 超过 1 再渲染
            push();
            tint(255, this.privacyAlpha); // 设置透明度
            const img = images["text_privacy"];
            const popupW = canvasWidth * 0.65;
            const popupH = popupW * (497 / 912); // 保持原图比例
            const popupX = startBtn.x - popupW / 2;
            const popupY = startBtn.y - startBtn.height * 5 + this.privacyFloatOffset;

            image(img, popupX, popupY, popupW, popupH);
            // image(img, 0, 0, canvasWidth, canvasHeight);
            pop();
        }

    }
}
