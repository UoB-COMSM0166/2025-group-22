// === testBullet.js ===


function runBulletTests() {
    console.log("=== Running Bullet Tests ===");
    withMockEnv(() => {
      testBulletReflection();
      testBulletDestroysOnSolidWall();
      testBulletPortalMismatchDestroys();
    });
    console.log("✅ All Bullet tests completed!");
  }
  
  function withMockEnv(mockFunc) {
    setupMockVectorSystemIfNeeded();
  
    // ✅ mock sounds 防止 play() 报错
    globalThis.sounds = {
      bulletBounceSoundEffect: {
        play: () => {},
        loop: () => {},
        pause: () => {},
        stop: () => {},
      },
    };
  
    CollisionController = {
      isSolid: () => false,
      isTouching: () => null,
      isItem: () => false,
      isEnemy: () => false,
      getCollidingEnemy: () => null,
      getItemType: () => null
    };
  
    currentMap = createMockMap();
  
    bullets = [];
  
    try {
      mockFunc();
    } catch (error) {
      console.error("Test execution failed", error);
    }
  }
  
  function testBulletDestroysOnSolidWall() {
    console.log("✅ Running testBulletDestroysOnSolidWall...");
  
    const bullet = new Bullet(100, 100, 200, 100, [1, 1], "blue");
    const col = 2, row = 2;
  
    currentMap = createMockMap();
    currentMap.blocks[row][col] = new Wall(col * 50, row * 50, [1, 1], "solid");
  
    bullet.getLoc = () => [col, row];
  
    const result = bullet.update();
  
    console.assert(result === "undefined", "❌ Bullet should be destroyed by solid wall");
    console.log("✅ testBulletDestroysOnSolidWall passed.");
  }
  
  function testBulletPortalMismatchDestroys() {
    console.log("✅ Running testBulletPortalMismatchDestroys...");
  
    const bullet = new Bullet(100, 100, 200, 100, [1, 1], "blue");
    const col = 3, row = 3;
  
    const portal = new Portal(col * 50, row * 50, [1, 1], "red", "top");
    currentMap = createMockMap();
    currentMap.blocks[row][col] = portal;
  
    bullet.getLoc = () => [col, row];
    bullet.getEntryDirection = () => "top";
  
    const result = bullet.update();
  
    console.assert(result === "undefined", "❌ Bullet should be destroyed if portal type mismatches");
    console.log("✅ testBulletPortalMismatchDestroys passed.");
  }
  
  runBulletTests();
  