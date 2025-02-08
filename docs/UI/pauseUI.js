function pauseUI() {

  let width = 150;
  let height = 90;
  let buttonY = 320;//450-60-50

  button(170, buttonY, width, height, "Continue");
  button(480, buttonY, width, height, "Exit");

  textFormat(400, 150, 80, "Pause");

  
  if(mouseIsPressed && mouseX >= 170 && mouseX <= 320 && mouseY >= 320 && mouseY <= 410){
    gameState = "playing";
  }else if(mouseIsPressed && mouseX >= 480 && mouseX <= 630 && mouseY >= 320 && mouseY <= 410){
    window.close();
  }
}

