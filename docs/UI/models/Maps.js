class Maps {
  constructor(block) {
    this.blocks = block;
    this.xOffset = 0;
    this.yOffset = 0;
    this.enemyList = [];
    this.itemList = [];

    for (let row = 0; row < this.blocks.length; row++) {
      for (let col = 0; col < this.blocks[row].length; col++) {
        const x = col * 50;
        const y = row * 50;
        const value = this.blocks[row][col];

        let block = 0;
        switch (value) {
          case 1: block = new Wall(x, y, [0, 0]); break;
          case 2: block = new DirectionWall(x, y, [1, 0], "standard"); break;
          case 3: block = new DirectionWall(x, y, [2, 0], "reflectUp"); break;
          case 4: block = new DirectionWall(x, y, [3, 0], "reflectDown"); break;
          case 5: block = new DirectionWall(x, y, [4, 0], "reflectLeft"); break;
          case 6: block = new DirectionWall(x, y, [5, 0], "reflectRight"); break;
          case 7: block = new Item(x, y, [0, 3], "door"); this.itemList.push(block); break;
          case 8: block = new Item(x, y, [2, 2], "treasure"); this.itemList.push(block); break;
          case 9: block = new Item(x, y, [4, 2], "key"); this.itemList.push(block); break;
          case 10: block = new Item(x, y, [12, 2], "potion"); this.itemList.push(block); break;
          case 11: block = new Enemy(x, y, [0, 5], "spike", false); this.enemyList.push(block); break;
          // case 12: block = new Enemy(x, y, [1, 0], "walker", true); this.enemyList.push(block); break;
          case 12: block = new Enemy(x, y, [1, 0], "slime", true); this.enemyList.push(block); break;
          case 13: block = new Enemy(x, y, [1, 1], "saw", true); this.enemyList.push(block); break;
          case 14: block = new Item(x, y, [0, 2], "dragon"); this.itemList.push(block); break;
          case 15: block = new Enemy(x, y, [0, 4], "fireBall", true); this.enemyList.push(block); break;
        }

        this.blocks[row][col] = block || 0;
      }
    }
  }

  draw() {
    const scaleRatio = (canvasWidth / 800) * 0.5;

    push();
    scale(scaleRatio);  // 缩放整个地图（包括 tile、player、enemy、bullet 等）

    for (let row = 0; row < this.blocks.length; row++) {
      for (let col = 0; col < this.blocks[row].length; col++) {
        const block = this.blocks[row][col];
        if (block !== 0 && typeof block.draw === "function") {
          block.draw(this.xOffset, this.yOffset);
        }
      }
    }

    pop();
  }


  constrainPosition(pos, size) {
    const mapWidth = this.blocks[0].length * 50;
    const mapHeight = this.blocks.length * 50;
    pos.x = constrain(pos.x, 0, mapWidth - size);
    pos.y = constrain(pos.y, 0, mapHeight - size);
  }

  constrainOffset(viewWidth) {
    const mapWidth = this.blocks[0].length * 50;
    this.xOffset = constrain(this.xOffset, 0, mapWidth - viewWidth);
  }
}
