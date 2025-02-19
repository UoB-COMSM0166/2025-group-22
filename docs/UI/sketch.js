let gameState = "start";
let currentMap = null;
let currentLevel = "level1";

function preload() {
  //player_image = loadImage("images/player.png");
  tiles_image = loadImage("images/tiles.png");
}

function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(180, 217, 239);

  if(gameState === "start"){
    startUI();
  }else if(gameState === "choosingLevel"){
    levelUI();
  }else if(gameState === "win"){
    winUI();
  }else if(gameState === "gameOver"){
    gameOverUI();
  }else if(gameState === "pause"){
    pauseUI();
  }else if(gameState === "playing"){
    loadLevel();
    currentMap.draw();
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

function loadLevel(){
  if(currentLevel === "level1"){
    currentMap = new maps(level1);
  }else if(currentLevel === "level2"){
    currentMap = new maps(level2);
  }else if(currentLevel === "level3"){
    currentMap = new maps(level3);
  }
}

function keyPressed() {
  //player.processInput(key);
  if(key === "P" || key === "p"){
    if(gameState === "pause"){
      gameState = "playing";
    }else if(gameState === "playing"){
      gameState = "pause";
    }
  }
}

function mousePressed() {
  if(mouseButton === LEFT && pistol === 0) {
    player.processInput('blue pistol click');
  }
  else if(mouseButton === LEFT && pistol === 1) {
    player.processInput('red pistol click');
  }
}