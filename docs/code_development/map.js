class Map {
  constructor(b) {

    this.blocks = b;
    this.offset = 0;
    this.enemyList = [];
    this.itemList = [];



    for (var row = 0; row < this.blocks.length; row++) {
      for (var col = 0; col < this.blocks[row].length; col++) {
        //this.blocks[row][col]
        if (this.blocks[row][col] == 1) {
          this.blocks[row][col] = new Solid(col * 50, row * 50, [0, 0]);

        }
        if (this.blocks[row][col] == 2) {
          this.blocks[row][col] = new Solid(col * 50, row * 50, [3, 0]);

        }
        if (this.blocks[row][col] == 3) {
          this.blocks[row][col] = new Decor(col * 50, row * 50, [0, 4]);

        }
        if (this.blocks[row][col] == 4) {
          this.blocks[row][col] = new Decor(col * 50, row * 50, [2, 5]);

        }
        if (this.blocks[row][col] == 5) {
          this.blocks[row][col] = new Item(col * 50, row * 50, [11, 4], "heart");
          this.itemList.push(this.blocks[row][col])
        }
        if (this.blocks[row][col] == 6) {
          this.blocks[row][col] = new Item(col * 50, row * 50, [10, 4], "key");
          this.itemList.push(this.blocks[row][col])
        }
        if (this.blocks[row][col] == 7) {
          this.blocks[row][col] = new Item(col * 50, row * 50, [9, 6], "door");
          this.itemList.push(this.blocks[row][col])
        }
        if (this.blocks[row][col] == 8) {
          this.blocks[row][col] = new Enemy(col * 50, row * 50, [0, 5], false);
        this.enemyList.push(this.blocks[row][col])
        }
        if (this.blocks[row][col] == 9) {
          this.blocks[row][col] = new Enemy(col * 50, row * 50, [1, 5], true);
        this.enemyList.push(this.blocks[row][col])
        }
        //portal blue
        if (this.blocks[row][col] == 10) {
          this.blocks[row][col] = new PortalSolid(col * 50, row * 50 [6, 0], "","blue");
        }
        //portal red
        if (this.blocks[row][col] == 11) {
          this.blocks[row][col] = new PortalSolid(col * 50, row * 50, [7, 1], "", "red");
        }
      }
    
    }
  }



  draw() {
    for (var row = 0; row < this.blocks.length; row++) {
      for (var col = 0; col < this.blocks[row].length; col++) {
        if (this.blocks[row][col] != 0) {
          this.blocks[row][col].draw(this.offset, 0);
        }
      }

    }

  }
}