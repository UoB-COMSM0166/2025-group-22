class Guide {
  constructor(){
    this.privacyAlpha = 0;         // 当前透明度
    this.privacyTargetAlpha = 0;   // 目标透明度
    this.privacyFloatOffset = 0;   // 浮动动画
  }
  draw(){
    if (currentLevel === "sample"){

      if (player.pos.x >= 100 && player.pos.x <= 300 &&
        player.pos.y >= 550 && player.pos.y <= 750) {
          UIManager.textStyle(color(235, 232, 177), 10);
          text("Press \"A\" and \"D\" to move left and right.", canvasWidth * (160 / 1600), canvasHeight * (620 / 900));
      }else if (player.pos.x >= 300 && player.pos.x <= 500 &&
        player.pos.y >= 550 && player.pos.y <= 750) {
        UIManager.textStyle(color(235, 232, 177), 10);
        text("Press  \"M\" to show or hide the guide.", canvasWidth * (360 / 1600), canvasHeight * (620 / 900));
      }else if (player.pos.x >= 500 && player.pos.x <= 700 &&
        player.pos.y >= 550 && player.pos.y <= 750) {
        UIManager.textStyle(color(235, 232, 177), 10);
        text("Press  \"SPACE\" to jump over obstacles.", canvasWidth * (560 / 1600), canvasHeight * (620 / 900));
      }else if (player.pos.x >= 800 && player.pos.x <= 950 &&
        player.pos.y >= 550 && player.pos.y <= 750) {
        push();
        textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text("    -->    <--\n1. Try left-clicking the diamond block to open the first portal.\n2. Press \"C\" to switch the current pistol. (Check the current status in the top-left screen.)", canvasWidth * (850 / 1600), canvasHeight * (850 / 900));
        pop();
      }else if (player.pos.x >= 950 && player.pos.x <= 1110 &&
        player.pos.y >= 550 && player.pos.y <= 750) {
        push();
        textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text("3. Use the new pistol to shoot the diamond block and open the second portal.\n4. Return to the first portal block and press \"E\" to teleport.\n    -->    <--", canvasWidth * (1100 / 1600), canvasHeight * (550 / 900));
        pop();
      }else if (player.pos.x >= 1350 && player.pos.x <= 1500 &&
        player.pos.y >= 550 && player.pos.y <= 750) {
        push();
        textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text("             -->    <--\nTry shooting the block at the highest point of your jump and attempt to teleport.          \n(You will notice that the previously same-colored portal block has disappeared.)          ", canvasWidth * (1150 / 1600), canvasHeight * (350 / 900));
        pop();
      }else if (player.pos.x >= 1000 && player.pos.x <= 1200 &&
        player.pos.y >= 300 && player.pos.y <= 500) {
        push();
        textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text("Watch out for the moving enemies.\nThey will hurt you \n(You can't attack them because they're too cute.)!", canvasWidth * (900 / 1600), canvasHeight * (400 / 900));
        pop();
      }else if (player.pos.x >= 550 && player.pos.x <= 700 &&
        player.pos.y >= 300 && player.pos.y <= 500) {
        push();
        textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text("You can drink a potion to restore health.", canvasWidth * (600 / 1600), canvasHeight * (400 / 900));
        pop();
      }else if (player.pos.x >= 350 && player.pos.x <= 450 &&
        player.pos.y >= 300 && player.pos.y <= 500) {
        push();
        textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text("Watch out for the spike.\nIt will take away two hearts!", canvasWidth * (300 / 1600), canvasHeight * (400 / 900));
        pop();
      }else if (player.pos.x >= 50 && player.pos.x <= 250 &&
        player.pos.y >= 300 && player.pos.y <= 500) {
        push();
        // textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text("-->     \n              This is a mirror block that reflects bullets from the right side. \n               Let's try using it to open another portal!", canvasWidth * (8 / 1600), canvasHeight * (320 / 900));

        Guide.drawDashedLineWithArrow(225, 525, 100, 325);
        Guide.drawDashedLineWithArrow(100, 325, 240, 100);

        pop();
      }else if (player.pos.x >= 150 && player.pos.x <= 450 &&
        player.pos.y >= 50 && player.pos.y <= 250) {
        push();
        textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text("↑ ↑\nThe spikes on the mirror block won't affect the bullet's trajectory.", canvasWidth * (575 / 1600), canvasHeight * (375 / 900));

        Guide.drawDashedLineWithArrow(375, 125, 575, 300);
        Guide.drawDashedLineWithArrow(575, 300, 825, 100, [42, 0, 0, 200]);

        pop();
      }else if (player.pos.x >= 700 && player.pos.x <= 1500 &&
        player.pos.y >= 50 && player.pos.y <= 250) {
        push();
        textAlign(CENTER, CENTER);
        UIManager.textStyle(color(235, 232, 177), 10);
        text("Don't forget to grab the key to open the door.", canvasWidth * (1275 / 1600), canvasHeight * (275 / 900));

        pop();
      }
    }

    this.privacyTargetAlpha = guideWindowShowing ? 200 : 0;

    // ✅ 透明度逐帧平滑变化（lerp）
    this.privacyAlpha = lerp(this.privacyAlpha, this.privacyTargetAlpha, 0.1);

    // ✅ 浮动效果（上下轻轻漂）
    this.privacyFloatOffset = sin(frameCount * 0.05) * 6;

    if (this.privacyAlpha > 1) { // 超过 1 再渲染
      push();
      imageMode(CENTER);
      tint(255, this.privacyAlpha); // 设置透明度
      const img = images["background_guide"];
      const popupW = canvasWidth * 0.4;
      const popupH = popupW * (450 / 800); // 保持原图比例
      const popupX = canvasWidth * 0.5;
      const popupY = canvasHeight * 0.5 + this.privacyFloatOffset;

      image(img, popupX, popupY, popupW, popupH);
      // image(img, 0, 0, canvasWidth, canvasHeight);
      pop();
    }


  }
  // 静态方法：绘制带箭头的虚线
  static drawDashedLineWithArrow(x1, y1, x2, y2, color = [235, 232, 177, 100], dashLength = 10, spaceLength = 10, lineThickness = 2, arrowSize = 5) {
    // 计算画布缩放后的坐标
    const scaleX1 = canvasWidth * (x1 / 1600);
    const scaleY1 = canvasHeight * (y1 / 900);
    const scaleX2 = canvasWidth * (x2 / 1600);
    const scaleY2 = canvasHeight * (y2 / 900);

    // 设置虚线样式，按画布宽度调整虚线长度
    const dashPixelLength = canvasWidth * (dashLength / 1600);  // 实线的长度，基于画布宽度
    const spacePixelLength = canvasWidth * (spaceLength / 1600); // 空白的长度，基于画布宽度
    drawingContext.setLineDash([dashPixelLength, spacePixelLength]); // 虚线：10像素实线 + 10像素空白
    push();
    textAlign(LEFT, TOP);
    // 设置线条粗细，基于画布宽度的比例
    strokeWeight(canvasWidth * (lineThickness / 1600));  // 线条的宽度，基于画布宽度
    stroke(color); // 设置虚线颜色

    // 绘制虚线
    line(scaleX1, scaleY1, scaleX2, scaleY2);

    // 绘制箭头
    const angle = atan2(scaleY2 - scaleY1, scaleX2 - scaleX1);
    const arrowX1 = scaleX2 - arrowSize * cos(angle - PI / 6);
    const arrowY1 = scaleY2 - arrowSize * sin(angle - PI / 6);
    const arrowX2 = scaleX2 - arrowSize * cos(angle + PI / 6);
    const arrowY2 = scaleY2 - arrowSize * sin(angle + PI / 6);

    // 绘制箭头
    triangle(scaleX2, scaleY2, arrowX1, arrowY1, arrowX2, arrowY2);

    // 清除虚线设置（防止影响后续绘图）
    drawingContext.setLineDash([]);
    pop();
  }
}
