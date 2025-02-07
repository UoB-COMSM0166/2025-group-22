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

function button(x, y, w, h, label){
  fill(245, 242, 196);
  noStroke();
  rect(x, y, w, h, 10);
  fill(0);
  textSize(28);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
}

function textFormat(x, y, size, label){
  textSize(size);
  textStyle(BOLD);
  textFont('Courier New');
  fill(0);
  text(label, x, y)
}
