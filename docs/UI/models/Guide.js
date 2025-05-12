class Guide {
  constructor() {
    this.privacyAlpha = 0;
    this.privacyTargetAlpha = 0;
    this.privacyFloatOffset = 0;
  }
  draw() {
    if (currentLevel === "sample") {
      // Display instructions based on player's position on the screen
      if (
        player.pos.x >= 100 &&
        player.pos.x <= 300 &&
        player.pos.y >= 550 &&
        player.pos.y <= 750
      ) {
        UIManager.textStyle(color(235, 232, 177), 10);
        text(
          'Press "A" and "D" to move left and right.',
          canvasWidth * (160 / 1600),
          canvasHeight * (620 / 900)
        );
      } else if (
        player.pos.x >= 300 &&
        player.pos.x <= 500 &&
        player.pos.y >= 550 &&
        player.pos.y <= 750
      ) {
        UIManager.textStyle(color(235, 232, 177), 10);
        text(
          'Press  "M" to show or hide the guide.',
          canvasWidth * (360 / 1600),
          canvasHeight * (620 / 900)
        );
      } else if (
        player.pos.x >= 500 &&
        player.pos.x <= 700 &&
        player.pos.y >= 550 &&
        player.pos.y <= 750
      ) {
        UIManager.textStyle(color(235, 232, 177), 10);
        text(
          'Press  "SPACE" to jump over obstacles.',
          canvasWidth * (560 / 1600),
          canvasHeight * (620 / 900)
        );
      } else if (
        player.pos.x >= 800 &&
        player.pos.x <= 950 &&
        player.pos.y >= 550 &&
        player.pos.y <= 750
      ) {
        push();
        textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text(
          '    -->    <--\n1. Try left-clicking the diamond block to open the first portal.\n2. Press "C" to switch the current pistol. (Check the current status in the top-left screen.)',
          canvasWidth * (850 / 1600),
          canvasHeight * (850 / 900)
        );
        pop();
      } else if (
        player.pos.x >= 950 &&
        player.pos.x <= 1110 &&
        player.pos.y >= 550 &&
        player.pos.y <= 750
      ) {
        push();
        textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text(
          '3. Use the new pistol to shoot the diamond block and open the second portal.\n4. Return to the first portal block and press "E" to teleport.\n    -->    <--',
          canvasWidth * (1100 / 1600),
          canvasHeight * (550 / 900)
        );
        pop();
      } else if (
        player.pos.x >= 1350 &&
        player.pos.x <= 1500 &&
        player.pos.y >= 550 &&
        player.pos.y <= 750
      ) {
        push();
        textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text(
          "             -->    <--\nTry shooting the block at the highest point of your jump and attempt to teleport.          \n(You will notice that the previously same-colored portal block has disappeared.)          ",
          canvasWidth * (1100 / 1600),
          canvasHeight * (350 / 900)
        );
        pop();
      } else if (
        player.pos.x >= 1000 &&
        player.pos.x <= 1200 &&
        player.pos.y >= 300 &&
        player.pos.y <= 500
      ) {
        push();
        textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text(
          "Watch out for the moving enemies.\nThey will hurt you \n(You can't attack them because they're too cute.)!",
          canvasWidth * (900 / 1600),
          canvasHeight * (400 / 900)
        );
        pop();
      } else if (
        player.pos.x >= 550 &&
        player.pos.x <= 700 &&
        player.pos.y >= 300 &&
        player.pos.y <= 500
      ) {
        push();
        textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text(
          "You can drink a potion to restore health.",
          canvasWidth * (600 / 1600),
          canvasHeight * (400 / 900)
        );
        pop();
      } else if (
        player.pos.x >= 350 &&
        player.pos.x <= 450 &&
        player.pos.y >= 300 &&
        player.pos.y <= 500
      ) {
        push();
        textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text(
          "Watch out for the spike.\nIt will take away two hearts!",
          canvasWidth * (300 / 1600),
          canvasHeight * (400 / 900)
        );
        pop();
      } else if (
        player.pos.x >= 50 &&
        player.pos.x <= 250 &&
        player.pos.y >= 300 &&
        player.pos.y <= 500
      ) {
        push();

        UIManager.textStyle(color(235, 232, 177), 10);
        text(
          "-->     \n              This is a mirror block that reflects bullets from the right side. \n               Let's try using it to open another portal!",
          canvasWidth * (8 / 1600),
          canvasHeight * (320 / 900)
        );

        Guide.drawDashedLineWithArrow(225, 525, 100, 325);
        Guide.drawDashedLineWithArrow(100, 325, 240, 100);

        pop();
      } else if (
        player.pos.x >= 150 &&
        player.pos.x <= 450 &&
        player.pos.y >= 50 &&
        player.pos.y <= 250
      ) {
        push();
        textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text(
          "↑ ↑\nThe spikes on the mirror block won't affect the bullet's trajectory.",
          canvasWidth * (575 / 1600),
          canvasHeight * (375 / 900)
        );

        Guide.drawDashedLineWithArrow(375, 125, 575, 300);
        Guide.drawDashedLineWithArrow(575, 300, 825, 100, [42, 0, 0, 200]);

        pop();
      } else if (
        player.pos.x >= 700 &&
        player.pos.x <= 1500 &&
        player.pos.y >= 50 &&
        player.pos.y <= 250
      ) {
        push();
        textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text(
          "Don't forget to grab the key to open the door.",
          canvasWidth * (1275 / 1600),
          canvasHeight * (275 / 900)
        );

        pop();
      }
    }

     // Handling privacy window transparency effects
    this.privacyTargetAlpha = guideWindowShowing ? 200 : 0;
    this.privacyAlpha = lerp(this.privacyAlpha, this.privacyTargetAlpha, 0.1);
    this.privacyFloatOffset = sin(frameCount * 0.05) * 6;
    if (this.privacyAlpha > 1) {
      push();
      imageMode(CENTER);
      tint(255, this.privacyAlpha);
      const img = images["background_guide"];
      const popupW = canvasWidth * 0.4;
      const popupH = popupW * (450 / 800);
      const popupX = canvasWidth * 0.5;
      const popupY = canvasHeight * 0.5 + this.privacyFloatOffset;

      image(img, popupX, popupY, popupW, popupH);

      pop();
    }
  }

  /** Draws a dashed line with an arrow between two points. */
  static drawDashedLineWithArrow(
    x1,
    y1,
    x2,
    y2,
    color = [235, 232, 177, 100],
    dashLength = 10,
    spaceLength = 10,
    lineThickness = 2,
    arrowSize = 5
  ) {
    const scaleX1 = canvasWidth * (x1 / 1600);
    const scaleY1 = canvasHeight * (y1 / 900);
    const scaleX2 = canvasWidth * (x2 / 1600);
    const scaleY2 = canvasHeight * (y2 / 900);

    const dashPixelLength = canvasWidth * (dashLength / 1600);
    const spacePixelLength = canvasWidth * (spaceLength / 1600);
    drawingContext.setLineDash([dashPixelLength, spacePixelLength]);
    push();
    textAlign(LEFT, TOP);

    strokeWeight(canvasWidth * (lineThickness / 1600));
    stroke(color);

    line(scaleX1, scaleY1, scaleX2, scaleY2);

    const angle = atan2(scaleY2 - scaleY1, scaleX2 - scaleX1);
    const arrowX1 = scaleX2 - arrowSize * cos(angle - PI / 6);
    const arrowY1 = scaleY2 - arrowSize * sin(angle - PI / 6);
    const arrowX2 = scaleX2 - arrowSize * cos(angle + PI / 6);
    const arrowY2 = scaleY2 - arrowSize * sin(angle + PI / 6);

    triangle(scaleX2, scaleY2, arrowX1, arrowY1, arrowX2, arrowY2);

    drawingContext.setLineDash([]);
    pop();
  }

  /** Creates a smooth camera animation with zoom and pan effects. */
  static createAnimation(
    mapInstance,
    {
      initialDrawRatio,
      initialX,
      initialY,
      targetDrawRatio,
      targetX,
      targetY,
      duration = 1000,
      easing = "easeInOutQuad",
      onComplete = null,

      viaDrawRatio = (initialDrawRatio + targetDrawRatio) / 2,
    }
  ) {
    const initialXOffset = initialX - (1600 * (0.5 / initialDrawRatio)) / 2;
    const initialYOffset = initialY - (900 * (0.5 / initialDrawRatio)) / 2;
    const targetXOffset = targetX - (1600 * (0.5 / targetDrawRatio)) / 2;
    const targetYOffset = targetY - (900 * (0.5 / targetDrawRatio)) / 2;

    if (
      mapInstance.currentAnimation ||
      mapInstance.currentAnimation === "finished"
    ) {
      cancelAnimationFrame(mapInstance.currentAnimation.animationId);
    }

    const startTime = performance.now();
    const endTime = startTime + duration;

    const animate = (timestamp) => {
      if (timestamp >= endTime) {
        mapInstance.xOffset = targetXOffset;
        mapInstance.yOffset = targetYOffset;
        drawRatio = targetDrawRatio;
        if (onComplete) onComplete();
        return;
      }

      const elapsed = timestamp - startTime;
      const progress = elapsed / duration;

      let easedProgress;
      switch (easing) {
        case "linear":
          easedProgress = progress;
          break;
        case "easeInQuad":
          easedProgress = progress * progress;
          break;
        case "easeOutQuad":
          easedProgress = progress * (2 - progress);
          break;
        case "easeInOutQuad":
          easedProgress =
            progress < 0.5
              ? 2 * progress * progress
              : -1 + (4 - 2 * progress) * progress;
          break;
        default:
          easedProgress = progress;
      }

      const currentX = initialX + (targetX - initialX) * easedProgress;
      const currentY = initialY + (targetY - initialY) * easedProgress;

      let currentDrawRatio;
      if (progress < 0.5) {
        const scaleProgress = progress * 2;
        currentDrawRatio =
          initialDrawRatio + (viaDrawRatio - initialDrawRatio) * scaleProgress;
      } else {
        const scaleProgress = (progress - 0.5) * 2;
        currentDrawRatio =
          viaDrawRatio + (targetDrawRatio - viaDrawRatio) * scaleProgress;
      }

      mapInstance.xOffset = currentX - (1600 * (0.5 / currentDrawRatio)) / 2;
      mapInstance.yOffset = currentY - (900 * (0.5 / currentDrawRatio)) / 2;
      drawRatio = currentDrawRatio;

      mapInstance.currentAnimation = {
        animationId: requestAnimationFrame(animate),
      };
    };

    mapInstance.currentAnimation = {
      animationId: requestAnimationFrame(animate),
    };
  }

  /** Plays the guided level introduction animation sequence. */ 
  static async playGuideAnimation() {
    defineAnimations();

    for (const anim of animations[currentLevel]) {
      await new Promise((resolve) => {
        Guide.createAnimation(currentMap, {
          ...anim,
          onComplete: resolve,
        });
      });
    }
    currentMap.currentAnimation = "finished";
  }
}

/** Defines animation paths for each level's intro sequence. */
function defineAnimations() {
  animations = {
    level1: [
      {
        initialDrawRatio: 0.5,
        initialX: 800,
        initialY: 450,
        targetDrawRatio: 0.5,
        targetX: 800,
        targetY: 450,
        duration: 200,
        easing: "linear",
      },
      {
        initialDrawRatio: 0.5,
        initialX: 800,
        initialY: 450,
        targetDrawRatio: 2.0,
        targetX: 725,
        targetY: 175,
        duration: 1500,
        easing: "easeInOutQuad",
      },
      {
        initialDrawRatio: 2.0,
        initialX: 725,
        initialY: 175,
        targetDrawRatio: 2.0,
        targetX: 175,
        targetY: 750,
        duration: 2000,
        easing: "easeInOutQuad",
        viaDrawRatio: 0.9,
      },
      {
        initialDrawRatio: 2.0,
        initialX: 175,
        initialY: 750,
        targetDrawRatio: 0.5,
        targetX: 800,
        targetY: 450,
        duration: 1500,
        easing: "easeInOutQuad",
      },
    ],
    level2: [
      {
        initialDrawRatio: 0.5,
        initialX: 800,
        initialY: 450,
        targetDrawRatio: 0.5,
        targetX: 800,
        targetY: 450,
        duration: 200,
        easing: "linear",
      },
      {
        initialDrawRatio: 0.5,
        initialX: 800,
        initialY: 450,
        targetDrawRatio: 2.0,
        targetX: 975,
        targetY: 375,
        duration: 1500,
        easing: "easeInOutQuad",
      },
      {
        initialDrawRatio: 2.0,
        initialX: 975,
        initialY: 375,
        targetDrawRatio: 2.0,
        targetX: 1275,
        targetY: 775,
        duration: 2000,
        easing: "easeInOutQuad",
        viaDrawRatio: 0.9,
      },
      {
        initialDrawRatio: 2.0,
        initialX: 1275,
        initialY: 775,
        targetDrawRatio: 0.5,
        targetX: 800,
        targetY: 450,
        duration: 1500,
        easing: "easeInOutQuad",
      },
    ],
    level3: [
      {
        initialDrawRatio: 0.5,
        initialX: 800,
        initialY: 450,
        targetDrawRatio: 0.5,
        targetX: 800,
        targetY: 450,
        duration: 200,
        easing: "linear",
      },
      {
        initialDrawRatio: 0.5,
        initialX: 800,
        initialY: 450,
        targetDrawRatio: 2.0,
        targetX: 475,
        targetY: 425,
        duration: 1500,
        easing: "easeInOutQuad",
      },
      {
        initialDrawRatio: 2.0,
        initialX: 475,
        initialY: 425,
        targetDrawRatio: 2.0,
        targetX: 750,
        targetY: 750,
        duration: 2000,
        easing: "easeInOutQuad",
        viaDrawRatio: 0.9,
      },
      {
        initialDrawRatio: 2.0,
        initialX: 750,
        initialY: 750,
        targetDrawRatio: 0.5,
        targetX: 800,
        targetY: 450,
        duration: 1500,
        easing: "easeInOutQuad",
      },
    ],
  };
}
