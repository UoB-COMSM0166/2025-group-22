function gameOverUI() {

  let width = 150;
  let height = 90;
  let buttonY = 320;//450-60-50

  button(170, buttonY, width, height, "Restart");
  button(480, buttonY, width, height, "Exit");

  textFormat(400, 150, 80, "Game Over");

  if(mouseIsPressed && mouseX >= 170 && mouseX <= 320 && mouseY >= 320 && mouseY <= 410){
    gameState = "playing";
    restartLevel();
  }else if(mouseIsPressed && mouseX >= 480 && mouseX <= 630 && mouseY >= 320 && mouseY <= 410){
    window.close();
  }
}

/*function restartLevel{
  player.position(100, 100);
}*/