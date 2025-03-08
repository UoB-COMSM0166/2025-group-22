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

#### 2.1. Game Inspriation

| Game | Mechanics                  |
| :---   | :---   |
| Super Mario Bros            | Platform Jumping: Players need to jump to avoid enemies and traps and collect props.Level Progression: Each level has a starting point and an end point, and the player needs to reach the end flagpole.Enemy Interaction: Stomp on enemies or use props (e.g. fireballs) to destroy them.Props Enhancement: Eat mushrooms to get bigger and flowers to get attack ability. |
| Minecraft     | Sandbox building: players can gather resources (e.g. wood, stone) and construct buildings, tools and decorations.Survival Challenge: Manage life and hunger levels and deal with monster threats (e.g. zombies, creepers).Creation Mode: Unlimited resources and flight abilities, focus on free building and design.Exploration and Adventure: Randomly generated infinite worlds, including different biomes, dungeons and ultimate bosses (Mordor).Multiplayer online: support for co-operative building, adventure or competitive play, interacting with other players through the server. | 
| Hotline Miami     | Fast-paced combat: Players pursue efficient combos by using precise manoeuvres to quickly eliminate enemies with melee weapons or firearms.High difficulty and one-hit kills: Both players and enemies can be knocked out in one hit, emphasising planning and reaction speed.Level Strategy: Choose different routes and tactics for each level, while wearing character masks to gain special abilities.Retro Aesthetics: Combines pixel art style and 80's neon atmosphere with intense electronic music to shape a unique experience. | 
| Portal     | Portal Gun: the player uses the device to create two connected portals for travelling through walls, floors and obstacles.Physics Puzzle: Solve puzzles using gravity, inertia and the properties of the portals, such as jumping to hard-to-reach areas.Linear levels: Each level is designed with independent puzzles that gradually guide the player through complex techniques. | 
| Papers, Please      | Border Inspection: Players take on the role of an immigration officer who examines the passports and documents of those entering the country and decides whether to release or deny them.  Rule Changes: Over time, entry policies are updated to check for additional documents or identify falsified information.  Time Management: a fixed number of hours in a day and the need to complete work quickly to earn an income while maintaining a family.  Moral Choice: Players make choices between rules, prizes and human nature, affecting the ending and story development.   | 

#### 2.2. Game Ideas

| Game | Mechanics                  | Challenges                  |
| :---   | :---   |:---   |
| Portal 2D            | <img src="https://github.com/UoB-COMSM0166/2025-group-22/blob/main/images/Portal.png" width="500"><br>1. Physical Engine: For instance, the trajectory of bullets, the gravity, the speed of the matchstick man and the movements of the matchstick man should all be considered.<br>2. Puzzle solving: The players should brainstorm to solve the different puzzles to arrive the goal, such as they should plan where should they go first to trigger some mechanism or they may fall in traps.<br>3. bject collision: The matchstick man can’t pass through some walls or jump over some mechanisms. The players should generate portals to pass them instea.d<br>4. Multiple levels: The difficulty will increase level by level. For example, the players might use more portal in the late levels, or have to spend more time to think about how to arrive the goal. | 1. It is necessary to accurately calculate the angle, speed, and gravity of the bullet to ensure that they can hit a specific wall.<br>2. Smoothly and accurately control the speed, jumping, landing, and interaction with the environment of the matchstick man to avoid the delay or abnormal behavior caused by complex physical calculations.<br>3. Make sure the speed of the character through the portal is maintained, (or changed in some special cases or portals), and the game environment is updated correctly.<br>4. Avoid dead ends, such as cases of unlimited bullet ejection, we can limit the number of bullets ejection. And avoid sending the portal to an illegal location.<br>5. New ideas, such as reversing the effects of gravity in some of the increased difficulty levels, or adding some time constraints.|
| Hotline Miami     | <img src="https://github.com/UoB-COMSM0166/2025-group-22/blob/main/images/Hotline Miami.png" width="500"><br>1. Attack Methods: Follow the mouse. Melee weapons have a semicircular attack range around the player, and their speed decays with distance when the weapen was being thrown. Firearms and throwing weapons follow the mouse direction.<br>2. Bullets: Different items have different bullet speeds and spreads. This can be achieved by setting random values within different ranges.<br>3. Movement Speed: The movement speed of the player and different types of enemies is fixed but varies between them.<br>4. Walls: Players will be detected around glass walls, and bullets can pass through the glass. Moving behind solid walls will prevent the detection of enemies and block their bullets. This is determined by detecting if the player is staying behind solid walls.<br>5. Death: The player dies instantly when being hit and restart from the checkpoint.<br>6. Victory Condition: The level is cleared when all enemies are detected to be eliminated and the game is saved. | 1. AI Logic: Implement patrols at fixed locations and enemy locking within a fixed range. After locking onto an enemy, the AI will automatically pathfind to the latest location where the player was detected and use their weapons.<br>2. Boss: Has more attack methods.|

### 3. Requirements 

- 15% ~750 words
- Use case diagrams, user stories. Early stages design. Ideation process. How did you decide as a team what to develop? 

### 4. Design

- 15% ~750 words 
- System architecture. Class diagrams, behavioural diagrams. 

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
