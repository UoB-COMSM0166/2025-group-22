/* Core game state variables */
let gameState = "loading";

let currentMap = null;
let currentLevel = "sample";
let playButton;
let pistol = 1;
let currentEnemy = null;
let player;
let playerName;

let guideWindowShowing = false;
let guideWindow;

let startTime;
let elapsedTime = 0;
let timerRunning = false;
let pausedTime = 0;

let completed = {
  level1: false,
  level2: false,
};

let textInput;
let saveScoreFlag = false;

let originalWidth = 800;
let originalHeight = 450;
let resolutionRatio = originalWidth / originalHeight;

let canvasWidth;
let canvasHeight;

let drawRatio = 0.5;

let images = {};
let sounds = {};
let videos = {};

let animations = {};
let inputAllowed = true;

let openingBGMPlayed = false;

/** Loads all game assets (images, sounds, videos) before setup. */
function preload() {
  defineImagePaths();
  for (let key in imagePaths) {
    images[key] = loadImage(imagePaths[key]);
  }
  defineSoundPathsAndVolume();
  for (let key in soundPaths) {
    sounds[key] = loadSound(soundPaths[key]);
    sounds[key].setVolume(soundVolume[key]);
  }
  defineVideoPaths();
  for (let key in videoPaths) {
    videos[key] = createVideo(videoPaths[key]);
    videos[key].hide();
  }
}

/** Initializes canvas, UI elements and game objects. */
function setup() {
  playButton = createButton("Play Music");
  playButton.mousePressed(Music);
  playButton.style("font-family", "Lucida Console");
  playButton.style("font-weight", "bold");
  playButton.style("color", "rgb(127,127,127)");
  playButton.style("font-size", (canvasWidth * 20) / 800 + "px");

  updateButtonPosition();

  crosshair = new Crosshair([2, 4]);
  guideWindow = new Guide();

  // runPlayerTests();
}

/** Toggles background music playback. */
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
  noSmooth();
  if (windowWidth / windowHeight > resolutionRatio) {
    canvasHeight = windowHeight;
    canvasWidth = canvasHeight * resolutionRatio;
  } else {
    canvasWidth = windowWidth;
    canvasHeight = canvasWidth / resolutionRatio;
  }

  canvas = createCanvas(canvasWidth, canvasHeight);
  centerCanvas();
  updateButtonPosition();

  InputController.handleHeldKeys();

  if (GameController.is("playing")) {
    drawParallaxBackground(getBackground());
    if (!currentMap || !player) GameController.start(currentLevel);
    currentMap.draw();

    crosshair.draw();
    player.draw();
    player.update();
    handleBullet();
    noCursor();

    if (currentMap.currentAnimation === "finished") {
      GameController.startTimer();
      currentMap.currentAnimation = null;
    }

    if (currentMap.currentAnimation === null) {
      drawLives();
      handleTimer();
      guideWindow.draw();
    }
  } else {
    cursor();
  }

  UIManager.drawCurrentUI();
}

/** Centers the game canvas on screen. */
function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

let buttonXRatio = 0.85;
let buttonYRatio = 0.05;

/** Updates music button position based on canvas size. */
function updateButtonPosition() {
  if (canvas && playButton) {
    const x = canvas.x + canvasWidth * buttonXRatio;
    const y = canvas.y + canvasHeight * buttonYRatio;
    playButton.position(x, y);

    const buttonWidth = canvasWidth * 0.08;
    const buttonHeight = canvasHeight * 0.03;
    playButton.size(buttonWidth, buttonHeight);

    playButton.style("font-size", canvasWidth * 0.01 + "px");

    playButton.style("border-radius", canvasWidth * 0.008 + "px");
    playButton.style("border", "none");
    playButton.style("white-space", "nowrap");
  }
}

function windowResized() {
  centerCanvas();
  updateButtonPosition();
  UIManager.loadingInstance = 0;
}

/** Returns background image for current level. */
function getBackground() {
  switch (currentLevel) {
    case "sample":
      return images["background_sample"];
    case "level1":
      return images["background_level1"];
    case "level2":
      return images["background_level2"];
    case "level3":
      return images["background_level3"];
  }
}

function drawLives() {
  const iconSize = canvasWidth * 0.03;
  const spacing = iconSize * 1.2;
  const marginX = canvasWidth * 0.01;
  const marginY = canvasHeight * 0.01;

  for (var i = 0; i < player.lives; i++) {
    image(
      images["image_tiles"],
      marginX + i * spacing,
      marginY,
      iconSize,
      iconSize,
      10 * 64,
      2 * 64,
      64,
      64
    );
  }
}

/** Manages and displays game timer. */
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

    const baseX = canvasWidth * 0.012;
    let baseY = canvasHeight * 0.07;
    const lineHeight = canvasHeight * 0.035;

    textFont("Lucida Console");
    textStyle(BOLD);
    textSize(canvasWidth * 0.015);
    textAlign(LEFT, TOP);
    text("Time: " + nf(elapsedTime / 1000, 0, 2) + "s", baseX, baseY);

    baseY += lineHeight;
    const keyText = player.keys ? "Key: 1/1" : "Key: 0/1";
    textFont("Lucida Console");
    textStyle(BOLD);
    text(keyText, baseX, baseY);

    baseY += lineHeight;
    const pistolText = "Current Pistol:";
    textFont("Lucida Console");
    textStyle(BOLD);
    text(pistolText, baseX, baseY);

    const iconSize = canvasWidth * 0.03;

    const marginX = canvasWidth * 0.152;

    if (!pistol) {
      image(
        images["image_tiles"],
        marginX,
        baseY - canvasHeight * 0.01,
        iconSize,
        iconSize,
        6 * 64,
        6 * 64,
        64,
        64
      );
    } else {
      image(
        images["image_tiles"],
        marginX,
        baseY - canvasHeight * 0.01,
        iconSize,
        iconSize,
        4 * 64,
        6 * 64,
        64,
        64
      );
    }
  }
}

/** Updates and draws bullet objects. */
function handleBullet() {
  if (player?.bulletRed != 0) {
    player.bulletRed.draw(currentMap.xOffset, currentMap.yOffset);
    const result = player.bulletRed.update();
    if (result === "undefined") {
      player.bulletRed = 0;
    } else if (result === "inStandard") {
      player.bulletRed.velocity = 0;
    }
  }
  if (player?.bulletBlue != 0) {
    player.bulletBlue.draw(currentMap.xOffset, currentMap.yOffset);
    const result = player.bulletBlue.update();
    if (result === "undefined") {
      player.bulletBlue = 0;
    } else if (result === "inStandard") {
      player.bulletBlue.velocity = 0;
    }
  }
}

function keyPressed() {
  InputController.handleKeyPressed(key);
}

function mousePressed() {
  if (
    gameState === "start" &&
    !sounds["openingBGM"].isPlaying() &&
    openingBGMPlayed === false
  ) {
    sounds["openingBGM"].loop();
    playButton.html("Pause Music");
    openingBGMPlayed = true;
  }
  if (gameState === "playing" && player) {
    InputController.handleMousePressed(mouseButton);
  }
  if (gameState === "guide") {
    const videoKey = "start";
    if (videoKey && videos[videoKey]) {
      LevelController.playPreloadedCutscene(videoKey, () => {
        GameController.start("sample");
      });
    }
  }

  if (
    gameState === "playing" &&
    currentMap.currentAnimation &&
    currentMap.currentAnimation !== "finished"
  ) {
    cancelAnimationFrame(currentMap.currentAnimation.animationId);
    currentMap.currentAnimation = "finished";

    currentMap.xOffset = 0;
    currentMap.yOffset = 0;
    drawRatio = 0.5;
    return;
  }
}

function mouseReleased() {
  const ui = UIManager.getCurrentUI();
  if (ui) {
    ui.handleMouseClick();
  }
}

/** Defines paths for all image assets. */
function defineImagePaths() {
  imagePaths = {
    image_player: "assets/images/sprite/player.png",
    image_player_blue_pistol: "assets/images/sprite/player_blue_pistol.png",
    image_tiles: "assets/images/sprite/tiles.png",
    image_enemies: "assets/images/sprite/enemies.png",

    background_sample: "assets/images/background/background_sample.png",
    background_level1: "assets/images/background/background_level1.png",
    background_level2: "assets/images/background/background_level2.png",
    background_level3: "assets/images/background/background_level3.png",

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

    icon_bloodmoon: "assets/images/startUI/icon_bloodmoon.png",
    icon_bloodmoon_hover: "assets/images/startUI/icon_bloodmoon_hover.png",
    icon_tower: "assets/images/startUI/icon_tower.png",
    icon_tower_hover: "assets/images/startUI/icon_tower_hover.png",
    icon_main_character: "assets/images/startUI/icon_main_character.png",
    icon_main_character_hover:
      "assets/images/startUI/icon_main_character_hover.png",
    text_twilight_seeker: "assets/images/startUI/text_twilight_seeker.png",
    background_start: "assets/images/startUI/background_start.png",

    background_guide: "assets/images/guideUI/background_guide.png",
    bar_key_hint: "assets/images/guideUI/bar_key_hint.png",
    key_a: "assets/images/guideUI/key_a.png",
    key_d: "assets/images/guideUI/key_d.png",
    key_e: "assets/images/guideUI/key_e.png",
    key_p: "assets/images/guideUI/key_p.png",
    key_c: "assets/images/guideUI/key_c.png",
    key_space: "assets/images/guideUI/key_space.png",
    mouse: "assets/images/guideUI/mouse.png",
    text_jump: "assets/images/guideUI/text_jump.png",
    text_move: "assets/images/guideUI/text_move.png",
    text_pause_guideUI: "assets/images/guideUI/text_pause_guideUI.png",
    text_shoot: "assets/images/guideUI/text_shoot.png",
    text_teleport: "assets/images/guideUI/text_teleport.png",
    text_toggle_portal: "assets/images/guideUI/text_toggle_portal.png",
    text_press_any_key_to_start:
      "assets/images/guideUI/text_press_any_key_to_start.png",

    background_level: "assets/images/levelUI/background_level.png",

    background_default: "assets/images/otherUI/background_default.png",
    background_scoreboard: "assets/images/otherUI/background_scoreboard.png",
    text_gameover: "assets/images/otherUI/text_gameover.png",
    text_leaderboard: "assets/images/otherUI/text_leaderboard.png",
    text_name: "assets/images/otherUI/text_name.png",
    text_pause: "assets/images/otherUI/text_pause.png",
    text_please_enter_a_nick_name:
      "assets/images/otherUI/text_please_enter_a_nick_name.png",
    text_youwin: "assets/images/otherUI/text_youwin.png",
    text_privacy: "assets/images/otherUI/text_privacy.png",
    background_vhs: "assets/images/otherUI/vhs_playback_centered_800x450.png",
  };
}

/** Defines paths and volumes for all sound assets. */
function defineSoundPathsAndVolume() {
  soundPaths = {
    openingBGM: "assets/soundtrack/opening.mp3",
    videoBGM: "assets/soundtrack/videoBGM.mp3",

    pistolFireSoundEffect: "assets/soundeffect/pistol_fire_2.mp3",
    teleportSoundEffect: "assets/soundeffect/teleport_1.mp3",
    bulletBounceSoundEffect: "assets/soundeffect/bullet_bounce_1.mp3",
    jumpSoundEffect: "assets/soundeffect/jump_2.mp3",
    weaponSwitch: "assets/soundeffect/weapon_switch_1.mp3",
    buttonHover: "assets/soundeffect/button_hover.mp3",
    buttonPress: "assets/soundeffect/button_press.mp3",

    keyPickupSoundEffect: "assets/soundeffect/key_pickup_1.mp3",
    healthPickupSoundEffect: "assets/soundeffect/health_pickup.mp3",
    doorOpenSoundEffect: "assets/soundeffect/door_open.mp3",

    playerHitSoundEffect: "assets/soundeffect/player_hit_1.mp3",
    playerInjuredOrDeadSoundEffect:
      "assets/soundeffect/player_injuredordead_1.mp3",
  };
  soundVolume = {
    openingBGM: 0.2,

    pistolFireSoundEffect: 0.5,
    teleportSoundEffect: 0.2,
    bulletBounceSoundEffect: 1,
    weaponSwitch: 1,
    buttonHover: 0.1,
    buttonPress: 1,

    keyPickupSoundEffect: 1,
    healthPickupSoundEffect: 1,
    doorOpenSoundEffect: 1,

    playerHitSoundEffect: 1,
    playerInjuredOrDeadSoundEffect: 1,
  };
}

/** Defines paths for all video assets. */
function defineVideoPaths() {
  videoPaths = {
    afterLevel1: "assets/videos/afterLevel1.mp4",
    afterLevel2: "assets/videos/afterLevel2.mp4",
    afterLevel3: "assets/videos/afterLevel3.mp4",
    afterSample: "assets/videos/afterSample.mp4",
    start: "assets/videos/start.mp4",
  };
}

/** Renders an icon with optional floating animation. */
function iconEffect(
  img,
  x,
  y,
  width,
  height,
  sx,
  sy,
  sw,
  sh,
  { float = false, floatSpeed = 0.03, floatAmplitude = 3, floatOffset = 0 } = {}
) {
  let drawY = y;

  if (float) {
    drawY =
      y +
      Math.sin(frameCount * floatSpeed + Math.PI * floatOffset) *
        floatAmplitude;
  }

  image(img, x, drawY, width, height, sx, sy, sw, sh);
}

/** Draws parallax background with player-position offset. */
function drawParallaxBackground(bgImage) {
  if (!player || !bgImage) return;

  const parallaxFactor = 0.02;

  const offsetX = -player.pos.x * parallaxFactor;
  const offsetY = -player.pos.y * parallaxFactor;

  image(
    bgImage,
    offsetX,
    offsetY,
    canvasWidth * (1 + parallaxFactor),
    canvasHeight * (1 + parallaxFactor)
  );
}
