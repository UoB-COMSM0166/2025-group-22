class CollisionController {
  // 根據座標取得地圖上的區塊
  static getBlockAt(x, y, useWorldCoords = true) {
    const trueX = useWorldCoords ? x + currentMap.xOffset : x;
    const trueY = useWorldCoords ? y + currentMap.yOffset : y;
    const col = floor(trueX / 50);
    const row = floor(trueY / 50);
    if (
      row < 0 || row >= currentMap.blocks.length ||
      col < 0 || col >= currentMap.blocks[0].length
    ) return null;
    return currentMap.blocks?.[row]?.[col];
  }

  // 取得區塊的類別名稱
  static getBlockClassName(x, y, useWorldCoords = true) {
    const block = this.getBlockAt(x, y, useWorldCoords);
    return block?.constructor?.name || "none";
  }

  // 判斷是否為實心方塊（牆、反彈牆、傳送門）
  static isSolid(x, y, useWorldCoords = true) {
    const block = this.getBlockAt(x, y, useWorldCoords);
    return block instanceof Wall || block instanceof DirectionWall || block instanceof Portal;
  }

  // 判斷是否為道具
  static isItem(x, y, useWorldCoords = true) {
    const block = this.getBlockAt(x, y, useWorldCoords);
    return block instanceof Item;
  }

  // 判斷是否為敵人
  static isEnemy(x, y, useWorldCoords = true) {
    const block = this.getBlockAt(x, y, useWorldCoords);
    return block instanceof Enemy;
  }

  // 半徑範圍內是否接觸某類型物件（item/enemy）
  static isTouching(player, blockType, radius = 40) {
    const list = blockType === "item" ? currentMap.itemList : currentMap.enemyList;
    for (const obj of list) {
      const distVal = dist(
        player.pos.x + currentMap.xOffset,
        player.pos.y,
        obj.pos.x,
        obj.pos.y
      );
      if (distVal < radius) return obj;
    }
    return null;
  }

  // 檢查物件是否與任一 item 碰撞（額外功能，可選）
  static getCollidingItem(player, radius = 40) {
    return this.isTouching(player, "item", radius);
  }

  // 檢查物件是否與任一敵人碰撞（額外功能，可選）
  static getCollidingEnemy(player, radius = 40) {
    return this.isTouching(player, "enemy", radius);
  }
}
