class CollisionController {
  /** Gets the block at specified coordinates (world or grid space). */
  static getBlockAt(x, y, useWorldCoords = true) {
    const trueX = useWorldCoords ? x + currentMap.xOffset : x;
    const trueY = useWorldCoords ? y + currentMap.yOffset : y;
    const col = floor(trueX / 50);
    const row = floor(trueY / 50);
    if (
      row < 0 ||
      row >= currentMap.blocks.length ||
      col < 0 ||
      col >= currentMap.blocks[0].length
    )
      return null;
    return currentMap.blocks?.[row]?.[col];
  }

  /** Checks if a coordinate contains a solid block. */
  static isSolid(x, y, useWorldCoords = false) {
    const block = this.getBlockAt(x, y, useWorldCoords);
    return (
      block instanceof Wall ||
      block instanceof DirectionWall ||
      block instanceof Portal
    );
  }

  /** Detects if player touches any object of specified type within radius. */
  static isTouching(player, blockType, radius = 40) {
    const list =
      blockType === "item" ? currentMap.itemList : currentMap.enemyList;
    for (const obj of list) {
      if (obj.type === "dragon") {
        const offsets = [
          [0, 0],
          [50, 0],
          [0, 50],
          [50, 50],
        ];
        for (const [dx, dy] of offsets) {
          const distVal = dist(
            player.pos.x,
            player.pos.y,
            obj.pos.x + dx,
            obj.pos.y + dy
          );
          if (distVal < radius) return obj;
        }
      } else {
        const distVal = dist(player.pos.x, player.pos.y, obj.pos.x, obj.pos.y);
        if (distVal < radius) return obj;
      }
    }
    return null;
  }

  /** Shortcut to detect enemy collisions. */
  static getCollidingEnemy(player, radius = 40) {
    return this.isTouching(player, "enemy", radius);
  }
}