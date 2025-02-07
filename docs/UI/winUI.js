function setup() {
  createCanvas(800, 450);
  background(180, 217, 239);

}

function draw() {

  let width = 150;
  let height = 90;
  let buttonY = 320;//450-60-50

  button(170, buttonY, width, height, "New");
  button(480, buttonY, width, height, "Exit");

  textFormat(400, 150, 80, "WIN !!");

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
