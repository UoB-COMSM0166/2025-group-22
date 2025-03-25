let gameState = "start";
let currentMap = null;
let currentLevel = "level1";
let mySound,playButton; //音乐
let ui;
let pistol = 0;
let currentEnemy = null;

let startTime;
let elapsedTime = 0;
let timerRunning = false;
let pausedTime = 0; // 记录暂停时已过去的时间


function preload() {
  player_image = loadImage("images/players.png");
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
  player = new Player();

  startTime = millis(); // 记录开始时间
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

    if (timerRunning) {
      elapsedTime = millis() - startTime;
    }

    // 显示计时器
    fill(255);
    textSize(20);
    textAlign(LEFT, TOP);
    text("Time: " + nf(elapsedTime / 1000, 0, 2) + "s", 20, 50);

  }else{
    background(180, 217, 239)
  }

  if (gameState === "pause" || gameState === "gameOver" || gameState === "win") {
    timerRunning = false;
    pausedTime = elapsedTime; // 记录暂停时的时间
  }

  switch (gameState) {
    case "start":
      ui = new StartUI();
      break;
    case "choosingLevel":
      ui = new LevelUI();
      break;
    case "playing":
      // loadLevel(); // 游戏进行中不渲染 UI
      currentMap.draw();
      crosshair.draw();
      // console.log(currentMap);
      player.draw();
      player.update();
        if(player.bullet != 0){
          player.bullet.draw(currentMap.xOffset, currentMap.yOffset);  
          if(player.bullet.update() == "undefined") {
            player.bullet = 0;
          }
        }
      noCursor();
      ui = null;
      break;
    case "pause":
      ui = new PauseUI();
      cursor();
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
  if (gameState === "playing") {
    if (!timerRunning) {
      startTime = millis() - pausedTime; // 恢复计时，不重置
      timerRunning = true;
    }
  }
  player.processInput(key);
  
}

function mousePressed() {
  if(mouseButton === LEFT && pistol === 0 && gameState == "playing") {
    player.processInput('blue pistol click');
  }
  else if(mouseButton === LEFT && pistol === 1 && gameState == "playing") {
    player.processInput('red pistol click');
  }
}