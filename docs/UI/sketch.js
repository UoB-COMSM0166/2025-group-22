let gameState = "start";

function setup() {
  createCanvas(800, 450);

}

function draw() {
  background(180, 217, 239);

  if(gameState === "start"){
    startUI();
  }else if(gameState === "win"){
    winUI();
  }else if(gameState === "gameOver"){
    gameOverUI();
  }else if(gameState === "pause"){
    pauseUI();
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