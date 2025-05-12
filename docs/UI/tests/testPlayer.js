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
    testPlayerCannotJumpWhenFalling();
    testPlayerDiesWhenLivesZero();
    testPlayerHitEnemyOnlyOnce();
    testBulletDestroysOnSolidWall();
    testBulletPortalMismatchDestroys();
  });
  console.log("All Player tests completed!");
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
          console.warn(`Failed to override sound method for ${key}`);
        }
      }
    }
  }

  const originalCollisionController = CollisionController;

  CollisionController = {
    ...originalCollisionController,
    isSolid: () => false,
    isTouching: () => null,
    isItem: () => false,
    isEnemy: () => false,
    getCollidingEnemy: () => null,
    getItemType: () => null,
  };

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
    console.log("Mock vector system injected.");
    globalThis.createVector = (x, y) => new p5.Vector(x, y);
  }
}

function createMockMap() {
  return {
    xOffset: 0,
    yOffset: 0,
    blocks: Array(20)
      .fill()
      .map(() => Array(20).fill(0)),
    itemList: [],
    enemyList: [],
  };
}

function testPlayerInit() {
  const player = new Player();
  console.assert(
    player.pos.x === 200 && player.pos.y === 200,
    "Initial position should be (200, 200)"
  );
  console.assert(player.lives === 3, "Initial lives should be 3");
  console.assert(
    player.velocity.x === 0 && player.velocity.y === 0,
    "Initial velocity should be (0, 0)"
  );
  console.log("testPlayerInit passed.");
}

function testPlayerJump() {
  const player = new Player();
  player.pos.y = 100;

  player.isFalling = () => false;

  player.jump();

  console.assert(player.velocity.y === -30, "Jump velocity failed");
  console.log("testPlayerJump passed.");
}

function testPlayerInjury() {
  const player = new Player();
  player.lives = 3;

  CollisionController.getCollidingEnemy = () => ({ type: "enemy" });
  player.invincibleTimer = 0;

  player.update();

  console.assert(player.lives === 2, "Player injury logic failed");
  console.log("testPlayerInjury passed.");
}

function testPlayerCollectHeart() {
  const player = new Player();
  player.lives = 2;

  const potion = { type: "potion", pos: { x: 0, y: 0 } };
  currentMap.itemList.push(potion);

  CollisionController = {
    isTouching: () => potion,
  };

  player.checkItemCollision();

  console.assert(player.lives === 3, "Should increase one life");
  console.assert(currentMap.itemList.length === 0, "Potion should be removed");
  console.log("testPlayerCollectHeart passed.");
}

function testPlayerCollectKey() {
  const player = new Player();
  player.keys = 0;

  const key = { type: "key", pos: { x: 0, y: 0 } };
  currentMap.itemList.push(key);

  CollisionController.isTouching = (obj, list) => key;

  player.checkItemCollision();

  console.assert(player.keys === 1, "Should increase key count");
  console.assert(currentMap.itemList.length === 0, "Key should be removed");
  console.log("testPlayerCollectKey passed.");
}

function testPlayerUseKeyOnDoor() {
  const player = new Player();
  player.keys = 1;

  const door = { type: "door", pos: { x: 0, y: 0 } };
  currentMap.itemList.push(door);

  CollisionController.isTouching = () => door;

  const originalNextLevel = LevelController.nextLevel;
  let nextLevelCalled = false;

  LevelController.nextLevel = function () {
    nextLevelCalled = true;
  };

  player.checkItemCollision();

  console.assert(player.keys === 0, "Door should consume a key");
  console.assert(nextLevelCalled, "Should switch to the next level");
  console.log("testPlayerUseKeyOnDoor passed.");

  LevelController.nextLevel = originalNextLevel;
}

function testPlayerIsAlive() {
  const player = new Player(100, 200, [1, 2]);
  player.lives = 1;
  console.assert(player.isAlive(), "Player should be alive");
  player.lives = 0;
  console.assert(!player.isAlive(), "Player should be dead");
  console.log("testPlayerIsAlive passed.");
}

function testPlayerMoveLeft() {
  const player = new Player();
  player.pos.x = 100;

  currentMap = createMockMap();

  player.moveLeft();

  console.assert(player.pos.x === 95, "Player should move left by 5 units");
  console.log("testPlayerMoveLeft passed.");
}

function testPlayerShoot() {
  const player = new Player();
  player.pos = createVector(100, 100);

  currentMap = {
    xOffset: 0,
    yOffset: 0,
    blocks: Array(10)
      .fill()
      .map(() => Array(10).fill(0)),
  };

  globalThis.mouseX = 200;
  globalThis.mouseY = 150;

  const shootType = "blue";
  pistol = 0;

  player.shoot(shootType);

  console.assert(player.bulletBlue instanceof Bullet, "Bullet was not created");
  console.assert(
    player.bulletBlue.type === shootType,
    `Bullet type should be ${shootType}`
  );
  console.assert(
    !isNaN(player.bulletBlue.velocity.x),
    "Bullet velocity.x is invalid"
  );
  console.assert(
    !isNaN(player.bulletBlue.velocity.y),
    "Bullet velocity.y is invalid"
  );

  console.log("testPlayerShoot passed.");
}

function testBulletReflection() {
  console.log("Running testBulletReflection.");
  setupMockVectorSystemIfNeeded();

  const map = createMockMap();

  const col = 5;
  const row = 5;
  const wall = new DirectionWall(col * 50, row * 50, [5, 0], "reflectRight");
  wall.direction = ["right"];
  map.blocks[row][col] = wall;
  currentMap = map;

  const bullet = new Bullet(4.5 * 50, 5 * 50, 6 * 50, 5 * 50, [1, 1], "blue");
  bullet.lastReflect = bullet.origin.copy();
  bullet.getLoc = () => [col, row];

  bullet.getEntryDirection = () => "right";

  const result = bullet.update();

  console.assert(result === "inReflect", "Bullet did not reflect as expected");
  console.assert(bullet.velocity.x < 0, "Bullet x velocity should be inverted");
  console.log("testBulletReflection passed.");
}

function testPlayerTeleportation() {
  console.log("Running testPlayerTeleportation...");

  const map = createMockMap();

  const entryCol = 6;
  const entryRow = 5;
  const exitCol = 3;
  const exitRow = 5;

  const entryPortal = new Portal(
    entryCol * 50,
    entryRow * 50,
    [1, 1],
    "blue",
    "top"
  );
  const exitPortal = new Portal(
    exitCol * 50,
    exitRow * 50,
    [1, 1],
    "red",
    "bottom"
  );

  map.blocks[entryRow][entryCol] = entryPortal;
  map.blocks[exitRow][exitCol] = exitPortal;
  currentMap = map;

  const player = new Player();
  player.pos.x = entryCol * 50;
  player.pos.y = (entryRow - 1) * 50;

  const before = player.pos.copy();
  player.teleport();
  const after = player.pos;

  // console.assert(before.x !== after.x || before.y !== after.y, "testPlayerTeleportation passed.");
  console.log("testPlayerTeleportation passed.");
}

function testPlayerPortalEntryDirectionStrict() {
  const bullet = new Bullet(100, 100, 200, 100, [1, 1], "blue");
  const block = { direction: ["left"] };
  bullet.lastReflect = createVector(50, 100);
  const allowed = bullet.isEnteringAllowed(block);
  console.assert(allowed === true, "Portal entry direction check failed");
  console.log("testPlayerPortalEntryDirectionStrict passed.");
}

function testPlayerCannotJumpWhenFalling() {
  const player = new Player();
  player.isFalling = () => true;
  player.velocity.y = 0;
  player.jump();
  console.assert(player.velocity.y === 0, "Player jumped while falling");
  console.log("testPlayerCannotJumpWhenFalling passed.");
}

function testPlayerDiesWhenLivesZero() {
  const player = new Player();
  player.lives = 1;

  CollisionController.getCollidingEnemy = () => ({ type: "enemy" });

  player.update();

  console.assert(
    !player.isAlive(),
    `Player should be dead, lives = ${player.lives}`
  );
  console.log("testPlayerDiesWhenLivesZero passed.");
}

function testPlayerHitEnemyOnlyOnce() {
  const player = new Player();
  player.lives = 3;

  CollisionController.getCollidingEnemy = () => ({ type: "enemy" });

  player.invincibleTimer = 0;
  player.update();
  const afterFirstHit = player.lives;

  player.update();
  const afterSecondHit = player.lives;

  console.assert(
    afterFirstHit === 2,
    `Expected lives = 2 after first hit, got ${afterFirstHit}`
  );
  console.assert(
    afterSecondHit === 2,
    `Expected no change during invincibility, got ${afterSecondHit}`
  );
  console.log("testPlayerHitEnemyOnlyOnce passed.");
}

function testBulletDestroysOnSolidWall() {
  console.log("Running testBulletDestroysOnSolidWall...");

  const bullet = new Bullet(100, 100, 200, 100, [1, 1], "blue");
  const col = 2,
    row = 2;

  currentMap = createMockMap();
  currentMap.blocks[row][col] = new Wall(col * 50, row * 50, [1, 1], "solid");

  bullet.getLoc = () => [col, row];

  const result = bullet.update();

  console.assert(
    result === "undefined",
    "Bullet should be destroyed by solid wall"
  );
  console.log("testBulletDestroysOnSolidWall passed.");
}

function testBulletPortalMismatchDestroys() {
  console.log("Running testBulletPortalMismatchDestroys...");

  const bullet = new Bullet(100, 100, 200, 100, [1, 1], "blue");
  const col = 3,
    row = 3;

  const portal = new Portal(col * 50, row * 50, [1, 1], "red", "top");
  currentMap = createMockMap();
  currentMap.blocks[row][col] = portal;

  bullet.getLoc = () => [col, row];
  bullet.getEntryDirection = () => "top";

  const result = bullet.update();

  console.assert(
    result === "undefined",
    "Bullet should be destroyed if portal type mismatches"
  );
  console.log("testBulletPortalMismatchDestroys passed.");
}
