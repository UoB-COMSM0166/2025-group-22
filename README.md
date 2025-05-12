# 2025-group-22
2025 COMSM0166 group 22


## Our Game

<p align="center">
  <img src="https://github.com/UoB-COMSM0166/2025-group-22/blob/main/images/image_title.png" width="550">
</p>

Link to our game [PLAY HERE](https://uob-comsm0166.github.io/2025-group-22/UI/)

Link to our demo video [Video Demonstration](https://youtu.be/5f1Fr8TCwSo)

## Contents

- [1. Development team](#1development-team)
- [2. Introduction](#2introduction)
- [3. Requirements](#3requirements)
  - [3.1. Ideation Process](#31ideation-process)
  - [3.2. Paper Prototypes](#32paper-prototypes)
  - [3.3. Feasibility Studies](#33feasibility-studies)
  - [3.4. Identify Stakeholders](#34identify-stakeholders)
  - [3.5. Epics and User Stories](#35epics-and-user-stories)
  - [3.6. Use-cases Breakdown](#36use-cases-breakdown)
  - [3.7. Reflection](#37reflection)
- [4. Design](#4design)
  - [4.1. Initial Design](#41initial-design)
  - [4.2. Final Design and Refactoring](#42final-design-and-refactoring)
  - [4.3. Class and Interaction Details](#43class-and-interaction-details)
  - [4.4. Gameloop and State Transition](#44gameloop-and-state-transition)
  - [4.5. Sound and Graphics](#45sound-and-graphics)
- [5. Implementation](#5implementation)
  - [5.1. Challenge1 Bullet Collision Detection and Portal Generation Process](#51challenge1-bullet-collision-detection-and-portal-generation-process)
    - [5.1.1. Stage 1: Basic Detection and Early Problems](#511-stage-1-basic-detection-and-early-problems)
    - [5.1.2. Stage 2: Trying to Detect Direction](#512-stage-2-trying-to-detect-direction)
    - [5.1.3. Stage 3: Final Optimization for Precise Collision](#513-stage-3-final-optimization-for-precise-collision)
  - [5.2. Challenge2: Creating Precise and Reliable Collision Detection Systems](#52challenge2--creating-precise-and-reliable-collision-detection-systems)
    - [5.2.1. Player-Block Collision](#521player-block-collision)
    - [5.2.2. Player-Enemy Collision](#522player-enemy-collision)
    - [5.2.3. Player-Item Collision](#523player-item-collision)
  - [5.3. Summary of Key Collision Parameters](#53summary-of-key-collision-parameters)
- [6. Evaluation](#6evaluation)
  - [6.1. Qualitative Evaluation](#61qualitative-evaluation)
    - [6.1.1. Evaluate the Design and Process](#611evaluate-the-design-and-process)
    - [6.1.2. Task Content Design](#612task-content-design)
    - [6.1.3. Summary of the Problem Theme](#613summary-of-the-problem-theme)
    - [6.1.4. Adjust the Response Measures](#614adjust-the-response-measures)
  - [6.2. Quantitative Evaluation (NASA-TLX and SUS)](#62quantitative-evaluationnasa-tlx-and-sus)
    - [6.2.1. Evaluation of Design and Process](#621evaluation-of-design-and-process)
    - [6.2.2. Statistical Analysis Results](#622statistical-analysis-results)
    - [6.2.3. Subsequent Improvement Measures](#623subsequent-improvement-measures)
  - [6.3. Discussion and Reflection](#63discussion-and-reflection)
    - [6.3.1. Level Experience Differences and Challenge Design](#631level-experience-differences-and-challenge-design)
    - [6.3.2. Usability Issues and Learning Disabilities](#632usability-issues-and-learning-disabilities)
    - [6.3.3. Design Response Effectiveness and Subsequent Planning](#633design-response-effectiveness-and-subsequent-planning)
  - [6.4. Summary](#64summary)
  - [6.5. Testing](#65testing)
    - [6.5.1. White Box Testing](#651white-box-testing)
    - [6.5.2. Black Box Testing](#652black-box-testing)
- [7. Sustainability](#7sustainability)
  - [7.1. Sustainability Analysis Framework (SusAF) Results](#71sustainability-analysis-framework-susaf-results)
  - [7.2. Green Foundation Implementation Patterns](#72green-foundation-implementation-patterns)
  - [7.3. Sustainability User Stories and Green Software Foundation Patterns](#73sustainability-user-stories-and-green-software-foundation-patterns)
- [8. Process](#8process)
- [9. Conclusion](#9conclusion)
- [10. Contribution Statement](#10contribution-statement)


## Project Report
### 1.Development Team

<p align="center">
  <img src="https://github.com/UoB-COMSM0166/2025-group-22/blob/main/images/Group-22.jpg" width="550">
</p>

<div align="center">

| Group member | Name         | Email                  |GitHub Username|
| :---:   | :---:    | :---:   |:---:   |
| 1            | Qiwei Lian   | vr24936@bristol.ac.uk  | SH1ROd |
| 2            | Gaochang He  | co24396@bristol.ac.uk  | HeGaochang |
| 3            | Yi-Chun Chi  | ws24986@bristol.ac.uk  | YCC317 |
| 4            | Xu Hu        | ty24832@bristol.ac.uk  | xh7210zo |
| 5            | Wenqi Xue    | qh24128@bristol.ac.uk  | kk0998 |
| 6            | Hao Jen Shih | qf24044@bristol.ac.uk  | HaoJenShih |
</div>

### 2.Introduction

Twilight Seeker is a puzzle platformer that combines spatial teleportation with precise control mechanics. Players must strategically use two types of portals to traverse and solve intricately designed mazes. Inspired by two classic games — Super Mario and Portal — we blended the responsive movement of Super Mario with Portal’s portal-based navigation system.

Additionally, we have introduced the "reflection wall" mechanism: bullets bounce back according to the direction they enter, requiring players to predict the bullet trajectory and combine it with the portal to achieve optimal position.

The player’s main goal is to collect the keys and reach the exit gate while avoiding the enemy's attacks. The character is controlled using the keyboard for movement and the mouse to shoot portals. As the game progresses, players will encounter moving enemies and multi-layered teleportation combinations, which not only test their reactions but also challenge their spatial reasoning skills.

We also strongly encourage players to explore. To support this, each level is designed with multiple routes and includes a scoreboard function to record the time taken to complete it. After each run, players can see whether they’ve improved on their previous completion time.

This project is written in JavaScript and utilizes the p5.js library to implement visuals and physics effects. In addition to realizing core game functions, we are committed to delivering a smooth player experience by ensuring that essential information is always accessible through the game interface. Accordingly, we clearly display the player’s health, key count, and pistol status, and provide each interface with a consistent title and options layout. We also strive to give responsive feedback to every player’s action, further enhancing the overall user experience.

We believe that Twilight Seeker can bring an unprecedented experience for players who enjoy thinking strategically and pushing their operational limits.

### 3.Requirements 

#### 3.1.Ideation process

In the early stage of our game development, we held a brainstorming meeting to define our direction. Each team members brought one or two inspiring games and shared them in the meeting. The initial inspirations included a variety of mechanics (see table below), providing solutions for our subsequent development.

When deciding on our direction, we consider two main aspects. First, we wanted to practice key techniques in 2D game development such as movement, collision detection, and item systems—core elements with strong learning value.  Second, we aimed to design something that balances mechanical challenge with strategic thinking, so we leaned toward puzzle-style gameplay.

Although we discussed narrative-driven games like Papers, Please, which emphasize moral decisions and text-based storytelling, we concluded that such designs were less suitable for our timeframe and technical scope. To ensure feasibility while retaining learning and creative value, we evaluated all proposed ideas and finalized our choice through anonymous voting.

We selected Twilight Seeker as one of the two projects. It combines platforming mechanics inspired by Super Mario with Portal-style spatial teleportation, and introduces a reflection wall system that reflects bullets based on entry angles. This feature enhances spatial reasoning and tactical depth. As it aligned with both our learning objectives and gameplay ambitions, we adopted it for full development.

#### 3.2.Paper Prototypes

In the third workshop, we developed paper prototypes for our two games — Twilight Seeker (originally 2D Jumper) and Cross Fire — to help the team and playtesters better understand core mechanics and gameplay.

The paper prototype helped our team clearly visualize game concepts and identify early design issues. In Twilight Seeker, for example, the decision to make enemies non-attackable was an intentional choice that arose during prototyping discussions.

The paper prototypes also improved communication with non-developers. We received peer feedback and adjusted our designs accordingly. For instance, a question about what counts as a failure led us to refine the enemy system.
#### 3.3.Feasibility Studies

In addition to paper prototype, we evaluated the technical feasibility of core gameplay systems. This included assessing the complexity of portal collisions, post-teleport position correction, and bullet reflection angle calculations within the physics engine.

Accurate bullet reflection required calculating incidence and reflection angles at each impact point using vector math. We also ensured that characters retain velocity and gravity after portal transitions to preserve consistent physics behavior.

The portal and bullet systems also brought up practical design questions, especially around aiming accuracy. We tackled this by adding a simple crosshair to help players target more precisely. We also explored ideas like double teleportation and time-slow zones but dropped them due to time and complexity. As a result, we focused on making bullet reflection and portal mechanics to ensure system stability and a smooth gameplay experience.

During UI and map design, we sketched multiple interface drafts to clarify screen transitions and user interactions. These covered the full flow—from the main menu to the in-game interface and final result screens. This visual planning helped ensure a consistent and coherent user experience.

#### 3.4.Identify Stakeholders

To support our design process, we identified key stakeholders and analyzed their needs using the Onion Model. Stakeholders were grouped into four layers based on their influence and involvement, from core users to external supporters.

Players, as the primary target group of this project, form the core layer. Based on their play styles and motivations, we categorized them into three types:

##### Speed Runners: 

Focused on speed, these players value precision in controls and efficient level layouts.

##### Puzzle Game Players: 

Motivated by problem-solving, these players enjoy logical and spatial challenges and value the satisfaction of gradual discovery.
##### Casual Players:

Drawn to a relaxed pace, these players value intuitive interactions, appealing visuals, and overall atmosphere.

To meet the needs of players and provide stable and interesting game content, the second level consists of the team members responsible for development, including:

##### Game Developers:

Implement core systems and maintain gameplay logic.

##### Game Designers:

Create levels and mechanics that support challenge and variety.

##### Artists:

Responsible for visual assets, including characters, scenes, and animations.

##### Testers:

Identify bugs and help fine-tune game balance.

##### Project Manager:

Coordinates timelines, task assignment, and team communication.

The outer level consists of Supporters who not directly involved in the development, provide important external feedback and initial testing support, including:

##### Peer and Friends:

Provided early testing, feedback, and observational input during informal play sessions.

##### Broader Audience:

Potential future players who may contribute external perspectives and help shape public reception.

This layered structure allowed us to align design decisions with the expectations of each group, providing a clear foundation for later stages such as testing and refinement.

<p align="center">
  <img src="https://github.com/UoB-COMSM0166/2025-group-22/blob/main/images/onion_model.png" width="550">
</p>

#### 3.5.Epics and User Stories

Despite involving different types of users, players remain our primary focus. Based on the three player types identified earlier, we developed targeted user stories, grouped under two core epics to support efficient development and user-centered design.

##### Epic 1:

It offers a diverse and strategic gaming experience, allowing players of different styles to find fulfilling gameplay

##### Epic 2:

Ensure the accessibility and user-friendliness of game operation, supporting flexible control, clear feedback, and a low learning threshold

##### Speed Runners

Players who aim to complete the game as quickly as possible by optimizing routes and minimizing downtime.

As a speed runner, I want a game that offers multiple routes to complete levels, so I can experiment and find the fastest path to victory. (Epic 2)

As a speed runner, I want a game that allows me to skip opening cutscenes, so I can focus on completing the game as quickly as possible. (Epic 2)

As a speed runner, I want a game that includes a built-in timer, so I can clearly track how much time I spend on each run. (Epic 1)

##### Puzzle Game Players

Players who enjoy logical challenges, spatial reasoning, and step-by-step problem-solving.

As a puzzle game player, I want a game that has a progressive difficulty curve, so I can learn the mechanics before tackling more difficult puzzles. (Epic 1)

As a puzzle game player, I want a game that allows trial and error, so I don’t have to restart the entire level due to a single mistake. (Epic 2)

As a puzzle game player, I want a well-designed instruction system that supports learning, so I can improve my problem-solving skills as I play. (Epic 2)

##### Casual Players

Players who prefer a relaxed experience with intuitive controls and immersive storytelling.

As a casual player, I want intuitive tutorials and visual instruction, so I can quickly understand how to play without reading long instructions. (Epic 2)

As a casual player, I want short levels and the ability to pause at any time, so I can complete stages during short breaks without needing a long, continuous play session. (Epic 2)

As a casual player, I want a game that has an engaging storyline, so I can connect with the main character and enjoy the experience. (Epic 1)

#### 3.6.Use-Cases Breakdown

To systematically represent user–system interactions, we developed a use case diagram illustrating how different player types initiate game functions and receive system responses. This diagram supports design clarity by outlining functional triggers, user roles, and feedback mechanisms, and serves as a reference for further development stages.
(Use Case Diagram)

#### 3.7.Reflection

The analysis of epics and user stories clarified our development direction and shaped the design to reflect the needs of different player types. The two core epics focused on maximizing enjoyment and reducing learning barriers.

Specific user stories were translated into concrete features: to reduce frustration, we implemented a health system that displays remaining attempts; for speed-oriented players, we added an in-game timer to track completion time.

To confirm these implementations met expectations, we defined clear acceptance criteria for key functions. For example:

##### In-game timer:

It should accurately show the players elapsed time and be placed in the upper-right corner for easy reference by speedrunners
 (linked to Speed Runner Story 3).

##### Health system:

The remaining attempts should be clearly marked visually and avoid blocking the Player's operation perspective 
(linked to Puzzle Player Story 2).

These design and validation efforts address the core needs of different player types while enhancing overall usability and clarity.

### 4.Design

#### 4.1.Initial Design

In the early stage of development, we designed the game’s module architecture based on functional requirements and followed object-oriented principles to separate core elements into individual classes. Key components such as Player, Enemy, Item, and Bullet each encapsulate their own state and behavior for better modularity and reusability.

Similarly, each UI screen was implemented as a separate class inheriting from a common UI base, allowing consistent rendering and interaction logic. However, logic within the wall-related classes was not well separated at the time, leading to oversized classes and reduced maintainability.
#### 4.2.Final Design and Refactoring

As the project's functions gradually expanded, we gradually realized that while defining each entity as a separate class gave the system a clear structure, it also introduced a lot of repetitive logic and made it harder to manage.

During the Easter holiday, we reorganized the system by introducing clearer module separation and controller-based logic, gradually moving toward an MVC architecture.

In the new design, we kept the object-oriented structure and added several specific controllers to handle different types of logic separately.

##### GameController: 
Manages overall game state transitions, including starting, pausing, and ending the game, as well as controlling the game timer.

##### InputController: 
Responsible for handling keyboard and mouse input behaviors.

##### LevelController:
Manages level switching, progress storage and unlocking mechanisms.

##### CollisionController:
Performs collision detection and spatial queries for player, enemy, and environmental interactions.

Most of these controllers use static classes, which makes it easier to call them anywhere in the program and keep the logic more separate.

In addition, we used inheritance to improve the data model. For example, special walls like Portal and Reflection inherit from DirectionWall, so they can share position and drawing logic. This helped us avoid repeating code and made things easier to maintain.

#### 4.3.Class and Interaction Details

Our game uses object-oriented programming (OOP) and follows a modular structure based on the MVC architecture. 

##### Models
This type includes all visible and interactive objects on the field:

##### Player: 
Responsible for the status management of players (position, health points, bullets, teleportation, etc.) and behavioral logic (movement, jumping, shooting, collision handling).

##### Bullet: 
Represents the teleportation bullet fired by the player, featuring reflection, direction determination, and portal creation logic.

##### Enemy:
A unified category for all enemy types, including movement logic.

##### Item:
Includes all interactive items such as keys, potions, treasure chests, and portals, with floating animations and type recognition.

##### Wall, DirectionWall, Portal:
Static block types that make up the map, some of which have directionality and collision interactivity. Portal and DirectionWall inherit from Wall and share location and drawing logic.

##### Controller

The controller category is uniformly responsible for the management of game logic and process, and is implemented in a static way to facilitate cross-module calls.

##### GameController:
Controls game state switching (start, pause, restart, win, game over).
LevelController: Responsible for level switching, time storage, unlock determination, and progress storage.

##### InputController:
Manages user input (keyboard and mouse) and converts it into player actions or game control behaviors.

##### CollisionController:
Encapsulates collision logic, including obtaining blocks, collision type detection.
User interface category

All screens (such as StartUI, PauseUI, GuideUI, WinUI, etc.) are inherited from the UI parent class, and the buttons and background drawing are uniformly managed.

The UIManager automatically switches the displayed UI category based on the current gameState and provides floating effects and hover judgments.

Guide is an in-game guidance and prompt module. It displays prompt text and animations based on the player's position to guide the player to understand the operation method.

#### 4.4.GameLoop and State Transition

This Game uses the draw() function of p5.js as the main Game Loop. Each frame determines the content and logic execution of the screen update based on the current gameState. The state management of the game adopts a state machine design, controlling the overall process through the global variable gameState. 

##### Example of game state transition

If the player's life drops to zero, gameState will change to "gameOver", and UIManager will load the GameOverUI.

If players success through checkpoints door or treasure chest, by LevelController. NextLevel () trigger switch and progress, eventually converted to "win" state.

The user can switch between the "playing" and "pause" states by pressing the "P" key. Press the M key to show/hide the guide interface.

##### Loop update content

When gameState === "playing", each frame will execute:

1.Background and map drawing (including parallax and animation)
2.Player position and status update
3.Bullet drawing and reflection/transmission logic update
4.Enemy and item updates
5.Timer and health system

The overall game logic is split through states and managed in combination with controllers to maintain the readability and expandability of the code.

#### 4.5.Sound and Graphics

We define the paths of all sound effects and image resources in the centralized management module and load all images and sounds at once during the preload() stage. Sound effect playback is triggered by events, such as shooting, jumping, injury, etc., each corresponding to a specific audio file and volume control. We use sprites for image resources, combining them with floating animations and parallax effects to make the visuals feel more alive. In terms of screen adaptation, all UIs and images are automatically scaled and rearranged based on canvasWidth.
 
### 5.Implementation

#### 5.1.Challenge1: Bullet Collision Detection and Portal Generation Process

Bullet collision detection and portal generation form a precise, coordinated system: during flight, the bullet continuously checks block collisions using getBlock and isEnteringAllowed.  On hitting a solid block, it reflects;  on hitting a portal-compatible block, it uses surface normals (getNormal) and position data (getBlockCenter, getEntryDirection) to generate a correctly oriented portal.  This logic, refined through iterations in models/Bullet.js, ensures accurate behavior and consistent portal placement.  However, in models/Bullet.js, this system was not built in one step.  The logic behind bullet collision detection and direction handling went through several iterations and improvements before reaching the final efficient and accurate solution:

##### 5.1.1.Stage 1: Basic Detection and Early Problems
Initially, collision detection relied on checking if the bullet's position was inside a block's bounding box. It worked for simple cases—air blocks let the bullet pass; solid blocks destroyed it. However, due to limited refresh rates, bullets sometimes passed through blocks before being detected. Moreover, this method lacked direction awareness, making it unsuitable for features like portals. It was efficient but unreliable in complex situations.

##### 5.1.2.Stage 2: Trying to Detect Direction

To address direction detection, Plan 2 divided each block into four triangles using diagonals. The triangle the bullet entered helped estimate its incoming direction, enabling portal logic. But the method struggled with edge and corner cases, often causing errors. It also introduced extra complexity, making the system harder to maintain despite its improved accuracy.

##### 5.1.3.Stage 3: Final Optimization for Precise Collision

Plan 3 calculates where the bullet's path intersects a block’s edges to identify the first contact side. This geometry-based method offers precise, stable direction detection—even along edges or corners. In rare cases like hitting corners exactly, the bullet is removed to avoid complex logic. This solution is now the most accurate and reliable in the system.

#### 5.2.Challenge2 : Creating precise and reliable collision detection systems

We also encountered the challenge of creating precise and reliable collision detection systems to ensure smooth and realistic player interactions with blocks, enemies, and items while maintaining fairness and control over game mechanics: 

##### 5.2.1.Player-Block Collision

Player-block collision restricts movement to prevent passing through walls and supports gravity and jump detection. The getBlockClass(offX, offY) function checks block types (e.g., "Wall", "DirectionWall", "Portal"). Horizontal detection uses offsets (5, 25) in moveLeft() and moveRight(), while vertical detection aligns the player during falling and landing with updateGravity(). The onWall() method identifies player states like standing, falling, or hitting their head. The system uses grid alignment (50px/block) and pixel-level detection for realistic movement and to avoid errors.

##### 5.2.2.Player-Enemy Collision

Enemy collision detects when the player is hurt by an enemy. The system uses CollisionController.getCollidingEnemy(this, 40) to check for enemies within 40 pixels. For regular enemies, damage is triggered upon contact, and for "spike" enemies, it checks if the player steps on the lower half. Damage triggers sound effects, reduces health, and sets injured = true. An immunity timer of 120 frames prevents continuous damage, ensuring fairness and control over game pacing.

##### 5.2.3.Player-Item Collision

Item collision detects nearby items within 40 pixels. Using CollisionController.isTouching(this, "item", 40), items like potions (health restore) and keys (inventory) are picked up. Once collected, items are removed from the map, and their effects are applied (e.g., unlocking doors). The 40-pixel detection range improves pickup fluidity and avoids duplicates, ensuring accurate interactions.

#### 5.3.Summary of Key Collision Parameters
| Parameter                | Value               | Usage Scenario                                            | Meaning and Design Purpose                                                                   |
| ------------------------ | ------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `this.size`              | `50`                | Player width and height                                   | Standard character size, used as the base for the collision bounding box                     |
| Offset `5, 25`           | `5`, `y: 25`        | Detecting left and right walls during horizontal movement | Ensures detection near the edges, not the center, to improve accuracy                        |
| Enemy detection radius   | `40`                | Enemy proximity check                                     | Sufficient to trigger a collision without causing false triggers                             |
| Item detection radius    | `40`                | Checking proximity to items (potions, keys)               | High tolerance to improve player item pickup experience                                      |
| Spike danger zone height | `enemy.size / 2`    | Special case for spikes                                   | Only causes damage when the player actually steps on the lower part of the spike             |
 

### 6.Evaluation

#### 6.1.Qualitative Evaluation

##### 6.1.1.Evaluate the design and process

To observe user reactions during gameplay, we used the Think Aloud method. Eight participants played three levels each, averaging 35 minutes. Before each session, the facilitator explained the task and encouraged players to verbalize their thoughts. Two observers recorded spoken feedback and noted emotional reactions, especially signs of confusion or frustration.

##### 6.1.2.Task content design

Each participant was asked to complete three main tasks:

1. Trigger both the reflection and teleportation mechanics at least once.

2. Figure out how to clear each level on their own.

3. Finish all three stages from start to end.

These tasks were designed to cover the game’s core interactions and structure, so we could see how players understood and responded during actual gameplay.

##### 6.1.3.Summary of the problem theme

Based on the analysis of the observation records, the repetitive problems that participants encountered during the game can be summarized into the following three major themes:

##### Assumption of incorrect operation:

1.Many participants mistakenly believed that the space bar could be used for jumping

2.There is an operation function where users confuse the E key with the C key.

##### Difficulties in movement and interaction:

1.Insufficient jumping space makes it impossible to pass through certain areas

2.Some users lose accuracy when jumping due to changes in perspective

3.Some positions cannot be returned to the previous area.

##### The interaction mechanism is unclear:

1.Players didn’t know how many  portals could be used.

2.The reflection path and result were not as expected

3.Some areas were off-screen, making it unclear whether they had been activated or not.

##### Insufficient teaching and instruction:

1.The lack of clear operation guidance makes it difficult for beginners to quickly master the core mechanism

2.The user failed to understand the conditions and rules for the character's death.

##### Vague goals and progress:

1.Some players expressed confusion about the game mechanics and objectives.

2.It is impossible to determine which object can lead to the end of the level.

##### The challenge curve is unbalanced:

1.The overall level design is considered too difficult
2.Dying too quickly

##### Insufficient feedback mechanism:

1.The lack of clear level-passing prompts after completing tasks affects the sense of achievement and continuous motivation.

##### 6.1.4.Adjust the response measures

Based on the above problems, we have made the following design adjustments:

1.Added a sample level before the game starts to teach basic controls and interactions, helping players grasp the core mechanics early.

2.Cancel the camera offset to prevent unwanted shifts during jumping, helping players maintain a stable and clear view of the scene.

3.Set the jump key to the space bar to match players’ natural expectations

4.Adjust the map design and the intensity of enemy attacks and provide a fallback mechanism at areas prone to mistakes to reduce frustration.

5.Refined bullet reflection logic to use the actual impact point instead of the player’s center, making trajectories more predictable.

6.Create level-passing animations and visual cues to enable players to clearly identify the completion time points and progress rhythms of each level.

#### 6.2.Quantitative evaluation（NASA-TLX and SUS）

##### 6.2.1.Evaluation of Design and Process

To compare the differences in subjective workload among different levels and evaluate the usability of the overall system, NASA-TLX and SUS questionnaires were conducted in this study. A total of 20 participants (N = 20) were recruited. Each of them experienced three levels in sequence and filled out the Raw NASA-TLX questionnaire after each level. After completing all the levels, the participants filled out the System Usability Scale (SUS) questionnaire for the overall game interface.

To ensure the quality of the data and the understanding of the participants, we briefly explain the game rules before the assessment and avoid interfering with their natural operations during the process. To reduce the burden of the questionnaire, the SUS assessment is uniformly conducted after the completion of the three stages. This study set the significance level at α = 0.05.

##### 6.2.2.Statistical analysis results

Level Load Difference Analysis (NASA-TLX) conducted paired analysis through the Wilcoxon symbol level test. The subjective load scoring results among the three groups of levels are as follows:

The first and second levels: W = 31, which is lower than the critical value of 52, achieving statistical significance.

The second and third levels: W = 36.5, which is also lower than the critical value and significant.

The first and third levels: W = 27, which is also below the critical value and significant.

Overall, the comparisons of the three groups of levels all reached statistical significance, indicating that there were substantial differences in the degree of load felt by users among the three levels.

The overall average score of the System Availability Assessment (SUS) was 59, which was lower than the generally recognized usability benchmark score of 68. This indicates that the overall usability evaluation of the system was low, and users still had doubts about the interface design and operation process.

##### 6.2.3.Subsequent improvement measures

Based on the quantitative analysis results and the overall feedback from users, we further implemented the following improvement designs:

1.After entering the game, the camera will automatically and briefly guide players to the main collected items and clearing items to help them quickly identify the location of the mission targets.

2.A new M key quick description function has been added, allowing players to check control methods and command descriptions at any time.

3.In the sample level, add explanatory scenarios, such as demonstrating that although the ground stab can cause damage, it will not block the bullet reflection, to clarify common misunderstandings and operational errors of players.

#### 6.3.Discussion and Reflection

##### 6.3.1.Level Experience Differences and Challenge Design

According to the analysis results of NASA-TLX, the load perception among the three levels shows significant differences, indicating that the current level design has clear distinctions in terms of challenge level and operational burden. This can be regarded as the initial evidence that the game has an "advanced difficulty curve". However, based on qualitative observations and player feedback, the challenge curves of some levels are considered too steep, which may affect the willingness to learn and continue playing.

<p align="center">
  <img src="https://github.com/UoB-COMSM0166/2025-group-22/blob/main/images/NASA_TXL_result.png" width="550">
</p>

##### 6.3.2.Usability Issues and Learning Disabilities

The SUS score results indicate that the overall usability does not reach the average level. Combined with the common problems during the Think Aloud process, it shows that many players have difficulties in operation understanding, target identification and feedback acquisition, especially in the absence of guidance or explanations. These problems are all directly related to the "learning ability" and "clarity" of the system and may also be important factors affecting the SUS score.

<div align="center">

| Nember | SUS Score         |
| :---:   | :---:    |
| 1            | 75 |
| 2            | 45 |
| 3            | 82.5 |
| 4            | 92.5 |
| 5            | 62.5 |
| 6            | 65 |
| 7            | 50 |
| 8            | 82.5 |
| 9            | 32.5 |
| 10           | 70 |
| 11           | 22.5 |
| 12           | 47.5 |
| 13           | 80 |
| 14           | 50 |
| 15           | 42.5 |
| 16           | 50 |
| 17           | 92.5 |
| 18           | 35 |
| 19           | 50 |
| 20           | 52.5 |
</div>

##### 6.3.3.Design Response Effectiveness and Subsequent Planning

In response to the issues identified in the user experience, the team has implemented multiple design optimization measures, including strengthening teaching guidance, adjusting perspective logic, optimizing control design, and increasing positive feedback. These adjustments are expected to help players better understand the game mechanics and controls, thereby improving overall usability and user experience.

#### 6.4.Summary

This study conducted a comprehensive evaluation of the user experience, focusing on both interface design and level structure, using qualitative and quantitative methods. The findings indicate that while the current system performs reasonably well, there remains room for improvement in usability and operational efficiency. By systematically identifying key issues and implementing targeted refinements, we aim to further smooth the learning curve, enhance overall gameplay quality, and establish a solid foundation for future design iterations.

#### 6.5.Testing

##### 6.5.1.White Box Testing

We developed a custom JavaScript test setup (similar to Jest) to verify core game logic. Tests focused on internal mechanics—such as gravity, portals, collisions, bullet reflections, and enemy behaviors—with an emphasis on Player, Enemy, and Bullet classes. These components directly affect gameplay, so we tracked changes in position, velocity, state, and interactions following key actions.

##### Player Mechanics:

Functions such as jump(), moveLeft(), and interactions like collecting items (heart, key) and using portals and doors.

Collision responses, including injury mechanics, invincibility frames, and teleportation via portals.

State changes like position updates, life count, key inventory, and shooting mechanics.

##### Enemy Mechanics:

Enemy response to collision with walls, such as reversing direction or resetting position.

Proper animation and velocity adjustments upon interaction with the environment.

##### Bullet Mechanics:

Bullet reflections on special walls (reflective walls) and accurate destruction upon collision with solid walls or mismatched portals.

Correct calculation of entry directions to portals and accurate portal placements based on bullet interactions.

##### Tools and Setup:

Custom test files: testPlayer.js, testEnemy.js

Mock environment setup (withMockEnv) for isolated testing

Mock versions of CollisionController, LevelController, and game maps to isolate specific logic tests

Controlled creation of vectors and map data using mock systems

Assertions using console.assert() for verifying expected behaviors

Manual play sessions were also conducted regularly to identify and rectify bugs not evident from automated tests alone.

##### 6.5.2.Black Box Testing

We also conducted black box testing by simulating gameplay without accessing internal code. This included testing controls, item interactions, enemy behavior, bullet mechanics, and overall functionality across multiple levels from the player’s perspective.


### 7.Sustainability

#### 7.1.Sustainability Analysis Framework (SusAF) Results

The sustainability evaluation of our game using the Sustainability Analysis Framework (SusAF) reveals strong performance across social, individual, environmental, economic, and technical dimensions. Socially, the game promotes user guidance through interfaces like GuideUI.js, supporting better decision-making and reducing waste. The animated LoadingUI.js improves user experience by easing wait anxiety. Educationally, the game fosters critical thinking, enhancing awareness of sustainability issues. On the individual level, it protects user privacy by avoiding data collection and improves autonomy by allowing level choice. It supports lifelong learning and encourages healthier gaming behaviors through reduced waste and better habits. Environmentally, functions like preload() and draw() optimize resources through lazy loading and frame rate control, reducing power consumption. These are complemented by efficient checks like isTouching(), contributing to lower carbon emissions. Economically, user retention is improved through rewarding mechanisms, while modular code design enables cost-effective scalability and potential monetization. Technically, the modular design supports easy maintenance and security, setting a foundation for scalable green software development and promoting adherence to technical standards. Overall, the game balances immediate, enabling, and systemic sustainability impacts effectively.

#### 7.2.Green Foundation Implementation Patterns

Our game integrates several Green Software Foundation patterns to reduce environmental impact while enhancing performance. Efficient Algorithms are applied in CollisionController.js, where optimized methods like getBlockAt() improve performance by minimizing redundant calculations. Lazy Loading is used in Sketch.js to defer non-critical asset loading, reducing memory usage. Caching is evident in Player.js, where getBlockClass() stores computed results to reduce processing load. We also adopted an Event-Driven Architecture in InputController.js by responding to user input via event handlers, which avoids resource-heavy polling. In Bullet.js, we implemented Resource Pooling by reusing bullet instances, thereby saving on object creation and garbage collection. Additionally, Asynchronous Processing is used in Guide.js for smooth animation playback without blocking the main thread, and Minimal Resource Usage is practiced in UI.js, where the draw() function only renders essential UI elements. These patterns collectively ensure that the game operates with lower energy consumption and more efficient use of computing resources. By integrating these green software patterns, we not only reduce our carbon footprint but also establish our codebase as a model for sustainable game development.

#### 7.3.Sustainability User Stories and Green Software Foundation Patterns

To further embed sustainability into our project, we implemented Sustainability User Stories aligned with the Green Software Foundation’s best practices. For example, to reduce energy consumption, we added logic in Sketch.js that lowers the frame rate when the game runs in the background. This conserves device power and prolongs battery life. To optimize resource loading, we tailored the preload() function to load only the assets required for the current scene, minimizing memory usage and load time. Additionally, to educate users, GuideUI.js includes in-game environmental tips, helping players build awareness about conservation. These stories enhance both user experience and ecological responsibility. From a development perspective, we continue to apply GSF patterns such as Efficient Algorithms and Lazy Loading to maintain system efficiency. Looking ahead, we plan to extend these strategies by evaluating our codebase for further energy-saving opportunities, refining the use of events and caching, and continuously testing performance post-optimization. This dual-pronged approach—combining user-centered sustainability goals with technical green software patterns—ensures our game remains environmentally responsible while delivering a high-quality user experience.

<p align="center">
  <img src="https://github.com/UoB-COMSM0166/2025-group-22/blob/main/images/sustainability_awareness_diagram.png" width="550">
</p>

### 8.Process 

To effectively drive project progress, we adopted the agile development methodology and completed three Sprints.

#### The first Sprint (before week 6): 

Implement the initial version of the game and the basic interface.

#### The second Sprint (before week 12):

Integrate the user interface and game logic part and complete the development of the main functions.

#### The third Sprint (before submission):

Optimize based on user feedback to enhance the overall gaming experience and completion.

After each Sprint, we would review the current progress, adjust the to-do list, and reflect on the parts that need improvement.

In the early stage of development, we held a regular physical meeting weekly. During the meeting, we discussed the completion of the previous week's tasks, planned tasks for the current week, and provided support for the difficulties encountered by the members. During the Easter holiday, to accelerate the development pace, we increased the meeting frequency to once every three days. While early meetings emphasized system architecture, the focus in the later stages shifted more toward enhancing user experience and integrating feedback.

Regarding task implementation, we assigned tasks based on functional modules. However, this approach often led to multiple members simultaneously modifying the same code block, causing integration confusion. Therefore, we changed to adopt the Pair Programming mode for collaboration, which not only solved the conflict problem but also improved the debugging and development efficiency. We used the Live Share feature of VS Code for synchronous collaboration, enabling joint programming and real-time communication even remotely.

In addition to technical cooperation, we also attached importance to team learning. We paired experienced members with those who are relatively less familiar with coding. Each pairing was not only about completing tasks but also a process of mutual learning and reflection. Through this mode, we found that everyone's programming logic and architectural thinking have significantly improved.

Therefore, although tasks were initially assigned based on predefined roles, team members often supported one another whenever someone encountered difficulties. As a result, individuals frequently took on multiple responsibilities. Nevertheless, the team structure remained identifiable, consisting of one project manager, two back-end developers, two front-end developers, and one test engineer.

To manage version control and ensure that all members had access to the complete program, we used GitHub to maintain our codebase. This ensured that everyone was always working on the latest version of the code. GitHub was especially helpful during development, as it allowed us to easily revert to earlier versions whenever unexpected issues occurred.

In terms of project management, we used Asana's Kanban board to manage the task progress of work and divide the tasks into “To Do”, “Doing” and “Done”. This helped us determine whether the task has been stalled for too long and clarify the priorities. Although Asana provided structured task tracking, its limited accessibility and lack of instant communication features made it less efficient for our fast-paced iterations. WeChat, on the other hand, allowed for more immediate coordination, quick status updates, and better integration with our daily communication habits.

In addition to technical development, we also placed great importance on team communication, as we believe it is a key factor in a successful project. During the development process, we encountered several instances of differing opinions. Whenever such situations arose, we would first clarify our ultimate goal and evaluate whether the conflicting ideas contributed to achieving it. If an idea aligned with the objective, we adopted it; if not, the proposal was rejected. Having a shared sense of purpose was also one of the key factors that kept us motivated and ultimately led to the successful completion of the project.

Finally, when we further integrated the functions and conducted user tests, we found that the original program architecture was not easy to maintain. Therefore, we carried out a systematic refactoring in the third Sprint. This refactoring not only improved the readability and scalability of the program but also laid a more stable foundation for subsequent development.

### 9.Conclusion

Twilight Seeker is a puzzle game that combines traditional platform-jumping elements with spatial teleportation mechanisms. Starting from a concept that integrates two types of portals, bullet reflections, and dynamic enemies, we successfully created a game that delivers both responsive control and strategic depth. Despite the challenges of time pressure and functional complexity, the team collaborated effectively to complete all core systems and level designs, demonstrating a high level of commitment and execution.

In the early stages of the project, we independently designed each game object as separate classes, emphasizing encapsulation and modularity. However, as the number of features increased, this approach led to significant code repetition and management difficulties. In response, we conducted comprehensive refactoring and adopted controller-based architecture that follows the MVC principle. Apart from the two main challenges we faced, the refactoring process was also one of the most painful parts of the project. The difficulty was identifying which parts of the code could be modularized, while making sure that the existing features would not break.

To simplify our code structure, we used inheritance to reuse common logic in related classes. This reduced the repeated code and made the system easier to manage. For more complex features like portals and bullet reflections, we applied vector calculations, collision direction detection, and movement rules to ensure the game behaves in a stable and consistent way.

We adopted agile development practices, including Scrum sprints, daily stand-up meetings, and pair programming, to coordinate our workflow and address issues promptly. Each team member worked on their respective branches and merged through collaborative integration. User testing and questionnaire feedback helped us refine the UI and improve overall user experience.

Throughout the development process, we encountered several technical challenges. One of the most significant was building a precise and reliable bullet collision system. It had to detect contact with reflective and portal-compatible surfaces while identifying directional entry points for proper portal generation. This system evolved through multiple stages—from basic bounding-box detection to triangle-based estimation, and finally to a geometry-based edge detection method that improves accuracy. This issue troubled us for quite some time, as it was one of the core features of our project. We also developed a reliable framework for player collision detection. From realistic gravity handling to responsive enemy contact with immunity frames and smooth item pickup logic, these systems collectively support a controlled gameplay experience.

Through these challenges, we learned valuable lessons—not only in system design and debugging, but also in team communication, rapid iteration, and user-centered thinking. We realized the importance of adaptable architecture, sustainable code practices, and real-world testing in delivering a polished product. This progress helped us grow from individual programmers into collaborative system designers.

For the future, we plan to continue developing Twilight Seeker in the following directions:

#### 1.Cross-platform support: 

Optimize screen scaling and interaction to deliver a mobile-friendly version.

#### 2.Guidance and teaching optimization:

Improve beginner onboarding and test interface revisions using A/B testing.

#### 3.User-generated Content:

Implement a level editor to allow players to create and share custom challenges, extending the game's lifespan and community engagement.

Ultimately, Twilight Seeker is not only a technical achievement, but also a concrete expression of our teamwork, adaptability, and user-oriented design capabilities. This project has not only deepened our technical proficiency but also reinforced the importance of designing with the player at the center. 

### 10.Contribution Statement

<div align="center">

| Group member | name         | role                  |Contribution|
| :---:   | :---:    | :---:   |:---:   |
| 1            | Qiwei Lian   | back-end developer | 1.0 |
| 2            | Gaochang He  | front-end developer | 1.0 |
| 3            | Yi-Chun Chi  | project manager | 1.0 |
| 4            | Xu Hu        | test engineering | 1.0 |
| 5            | Wenqi Xue    | back-end developer | 1.0 |
| 6            | Hao Jen Shih | front-end developer | 1.0 |
</div>
