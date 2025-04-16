let _originalLevelController = null;

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
  });

  // Restore the original LevelController
  LevelController = _originalLevelController;

  console.log("✅ All Player tests completed!");
}

function withMockEnv(mockFunc) {
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
      blocks: Array(20).fill().map(() => Array(20).fill({ constructor: { name: "Floor" } })),
      itemList: [],
      enemyList: [],
      blocks: [
        ...Array(20).fill().map(() => Array(20).fill({ constructor: { name: "Floor" } }))
      ]
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
  
  
  