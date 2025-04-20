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
    this.lives =30;
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
      playerInjuredOrDeadSoundEffect.play();
      gameState = "gameOver";
    }
  }

  checkEnemyCollision() {
    const enemy = CollisionController.getCollidingEnemy(this, 40);
    if (enemy) {
      if (this.injuryTimer === 0) {
        currentEnemy = enemy.type;

        // 玩家受伤
        playerHitSoundEffect.play();

        this.lives -= currentEnemy === "spike" ? 3 : 1;
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
      if (this.pos.x < width / 6) {
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
      if (this.pos.x < width / 3) {
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
    }
  }

  shoot(type) {

    // if (this.bullet) {
    //   this.bullet = null; // 或者 this.bullet.destroy() 如果你有销毁逻辑
    // }
    pistolFireSoundEffect.play();
    this.bullet = new Bullet(
      this.pos.x + currentMap.xOffset,
      this.pos.y,
      mouseX + currentMap.xOffset,
      mouseY + currentMap.yOffset,
      [0, 5],
      type
    );
    // console.log("Shooting bullet of type", type, "from", this.pos.x, this.pos.y);
    // console.log("Bullet created:", this.bullet);
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
        teleportSoundEffect.play();

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

    if (this.pos.y < height / 3) {
      currentMap.yOffset = this.pos.y - height / 3;
    } else if (this.pos.y > (2 * height) / 3) {
      currentMap.yOffset = this.pos.y - (2 * height) / 3;
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

    if (item.type === "heart") {
      // 捡爱心音效
      healthPickupSoundEffect.play();
      this.lives++;
    } else if (item.type === "key") {
      // 捡钥匙音效
      keyPickupSoundEffect.play();
      this.keys++;
    } else if (item.type === "door" ||
        item.type === "treasure") {
      if (this.keys > 0) {
        this.keys = 0;
        if (item.type === "treasure") {
          // 开宝箱音效
          // doorOpenSoundEffect.play();
        }
        else if (item.type === "door") {
          // 开门音效
          doorOpenSoundEffect.play();
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
    if (this.injured && this.injuryTimer % 6 === 0) return;
    if (this.IsMovingLeft === false && this.IsMovingRight === false) {
      image(player_image, this.pos.x, this.pos.y - currentMap.yOffset, this.size, this.size, 0, 0, this.spriteSize, this.spriteSize);
    }
    else if(this.IsMovingLeft === true) {
      push();
      translate(this.pos.x + this.size, this.pos.y - currentMap.yOffset);  // 平移到正確位置（注意這裡是 + size）
      scale(-1, 1);                 // 左右翻轉
      if (Math.floor(this.movingTimer/6)===0){
        image(player_image, 0, 0, this.size, this.size, this.spriteSize * 0, 0, this.spriteSize, this.spriteSize);
      }
      else if (Math.floor(this.movingTimer/6)===2){
        image(player_image, 0, 0, this.size, this.size, this.spriteSize * 1, 0, this.spriteSize, this.spriteSize);
      }
      else if (Math.floor(this.movingTimer/6)===1){
        image(player_image, 0, 0, this.size, this.size, this.spriteSize * 2, 0, this.spriteSize, this.spriteSize);
      }
      pop();
    }
    else if(this.IsMovingRight === true){
      if (Math.floor(this.movingTimer/6)===0){
        image(player_image, this.pos.x, this.pos.y - currentMap.yOffset, this.size, this.size, this.spriteSize * 0, 0, this.spriteSize, this.spriteSize);
      }
      else if (Math.floor(this.movingTimer/6)===2){
        image(player_image, this.pos.x, this.pos.y - currentMap.yOffset, this.size, this.size, this.spriteSize * 1, 0, this.spriteSize, this.spriteSize);
      }
      else if (Math.floor(this.movingTimer/6)===1){
        image(player_image, this.pos.x, this.pos.y - currentMap.yOffset, this.size, this.size, this.spriteSize * 2, 0, this.spriteSize, this.spriteSize);
      }
    }
  }
}
