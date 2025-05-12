class LoadingUI extends UI {
  constructor() {
    super(null, []);
    this.startTime = millis();
  }

  draw() {
    if (!images["background_vhs"]) return;

    image(images["background_vhs"], 0, 0, canvasWidth, canvasHeight);

    fill(255);
    textFont("Courier New");
    textAlign(CENTER, CENTER);
    textSize(canvasWidth * 0.03);

    const elapsed = millis() - this.startTime;
    const percent = constrain((elapsed / 50) * 10, 0, 100);
    const bar =
      "[" + "#".repeat(percent / 10) + ".".repeat(10 - percent / 10) + "]";
    text(
      `LOADING ${bar} ${Math.floor(percent)}%`,
      canvasWidth / 2,
      canvasHeight * 0.8
    );

    if (percent >= 100 && elapsed > 400) {
      gameState = "start";
    }
  }
}
