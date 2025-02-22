let gameState = "start";
let currentMap = null;
let currentLevel = "level1";
let mySound,playButton; //音乐
let ui;

function preload() {
  //player_image = loadImage("images/player.png");
  tiles_image = loadImage("images/tiles.png");
  enemies_image = loadImage("images/enemies.png");
  level1_background = loadImage("images/level1_background.png");
  level2_background = loadImage("images/level2_background.png");
  level3_background = loadImage("images/level3_background.png");
  mySound = loadSound('soundtrack/Melody.mp3');
}

function setup() {
  createCanvas(800, 450);
 
  playButton = createButton('Play Music'); //音乐
  playButton.position(20, 20); 
  playButton.mousePressed(Music);
  mySound.setVolume(0.05); // 设置音量为0.2（即20%）

  crosshair = new Crosshair([0, 5]);

}

function Music() { //音乐
  if (mySound.isPlaying()) {
    mySound.pause(); 
    playButton.html('Play Music'); 
  } else {
    mySound.loop(); 
    playButton.html('Pause Music'); 
  }
}

function draw() {
  if(gameState === "playing"){
    if(currentLevel === "level1"){
      background(level1_background);
    }else if(currentLevel === "level2"){
      background(level2_background)
    }else{
      background(level3_background);
    }
  }else{
    background(180, 217, 239)
  }

  switch (gameState) {
    case "start":
      ui = new StartUI();
      break;
    case "choosingLevel":
      ui = new LevelUI();
      break;
    case "playing":
      loadLevel(); // 游戏进行中不渲染 UI
      currentMap.draw();
      ui = null;
      break;
    case "pause":
      ui = new PauseUI();
      break;
    case "gameOver":
      ui = new GameOverUI();
      break;
    case "win":
      ui = new WinUI();
      break;
  }

  if (ui) {
    ui.draw();
    ui.handleMouseClick();
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
    currentMap = new Maps(level1);
  }else if(currentLevel === "level2"){
    currentMap = new Maps(level2);
  }else if(currentLevel === "level3"){
    currentMap = new Maps(level3);
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