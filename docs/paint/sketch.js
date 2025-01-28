//initialize the brush

let brushColor = (0, 0, 0);

let brushType = 'line';

function setup() {

  createCanvas(800, 600);

  background(255);
  stroke('black');

  line(0, 60, 800, 60);

 

  let firstColor = color(299, 29, 142);

  fill(firstColor);

  noStroke();

  rect(20, 20, 20, 20);

 

  let secondColor = color(175, 104, 222);

  fill(secondColor);

  noStroke();

  rect(50, 20, 20, 20);

 

  let thirdColor = color(104, 210, 222);

  fill(thirdColor);

  noStroke();

  rect(80, 20, 20, 20);

 

  let forthColor = color(124, 230, 135);

  fill(forthColor);

  noStroke();

  rect(110, 20, 20, 20);

 

  let fifthColor = color(239, 237, 175);

  fill(fifthColor);

  noStroke();

  rect(140, 20, 20, 20);

  let lineColor = color(180, 0, 0, 200);

  fill(lineColor);

  noStroke();

  rect(170, 20, 40, 20, 5);

  fill(255);

  textSize(12);

  text("Line", 180, 35);


  let sprayColor = color(180, 0, 0, 200);

  fill(sprayColor);

  noStroke();

  rect(225, 20, 40, 20, 40);

  fill(255);

  textSize(12);

  text("Spray", 230, 35);

 

  let resetColor = color(225, 0, 0);

  fill(resetColor);

  noStroke();

  rect(730, 20, 50, 20);

  fill(255);

  textSize(12);

  text("Reset", 740, 35);

}

 

function draw() {

 

  // Choosing color

  if(mouseIsPressed && mouseY > 20 && mouseY < 40){

    if(mouseX > 20 && mouseX < 40){

      brushColor = color(299, 29, 142);

    }

    else if(mouseX > 50 && mouseX < 70){

      brushColor = color(175, 104, 222);

    }

    else if(mouseX > 80 && mouseX < 100){

      brushColor = color(104, 210, 222);

    }

    else if(mouseX > 110 && mouseX < 130){

      brushColor = color(124, 230, 135);

    }

    else if(mouseX > 140 && mouseX < 160){

      brushColor = color(239, 237, 175);

    }

    //line button

    else if(mouseX > 170 && mouseX < 210){

      brushType = 'line';

    }

    //spray button

    else if(mouseX > 225 && mouseX < 265){

      brushType = 'spray';

    }

   

    //reset button

    else if(mouseX > 730 && mouseX < 780){

      setup();

    }

  }

 

  //drawing rule

  if(mouseIsPressed && mouseY > 60){

    if(mouseButton == LEFT){

      stroke(brushColor);

      strokeWeight(8);

      if(brushType == 'line'){

        line(pmouseX, pmouseY, mouseX, mouseY);
      }

      else if(brushType == 'spray'){

        let alpha = 255;

        noStroke();

        fill(brushColor);

        for(i=1;i<=5;i++){

          ellipse(
            mouseX + cos(random(-1,1)) *  random(-10, 10),
            mouseY + sin(random(-1,1)) *  random(-10, 10),
            1 + random(10),
            1 + random(10)
          );

          alpha =  alpha -20
          
          fill(brushColor, alpha);

        }

      }

    }

   

    //right-click to be eraser

    else if(mouseButton == RIGHT){

      stroke(255);

      strokeWeight(8);

      line(pmouseX, pmouseY, mouseX, mouseY);

    }

  }

}