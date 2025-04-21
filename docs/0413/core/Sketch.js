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
    case "level1": return images["background_level1"];
    case "level2": return images["background_level2"];
    case "level3": return images["background_level3"];
  }
}

function drawLives() {
  for (var i = 0; i < player.lives; i++) {
    image(images["image_tiles"], i * 30, 3, 50, 50, 2*64, 4*64, 64, 64);
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
    //sprite
    image_player: "assets/images/sprite/player.png",
    image_tiles: "assets/images/sprite/tiles.png",
    image_enemies: "assets/images/sprite/enemies.png",

    //background
    background_sample: "assets/images/background/background_sample.png",
    background_level1: "assets/images/background/background_level1.png",
    background_level2: "assets/images/background/background_level2.png",
    background_level3: "assets/images/background/background_level3.png",

    //buttons
    button_exit: "assets/images/buttons/button_exit.png",
    button_exit_hover: "assets/images/buttons/button_exit_hover.png",
    button_menu: "assets/images/buttons/button_menu.png",
    button_menu_hover: "assets/images/buttons/button_menu_hover.png",
    button_resume: "assets/images/buttons/button_resume.png",
    button_resume_hover: "assets/images/buttons/button_resume_hover.png",
    button_restart: "assets/images/buttons/button_restart.png",
    button_restart_hover: "assets/images/buttons/button_restart_hover.png",
    button_start: "assets/images/buttons/button_start.png",
    button_start_hover: "assets/images/buttons/button_start_hover.png",
    button_sample: "assets/images/buttons/button_sample.png",
    button_sample_hover: "assets/images/buttons/button_sample_hover.png",
    button_level: "assets/images/buttons/button_level.png",
    button_level_hover: "assets/images/buttons/button_level_hover.png",
    button_level1: "assets/images/buttons/button_level1.png",
    button_level1_hover: "assets/images/buttons/button_level1_hover.png",
    button_level2: "assets/images/buttons/button_level2.png",
    button_level2_hover: "assets/images/buttons/button_level2_hover.png",
    button_level3: "assets/images/buttons/button_level3.png",
    button_level3_hover: "assets/images/buttons/button_level3_hover.png",

    //startUI
    icon_bloodmoon: "assets/images/startUI/icon_bloodmoon.png",
    icon_bloodmoon_hover: "assets/images/startUI/icon_bloodmoon_hover.png",
    icon_tower: "assets/images/startUI/icon_tower.png",
    icon_tower_hover: "assets/images/startUI/icon_tower_hover.png",
    icon_main_character: "assets/images/startUI/icon_main_character.png",
    icon_main_character_hover: "assets/images/startUI/icon_main_character_hover.png",
    text_twilight_seeker: "assets/images/startUI/text_twilight_seeker.png",
    background_start: "assets/images/startUI/background_start.png",

    //guideUI
    background_guide: "assets/images/guideUI/background_guide.png",
    bar_key_hint: "assets/images/guideUI/bar_key_hint.png",
    key_a: "assets/images/guideUI/key_a.png",
    key_d: "assets/images/guideUI/key_d.png",
    key_e: "assets/images/guideUI/key_e.png",
    key_p: "assets/images/guideUI/key_p.png",
    key_space: "assets/images/guideUI/key_space.png",
    mouse: "assets/images/guideUI/mouse.png",

    // guide: "assets/images/UI/GUIDE.png",
    // guide_down: "assets/images/UI/GUIDEDOWNSTAIR.png",
    // background_start: "assets/images/UI/BEGINNING.png",
    // levelUI_background: "assets/images/UI/LEVELUI.png",
    // pauseUI_background: "assets/images/UI/PAUSEDUI.png",
    // winUI_background: "assets/images/UI/WINUI.png",

    //levelUI
    icon_tower_levelUI: "assets/images/levelUI/icon_tower_levelUI.png",

    //otherUI
    background_default: "assets/images/otherUI/background_default.png",
    background_scoreboard: "assets/images/otherUI/background_scoreboard.png",
    text_gameover: "assets/images/otherUI/text_gameover.png",
    text_leaderboard: "assets/images/otherUI/text_leaderboard.png",
    text_name: "assets/images/otherUI/text_name.png",
    text_pause: "assets/images/otherUI/text_pause.png",
    text_please_enter_a_nick_name: "assets/images/otherUI/text_please_enter_a_nick_name.png",
    text_press_any_key_to_start: "assets/images/otherUI/text_press_any_key_to_start.png",
    text_youwin: "assets/images/otherUI/text_youwin.png",


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
