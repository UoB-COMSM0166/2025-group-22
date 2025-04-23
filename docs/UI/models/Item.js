class Item {
  constructor(x, y, img, type) {
    this.pos = createVector(x, y);
    this.img = img;        // [col, row] in tileset or enemy sheet
    this.type = type;      // "heart", "key", "door", "dragon" etc.
    this.size = 50;
    this.spriteSize = 64;

    this.spikeBullets = [];
    this.fireCooldown = 0;
  }

  update() {
    if (this.type === "dragon") {
      this.updateSpikeBullets();
      this.tryFireProjectile();
    }
  }

  tryFireProjectile() {
    if (this.fireCooldown > 0) {
      this.fireCooldown--;
      return;
    }

    this.fireCooldown = 120; // 每 2 秒发一次

    const fireball = {
      // ✅ 修正发射位置为龙嘴附近（龙宽 = 100）
      pos: createVector(this.pos.x + 90, this.pos.y + 35),
      velocity: createVector(5, 0),
      size: 50,
      type: "fireball"
    };

    this.spikeBullets.push(fireball);
  }

  updateSpikeBullets() {
    for (let i = this.spikeBullets.length - 1; i >= 0; i--) {
      const proj = this.spikeBullets[i];
      proj.pos.add(proj.velocity);

      // 出界或撞墙就移除
      if (
        proj.pos.x > currentMap.blocks[0].length * 50 ||
        CollisionController.isSolid(proj.pos.x, proj.pos.y)
      ) {
        this.spikeBullets.splice(i, 1);
        console.log("CollisionController.isSolid(proj.pos.x, proj.pos.y)" + CollisionController.isSolid(proj.pos.x, proj.pos.y));
        continue;
      }

      // 玩家碰撞检测
      const hit = dist(player.pos.x, player.pos.y, proj.pos.x, proj.pos.y) < 40;
      if (hit && player.injuryTimer === 0) {
        sounds["playerHitSoundEffect"].play();
        player.lives -= 1;
        player.injured = true;
        this.spikeBullets.splice(i, 1);
      }
    }
  }

  drawSpikeBullets(xOffset, yOffset) {
    for (const proj of this.spikeBullets) {
      const spriteX = 0;
      const spriteY = 4; // 🔥 fireball 图块 (0,4)

      image(
        images["image_enemies"],
        proj.pos.x - xOffset,
        proj.pos.y - yOffset,
        proj.size,
        proj.size,
        spriteX * this.spriteSize,
        spriteY * this.spriteSize,
        this.spriteSize,
        this.spriteSize
      );
    }
  }

  draw(xOffset, yOffset) {
    const x = this.pos.x - xOffset;
    const y = this.pos.y - yOffset;

    if (this.type === "dragon") {
      // ✅ 2×2 拼图绘制龙 (0,2), (1,2), (0,3), (1,3)
      image(images["image_enemies"], x, y, this.size, this.size, 0 * this.spriteSize, 2 * this.spriteSize, this.spriteSize, this.spriteSize);         // 左上
      image(images["image_enemies"], x + 50, y, this.size, this.size, 1 * this.spriteSize, 2 * this.spriteSize, this.spriteSize, this.spriteSize);     // 右上
      image(images["image_enemies"], x, y + 50, this.size, this.size, 0 * this.spriteSize, 3 * this.spriteSize, this.spriteSize, this.spriteSize);     // 左下
      image(images["image_enemies"], x + 50, y + 50, this.size, this.size, 1 * this.spriteSize, 3 * this.spriteSize, this.spriteSize, this.spriteSize); // 右下

      this.update();
      this.drawSpikeBullets(xOffset, yOffset);
      return;
    }

    // ✅ 普通道具绘制逻辑
    const imagePadding = 1;
    const sx = this.img[0] * this.spriteSize;
    const sy = this.img[1] * this.spriteSize + imagePadding;

    if (this.type === "door") {
      image(images["image_tiles"], x, y - 50, this.size, this.size, sx, sy - this.spriteSize, this.spriteSize, this.spriteSize);
      image(images["image_tiles"], x, y, this.size, this.size, sx, sy, this.spriteSize, this.spriteSize);
    } else if (this.type === "key" || this.type === "heart") {
      iconEffect(
        images["image_tiles"],
        x, y,
        this.size, this.size,
        {
          float: true,
          floatSpeed: 0.03,
          floatAmplitude: 3,
          floatOffset: 0,
          highlightOnlyHover: false,
          alpha: 255,
          buttonX: x,
          buttonY: y,
          buttonWidth: this.size,
          buttonHeight: this.size
        },
        [this.img[0], this.img[1]],
        this.spriteSize
      );
    } else {
      image(images["image_tiles"], x, y, this.size, this.size, sx, sy, this.spriteSize, this.spriteSize);
    }
  }
}
