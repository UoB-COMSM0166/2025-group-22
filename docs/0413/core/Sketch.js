// 📁 core/sketch.js
let gameState = "start";
let currentMap = null;
let currentLevel = "level1";
let playButton;
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

// let gameWindowRatio;
let resolutionRatio=800/450;

let canvasWidth;
let canvasHeight;

let images = {};
let sounds = {};

function preload() {
  defineImagePaths(); // 提前调用
  for (let key in imagePaths) {
    images[key] = loadImage(imagePaths[key]);
  }
  defineSoundPathsAndVolume(); // 提前调用
  for (let key in soundPaths) {
    sounds[key] = loadSound(soundPaths[key]);
    sounds[key].setVolume(soundVolume[key]);
  }


  // sounds["openingBGM"] =                     loadSound("assets/soundtrack/opening.mp3");
  // pistolFireSoundEffect =          loadSound("assets/soundeffect/pistol_fire_2.mp3");
  // teleportSoundEffect =            loadSound("assets/soundeffect/teleport_1.mp3");
  // bulletBounceSoundEffect =        loadSound("assets/soundeffect/bullet_bounce_1.mp3");
  //
  // keyPickupSoundEffect =           loadSound("assets/soundeffect/key_pickup_1.mp3");
  // healthPickupSoundEffect =        loadSound("assets/soundeffect/health_pickup.mp3");
  // doorOpenSoundEffect =            loadSound("assets/soundeffect/door_open.mp3");
  //
  // playerHitSoundEffect =           loadSound("assets/soundeffect/player_hit_1.mp3");
  // playerInjuredOrDeadSoundEffect = loadSound("assets/soundeffect/player_injuredordead_1.mp3");




  // sounds["openingBGM"].setVolume(0.5);
  //
  // pistolFireSoundEffect.setVolume(0.5);
  // teleportSoundEffect.setVolume(0.2);
  // bulletBounceSoundEffect.setVolume(1);
  //
  // keyPickupSoundEffect.setVolume(1);
  // healthPickupSoundEffect.setVolume(1);
  // doorOpenSoundEffect.setVolume(1);
  //
  // playerHitSoundEffect.setVolume(1);
  // playerInjuredOrDeadSoundEffect.setVolume(1);


  gameFont = loadFont("assets/font/Gloomie Saturday.otf");
}

function setup() {

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
  if (sounds["openingBGM"].isPlaying()) {
    sounds["openingBGM"].pause();
    playButton.html("Play Music");
  } else {
    sounds["openingBGM"].loop();
    playButton.html("Pause Music");
  }
}

function draw() {
  if (windowWidth/windowHeight > resolutionRatio) {
    canvasHeight = windowHeight;
    canvasWidth = canvasHeight * resolutionRatio;
  }else{
    canvasWidth = windowWidth;
    canvasHeight = canvasWidth / resolutionRatio;
  }
  // canvasWidth = 800;
  // canvasHeight = 450;
  canvas = createCanvas(canvasWidth, canvasHeight);
  centerCanvas();

  InputController.handleHeldKeys();
  if (GameController.is("playing")) {
    background(getBackground());
  }

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

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function windowResized() {
  centerCanvas(); // 視窗改變時重新居中
}

function getBackground() {
  switch (currentLevel) {
    case "level1": return images["level1_background"];
    case "level2": return images["level2_background"];
    case "level3": return images["level3_background"];
  }
}

function drawLives() {
  for (var i = 0; i < player.lives; i++) {
    image(images["tiles_image"], i * 30, 3, 50, 50, 2*64, 4*64, 64, 64);
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

function defineImagePaths() {
  imagePaths = {
    player_image: "assets/images/players.png",
    tiles_image: "assets/images/tiles.png",
    enemies_image: "assets/images/enemies.png",
    level1_background: "assets/images/level1_background.png",
    level2_background: "assets/images/level2_background.png",
    level3_background: "assets/images/level3_background.png",

    guide: "assets/images/UI/GUIDE.png",
    guide_down: "assets/images/UI/GUIDEDOWNSTAIR.png",
    startUI_background: "assets/images/UI/BEGINNING.png",
    levelUI_background: "assets/images/UI/LEVELUI.png",
    pauseUI_background: "assets/images/UI/PAUSEDUI.png",
    winUI_background: "assets/images/UI/WINUI.png",

    moon: "assets/images/UI/bloodmoon.png",
    moon_light: "assets/images/UI/BLOODMOONL.png",
    tower: "assets/images/UI/TOWER.png",
    tower_light: "assets/images/UI/TOWERL2.png",
    main_character: "assets/images/UI/MAINCHARACTER.png",
    main_character_light: "assets/images/UI/MAINCHARACTERL.png",

    exit_button: "assets/images/UI/EXITBUTTON.png",
    exit_button_light: "assets/images/UI/EXITBUTTONL.png",
    menu_button: "assets/images/UI/MENUBUTTON.png",
    menu_button_light: "assets/images/UI/MENUBUTTONL.png",
    restart_button: "assets/images/UI/RESTARTBUTTON.png",
    restart_button_light: "assets/images/UI/RESTARTBUTTONL.png",
    start_button: "assets/images/UI/STARTBUTTON.png",
    start_button_light: "assets/images/UI/STARTBUTTONL.png",
    sample_button: "assets/images/UI/SAMPLEBUTTON.png",
    sample_button_light: "assets/images/UI/SAMPLEBUTTONL.png",
    level_button: "assets/images/UI/LEVELBUTTON.png",
    level_button_light: "assets/images/UI/LEVELBUTTONL.png",
    level1_button: "assets/images/UI/LEVELBUTTON1.png",
    level1_button_light: "assets/images/UI/LEVELBUTTON1L.png",
    level2_button: "assets/images/UI/LEVELBUTTON2.png",
    level2_button_light: "assets/images/UI/LEVELBUTTON2L.png",
    level3_button: "assets/images/UI/LEVELBUTTON3.png",
    level3_button_light: "assets/images/UI/LEVELBUTTON3L.png",

  };
}
function defineSoundPathsAndVolume() {
  soundPaths = {
    openingBGM: "assets/soundtrack/opening.mp3",

    pistolFireSoundEffect: "assets/soundeffect/pistol_fire_2.mp3",
    teleportSoundEffect: "assets/soundeffect/teleport_1.mp3",
    bulletBounceSoundEffect: "assets/soundeffect/bullet_bounce_1.mp3",

    keyPickupSoundEffect : "assets/soundeffect/key_pickup_1.mp3",
    healthPickupSoundEffect : "assets/soundeffect/health_pickup.mp3",
    doorOpenSoundEffect : "assets/soundeffect/door_open.mp3",

    playerHitSoundEffect: "assets/soundeffect/player_hit_1.mp3",
    playerInjuredOrDeadSoundEffect: "assets/soundeffect/player_injuredordead_1.mp3"
  }
  soundVolume = {
    openingBGM: 0.5,

    pistolFireSoundEffect: 0.5,
    teleportSoundEffect: 0.2,
    bulletBounceSoundEffect: 1,

    keyPickupSoundEffect : 1,
    healthPickupSoundEffect : 1,
    doorOpenSoundEffect : 1,

    playerHitSoundEffect: 1,
    playerInjuredOrDeadSoundEffect: 1
  }
}
