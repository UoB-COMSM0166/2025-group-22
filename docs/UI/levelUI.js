function levelUI() {
  let width = 150;
  let height = 70;
  let buttonX = 325;

  button(buttonX, 140, width, height, "1");
  button(buttonX, 250, width, height, "2");
  button(buttonX, 360, width, height, "3");

  textFormat(400, 80, 80, "Level");

  
  if(mouseIsPressed && mouseX >= 325 && mouseX <= 475 && mouseY >= 140 && mouseY <= 210){
    currentLevel = "level1";
    gameState = "playing";
  }else if(mouseIsPressed && mouseX >= 325 && mouseX <= 475 && mouseY >= 250 && mouseY <= 320){
    currentLevel = "level2";
    gameState = "playing";
  }else if(mouseIsPressed && mouseX >= 325 && mouseX <= 475 && mouseY >= 360 && mouseY <= 430){
    currentLevel = "level3";
    gameState = "playing";
  }
}

