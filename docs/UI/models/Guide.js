class Guide {
  constructor(){
    this.privacyAlpha = 0;         // 当前透明度
    this.privacyTargetAlpha = 0;   // 目标透明度
    this.privacyFloatOffset = 0;   // 浮动动画
  }
  draw(){
    // 在某些位置调用粒子效果
    // Guide.createParticleEffect(player.pos.x + 50 / 2, player.pos.y + 50 / 2, 50, 50, {
    //   sizeRange: [2, 10],  // 控制粒子大小
    //   density: 1,       // 密度为 50 个粒子
    //   speed: 0.02,          // 速度为 3
    //   color: [236, 233, 179],// 红色
    //   // shape: 'square'    // 方形粒子
    //   shape: 'circle',    // 方形粒子
    //   lifetimeRange: [2, 3],
    // });
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

  static createAnimation(mapInstance, {
    initialDrawRatio,
    initialX,
    initialY,
    targetDrawRatio,
    targetX,
    targetY,
    duration = 1000,
    easing = 'easeInOutQuad',
    onComplete = null,
    // 保留过渡状态的缩放比参数
    viaDrawRatio = (initialDrawRatio + targetDrawRatio) / 2 // 默认取中间值
  }) {
    // 计算偏移量（保持中心点）
    const initialXOffset = initialX - 1600 * (0.5 / initialDrawRatio) / 2;
    const initialYOffset = initialY - 900 * (0.5 / initialDrawRatio) / 2;
    const targetXOffset = targetX - 1600 * (0.5 / targetDrawRatio) / 2;
    const targetYOffset = targetY - 900 * (0.5 / targetDrawRatio) / 2;

    // 取消已有动画
    if (mapInstance.currentAnimation || mapInstance.currentAnimation === "finished") {
      cancelAnimationFrame(mapInstance.currentAnimation.animationId);
    }

    const startTime = performance.now();
    const endTime = startTime + duration;

    const animate = (timestamp) => {
      if (timestamp >= endTime) {
        // 动画结束
        mapInstance.xOffset = targetXOffset;
        mapInstance.yOffset = targetYOffset;
        drawRatio = targetDrawRatio;
        if (onComplete) onComplete();
        return;
      }

      // 计算进度（0到1）
      const elapsed = timestamp - startTime;
      const progress = elapsed / duration;

      // 应用缓动函数（仅用于位置）
      let easedProgress;
      switch (easing) {
        case 'linear': easedProgress = progress; break;
        case 'easeInQuad': easedProgress = progress * progress; break;
        case 'easeOutQuad': easedProgress = progress * (2 - progress); break;
        case 'easeInOutQuad':
          easedProgress = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;
          break;
        default: easedProgress = progress;
      }

      // 位置直接插值（初始→目标）
      const currentX = initialX + (targetX - initialX) * easedProgress;
      const currentY = initialY + (targetY - initialY) * easedProgress;

      // 缩放比例三阶段处理
      let currentDrawRatio;
      if (progress < 0.5) {
        // 前半段：初始→过渡缩放比
        const scaleProgress = progress * 2; // 映射到0-1
        currentDrawRatio = initialDrawRatio + (viaDrawRatio - initialDrawRatio) * scaleProgress;
      } else {
        // 后半段：过渡→目标缩放比
        const scaleProgress = (progress - 0.5) * 2; // 映射到0-1
        currentDrawRatio = viaDrawRatio + (targetDrawRatio - viaDrawRatio) * scaleProgress;
      }

      // 更新偏移量（基于当前坐标和缩放比）
      mapInstance.xOffset = currentX - (1600 * (0.5 / currentDrawRatio)) / 2;
      mapInstance.yOffset = currentY - (900 * (0.5 / currentDrawRatio)) / 2;
      drawRatio = currentDrawRatio;

      // 继续动画
      mapInstance.currentAnimation = {
        animationId: requestAnimationFrame(animate)
      };
    };

    // 启动动画
    mapInstance.currentAnimation = {
      animationId: requestAnimationFrame(animate)
    };
  }

  static async playGuideAnimation() {
    defineAnimations();
    // 按顺序执行动画
    for (const anim of animations[currentLevel]) {
      await new Promise((resolve) => {
        Guide.createAnimation(currentMap, {
          ...anim,
          onComplete: resolve, // 动画完成后 resolve Promise
        });
      });
    }
    console.log("所有动画播放完成！");
    currentMap.currentAnimation = "finished";
  }

// 静态方法：创建粒子效果
  static createParticleEffect(x, y, width, height, options = {}) {
    console.log("Guide =");

    // 解构参数
    const {
      density = 50,       // 粒子数量
      speed = 2,          // 粒子速度
      color = [255, 255, 255], // 粒子颜色
      shape = 'circle',   // 粒子形状（circle/square）
      sizeRange = [5, 10], // 粒子大小范围 [最小值, 最大值]
      lifetimeRange = [100, 255] // 新增：粒子生命周期范围 [最小值, 最大值]
    } = options;

    // 存储所有粒子
    let particles = [];
    // 生成粒子
    for (let i = 0; i < density; i++) {
      let particle = {
        x: canvasWidth * ( (x + random(-width / 2, width / 2)) / 1600),
        y: canvasHeight * ((y + random(-height / 2, height / 2)) / 900),
        vx: random(-speed, speed),      // X轴速度
        vy: random(-speed, speed),      // Y轴速度
        lifetime: random(...lifetimeRange),     // 使用参数控制生命周期
        size: random(canvasWidth * (sizeRange[0] / 1600), canvasHeight * (sizeRange[1] / 900)), // 使用参数控制大小
        color: color,
        shape: shape
      };
      particles.push(particle);
    }

    // 渲染粒子
    push();
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];

      // 绘制粒子
      fill(p.color);
      noStroke();
      if (p.shape === 'circle') {
        ellipse(p.x, p.y, p.size, p.size);  // 圆形
      } else if (p.shape === 'square') {
        rect(p.x, p.y, p.size, p.size);     // 方形
      }

      // 更新位置
      p.x += canvasWidth * (p.vx / 1600);
      p.y += canvasHeight * (p.vy / 900);

      // 生命周期衰减
      p.lifetime -= 2;
      if (p.lifetime <= 0) {
        // 重置粒子
        p.x = x + random(-width / 2, width / 2);
        p.y = y + random(-height / 2, height / 2);
        p.lifetime = random(...lifetimeRange); // 使用参数控制重置后的生命周期
      }
    }
    pop();
  }
}


function defineAnimations(){
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
        easing: 'linear',
      },
      {
        initialDrawRatio: 0.5,
        initialX: 800,
        initialY: 450,
        targetDrawRatio: 2.0,
        targetX: 725,
        targetY: 175,
        duration: 1500,
        easing: 'easeInOutQuad',
      },
      {
        initialDrawRatio: 2.0,
        initialX: 725,
        initialY: 175,
        targetDrawRatio: 2.0,
        targetX: 175,
        targetY: 750,
        duration: 2000,
        easing: 'easeInOutQuad',
        viaDrawRatio: 0.9, // 过渡缩放比
      },
      {
        initialDrawRatio: 2.0,
        initialX: 175,
        initialY: 750,
        targetDrawRatio: 0.5,
        targetX: 800,
        targetY: 450,
        duration: 1500,
        easing: 'easeInOutQuad',
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
        easing: 'linear',
      },
      {
        initialDrawRatio: 0.5,
        initialX: 800,
        initialY: 450,
        targetDrawRatio: 2.0,
        targetX: 975,
        targetY: 375,
        duration: 1500,
        easing: 'easeInOutQuad',
      },
      {
        initialDrawRatio: 2.0,
        initialX: 975,
        initialY: 375,
        targetDrawRatio: 2.0,
        targetX: 1275,
        targetY: 775,
        duration: 2000,
        easing: 'easeInOutQuad',
        viaDrawRatio: 0.9, // 过渡缩放比
      },
      {
        initialDrawRatio: 2.0,
        initialX: 1275,
        initialY: 775,
        targetDrawRatio: 0.5,
        targetX: 800,
        targetY: 450,
        duration: 1500,
        easing: 'easeInOutQuad',
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
        easing: 'linear',
      },
      {
        initialDrawRatio: 0.5,
        initialX: 800,
        initialY: 450,
        targetDrawRatio: 2.0,
        targetX: 475,
        targetY: 425,
        duration: 1500,
        easing: 'easeInOutQuad',
      },
      {
        initialDrawRatio: 2.0,
        initialX: 475,
        initialY: 425,
        targetDrawRatio: 2.0,
        targetX: 750,
        targetY: 750,
        duration: 2000,
        easing: 'easeInOutQuad',
        viaDrawRatio: 0.9, // 过渡缩放比
      },
      {
        initialDrawRatio: 2.0,
        initialX: 750,
        initialY: 750,
        targetDrawRatio: 0.5,
        targetX: 800,
        targetY: 450,
        duration: 1500,
        easing: 'easeInOutQuad',
      },
    ],
  }
}
