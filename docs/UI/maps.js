class Maps {
  constructor(b) {

    this.blocks = b;
    this.offset = 0;
    this.yOffset = 0;
    //this.enemyList = [];
    //this.itemList = [];



    for (var row = 0; row < this.blocks.length; row++) {
      for (var col = 0; col < this.blocks[row].length; col++) {
        //this.blocks[row][col]
        if (this.blocks[row][col] == 1) {
          this.blocks[row][col] = new Wall(col * 50, row * 50, [0, 0]);
        }
        if (this.blocks[row][col] == 2) {
          this.blocks[row][col] = new DirectionWall(col * 50, row * 50, [1, 0], "standard");
        }
        if (this.blocks[row][col] == 3) {
          this.blocks[row][col] = new DirectionWall(col * 50, row * 50, [2, 0], "reflectUp");
        }
        if (this.blocks[row][col] == 4) {
          this.blocks[row][col] = new DirectionWall(col * 50, row * 50, [3, 0], "reflectDown");
        }
        if (this.blocks[row][col] == 5) {
          this.blocks[row][col] = new DirectionWall(col * 50, row * 50, [4, 0], "reflectLeft");
        }
        if (this.blocks[row][col] == 6) {
          this.blocks[row][col] = new DirectionWall(col * 50, row * 50, [5, 0], "reflectRight");
        }
        if (this.blocks[row][col] == 7) {
          this.blocks[row][col] = new Item(col * 50, row * 50, [0, 4], "door");
          this.itemList.push(this.blocks[row][col])
        }
        if (this.blocks[row][col] == 8) {
          this.blocks[row][col] = new Item(col * 50, row * 50, [1, 3], "treasure");
          this.itemList.push(this.blocks[row][col])
        }
        if (this.blocks[row][col] == 9) {
          this.blocks[row][col] = new Item(col * 50, row * 50, [2, 3], "key");
          this.itemList.push(this.blocks[row][col])
        }
        if (this.blocks[row][col] == 10) {
          this.blocks[row][col] = new Enemy(col * 50, row * 50, [0, 0], false);
          this.enemyList.push(this.blocks[row][col])
        }
        if (this.blocks[row][col] == 11) {
          this.blocks[row][col] = new Enemy(col * 50, row * 50, [1, 0], true);
          this.enemyList.push(this.blocks[row][col])
        }
        if (this.blocks[row][col] == 12) {
          this.blocks[row][col] = new Enemy(col * 50, row * 50, [2, 0], true);
          this.enemyList.push(this.blocks[row][col])
        }
        if (this.blocks[row][col] == 13) {
          this.blocks[row][col] = new Enemy(col * 50, row * 50, [3, 0], true);
          this.enemyList.push(this.blocks[row][col])
        }
        if (this.blocks[row][col] == 14) {
          this.blocks[row][col] = new Enemy(col * 50, row * 50, [5, 1], true);
          this.enemyList.push(this.blocks[row][col])
        }
      }    
    }
  }

  draw() {
    for (var row = 0; row < this.blocks.length; row++) {
      for (var col = 0; col < this.blocks[row].length; col++) {
        if (this.blocks[row][col] != 0) {
          this.blocks[row][col].draw(this.offset, this.yOffset);
        }
      }
    }
  }
}