function startUI() {

  let width = 150;
  let height = 90;
  let buttonY = 320;//450-60-50

  button(80, buttonY, width, height, "Level");
  button(330, buttonY, width, height, "Start");
  button(580, buttonY, width, height, "Exit");

  textFormat(400, 150, 80, "Twlight Seeker");

  if(mouseIsPressed && mouseX >= 80 && mouseX <= 230 && mouseY >= 320 && mouseY <= 410){
    gameState = "choosingLevel";
  }else if(mouseIsPressed && mouseX >= 330 && mouseX <= 480 && mouseY >= 320 && mouseY <= 410){
    map1();
  }else if(mouseIsPressed && mouseX >= 580 && mouseX <= 730 && mouseY >= 320 && mouseY <= 410){
    window.close();
  }
}