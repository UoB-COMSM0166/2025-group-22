var level1 = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 1, 1, 0, 8, 0, 2, 2, 2, 2, 0, 8, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2],
  [10, 0, 0,1, 0, 0, 2, 8, 2, 2, 2, 2, 8, 2, 9, 8, 8, 8, 0, 2, 0, 0, 0, 0, 0, 9, 0, 0, 7, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 8, 8, 8, 1, 1, 1, 1, 1, 2],




];

function preload() {

  player_image = loadImage("images/player.png");
  player_injured_image = loadImage("images/player.png");
  tiles_image = loadImage("images/tiles.png");



}

function setup() {
  createCanvas(800, 600);
  player_injured_image.filter(THRESHOLD);
  player = new Player();
  crosshair = new Crosshair([8, 0]);
  map1 = new Map(level1);
  noCursor();
}

function draw() {
  background(0, 246, 255);
  /*
  push();
  let s = 3;
  scale(s);
  let camX =  width/2/s - player.pos.x-25;
  let camY =  height/2/s - player.pos.y-25;
  //let camX = -50;
  //let camY = -450;
  
  translate(camX, camY); // 鎖定攝影機，使其跟隨玩家
  pop();
  */
  map1.draw();
  crosshair.draw();
  player.draw();
  player.update();
}

function keyPressed() {
  player.processInput(key);
}

function mousePressed() {
  if(mouseButton === LEFT) {
    player.processInput('left click');
  }
}