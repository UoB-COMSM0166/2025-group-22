// 📁 models/Player.js
class Player {
  constructor() {
    this.pos = createVector(200, 200);
    this.velocity = createVector(0, 0);
    this.gravity = 9;
    this.size = 50;
    this.spriteSize = 64;
    this.injured = false;
    this.injuryTimer = 0;
    this.animationTimer = 0;
    this.lives =3;
    this.keys = 0;
    this.movingState = 0;
    // this.bullet = 0;
    this.bulletRed = 0;
    this.bulletBlue = 0;

    this.IsMovingLeft = false;
    this.IsMovingRight = false;
    this.movingTimer = 0;
    this.facingDirection = "right";

    this.DeadSoundEffectPlayed = false;
  }

  update() {
    if (this.isAlive()) {
      this.updateInjured();
      this.updateWalking();
      this.updateGravity();
      if (this.checkEnemyCollision()) this.injured = true;
      this.checkItemCollision();
    } else {
      this.updateGravity();
      // 玩家死亡
      if (this.DeadSoundEffectPlayed === false) {
        sounds["playerInjuredOrDeadSoundEffect"].play();
        this.DeadSoundEffectPlayed = true;
      }

      // // 延迟2秒后设置gameState为"gameOver"
      // setTimeout(() => {
      //   gameState = "gameOver";
      // }, 3000); // 延迟2秒(2000ms)

      // gameState = "gameOver";
    }
  }

  checkEnemyCollision() {
    const enemy = CollisionController.getCollidingEnemy(this, 40);
    if (enemy) {
      if (this.injuryTimer === 0) {
        currentEnemy = enemy.type;

        // ✅ 特别处理 spike 的碰撞范围（只检测下半部）
        if (enemy.type === "spike") {
          const playerBottom = this.pos.y + this.size;
          const spikeTop = enemy.pos.y + enemy.size / 2 ; // spike 的下半部
          if (playerBottom < spikeTop) {
            return false; // 🚫 玩家还没真正踩到 spike 的下半部
          }
        }

        // ✅ 播放音效 & 扣血
        sounds["playerHitSoundEffect"].play();
        this.lives -= currentEnemy === "spike" ? 2 : 1;
      }
      return true;
    }
    return false;
  }


  checkItemCollision() {
    const item = CollisionController.isTouching(this, "item", 40);
    if (!item) return;

    const i = currentMap.itemList.findIndex(obj =>
      obj.pos.x === item.pos.x && obj.pos.y === item.pos.y
    );

    if (i >= 0) {
      this.collectItem(i);
    } else if (item.type === "door" && this.keys > 0) {
      this.keys = 0;
      LevelController.nextLevel();
    }
  }

  moveLeft() {
    this.IsMovingLeft = true;
    if (this.getBlockClass(5, 25) !== "Wall" &&
        this.getBlockClass(5, 25) !== "DirectionWall" &&
        this.getBlockClass(5, 25) !== "Portal") {
      // if (this.pos.x < (originalWidth / drawRatio * 0.5)) { // 新屏幕宽度
        this.pos.x -= 5;
      // } else {
      //   currentMap.xOffset -= 5;
      // }
    }
  }

  moveRight() {
    this.IsMovingRight = true;
    if (this.getBlockClass(this.size - 5, 25) !== "Wall" &&
        this.getBlockClass(this.size - 5, 25) !== "DirectionWall" &&
        this.getBlockClass(this.size - 5, 25) !== "Portal") {
      // if (this.pos.x < (originalWidth / drawRatio * 0.5)) {// 新屏幕宽度
        this.pos.x += 5;
      // } else {
      //   currentMap.xOffset += 5;
      // }
    }
  }

  stopLeft() {
    this.IsMovingLeft=false;
  }

  stopRight() {
    this.IsMovingRight=false;
  }

  jump() {
    if (!this.isFalling()) {
      this.velocity.y = -30;
      sounds["jumpSoundEffect"].play();
    }
  }

  shoot(type) {
    const scaleRatio = (canvasWidth / 800) * drawRatio;

    // 将 mouseX/mouseY 从画布像素坐标转换为地图坐标
    const logicalMouseX = mouseX / scaleRatio + currentMap.xOffset;
    const logicalMouseY = mouseY / scaleRatio + currentMap.yOffset;

    // 根据鼠标位置调整朝向
    if (logicalMouseX > this.pos.x + currentMap.xOffset) {
      this.facingDirection = "right";
    } else {
      this.facingDirection = "left";
    }

    sounds["pistolFireSoundEffect"].play();

    if (pistol == 0) {
      this.bulletBlue = new Bullet(
        // this.pos.x + currentMap.xOffset, //0507lqwxOffset
        this.pos.x, //0507lqwxOffset/
        this.pos.y,
        logicalMouseX,
        logicalMouseY,
        [8, 4],
        type
      );
    } else {
      this.bulletRed = new Bullet(
        // this.pos.x + currentMap.xOffset, //0507lqwxOffset
        this.pos.x, //0507lqwxOffset
        this.pos.y,
        logicalMouseX,
        logicalMouseY,
        [10, 4],
        type
      );
    }
  }


  togglePistol() {
    pistol = 1 - pistol;
  }

  teleport() {
    const directions = {
      right: { offsetX: -1, offsetY: 25 },
      left: { offsetX: this.size, offsetY: 25 },
      top: { offsetX: 25, offsetY: this.size + 1 },
      bottom: { offsetX: 25, offsetY: -1 }
    };

    for (const [dir, { offsetX, offsetY }] of Object.entries(directions)) {
      if (this.getBlockClass(offsetX, offsetY) === "Portal" &&
          this.getPortalDir(offsetX, offsetY) === dir) {

        // 传送音效
        sounds["teleportSoundEffect"].play();

        const [currentX, currentY] = this.getLoc(this.pos.x + offsetX, this.pos.y + offsetY);
        this.teleportToLinkedPortal(currentX, currentY, dir);
        break;
      }
    }
  }

  getPortalDir(offsetX = 0, offsetY = 0) {
    const [col, row] = this.getLoc(this.pos.x + offsetX, this.pos.y + offsetY);
    const block = currentMap.blocks?.[row]?.[col];
    return block instanceof Portal ? block.facingDirection : null;
  }

  getPortalDestOffset(currentX, targetX, base = 50) {
    return (targetX - currentX) * base;
  }

  teleportToLinkedPortal(currentX, currentY, fromDir) {
    // console.log("fromDir = ", fromDir);
    for (let row = 0; row < currentMap.blocks.length; row++) {
      for (let col = 0; col < currentMap.blocks[row].length; col++) {
        const block = currentMap.blocks[row][col];
        if (block instanceof Portal && (col !== currentX || row !== currentY)) {
          const destDir = block.facingDirection;
          // console.log("destDir = ", destDir);
          let dx = 0, dy = 0;

          switch (destDir) {
            case "right": dx = 50; break;
            case "left": dx = -50; break;
            case "top": dy = -50; break;
            case "bottom": dy = 50; break;
          }

          // this.pos.x = col * 50 + dx - currentMap.xOffset; //0507lqwxOffset
          this.pos.x = col * 50 + dx; //0507lqwxOffset
          this.pos.y = row * 50 + dy;
          // const offsetX = this.getPortalDestOffset(currentX, col) + this.getPortalDestSidesOffset(fromDir, destDir);
          // currentMap.xOffset += offsetX;
          // this.pos.x -= offsetX;

          return;
        }
      }
    }
  }

  getPortalDestSidesOffset(fromDir, destDir) {
    const offsetMap = {
      top: {
        top: 0,
        bottom: 0,
        left: -50,
        right: 50
      },
      bottom: {
        top: 0,
        bottom: 0,
        left: -50,
        right: 50
      },
      left: {
        top: 50,
        bottom: 50,
        left: 0,
        right: 100
      },
      right: {
        top: -50,
        bottom: -50,
        left: -100,
        right: 0
      }
    };

    return offsetMap[fromDir]?.[destDir] ?? null; // 返回 null 表示非法输入
  }

  isAlive() {
    return this.lives > 0;
  }

  updateInjured() {
    if (this.injured) {
      if (this.injuryTimer < 120) {
        this.injuryTimer++;
      } else {
        this.injured = false;
        this.injuryTimer = 0;
      }
    }
  }

  updateWalking() {
    if (this.IsMovingLeft || this.IsMovingRight) {
      if (this.movingTimer < 17) {
        this.movingTimer++;
      } else {
        // this.injured = false;
        this.movingTimer = 0;
      }
    }
  }

  updateGravity() {


    if (this.isFalling()) {
      if (this.velocity.y + this.gravity> 6) {
        // 匀速下落：设置固定下落速度（比如 10）
        // console.log("this.velocity.y =", this.velocity.y);
        this.velocity.y = 6;
      }
      else {

        this.pos.add(0, this.gravity);
      }

    }
    this.pos.add(this.velocity);

    if (!this.isFalling() && this.onWall() === "bottom") {
      const [col, row] = this.getLoc(this.pos.x, this.pos.y + this.size);
      this.pos.y = row * 50 - this.size;
      this.velocity.y = 0;
    }

    if (this.isFalling() && this.onWall() !== "top") {
      this.velocity.mult(0.9);
    } else if (this.isFalling() && this.onWall() === "top") {
      this.velocity.y = 0;
    } else {
      this.velocity.mult(0);
    }

    // if (this.pos.y < height / 3) {
    //   currentMap.yOffset = this.pos.y - height / 3;
    // } else if (this.pos.y > (2 * height) / 3) {
    //   currentMap.yOffset = this.pos.y - (2 * height) / 3;
    // } else {
    //   currentMap.yOffset = 0;
    // }
    // console.log(this.pos);
    // // console.log(canvasWidth + "and");
    // if (this.pos.y < originalHeight / drawRatio / 4) {
    //   currentMap.yOffset = this.pos.y - originalHeight / drawRatio / 4;
    // } else if (this.pos.y > (3 * originalHeight / drawRatio) / 4) {
    //   currentMap.yOffset = this.pos.y - (3 * originalHeight / drawRatio) / 4;
    // } else {
    //   currentMap.yOffset = 0;
    // }
  }

  isFalling() {
    return this.onWall() !== "bottom";
  }

  onWall() {
    if (["Wall", "DirectionWall", "Portal"].includes(this.getBlockClass(10, this.size))) {
      return "bottom";
    }
    if (["Wall", "DirectionWall", "Portal"].includes(this.getBlockClass(this.size - 10, this.size))) {
      return "bottom";
    }
    if (["Wall", "DirectionWall", "Portal"].includes(this.getBlockClass(10, 0))) {
      return "top";
    }
    if (["Wall", "DirectionWall", "Portal"].includes(this.getBlockClass(this.size - 10, 0))) {
      return "top";
    }
    return false;
  }

  getBlockClass(offX = 0, offY = 0) {
    const [col, row] = this.getLoc(this.pos.x + offX, this.pos.y + offY);
    return currentMap.blocks[row][col]?.constructor?.name || "none";
  }

  getLoc(x = this.pos.x, y = this.pos.y) {
    // return [floor((x + currentMap.xOffset) / 50), floor(y / 50)]; //0507lqwxOffset
    return [floor((x) / 50), floor(y / 50)]; //0507lqwxOffset
  }

  collectItem(i) {
    const item = currentMap.itemList[i];
    const col = item.pos.x / 50;
    const row = item.pos.y / 50;

    if (item.type === "potion") {
      // 捡爱心音效
      sounds["healthPickupSoundEffect"].play();
      this.lives++;
    } else if (item.type === "key") {
      // 捡钥匙音效
      sounds["keyPickupSoundEffect"].play();
      this.keys++;
    } else if (item.type === "door" ||
        item.type === "treasure" ||item.type === "dragon") {
      if (this.keys > 0) {
        this.keys = 0;
        if (item.type === "treasure") {
          // 开宝箱音效
          // doorOpenSoundEffect.play();
        }
        else if(item.type === "dragon"){

        }
        else if (item.type === "door") {
          // 开门音效
          sounds["doorOpenSoundEffect"].play();
        }

        LevelController.nextLevel();
        return;
      } else {
        return;
      }
    }

    currentMap.blocks[row][col] = 0;
    currentMap.itemList.splice(i, 1);
  }

  draw() {
    const scaleRatio = (canvasWidth / 800) * drawRatio;
    // const drawX = this.pos.x * scaleRatio; //0507lqwxOffset
    const drawX = (this.pos.x - currentMap.xOffset) * scaleRatio; //0507lqwxOffset
    const drawY = (this.pos.y - currentMap.yOffset) * scaleRatio;
    const drawSize = this.size * scaleRatio;

    if (this.injured && this.injuryTimer % 6 === 0 && this.isAlive()) return;
    let imagePlayer;
    if (pistol === 0 ){
      imagePlayer = images["image_player_blue_pistol"];
    }else if (pistol === 1 ){
      imagePlayer = images["image_player"];
    }
    if (this.isAlive()) {
      // if (this.isFalling()) {
      //
      //   if (this.facingDirection === "right") {
      //     image(imagePlayer, drawX, drawY, drawSize, drawSize, this.spriteSize * 3, 0, this.spriteSize, this.spriteSize);
      //   }else if (this.facingDirection === "left") {
      //     push();
      //     translate(drawX + drawSize, drawY);
      //     scale(-1, 1);
      //     image(imagePlayer, 0, 0, drawSize, drawSize, this.spriteSize * 3, 0, this.spriteSize, this.spriteSize);
      //     pop();
      //   }
      // }
      if (!this.IsMovingLeft && !this.IsMovingRight) {
        if (this.facingDirection === "right") {
          if (this.isFalling()) {
            image(imagePlayer, drawX, drawY, drawSize, drawSize, this.spriteSize * 3, 0, this.spriteSize, this.spriteSize);
          }else {
            image(imagePlayer, drawX, drawY, drawSize, drawSize, 0, 0, this.spriteSize, this.spriteSize);
          }
        }else if (this.facingDirection === "left") {
          if (this.isFalling()) {
            push();
            translate(drawX + drawSize, drawY);
            scale(-1, 1);
            image(imagePlayer, 0, 0, drawSize, drawSize, this.spriteSize * 3, 0, this.spriteSize, this.spriteSize);
            pop();
          }else {
            push();
            translate(drawX + drawSize, drawY);
            scale(-1, 1);
            image(imagePlayer, 0, 0, drawSize, drawSize, 0, 0, this.spriteSize, this.spriteSize);
            pop();
          }
        }

      } else if (this.IsMovingLeft) {
        if (this.isFalling()) {
          push();
          translate(drawX + drawSize, drawY);
          scale(-1, 1);
          image(imagePlayer, 0, 0, drawSize, drawSize, this.spriteSize * 3, 0, this.spriteSize, this.spriteSize);
          pop();
        }else{
          push();
          translate(drawX + drawSize, drawY);
          scale(-1, 1);
          const frame = Math.floor(this.movingTimer / 6);
          const sx = this.spriteSize * (frame % 3);
          image(imagePlayer, 0, 0, drawSize, drawSize, sx, 0, this.spriteSize, this.spriteSize);
          pop();
        }
        this.facingDirection = "left";
      } else if (this.IsMovingRight) {
        if (this.isFalling()) {
          image(imagePlayer, drawX, drawY, drawSize, drawSize, this.spriteSize * 3, 0, this.spriteSize, this.spriteSize);
        }else {
          const frame = Math.floor(this.movingTimer / 6);
          const sx = this.spriteSize * (frame % 3);
          image(imagePlayer, drawX, drawY, drawSize, drawSize, sx, 0, this.spriteSize, this.spriteSize);
        }
        this.facingDirection = "right";
      }
    }
    else {// 死亡动画
      inputAllowed = false; // 禁止输入
      timerRunning = false; // 时间停止
      if (this.deathPhase === undefined) {
        this.deathPhase = 0;
        this.deathStartTime = millis(); // p5.js 内置时间
        setTimeout(() => this.deathPhase = 1, 300);
        setTimeout(() => this.deathPhase = 2, 700);
        setTimeout(() => this.deathPhase = 3, 1400);
        // setTimeout(() => this.deathPhase = 1, 1200);
        // setTimeout(() => this.deathPhase = 2, 2400);
        // setTimeout(() => this.deathPhase = 3, 3600);
      }
      if (this.deathPhase === 0) {

        // // 第1秒，播放 sprite 第3帧
        // if (this.facingDirection === "right") {
        //   image(imagePlayer, drawX, drawY, drawSize, drawSize, this.spriteSize * 3, 0, this.spriteSize, this.spriteSize);
        // } else {
        //   push();
        //   translate(drawX + drawSize, drawY);
        //   scale(-1, 1);
        //   image(imagePlayer, 0, 0, drawSize, drawSize, this.spriteSize * 3, 0, this.spriteSize, this.spriteSize);
        //   pop();
        // }
        if (this.facingDirection === "right") {
          push();
          translate(drawX + drawSize / 2, drawY + drawSize / 2); // 移动到图像中心
          rotate(radians(20)); // 顺时针旋转 20 度
          image(
            imagePlayer,
            -drawSize / 2,
            -drawSize / 2 + 3,
            drawSize,
            drawSize,
            this.spriteSize * 3,
            0,
            this.spriteSize,
            this.spriteSize
          );
          pop();
        } else {
          push();
          translate(drawX + drawSize / 2, drawY + drawSize / 2); // 移动到图像中心
          rotate(radians(-20)); // 逆时针旋转 20 度
          scale(-1, 1); // 水平翻转
          image(
            imagePlayer,
            -drawSize / 2,
            -drawSize / 2 + 3,
            drawSize,
            drawSize,
            this.spriteSize * 3,
            0,
            this.spriteSize,
            this.spriteSize
          );
          pop();
        }
      } else if (this.deathPhase === 1) {
        // 第2秒，播放 sprite 第4帧
        if (this.facingDirection === "right") {
          image(imagePlayer, drawX, drawY + 4, drawSize, drawSize, this.spriteSize * 4, 0, this.spriteSize, this.spriteSize);
        } else {
          push();
          translate(drawX + drawSize, drawY);
          scale(-1, 1);
          image(imagePlayer, 0, 4, drawSize, drawSize, this.spriteSize * 4, 0, this.spriteSize, this.spriteSize);
          pop();
        }
      }else if (this.deathPhase === 2) {
        // 第3秒，播放 sprite 第5帧
        if (this.facingDirection === "right") {
          image(imagePlayer, drawX, drawY + 1, drawSize, drawSize, this.spriteSize * 5, 0, this.spriteSize, this.spriteSize -1);
        } else {
          push();
          translate(drawX + drawSize, drawY);
          scale(-1, 1);
          image(imagePlayer, 0, 0, drawSize, drawSize + 1, this.spriteSize * 5, 0, this.spriteSize, this.spriteSize - 1);
          pop();
        }
      } else if (this.deathPhase === 3) {
        // 不再绘制角色，可选择添加结束逻辑
        inputAllowed = true; // 允许输入
        gameState = "gameOver";
      }
    }

  }
}
