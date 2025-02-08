function winUI() {

  let width = 150;
  let height = 90;
  let buttonY = 320;//450-60-50

  button(170, buttonY, width, height, "New");
  button(480, buttonY, width, height, "Exit");

  textFormat(400, 150, 80, "WIN !!");

  if(mouseIsPressed && mouseX >= 170 && mouseX <= 320 && mouseY >= 320 && mouseY <= 410){
    gameState = "start";
  }
}