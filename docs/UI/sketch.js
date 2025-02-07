let gameState = "win";

function setup() {
  createCanvas(800, 450);
  background(180, 217, 239);

}

function draw() {

  if(gameState === "win"){
    winUI();
  }else if(gameState === "start"){
    startUI();
  }
}