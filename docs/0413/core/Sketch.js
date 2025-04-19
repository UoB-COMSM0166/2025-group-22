// 📁 core/sketch.js
let gameState = "start";
let currentMap = null;
let currentLevel = "level1";
let openingBGM, playButton;
let pistol = 0;
let currentEnemy = null;
let player;
let playerName;

let startTime;
let elapsedTime = 0;
let timerRunning = false;
let pausedTime = 0;

let textBoxFlag  = false;
let saveScoreFlag = false;

function preload() {
  player_image = loadImage("assets/images/players.png");
  tiles_image = loadImage("assets/images/tiles.png");
  enemies_image = loadImage("assets/images/enemies.png");
  level1_background = loadImage("assets/images/level1_background.png");
  level2_background = loadImage("assets/images/level2_background.png");
  level3_background = loadImage("assets/images/level3_background.png");

  openingBGM = loadSound("assets/soundtrack/opening.mp3");

  pistolFireSoundEffect = loadSound("assets/soundeffect/pistol_fire_2.mp3");
  teleportSoundEffect = loadSound("assets/soundeffect/teleport_1.mp3");
  bulletBounceSoundEffect = loadSound("assets/soundeffect/bullet_bounce_1.mp3");

  keyPickupSoundEffect = loadSound("assets/soundeffect/key_pickup_1.mp3");
  healthPickupSoundEffect = loadSound("assets/soundeffect/health_pickup.mp3");
  doorOpenSoundEffect = loadSound("assets/soundeffect/door_open.mp3");

  playerHitSoundEffect = loadSound("assets/soundeffect/player_hit_1.mp3");
  playerInjuredOrDeadSoundEffect = loadSound("assets/soundeffect/player_injuredordead_1.mp3");




  openingBGM.setVolume(0.5);

  pistolFireSoundEffect.setVolume(0.5);
  teleportSoundEffect.setVolume(0.2);
  bulletBounceSoundEffect.setVolume(1);

  keyPickupSoundEffect.setVolume(1);
  healthPickupSoundEffect.setVolume(1);
  doorOpenSoundEffect.setVolume(1);

  playerHitSoundEffect.setVolume(1);
  playerInjuredOrDeadSoundEffect.setVolume(1);


  gameFont = loadFont("assets/font/Gloomie Saturday.otf");
}

function setup() {
  createCanvas(800, 450);
  // createCanvas(windowWidth, windowHeight);
  // runPlayerTests();
  // playerName = localStorage.getItem("playerName");
  // if (playerName === "null") playerName = null;

  playButton = createButton("Play Music");
  playButton.position(700, 20);
  playButton.mousePressed(Music);
  crosshair = new Crosshair([0, 5]);
}

function Music() {
  if (openingBGM.isPlaying()) {
    openingBGM.pause();
    playButton.html("Play Music");
  } else {
    openingBGM.loop();
    playButton.html("Pause Music");
  }
}

function draw() {
  InputController.handleHeldKeys();
  background(getBackground());
  // console.log("textBoxFlag =", textBoxFlag);

  if (GameController.is("playing")) {
    // console.log("playerName =", playerName);

    // console.log("saveScoreFlag =", saveScoreFlag);


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
//
function mousePressed() {
// function mouseReleased() {
// function mouseClicked() {
  if (gameState === "playing" && player) {
    InputController.handleMousePressed(mouseButton);
  }
}
