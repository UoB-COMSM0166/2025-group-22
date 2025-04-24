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
    this.bullet = 0;

    this.IsMovingLeft = false;
    this.IsMovingRight = false;
    this.movingTimer = 0;
  }

  update() {
    if (this.isAlive()) {
      this.updateInjured();
      this.updateWalking();
      this.updateGravity();
      if (this.checkEnemyCollision()) this.injured = true;
      this.checkItemCollision();
    } else {
      // 玩家死亡
      sounds["playerInjuredOrDeadSoundEffect"].play();
      gameState = "gameOver";
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
      if (this.pos.x < originalWidth / 6) { // 新屏幕宽度
        this.pos.x -= 5;
      } else {
        currentMap.xOffset -= 5;
      }
    }
  }

  moveRight() {
    this.IsMovingRight = true;
    if (this.getBlockClass(this.size - 5, 25) !== "Wall" &&
        this.getBlockClass(this.size - 5, 25) !== "DirectionWall" &&
        this.getBlockClass(this.size - 5, 25) !== "Portal") {
      if (this.pos.x < originalWidth / 3) {// 新屏幕宽度
        this.pos.x += 5;
      } else {
        currentMap.xOffset += 5;
      }
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
    const scaleRatio = (canvasWidth / 800)*0.5;

    // 将 mouseX/mouseY 从画布像素坐标转换为地图坐标
    const logicalMouseX = mouseX / scaleRatio + currentMap.xOffset;
    const logicalMouseY = mouseY / scaleRatio + currentMap.yOffset;

    sounds["pistolFireSoundEffect"].play();

    if (pistol == 0) {
      this.bullet = new Bullet(
        this.pos.x + currentMap.xOffset,
        this.pos.y,
        logicalMouseX,
        logicalMouseY,
        [8, 4],
        type
      );
    } else {
      this.bullet = new Bullet(
        this.pos.x + currentMap.xOffset,
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
    return block instanceof Portal ? block.direction : null;
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
          const destDir = block.direction;
          // console.log("destDir = ", destDir);
          let dx = 0, dy = 0;

          switch (destDir) {
            case "right": dx = 50; break;
            case "left": dx = -50; break;
            case "top": dy = -50; break;
            case "bottom": dy = 50; break;
          }

          this.pos.x = col * 50 + dx - currentMap.xOffset;
          this.pos.y = row * 50 + dy;
          const offsetX = this.getPortalDestOffset(currentX, col) + this.getPortalDestSidesOffset(fromDir, destDir);
          currentMap.xOffset += offsetX;
          this.pos.x -= offsetX;

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
    this.pos.add(this.velocity);

    if (this.isFalling()) {
      this.pos.add(0, this.gravity);
    }

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

    if (this.pos.y < originalHeight / 3) {
      currentMap.yOffset = this.pos.y - originalHeight / 3;
    } else if (this.pos.y > (2 * originalHeight) / 3) {
      currentMap.yOffset = this.pos.y - (2 * originalHeight) / 3;
    } else {
      currentMap.yOffset = 0;
    }
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
    return [floor((x + currentMap.xOffset) / 50), floor(y / 50)];
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
    const scaleRatio = (canvasWidth / 800)*0.5;
    const drawX = this.pos.x * scaleRatio;
    const drawY = (this.pos.y - currentMap.yOffset) * scaleRatio;
    const drawSize = this.size * scaleRatio;

    if (this.injured && this.injuryTimer % 6 === 0) return;

    if (!this.IsMovingLeft && !this.IsMovingRight) {
      image(images["image_player"], drawX, drawY, drawSize, drawSize, 0, 0, this.spriteSize, this.spriteSize);
    } else if (this.IsMovingLeft) {
      push();
      translate(drawX + drawSize, drawY);
      scale(-1, 1);
      const frame = Math.floor(this.movingTimer / 6);
      const sx = this.spriteSize * (frame % 3);
      image(images["image_player"], 0, 0, drawSize, drawSize, sx, 0, this.spriteSize, this.spriteSize);
      pop();
    } else if (this.IsMovingRight) {
      const frame = Math.floor(this.movingTimer / 6);
      const sx = this.spriteSize * (frame % 3);
      image(images["image_player"], drawX, drawY, drawSize, drawSize, sx, 0, this.spriteSize, this.spriteSize);
    }
  }
}
