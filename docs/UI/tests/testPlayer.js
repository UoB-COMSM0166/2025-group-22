let _originalLevelController = null;

function setupMockVectorSystemIfNeeded() {
  const isBrowser = typeof window !== "undefined";

  const mockVector = function (x, y) {
    if (typeof x !== "number" || typeof y !== "number") {
      console.warn("🔥 createVector received invalid input:", x, y);
      return {
        x: NaN, y: NaN,
        add: () => this,
        sub: () => this,
        setMag: () => this,
        mult: () => this,
        copy: () => this,
        toString: () => `(NaN, NaN)`
      };
    }

    return {
      x,
      y,
      add(dx, dy) {
        if (typeof dx === "object") {
          this.x += dx.x;
          this.y += dx.y;
        } else {
          this.x += dx;
          this.y += dy;
        }
        return this;
      },
      sub(v) {
        return mockVector(this.x - v.x, this.y - v.y);
      },
      mult(n) {
        this.x *= n;
        this.y *= n;
        return this;
      },
      setMag(mag) {
        const len = Math.sqrt(this.x * this.x + this.y * this.y);
        if (len === 0) return this;
        this.x = (this.x / len) * mag;
        this.y = (this.y / len) * mag;
        return this;
      },
      copy() {
        return mockVector(this.x, this.y);
      },
      toString() {
        return `(${this.x.toFixed(1)}, ${this.y.toFixed(1)})`;
      }
    };
  };

  globalThis.createVector = mockVector;

  globalThis.p5 = {
    Vector: {
      sub: (a, b) => mockVector(a.x - b.x, a.y - b.y),
      add: (a, b) => mockVector(a.x + b.x, a.y + b.y)
    }
  };

  console.log("🧪 Mock vector system injected for Bullet.js usage.");
}




function runPlayerTests() {
  console.log("=== Running Player Tests ===");

  _originalLevelController = LevelController;

    withMockEnv(() => {
    testPlayerInit();
    testPlayerJump();
    testPlayerInjury();
    testPlayerCollectHeart();
    testPlayerCollectKey();
    testPlayerUseKeyOnDoor();
    testPlayerIsAlive();
    testPlayerMoveLeft();
    testPlayerMoveRight();
    testPlayerShoot();
    testBulletReflection();
    testPlayerTeleportation();
    testPlayerPortalEntryDirectionStrict();


  });

  // Restore the original LevelController
  LevelController = _originalLevelController;

  console.log("✅ All Player tests completed!");
}

function withMockEnv(mockFunc) {
  setupMockVectorSystemIfNeeded(); 
    // Fully mock the methods in CollisionController to ensure they work in the tests
    const mockCollisionController = {
      // Mock the isSolid method, defaulting to false, indicating no obstacles
      isSolid: (x, y, useWorldCoords = true) => false,
  
      // Additional mocked methods can be added here
      getCollidingEnemy: () => ({ type: "enemy" }),
      isTouching: () => null,
      isItem: () => false,
      isEnemy: () => false,
    };
  
    // Save the original CollisionController reference to restore it after the tests
    const originalCollisionController = CollisionController;
  
    // Use the mocked CollisionController instead of the original one
    CollisionController = mockCollisionController;
  
    // Mock the currentMap, providing a simple map structure
    currentMap = createMockMap();
  
    const originalLevelController = LevelController;
  
    try {
      // Execute the passed-in test functions
      mockFunc();
    } catch (error) {
      console.error("Test execution failed", error);
    } finally {
      // Restore the original CollisionController and LevelController
      CollisionController = originalCollisionController;
      LevelController = originalLevelController;
    }
}

function createMockMap() {
    return {
      xOffset: 0,
      yOffset: 0,
      blocks: [...Array(20).fill().map(() => Array(20).fill(0))],
      itemList: [],
      enemyList: [],
    };
  }
  
  

function testPlayerInit() {
  const player = new Player();
  console.assert(player.pos.x === 200 && player.pos.y === 200, "❌ Initial position should be (200, 200)");
  console.assert(player.lives === 3, "❌ Initial lives should be 3");
  console.assert(player.velocity.x === 0 && player.velocity.y === 0, "❌ Initial velocity should be (0, 0)");
  console.log("✅ testPlayerInit passed.");
}

function testPlayerInjury() {
  const player = new Player();
  player.lives = 3;
  player.injuryTimer = 0;

  // ✅ Mock
  CollisionController = {
    getCollidingEnemy: () => ({ type: "enemy" }),  // Simulate collision with an enemy
    isTouching: () => null // 👈 Prevent checkItemCollision error
  };

  player.update();

  console.assert(player.injured === true, "❌ Should be marked as injured");
  console.assert(player.lives === 2, "❌ Should reduce one life");
  console.log("✅ testPlayerInjury passed.");
}

function testPlayerCollectHeart() {
  const player = new Player();
  player.lives = 2;

  // ✅ Mock
  currentMap = createMockMap();
  const heart = { type: "heart", pos: { x: 0, y: 0 } };
  currentMap.itemList.push(heart);

  CollisionController = {
    isTouching: () => heart  // Simulate touching a heart item
  };

  player.checkItemCollision();

  console.assert(player.lives === 3, "❌ Should increase one life");
  console.assert(currentMap.itemList.length === 0, "❌ Item should be removed");
  console.log("✅ testPlayerCollectHeart passed.");
}

function testPlayerCollectKey() {
  const player = new Player();
  player.keys = 0;

  // ✅ Mock
  currentMap = createMockMap();
  const key = { type: "key", pos: { x: 0, y: 0 } };
  currentMap.itemList.push(key);

  CollisionController = {
    isTouching: () => key  // Simulate touching a key item
  };

  player.checkItemCollision();

  console.assert(player.keys === 1, "❌ Should increase the number of keys");
  console.assert(currentMap.itemList.length === 0, "❌ Key should be removed");
  console.log("✅ testPlayerCollectKey passed.");
}

function testPlayerUseKeyOnDoor() {
  const player = new Player();
  player.keys = 1;

  // ✅ Mock
  currentMap = createMockMap();
  const door = { type: "door", pos: { x: 0, y: 0 } };
  currentMap.itemList.push(door);

  CollisionController = {
    isTouching: () => door  // Simulate touching a door item
  };

  LevelController = {
    nextLevelCalled: false,
    nextLevel() {
      this.nextLevelCalled = true;
    }
  };

  player.checkItemCollision();

  console.assert(player.keys === 0, "❌ Should consume a key");
  console.assert(LevelController.nextLevelCalled === true, "❌ Should switch to the next level");
  console.log("✅ testPlayerUseKeyOnDoor passed.");
}

function testPlayerIsAlive() {
  const player = new Player();
  player.lives = 1;
  console.assert(player.isAlive() === true, "❌ Player should be alive");

  player.lives = 0;
  console.assert(player.isAlive() === false, "❌ Player should be dead");
  console.log("✅ testPlayerIsAlive passed.");
}

function testPlayerMoveLeft() {
    const player = new Player();
    player.pos.x = 100;
  
    // ✅ Mock
    currentMap = createMockMap();
  
    // Simulate that there is no wall or obstruction
    player.moveLeft();
  
    console.assert(player.pos.x === 95, "❌ Player should move left by 5 units");
    console.log("✅ testPlayerMoveLeft passed.");
  }
  
  function testPlayerMoveRight() {
    const player = new Player();
    player.pos.x = 100;
  
    // ✅ Mock
    currentMap = createMockMap();
  
    // Simulate that there is no wall or obstruction
    player.moveRight();
  
    console.assert(player.pos.x === 105, "❌ Player should move right by 5 units");
    console.log("✅ testPlayerMoveRight passed.");
  }
  
  function testPlayerJump() {
    const player = new Player();
    player.pos.y = 100;
  
    // ✅ Mock
    player.onWall = () => "bottom"; // Simulate standing on the ground
    player.jump();
  
    console.assert(player.velocity.y === -17, "❌ Jump velocity should be -17");
    console.assert(player.pos.y === 100, "❌ Player's position should not change until gravity acts");
    console.log("✅ testPlayerJump passed.");
  }

  function testPlayerShoot() {
    console.log("✅ Running testPlayerShoot...");
  
    const testPlayer = new Player();
    testPlayer.pos = createVector(100, 100); 
    currentMap = {
      xOffset: 0,
      yOffset: 0,
      blocks: Array(10).fill().map(() => Array(10).fill(0)) // blank map
    };
  
    mouseX = 200;
    mouseY = 150;
  
    let originalPistol = pistol;
    if (originalPistol !== 0 && originalPistol !== 1) {
      pistol = 0;
      originalPistol = 0;
    }
  
    testPlayer.togglePistol();
    console.assert(pistol === 1 - originalPistol, `🔁 togglePistol failed. Expected ${1 - originalPistol}, got ${pistol}`);
  
    testPlayer.togglePistol();
    console.assert(pistol === originalPistol, `🔁 togglePistol failed to toggle back. Expected ${originalPistol}, got ${pistol}`);
  
    const shootType = "blue";
    testPlayer.shoot(shootType);
  
    console.assert(testPlayer.bullet instanceof Bullet, "❌ Bullet was not created properly.");
    console.assert(testPlayer.bullet.type === shootType, `❌ Bullet type mismatch. Expected ${shootType}, got ${testPlayer.bullet.type}`);
  
    const vel = testPlayer.bullet.velocity.copy().setMag(1);
    console.assert(!isNaN(vel.x) && !isNaN(vel.y), `❌ Bullet velocity is invalid: ${testPlayer.bullet.velocity}`);
  
    console.log("✅ testPlayerShoot passed.");
  }
  
  function testBulletReflection() {
    console.log("✅ Running testBulletReflection...");
    setupMockVectorSystemIfNeeded();
  
    // ✅ Mock 一切相关方法
    Bullet.prototype.getEntryDirection = function () {
      console.log("🧪 Mocked entry direction: right");
      return "right";
    };
  
    const map = createMockMap();
    const wall = new DirectionWall(250, 250, [5, 0], "reflectRight");
    wall.direction = ["right"];
    map.blocks[5][5] = wall;
    currentMap = map;
  
    globalThis.mouseX = 275;
    globalThis.mouseY = 275;
    const bullet = new Bullet(350, 250, mouseX, mouseY, [0, 5], "blue");
  
    const result = bullet.update();
  
    console.log("➡️ Entry direction =", bullet.getEntryDirection());
    console.log("📌 Block type =", wall.type);
    console.log("📌 Allowed directions =", wall.direction);
    console.assert(bullet.velocity.x < 0, "❌ bullet x 方向应反转为负数");
    console.log("✅ testBulletReflection passed.");
  }
  

  function testPlayerTeleportation() {
    console.log("✅ Running testPlayerTeleportation...");
  
    const map = createMockMap();
  
    // 假设从右侧 portal 传送到左侧 portal
    map.blocks[5][6] = new Portal(6 * 50, 5 * 50, [3, 1], "blue", "left");
    map.blocks[5][3] = new Portal(3 * 50, 5 * 50, [2, 1], "red", "right");
  
    currentMap = map;
  
    const player = new Player();
    player.pos.x = 6 * 50 - 10;  // 靠近入口 portal 的左边
    player.pos.y = 5 * 50;
  
    const before = player.pos.copy();
    player.teleport();
    const after = player.pos;
  
    console.assert(before.x !== after.x || before.y !== after.y, "❌ 玩家位置应改变");
    console.log("✅ testPlayerTeleportation passed.");
  }
  
  function testPlayerPortalEntryDirectionStrict() {
    console.log("✅ Running testPlayerPortalEntryDirectionStrict...");
  
    const player = new Player();
  
    // ✅ top 门：从上进入 ✅，从下进入 ❌
    const map1 = createMockMap();
    map1.blocks[10][10] = new Portal(10 * 50, 10 * 50, [0, 1], "blue", "top");
    map1.blocks[8][8] = new Portal(8 * 50, 8 * 50, [1, 1], "red", "bottom");
    currentMap = map1;
  
    player.pos.x = 10 * 50;
    player.pos.y = 10 * 50 - 49; // ✅ 从上方进入 top
    before = player.pos.copy();
    player.teleport();
    after = player.pos.copy();
    console.assert(before.x !== after.x || before.y !== after.y, "❌ 从上进入 top 门应传送");

  
    player.pos.x = 10 * 50;
    player.pos.y = 11 * 50; // ❌ 从下进入 top
    before = player.pos.copy();
    player.teleport();
    after = player.pos.copy();
    console.assert(before.x === after.x && before.y === after.y, "❌ 从下进入 top 门不应传送");
  
    // ✅ bottom 门：从下进入 ✅，从上进入 ❌
    const map2 = createMockMap();
    map2.blocks[8][8] = new Portal(8 * 50, 8 * 50, [0, 1], "blue", "bottom");
    map2.blocks[6][6] = new Portal(6 * 50, 6 * 50, [1, 1], "red", "top");
    currentMap = map2;
  
    player.pos.x = 8 * 50;
    player.pos.y = 9 * 50; // ✅ 从下进入 bottom
    before = player.pos.copy();
    player.teleport();
    after = player.pos.copy();
    console.assert(before.x !== after.x || before.y !== after.y, "❌ 从下进入 bottom 门应传送");
  
    player.pos.x = 8 * 50;
    player.pos.y = 7 * 50; // ❌ 从上进入 bottom
    before = player.pos.copy();
    player.teleport();
    after = player.pos.copy();
    console.assert(before.x === after.x && before.y === after.y, "❌ 从上进入 bottom 门不应传送");
  
    // ✅ left 门：从左进入 ✅，从右进入 ❌
    const map3 = createMockMap();
    map3.blocks[5][12] = new Portal(12 * 50, 5 * 50, [0, 1], "blue", "left");
    map3.blocks[4][4] = new Portal(4 * 50, 4 * 50, [1, 1], "red", "right");
    currentMap = map3;
  
    player.pos.x = 11 * 50;
    player.pos.y = 5 * 50; // ✅ 从左进入 left
    before = player.pos.copy();
    player.teleport();
    after = player.pos.copy();
    console.assert(before.x !== after.x || before.y !== after.y, "❌ 从左进入 left 门应传送");
  
    player.pos.x = 13 * 50;
    player.pos.y = 5 * 50; // ❌ 从右进入 left
    before = player.pos.copy();
    player.teleport();
    after = player.pos.copy();
    console.assert(before.x === after.x && before.y === after.y, "❌ 从右进入 left 门不应传送");
  
    // ✅ right 门：从右进入 ✅，从左进入 ❌
    const map4 = createMockMap();
    map4.blocks[12][6] = new Portal(6 * 50, 12 * 50, [0, 1], "blue", "right");
    map4.blocks[14][8] = new Portal(8 * 50, 14 * 50, [1, 1], "red", "left");
    currentMap = map4;
  
    player.pos.x = 7 * 50;
    player.pos.y = 12 * 50; // ✅ 从右进入 right
    before = player.pos.copy();
    player.teleport();
    after = player.pos.copy();
    console.assert(before.x !== after.x || before.y !== after.y, "❌ 从右进入 right 门应传送");
  
    player.pos.x = 5 * 50;
    player.pos.y = 12 * 50; // ❌ 从左进入 right
    before = player.pos.copy();
    player.teleport();
    after = player.pos.copy();
    console.assert(before.x === after.x && before.y === after.y, "❌ 从左进入 right 门不应传送");
  
    console.log("✅ testPlayerPortalEntryDirectionStrict passed.");
  }
  
  
  
  
  