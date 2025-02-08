function gameOverUI() {

  let width = 150;
  let height = 90;
  let buttonY = 320;//450-60-50

  button(170, buttonY, width, height, "Restart");
  button(480, buttonY, width, height, "Exit");

  textFormat(400, 150, 80, "Game Over");

}