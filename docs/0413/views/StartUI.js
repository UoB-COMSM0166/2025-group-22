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
                    gameState = "namePrompt";
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
    }
    draw() {
        super.draw();
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
                floatSpeed: 0.09,
                floatAmplitude: 5,
                floatOffset: 0,
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
                float: true,
                floatSpeed: 0.03,
                floatAmplitude: 5,
                floatOffset: 0,
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
                floatSpeed: 0.2,
                floatAmplitude: 0.8,
                floatOffset: 0,
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
    }
}
