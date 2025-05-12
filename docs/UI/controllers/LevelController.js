class LevelController {
  // Play a preloaded cutscene video with specified key and callback
  static playPreloadedCutscene(videoKey, onFinish) {
    playButton.hide();
    sounds["openingBGM"].pause();
    const videoBGMJump = {
      start: 0,
      afterSample: 5 * 60,
      afterLevel1: 2 * 60 + 56,
      afterLevel2: 2 * 60 + 43,
      afterLevel3: 5 * 60 + 19,
    };
    sounds["videoBGM"].play();
    sounds["videoBGM"].jump(videoBGMJump[videoKey]);
    const video = videos[videoKey];
    const skipHint = document.getElementById("skipHint");

    video.show();
    video.position(0, 0);
    video.size(windowWidth, windowHeight);
    skipHint.style.display = "block";

    video.play();

    const cleanup = () => {
      video.stop();
      video.hide();
      skipHint.style.display = "none";
      video.elt.removeEventListener("ended", onEnded);
      document.removeEventListener("keydown", onSkip);
      onFinish();
      sounds["videoBGM"].pause();
      playButton.show();
    };
    const onEnded = () => cleanup();
    const onSkip = () => cleanup();
    video.elt.addEventListener("ended", onEnded);
    document.addEventListener("keydown", onSkip);
  }

  // Transition to the next level with appropriate cutscene
  static nextLevel() {
    const next = LevelController.getNextLevel(currentLevel);
    const videoMap = {
      sample: "afterSample",
      level1: "afterLevel1",
      level2: "afterLevel2",
      level3: "afterLevel3",
    };

    const videoKey = videoMap[currentLevel];
    if (next) {
      this.saveLevelTime();
      this.markLevelComplete(currentLevel);
      if (videoKey && videos[videoKey]) {
        this.playPreloadedCutscene(videoKey, () => {
          inputAllowed = false;
          setTimeout(() => {
            currentLevel = next;
            GameController.start(currentLevel);
            sounds["openingBGM"].play();
            inputAllowed = true;
          }, 1000);
        });
      } else {
        currentLevel = next;
        GameController.start(currentLevel);
      }
    } else {
      if (videoKey && videos[videoKey]) {
        this.playPreloadedCutscene(videoKey, () => {
          this.markLevelComplete(currentLevel);
          GameController.win();
          sounds["openingBGM"].play();
        });
      } else {
        this.markLevelComplete(currentLevel);
        GameController.win();
      }
    }
  }

  // Get the next level name based on current level
  static getNextLevel(level) {
    const levels = ["sample", "level1", "level2", "level3"];
    const index = levels.indexOf(level);
    return index >= 0 && index < levels.length - 1 ? levels[index + 1] : null;
  }

  // Restart the current level
  static resetLevel() {
    GameController.start(currentLevel);
  }

  // Jump to specified level if unlocked
  static goToLevel(level) {
    if (
      ["sample", "level1", "level2", "level3"].includes(level) &&
      this.isLevelUnlocked(level)
    ) {
      currentLevel = level;
      GameController.start(level);
    } else {
      console.warn(
        `Cannot enter ${level}, the previous level is not completed yet.`
      );
    }
  }

  // Save completion time for current level
  static saveLevelTime() {
    const key = `levelTime-${playerName}`;
    const allTimes = JSON.parse(localStorage.getItem(key)) || {};
    allTimes[currentLevel] = elapsedTime;
    localStorage.setItem(key, JSON.stringify(allTimes));
  }

  // Mark specified level as completed
  static markLevelComplete(level) {
    const key = `levelCompleted`;
    const completed = JSON.parse(localStorage.getItem(key)) || {};
    completed[level] = true;
    localStorage.setItem(key, JSON.stringify(completed));
  }

  // Check if specified level is unlocked
  static isLevelUnlocked(level) {
    const levels = ["sample", "level1", "level2", "level3"];
    const index = levels.indexOf(level);
    if (index === 0 || index === 1) return true;
    const prevLevel = levels[index - 1];

    const completed = JSON.parse(localStorage.getItem(`levelCompleted`)) || {};

    return completed[prevLevel];
  }
}