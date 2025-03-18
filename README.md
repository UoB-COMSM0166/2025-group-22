# 2025-group-22 (Twilight Seeker)
2025 COMSM0166 group 22


## Game

Link to your game(demo)[PLAY HERE](https://uob-comsm0166.github.io/2025-group-22/UI/)

Your game lives in the [/docs](/docs) folder, and is published using Github pages to the link above.

Include a demo video of your game here (you don't have to wait until the end, you can insert a work in progress video)


## Progress

- [Week1](https://github.com/UoB-COMSM0166/2025-group-22/tree/main/conference/week01)

- [Week2](https://github.com/UoB-COMSM0166/2025-group-22/tree/main/conference/week02)

- [Week3]()


## Project Report Contents

#### · [1. Group Formation](#1-group-formation)

#### · [2. Introduction](#2-introduction)

#### · [3. Requirements](#3-requirements)


## 1. Group Formation

<p align="center">
  <img src="https://github.com/UoB-COMSM0166/2025-group-22/blob/main/images/Group-22.jpg" width="550">
</p>

<div align="center">

| Group member | name         | email                  |role|
| :---:   | :---:    | :---:   |:---:   |
| 1            | Qiwei Lian   | vr24936@bristol.ac.uk  |    |
| 2            | Gaochang He  | co24396@bristol.ac.uk  |    |
| 3            | Yi-Chun Chi  | ws24986@bristol.ac.uk  |    |
| 4            | Xu Hu        | ty24832@bristol.ac.uk  |    |
| 5            | Wenqi Xue    | qh24128@bristol.ac.uk  |    |
| 6            | Hao Jen Shih | qf24044@bristol.ac.uk  |    |

</div>


## 2. Introduction 

<div align="center">
Game Inspriation
</div>

| Game | Mechanics                  |
| :---   | :---   |
| Super Mario Bros            | Platform Jumping: Players need to jump to avoid enemies and traps and collect props.Level Progression: Each level has a starting point and an end point, and the player needs to reach the end flagpole.Enemy Interaction: Stomp on enemies or use props (e.g. fireballs) to destroy them.Props Enhancement: Eat mushrooms to get bigger and flowers to get attack ability. |
| Minecraft     | Sandbox building: players can gather resources (e.g. wood, stone) and construct buildings, tools and decorations.Survival Challenge: Manage life and hunger levels and deal with monster threats (e.g. zombies, creepers).Creation Mode: Unlimited resources and flight abilities, focus on free building and design.Exploration and Adventure: Randomly generated infinite worlds, including different biomes, dungeons and ultimate bosses (Mordor).Multiplayer online: support for co-operative building, adventure or competitive play, interacting with other players through the server. | 
| Hotline Miami     | Fast-paced combat: Players pursue efficient combos by using precise manoeuvres to quickly eliminate enemies with melee weapons or firearms.High difficulty and one-hit kills: Both players and enemies can be knocked out in one hit, emphasising planning and reaction speed.Level Strategy: Choose different routes and tactics for each level, while wearing character masks to gain special abilities.Retro Aesthetics: Combines pixel art style and 80's neon atmosphere with intense electronic music to shape a unique experience. | 
| Portal     | Portal Gun: the player uses the device to create two connected portals for travelling through walls, floors and obstacles.Physics Puzzle: Solve puzzles using gravity, inertia and the properties of the portals, such as jumping to hard-to-reach areas.Linear levels: Each level is designed with independent puzzles that gradually guide the player through complex techniques. | 
| Papers, Please      | Border Inspection: Players take on the role of an immigration officer who examines the passports and documents of those entering the country and decides whether to release or deny them.  Rule Changes: Over time, entry policies are updated to check for additional documents or identify falsified information.  Time Management: a fixed number of hours in a day and the need to complete work quickly to earn an income while maintaining a family.  Moral Choice: Players make choices between rules, prizes and human nature, affecting the ending and story development.   | 

After discussion, our group members selected five games that we thought could serve as inspiration. These games cover different gameplay and design concepts, which can provide a rich reference for our game development. For example, Super Mario Bros. provides inspiration for character movement, obstacle avoidance, and item systems with its classic platform-jumping mechanics and level design. Portal is known for its innovative teleportation guns and object understanding puzzles, which provide us with unique ways to interact and solve puzzles that enrich the challenge of the game.

The core mechanics of these games provided valuable inspiration for our project, and we wanted to combine the best of them to create a game experience that was both challenging and fun.

<div align="center">
Game Ideas
</div>

| Game | Mechanics                  | Challenges                  |
| :---   | :---   |:---   |
| Twilight Seeker            | <img src="https://github.com/UoB-COMSM0166/2025-group-22/blob/main/images/Portal.png" width="500"><br>1. Physical Engine: For instance, the trajectory of bullets, the gravity, the speed of the matchstick man and the movements of the matchstick man should all be considered.<br>2. Puzzle solving: The players should brainstorm to solve the different puzzles to arrive the goal, such as they should plan where should they go first to trigger some mechanism or they may fall in traps.<br>3. bject collision: The matchstick man can’t pass through some walls or jump over some mechanisms. The players should generate portals to pass them instea.d<br>4. Multiple levels: The difficulty will increase level by level. For example, the players might use more portal in the late levels, or have to spend more time to think about how to arrive the goal. | 1. It is necessary to accurately calculate the angle, speed, and gravity of the bullet to ensure that they can hit a specific wall.<br>2. Smoothly and accurately control the speed, jumping, landing, and interaction with the environment of the matchstick man to avoid the delay or abnormal behavior caused by complex physical calculations.<br>3. Make sure the speed of the character through the portal is maintained, (or changed in some special cases or portals), and the game environment is updated correctly.<br>4. Avoid dead ends, such as cases of unlimited bullet ejection, we can limit the number of bullets ejection. And avoid sending the portal to an illegal location.<br>5. New ideas, such as reversing the effects of gravity in some of the increased difficulty levels, or adding some time constraints.|
| Cross Fire     | <img src="https://github.com/UoB-COMSM0166/2025-group-22/blob/main/images/Hotline Miami.png" width="500"><br>1. Attack Methods: Follow the mouse. Melee weapons have a semicircular attack range around the player, and their speed decays with distance when the weapen was being thrown. Firearms and throwing weapons follow the mouse direction.<br>2. Bullets: Different items have different bullet speeds and spreads. This can be achieved by setting random values within different ranges.<br>3. Movement Speed: The movement speed of the player and different types of enemies is fixed but varies between them.<br>4. Walls: Players will be detected around glass walls, and bullets can pass through the glass. Moving behind solid walls will prevent the detection of enemies and block their bullets. This is determined by detecting if the player is staying behind solid walls.<br>5. Death: The player dies instantly when being hit and restart from the checkpoint.<br>6. Victory Condition: The level is cleared when all enemies are detected to be eliminated and the game is saved. | 1. AI Logic: Implement patrols at fixed locations and enemy locking within a fixed range. After locking onto an enemy, the AI will automatically pathfind to the latest location where the player was detected and use their weapons.<br>2. Boss: Has more attack methods.|

These are the two games we have chosen after some discussion. First, Twilight Seeker combines an understanding of puzzles and physics, with the core challenge being the physical calculation of the portal, the logic of the character's movement, and the rationality of the puzzle design. The fun of games is that they allow players to solve complex problems with limited resources, while keeping the game flowing and playable. Cross Fire, which emphasizes player reaction speed and tactical decision making. Its core challenges lie in the AI design of monsters and physical collision detection. With different types of enemies and Boss designs, it is possible to provide a richer combat experience while testing the player's operational ability and strategic thinking.

## 3. Requirements 

### Paper Prototypes

In workshop3, we created paper prototypes for both games we designed, so that players and everyone in the development team could understand the core gameplay and mechanics of the games. (2D Jumper: https://youtu.be/Vv2zbfhl6WI
  Cross Fire: https://youtu.be/X4RS6Jgd0k) For example in Twilight Seeker, the core portal mechanic, How to create a portal and how to teleport through it. At the same time, it mimics the change of the game screen according to the movement of the player, which is also one of the possible problems that we need to solve during the development process.

### Feasibility Studies
In addition to the paper prototype, we have also drawn some pictures to illustrate the most important game mechanics, such as the mechanism of defeating monsters and picking up items in Cross Fire, as well as the picture effect of players shooting, which also reminds us that since players need to interact with the map to get different items, Designing a map becomes a much more painstaking process. In Twilight Seeker, the portal mechanic also brought up a lot of other issues to consider, such as controlling the trajectory of bullets and collision detection, how to get bullets to the exact square that the player needs to hit, which led us to the consensus that crosshair should be designed specifically for the map screen.
The gravity factor was also a consideration in the design, with the player needing to fall at normal speed when normally encountering blank parts of the map (i.e. air), and maintaining the same speed when passing through the portal as before.

In the design of paper prototype, we also found that due to the fixed screen size, many parts of the map may be out of the screen, and players may jump and fall, which makes the picture players see on the screen in the vertical direction is updated in real time, which is actually a challenge to the design of our map offset. After discussion, we reached a consensus that the design not only took into account the offset of the map, but also designed the left and right, up and down boundaries for the content displayed on the screen, so that the game's graphics did not change too frequently.

### Identify Stakeholders
To clarify the development direction and decision-making by identifying key stakeholders and understanding their needs and expectations. We find the satkeholders of the game can be boardly categorised into two groups: game developers and players.

For the game developers, we identify the following roles:

1. Project Manager: Oversees the development process and ensures timely delivery.
2. Game Designer: Responsible for designing game mechanics, levels, and overall gameplay experience.
3. Developers: Handle programming and implementation of game features.
4. Artists: Create visual assests such as character designs, environments, and animations.
5. Testers: Ensure the game is no bugs and provide feedback on gameplay balance and performance.

For the players, we classify them into three types:

1. Speed runners: They aim to complete the game in the shortest possible time.
2. Puzzle Game Players: They enjoy solving challenging puzzles in the game.
3. Casual Players: They prefer a more relaxed and enjoyabe gaming experience.

### User Story
To improve development efficiency and task planning, we have written user stories for each type of players.
#### Speed runners
1. As a speed runner, I want a game has mutiple routes to complete levels, so I can experiment and find the fastest path to victory.
2. As a speed runner, I want a game allow me to skip opening cutscenes, so I can focus on completing the game as quickly as possible.
3. As a speed runner, I want a game that has built-in timer, so I can clearly track how much time I have spent on my run.
#### Puzzle Game Players
1. As a puzzle game player, I want a game has progressive difficulty curve, so I can first learn the mechanics and then take on more challenging puzzles.
2. As a puzzle game player, I want a game allow trying error, so I do not have to restart entire level due to a single mistake.
3. As a puzzle game player, I want a game providing approproate hints, so I do not get stuck fot too long and end up giving up.
#### Casual Players
1. As a casual player, I want a game has visual operation cues, so I can start playing without speeding too much time learning the mechanics.
2. As a casual player, I want a game can save progress and have short completion time, so I can play during short breaks or in my free time.
3. As a casual player, I want a game has an engaging story line, so I can connect with the main character and enjoy the experience.

### 4. Design

#### System Architecture

##### User Interface
1. Menu: main menu and various state menus (level selection, pause, win, game over, etc.)
2. In-Game Interface: timer, HP, menu indicators, level indicators
3. Graphics Rendering: 2D sprite-based rendering
   
##### Game Controller
1. Player movement
   - "A" key: move left
   - "D" key: move right
   - Space key: jump
2. Partal switching
   - "E" key: trun into the ther portal
3. Shooting bullets
   - Left mouse button: fire bullet
4. Changing portal type
   - "C" key: change the portal that the player want to fire
  
##### Game logic
1. Portal Mechanism
   - The player can only enter a portal from the direction the bullet was fired and exit from the other portal of a different color.    
2. Level Design
   - The game complexity oncreses with different enemy types in each level.
4. Enemy Type
   - Slime: move back and front at a alow speed
   - Goblin: move back and forth at a fast speed
   - Dragon: shoot fireballs in a single direction
6. Item System
   - Heart: restores health
   - Key: Unlock doors
   - Door: Requires a key to open and progress.

##### Audio and Graphics
1. pixel art
2. Animation system
3. Soung Design
4. Background Music

### 5. Implementation

- 15% ~750 words

- Describe implementation of your game, in particular highlighting the three areas of challenge in developing your game. 

### 6. Evaluation

- 15% ~750 words

- One qualitative evaluation (your choice) 

- One quantitative evaluation (of your choice) 

- Description of how code was tested. 

### 7. Process 

- 15% ~750 words

- Teamwork. How did you work together, what tools did you use. Did you have team roles? Reflection on how you worked together. 

### 8. Conclusion

- 10% ~500 words

- Reflect on project as a whole. Lessons learned. Reflect on challenges. Future work. 

### Contribution Statement

- Provide a table of everyone's contribution, which may be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Let us know as soon as possible if there are any issues with teamwork as soon as they are apparent. 

### Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5%) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.

- **Documentation** of code (5%)

  - Is your repo clearly organised? 
  - Is code well commented throughout?
