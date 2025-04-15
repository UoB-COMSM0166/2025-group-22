// 📁 core/sketch.js
let gameState = "start";
let currentMap = null;
let currentLevel = "level1";
let mySound, playButton;
let pistol = 0;
let currentEnemy = null;
let player;
let playerName;

let startTime;
let elapsedTime = 0;
let timerRunning = false;
let pausedTime = 0;

function preload() {
  player_image = loadImage("assets/images/players.png");
  tiles_image = loadImage("assets/images/tiles.png");
  enemies_image = loadImage("assets/images/enemies.png");
  level1_background = loadImage("assets/images/level1_background.png");
  level2_background = loadImage("assets/images/level2_background.png");
  level3_background = loadImage("assets/images/level3_background.png");
  mySound = loadSound("assets/soundtrack/Melody.mp3");
}

function setup() {
  createCanvas(800, 450);
  playerName = localStorage.getItem("playerName");
  if (playerName === "null") playerName = null;

  playButton = createButton("Play Music");
  playButton.position(700, 20);
  playButton.mousePressed(Music);
  mySound.setVolume(0.05);
  crosshair = new Crosshair([0, 5]);
}

function Music() {
  if (mySound.isPlaying()) {
    mySound.pause();
    playButton.html("Play Music");
  } else {
    mySound.loop();
    playButton.html("Pause Music");
  }
}

function draw() {
  InputController.handleHeldKeys();
  background(getBackground());


  if (GameController.is("playing")) {
    if (!currentMap || !player) GameController.start(currentLevel);
    currentMap.draw();
    crosshair.draw();
    player.draw();
    player.update();
    handleBullet();
    noCursor();
    drawLives();
    handleTimer();
  } else {
    cursor();
  }

  UIManager.drawCurrentUI();
}

function getBackground() {
  if (GameController.is("playing")) {
    switch (currentLevel) {
      case "level1": return level1_background;
      case "level2": return level2_background;
      case "level3": return level3_background;
    }
  }
  return color(180, 217, 239);
}

function drawLives() {
  for (var i = 0; i < player.lives; i++) {
    image(tiles_image, i * 30, 3, 50, 50, 2*64, 4*64, 64, 64);
  }
}

function handleTimer() {
  if (GameController.is("playing") && timerRunning) {
    elapsedTime = millis() - startTime;
  }
  if (GameController.isOver() || GameController.isPaused()) {
    timerRunning = false;
    pausedTime = elapsedTime;
  }
  if (GameController.is("playing")) {
    fill(255);
    textSize(20);
    textAlign(LEFT, TOP);
    text("Time: " + nf(elapsedTime / 1000, 0, 2) + "s", 10, 50);
  }
}

function handleBullet() {
  if (player?.bullet != 0) {
    //console.log("Drawing bullet at", player.bullet.pos);
    player.bullet.draw(currentMap.xOffset, currentMap.yOffset);
    const result = player.bullet.update();
    //console.log("Bullet update result:", result);
    if (result === "undefined") {
      //console.log("Bullet removed");
      player.bullet = 0;
    }
    else if(result === "inStandard") {
      player.bullet.velocity = 0;
    }
  }
}

function keyPressed() {
  InputController.handleKeyPressed(key);
}

function mousePressed() {
  InputController.handleMousePressed(mouseButton);
}
