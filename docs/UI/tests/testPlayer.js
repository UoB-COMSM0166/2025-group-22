
// === testPlayer.js ===

function runPlayerTests() {
  console.log("=== Running Player Tests ===");
  withMockEnv(() => {
    testPlayerInit();
    testPlayerJump();
    testPlayerInjury();
    testPlayerCollectHeart();
    testPlayerCollectKey();
    testPlayerUseKeyOnDoor();
    testPlayerIsAlive();
    testPlayerMoveLeft();
    testPlayerShoot();
    testBulletReflection();
    testPlayerTeleportation();
    testPlayerPortalEntryDirectionStrict();
  });
  console.log("✅ All Player tests completed!");
}

function withMockEnv(mockFunc) {
  setupMockVectorSystemIfNeeded();

  if (globalThis.sounds) {
    const safePlay = () => {};
    for (const key in globalThis.sounds) {
      if (globalThis.sounds[key]) {
        try {
          globalThis.sounds[key].play = safePlay;
          globalThis.sounds[key].loop = safePlay;
          globalThis.sounds[key].pause = safePlay;
          globalThis.sounds[key].stop = safePlay;
        } catch (e) {
          console.warn(`⚠️ Failed to override sound method for ${key}`);
        }
      }
    }
  }

  const mockCollisionController = {
    isSolid: () => false,
    getCollidingEnemy: () => ({ type: "enemy" }),
    isTouching: () => null,
    isItem: () => false,
    isEnemy: () => false,
  };

  const originalCollisionController = CollisionController;
  CollisionController = mockCollisionController;

  currentMap = createMockMap();
  const originalLevelController = LevelController;

  bullets = [];

  try {
    mockFunc();
  } catch (error) {
    console.error("Test execution failed", error);
  } finally {
    CollisionController = originalCollisionController;
    LevelController = originalLevelController;
  }
}

function setupMockVectorSystemIfNeeded() {
  if (typeof createVector === "undefined") {
    console.log("🧪 Mock vector system injected.");
    globalThis.createVector = (x, y) => new p5.Vector(x, y);
  }
}

function createMockMap() {
  return {
    blocks: Array.from({ length: 10 }, () => Array(10).fill(null)),
    tileSize: 50,
    xOffset: 0,
    yOffset: 0,
  };
}

// === Tests ===

function testPlayerInit() {
  const player = new Player();
  console.assert(player.pos.x === 200 && player.pos.y === 200, "❌ Initial position should be (200, 200)");
  console.assert(player.lives === 3, "❌ Initial lives should be 3");
  console.assert(player.velocity.x === 0 && player.velocity.y === 0, "❌ Initial velocity should be (0, 0)");
  console.log("✅ testPlayerInit passed.");
}


function testPlayerJump() {
  const player = new Player();
  player.pos.y = 100;

  // ✅ Mock 玩家处于地面状态
  player.isFalling = () => false;

  player.jump();

  console.assert(player.velocity.y === -30, "❌ Jump velocity failed");
  console.log("✅ testPlayerJump passed.");
}


function testPlayerInjury() {
  const player = new Player(100, 200, [1, 2]);
  player.lives = 3;
  player.update();
  console.assert(player.lives === 2, "❌ Player injury logic failed");
  console.log("✅ testPlayerInjury passed.");
}

function testPlayerCollectHeart() {
  const player = new Player(100, 200, [1, 2]);
  player.lives = 2;
  player.lives += 1; // 模拟收集 heart 效果
  console.assert(player.lives === 3, "❌ Heart did not increase lives");
  console.log("✅ testPlayerCollectHeart passed.");
}

function testPlayerCollectKey() {
  const player = new Player(100, 200, [1, 2]);
  player.keys = 0;
  player.keys += 1; // 模拟收集 key
  console.assert(player.keys === 1, "❌ Key not collected");
  console.log("✅ testPlayerCollectKey passed.");
}

function testPlayerUseKeyOnDoor() {
  const player = new Player(100, 200, [1, 2]);
  player.keys = 1;
  player.keys -= 1; // 模拟用钥匙开门
  console.assert(player.keys === 0, "❌ Door use did not consume key");
  console.log("✅ testPlayerUseKeyOnDoor passed.");
}

function testPlayerIsAlive() {
  const player = new Player(100, 200, [1, 2]);
  player.lives = 1;
  console.assert(player.isAlive(), "❌ Player should be alive");
  player.lives = 0;
  console.assert(!player.isAlive(), "❌ Player should be dead");
  console.log("✅ testPlayerIsAlive passed.");
}

function testPlayerMoveLeft() {
  const player = new Player();
  player.pos.x = 100;

  // ✅ mock 地图
  currentMap = createMockMap();

  // 模拟没有阻挡
  player.moveLeft();

  console.assert(player.pos.x === 95, "❌ Player should move left by 5 units");
  console.log("✅ testPlayerMoveLeft passed.");
}


function testPlayerShoot() {
  const player = new Player();
  player.pos = createVector(100, 100);

  currentMap = {
    xOffset: 0,
    yOffset: 0,
    blocks: Array(10).fill().map(() => Array(10).fill(0))
  };

  globalThis.mouseX = 200;
  globalThis.mouseY = 150;

  const shootType = "blue";
  pistol = 0;

  player.shoot(shootType);

  console.assert(player.bullet instanceof Bullet, "❌ Bullet was not created");
  console.assert(player.bullet.type === shootType, `❌ Bullet type should be ${shootType}`);
  console.assert(!isNaN(player.bullet.velocity.x), "❌ Bullet velocity.x is invalid");
  console.assert(!isNaN(player.bullet.velocity.y), "❌ Bullet velocity.y is invalid");

  console.log("✅ testPlayerShoot passed.");
}


function testBulletReflection() {
  console.log("✅ Running testBulletReflection.");
  setupMockVectorSystemIfNeeded();

  // mock 地图
  const map = createMockMap();

  const col = 5;
  const row = 5;
  const wall = new DirectionWall(col * 50, row * 50, [5, 0], "reflectRight");
  wall.direction = ["right"]; // 允许从右边入射
  map.blocks[row][col] = wall;
  currentMap = map;

  // 子弹从左往右打入右反射墙
  const bullet = new Bullet(4.5 * 50, 5 * 50, 6 * 50, 5 * 50, [1, 1], "blue");
  bullet.lastReflect = bullet.origin.copy(); // 设置反射起点
  bullet.getLoc = () => [col, row]; // 强制命中该 block

  // mock 进入方向为 right（和反射墙匹配）
  bullet.getEntryDirection = () => "right";

  const result = bullet.update();

  console.assert(result === "inReflect", "❌ Bullet did not reflect as expected");
  console.assert(bullet.velocity.x < 0, "❌ Bullet x velocity should be inverted");
  console.log("✅ testBulletReflection passed.");
}

function testPlayerTeleportation() {
  console.log("✅ Running testPlayerTeleportation...");

  const map = createMockMap();

  const entryCol = 6;
  const entryRow = 5;
  const exitCol = 3;
  const exitRow = 5;

  const entryPortal = new Portal(entryCol * 50, entryRow * 50, [1, 1], "blue", "top");
  const exitPortal = new Portal(exitCol * 50, exitRow * 50, [1, 1], "red", "bottom");

  map.blocks[entryRow][entryCol] = entryPortal;
  map.blocks[exitRow][exitCol] = exitPortal;
  currentMap = map;

  const player = new Player();
  player.pos.x = entryCol * 50;           // = 300
  player.pos.y = (entryRow - 1) * 50;     // = 200

  const before = player.pos.copy();
  player.teleport();
  const after = player.pos;

  console.assert(before.x !== after.x || before.y !== after.y, "❌ 玩家未被传送");
  console.log("✅ testPlayerTeleportation passed.");
}

function testPlayerPortalEntryDirectionStrict() {
  const bullet = new Bullet(100, 100, 200, 100, [1, 1], "blue");
  const block = { direction: ["left"] };
  bullet.lastReflect = createVector(50, 100);
  const allowed = bullet.isEnteringAllowed(block);
  console.assert(allowed === true, "❌ Portal entry direction check failed");
  console.log("✅ testPlayerPortalEntryDirectionStrict passed.");
}
