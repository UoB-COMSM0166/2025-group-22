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
    this.lives = 3;
    this.keys = 0;
    this.movingState = 0;
    this.bulletRed = 0;
    this.bulletBlue = 0;
    this.IsMovingLeft = false;
    this.IsMovingRight = false;
    this.movingTimer = 0;
    this.facingDirection = "right";
    this.DeadSoundEffectPlayed = false;
  }

  /** Updates player state, including movement, gravity, and collision. */
  update() {
    if (this.isAlive()) {
      this.updateInjured();
      this.updateWalking();
      this.updateGravity();
      if (this.checkEnemyCollision()) this.injured = true;
      this.checkItemCollision();
    } else {
      this.updateGravity();

      if (this.DeadSoundEffectPlayed === false) {
        sounds["playerInjuredOrDeadSoundEffect"].play();
        this.DeadSoundEffectPlayed = true;
      }
    }
  }

    /** Checks for collision with enemies. */
  checkEnemyCollision() {
    const enemy = CollisionController.getCollidingEnemy(this, 40);
    if (enemy) {
      if (this.injuryTimer === 0) {
        currentEnemy = enemy.type;
        if (enemy.type === "spike") {
          const playerBottom = this.pos.y + this.size;
          const spikeTop = enemy.pos.y + enemy.size / 2;
          if (playerBottom < spikeTop) {
            return false;
          }
        }
        sounds["playerHitSoundEffect"].play();
        this.lives -= currentEnemy === "spike" ? 2 : 1;
      }
      return true;
    }
    return false;
  }

  /** Checks for collision with items. */
  checkItemCollision() {
    const item = CollisionController.isTouching(this, "item", 40);
    if (!item) return;

    const i = currentMap.itemList.findIndex(
      (obj) => obj.pos.x === item.pos.x && obj.pos.y === item.pos.y
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
    if (
      this.getBlockClass(5, 25) !== "Wall" &&
      this.getBlockClass(5, 25) !== "DirectionWall" &&
      this.getBlockClass(5, 25) !== "Portal"
    ) {
      this.pos.x -= 5;
    }
  }

  moveRight() {
    this.IsMovingRight = true;
    if (
      this.getBlockClass(this.size - 5, 25) !== "Wall" &&
      this.getBlockClass(this.size - 5, 25) !== "DirectionWall" &&
      this.getBlockClass(this.size - 5, 25) !== "Portal"
    ) {
      this.pos.x += 5;
    }
  }

  stopLeft() {
    this.IsMovingLeft = false;
  }

  stopRight() {
    this.IsMovingRight = false;
  }

  jump() {
    if (!this.isFalling()) {
      this.velocity.y = -30;
      sounds["jumpSoundEffect"].play();
    }
  }

  /** Makes player shoot a bullet in the direction of the mouse. */
  shoot(type) {
    const scaleRatio = (canvasWidth / 800) * drawRatio;
    const logicalMouseX = mouseX / scaleRatio + currentMap.xOffset;
    const logicalMouseY = mouseY / scaleRatio + currentMap.yOffset;
    if (logicalMouseX > this.pos.x + currentMap.xOffset) {
      this.facingDirection = "right";
    } else {
      this.facingDirection = "left";
    }
    sounds["pistolFireSoundEffect"].play();
    if (pistol == 0) {
      this.bulletBlue = new Bullet(
        this.pos.x,
        this.pos.y,
        logicalMouseX,
        logicalMouseY,
        [8, 4],
        type
      );
    } else {
      this.bulletRed = new Bullet(
        this.pos.x,
        this.pos.y,
        logicalMouseX,
        logicalMouseY,
        [10, 4],
        type
      );
    }
  }

   /** Toggles between two pistols. */
  togglePistol() {
    pistol = 1 - pistol;
    sounds["weaponSwitch"].play();
  }

  /** Teleports player through a linked portal if available. */
  teleport() {
    const directions = {
      right: { offsetX: -1, offsetY: 25 },
      left: { offsetX: this.size, offsetY: 25 },
      top: { offsetX: 25, offsetY: this.size + 1 },
      bottom: { offsetX: 25, offsetY: -1 },
    };

    for (const [dir, { offsetX, offsetY }] of Object.entries(directions)) {
      if (
        this.getBlockClass(offsetX, offsetY) === "Portal" &&
        this.getPortalDir(offsetX, offsetY) === dir
      ) {
        sounds["teleportSoundEffect"].play();
        const [currentX, currentY] = this.getLoc(
          this.pos.x + offsetX,
          this.pos.y + offsetY
        );
        this.teleportToLinkedPortal(currentX, currentY, dir);
        break;
      }
    }
  }

   /** Gets the direction a portal is facing. */
  getPortalDir(offsetX = 0, offsetY = 0) {
    const [col, row] = this.getLoc(this.pos.x + offsetX, this.pos.y + offsetY);
    const block = currentMap.blocks?.[row]?.[col];
    return block instanceof Portal ? block.facingDirection : null;
  }

   /** Teleports player to the linked portal. */
  teleportToLinkedPortal(currentX, currentY, fromDir) {
    for (let row = 0; row < currentMap.blocks.length; row++) {
      for (let col = 0; col < currentMap.blocks[row].length; col++) {
        const block = currentMap.blocks[row][col];
        if (block instanceof Portal && (col !== currentX || row !== currentY)) {
          const destDir = block.facingDirection;

          let dx = 0,
            dy = 0;

          switch (destDir) {
            case "right":
              dx = 50;
              break;
            case "left":
              dx = -50;
              break;
            case "top":
              dy = -50;
              break;
            case "bottom":
              dy = 50;
              break;
          }

          this.pos.x = col * 50 + dx;
          this.pos.y = row * 50 + dy;

          return;
        }
      }
    }
  }

    /** Returns offset for teleporting to destination side. */
  getPortalDestSidesOffset(fromDir, destDir) {
    const offsetMap = {
      top: {
        top: 0,
        bottom: 0,
        left: -50,
        right: 50,
      },
      bottom: {
        top: 0,
        bottom: 0,
        left: -50,
        right: 50,
      },
      left: {
        top: 50,
        bottom: 50,
        left: 0,
        right: 100,
      },
      right: {
        top: -50,
        bottom: -50,
        left: -100,
        right: 0,
      },
    };

    return offsetMap[fromDir]?.[destDir] ?? null;
  }

  isAlive() {
    return this.lives > 0;
  }

  /** Updates the injury status of the player. */
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

  /** Updates the walking animation of the player. */
  updateWalking() {
    if (this.IsMovingLeft || this.IsMovingRight) {
      if (this.movingTimer < 17) {
        this.movingTimer++;
      } else {
        this.movingTimer = 0;
      }
    }
  }

  /** Applies gravity to the player's movement. */
  updateGravity() {
    if (this.isFalling()) {
      if (this.velocity.y + this.gravity > 6) {
        this.velocity.y = 6;
      } else {
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
  }

  /** Checks if the player is falling. */
  isFalling() {
    return this.onWall() !== "bottom";
  }

  /** Detects if the player is touching a wall. */
  onWall() {
    if (
      ["Wall", "DirectionWall", "Portal"].includes(
        this.getBlockClass(10, this.size)
      )
    ) {
      return "bottom";
    }
    if (
      ["Wall", "DirectionWall", "Portal"].includes(
        this.getBlockClass(this.size - 10, this.size)
      )
    ) {
      return "bottom";
    }
    if (
      ["Wall", "DirectionWall", "Portal"].includes(this.getBlockClass(10, 0))
    ) {
      return "top";
    }
    if (
      ["Wall", "DirectionWall", "Portal"].includes(
        this.getBlockClass(this.size - 10, 0)
      )
    ) {
      return "top";
    }
    return false;
  }

  /** Returns the class name of the block at the player's specified offset, or "none" if there is no block. */
  getBlockClass(offX = 0, offY = 0) {
    const [col, row] = this.getLoc(this.pos.x + offX, this.pos.y + offY);
    return currentMap.blocks[row][col]?.constructor?.name || "none";
  }

  /** Returns the column and row indices for the given coordinates. */
  getLoc(x = this.pos.x, y = this.pos.y) {
    return [floor(x / 50), floor(y / 50)];
  }

  /** Collects the item at the given index in the item list and applies its effect. */
  collectItem(i) {
    const item = currentMap.itemList[i];
    const col = item.pos.x / 50;
    const row = item.pos.y / 50;

    if (item.type === "potion") {
      sounds["healthPickupSoundEffect"].play();
      this.lives++;
    } else if (item.type === "key") {
      sounds["keyPickupSoundEffect"].play();
      this.keys++;
    } else if (
      item.type === "door" ||
      item.type === "treasure" ||
      item.type === "dragon"
    ) {
      if (this.keys > 0) {
        this.keys = 0;
        if (item.type === "treasure") {
        } else if (item.type === "dragon") {
        } else if (item.type === "door") {
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

  /** Draws the player sprite based on the player's state (injured, moving, facing direction, etc.). */
  draw() {
    const scaleRatio = (canvasWidth / 800) * drawRatio;

    const drawX = (this.pos.x - currentMap.xOffset) * scaleRatio;
    const drawY = (this.pos.y - currentMap.yOffset) * scaleRatio;
    const drawSize = this.size * scaleRatio;

    if (this.injured && this.injuryTimer % 6 === 0 && this.isAlive()) return;
    let imagePlayer;
    if (pistol === 0) {
      imagePlayer = images["image_player_blue_pistol"];
    } else if (pistol === 1) {
      imagePlayer = images["image_player"];
    }
    if (this.isAlive()) {
      if (!this.IsMovingLeft && !this.IsMovingRight) {
        if (this.facingDirection === "right") {
          if (this.isFalling()) {
            image(
              imagePlayer,
              drawX,
              drawY,
              drawSize,
              drawSize,
              this.spriteSize * 3,
              0,
              this.spriteSize,
              this.spriteSize
            );
          } else {
            image(
              imagePlayer,
              drawX,
              drawY,
              drawSize,
              drawSize,
              0,
              0,
              this.spriteSize,
              this.spriteSize
            );
          }
        } else if (this.facingDirection === "left") {
          if (this.isFalling()) {
            push();
            translate(drawX + drawSize, drawY);
            scale(-1, 1);
            image(
              imagePlayer,
              0,
              0,
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
            translate(drawX + drawSize, drawY);
            scale(-1, 1);
            image(
              imagePlayer,
              0,
              0,
              drawSize,
              drawSize,
              0,
              0,
              this.spriteSize,
              this.spriteSize
            );
            pop();
          }
        }
      } else if (this.IsMovingLeft) {
        if (this.isFalling()) {
          push();
          translate(drawX + drawSize, drawY);
          scale(-1, 1);
          image(
            imagePlayer,
            0,
            0,
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
          translate(drawX + drawSize, drawY);
          scale(-1, 1);
          const frame = Math.floor(this.movingTimer / 6);
          const sx = this.spriteSize * (frame % 3);
          image(
            imagePlayer,
            0,
            0,
            drawSize,
            drawSize,
            sx,
            0,
            this.spriteSize,
            this.spriteSize
          );
          pop();
        }
        this.facingDirection = "left";
      } else if (this.IsMovingRight) {
        if (this.isFalling()) {
          image(
            imagePlayer,
            drawX,
            drawY,
            drawSize,
            drawSize,
            this.spriteSize * 3,
            0,
            this.spriteSize,
            this.spriteSize
          );
        } else {
          const frame = Math.floor(this.movingTimer / 6);
          const sx = this.spriteSize * (frame % 3);
          image(
            imagePlayer,
            drawX,
            drawY,
            drawSize,
            drawSize,
            sx,
            0,
            this.spriteSize,
            this.spriteSize
          );
        }
        this.facingDirection = "right";
      }
    } else {
      timerRunning = false;
      if (this.deathPhase === undefined) {
        this.deathPhase = 0;
        this.deathStartTime = millis();
        setTimeout(() => (this.deathPhase = 1), 300);
        setTimeout(() => (this.deathPhase = 2), 700);
        setTimeout(() => (this.deathPhase = 3), 1400);
      }
      if (this.deathPhase === 0) {
        if (this.facingDirection === "right") {
          push();
          translate(drawX + drawSize / 2, drawY + drawSize / 2);
          rotate(radians(20));
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
          translate(drawX + drawSize / 2, drawY + drawSize / 2);
          rotate(radians(-20));
          scale(-1, 1);
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
        if (this.facingDirection === "right") {
          image(
            imagePlayer,
            drawX,
            drawY + 4,
            drawSize,
            drawSize,
            this.spriteSize * 4,
            0,
            this.spriteSize,
            this.spriteSize
          );
        } else {
          push();
          translate(drawX + drawSize, drawY);
          scale(-1, 1);
          image(
            imagePlayer,
            0,
            4,
            drawSize,
            drawSize,
            this.spriteSize * 4,
            0,
            this.spriteSize,
            this.spriteSize
          );
          pop();
        }
      } else if (this.deathPhase === 2) {
        if (this.facingDirection === "right") {
          image(
            imagePlayer,
            drawX,
            drawY + 1,
            drawSize,
            drawSize,
            this.spriteSize * 5,
            0,
            this.spriteSize,
            this.spriteSize - 1
          );
        } else {
          push();
          translate(drawX + drawSize, drawY);
          scale(-1, 1);
          image(
            imagePlayer,
            0,
            0,
            drawSize,
            drawSize + 1,
            this.spriteSize * 5,
            0,
            this.spriteSize,
            this.spriteSize - 1
          );
          pop();
        }
      } else if (this.deathPhase === 3) {
        gameState = "gameOver";
      }
    }
  }
}
