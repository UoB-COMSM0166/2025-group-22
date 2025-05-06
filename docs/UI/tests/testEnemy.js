// === testEnemy.js ===

function runEnemyTests() {
    console.log("=== Running Enemy Tests ===");
    withMockEnv(() => {
      testEnemyReverseOnWall();
      testEnemyResetOnFireballWallHit();
    });
    console.log("✅ All Enemy tests completed!");
  }
  
  function testEnemyReverseOnWall() {
    console.log("✅ Running testEnemyReverseOnWall...");
  
    const enemy = new Enemy(100, 100, [1, 1], "slime", true);
    enemy.velocity = createVector(3, 0);
  
    // 模拟左边碰墙
    CollisionController.isSolid = (x) => x === 99;
    enemy.update();
  
    console.assert(enemy.velocity.x === -3, "❌ Enemy should reverse direction on wall hit");
    console.assert(enemy.facingLeft === true, "❌ Enemy should be facing left");
    console.log("✅ testEnemyReverseOnWall passed.");
  }
  
  function testEnemyResetOnFireballWallHit() {
    console.log("✅ Running testEnemyResetOnFireballWallHit...");
  
    const enemy = new Enemy(100, 100, [1, 1], "fireBall", true);
    enemy.pos.x = 150;
  
    CollisionController.isSolid = () => true;
    enemy.update();
  
    console.assert(enemy.pos.x === enemy.initialPos.x, "❌ Fireball enemy should reset on wall hit");
    console.log("✅ testEnemyResetOnFireballWallHit passed.");
  }
  
  runEnemyTests();
  