# 2025-group-22
2025 COMSM0166 group 22


## Our Game

Link to our game [PLAY HERE](https://uob-comsm0166.github.io/2025-group-22/)

Link to our demo video [Video Demonstration]

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

- 15% ~750 words
- Use case diagrams, user stories. Early stages design. Ideation process. How did you decide as a team what to develop? 

### 4.Design

- 15% ~750 words 
- System architecture. Class diagrams, behavioural diagrams. 

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

- 15% ~750 words

- One qualitative evaluation (your choice) 

- One quantitative evaluation (of your choice) 

- Description of how code was tested.

### 7.Sustainability

#### 7.1.Sustainability Analysis Framework (SusAF) Results

The sustainability evaluation of our game using the Sustainability Analysis Framework (SusAF) reveals strong performance across social, individual, environmental, economic, and technical dimensions. Socially, the game promotes user guidance through interfaces like GuideUI.js, supporting better decision-making and reducing waste. The animated LoadingUI.js improves user experience by easing wait anxiety. Educationally, the game fosters critical thinking, enhancing awareness of sustainability issues. On the individual level, it protects user privacy by avoiding data collection and improves autonomy by allowing level choice. It supports lifelong learning and encourages healthier gaming behaviors through reduced waste and better habits. Environmentally, functions like preload() and draw() optimize resources through lazy loading and frame rate control, reducing power consumption. These are complemented by efficient checks like isTouching(), contributing to lower carbon emissions. Economically, user retention is improved through rewarding mechanisms, while modular code design enables cost-effective scalability and potential monetization. Technically, the modular design supports easy maintenance and security, setting a foundation for scalable green software development and promoting adherence to technical standards. Overall, the game balances immediate, enabling, and systemic sustainability impacts effectively.

#### 7.2.Green Foundation Implementation Patterns

Our game integrates several Green Software Foundation patterns to reduce environmental impact while enhancing performance. Efficient Algorithms are applied in CollisionController.js, where optimized methods like getBlockAt() improve performance by minimizing redundant calculations. Lazy Loading is used in Sketch.js to defer non-critical asset loading, reducing memory usage. Caching is evident in Player.js, where getBlockClass() stores computed results to reduce processing load. We also adopted an Event-Driven Architecture in InputController.js by responding to user input via event handlers, which avoids resource-heavy polling. In Bullet.js, we implemented Resource Pooling by reusing bullet instances, thereby saving on object creation and garbage collection. Additionally, Asynchronous Processing is used in Guide.js for smooth animation playback without blocking the main thread, and Minimal Resource Usage is practiced in UI.js, where the draw() function only renders essential UI elements. These patterns collectively ensure that the game operates with lower energy consumption and more efficient use of computing resources. By integrating these green software patterns, we not only reduce our carbon footprint but also establish our codebase as a model for sustainable game development.
#### 7.3.Sustainability User Stories and Green Software Foundation Patterns

To further embed sustainability into our project, we implemented Sustainability User Stories aligned with the Green Software Foundation’s best practices. For example, to reduce energy consumption, we added logic in Sketch.js that lowers the frame rate when the game runs in the background. This conserves device power and prolongs battery life. To optimize resource loading, we tailored the preload() function to load only the assets required for the current scene, minimizing memory usage and load time. Additionally, to educate users, GuideUI.js includes in-game environmental tips, helping players build awareness about conservation. These stories enhance both user experience and ecological responsibility. From a development perspective, we continue to apply GSF patterns such as Efficient Algorithms and Lazy Loading to maintain system efficiency. Looking ahead, we plan to extend these strategies by evaluating our codebase for further energy-saving opportunities, refining the use of events and caching, and continuously testing performance post-optimization. This dual-pronged approach—combining user-centered sustainability goals with technical green software patterns—ensures our game remains environmentally responsible while delivering a high-quality user experience.

### 8.Process 

- 15% ~750 words

- Teamwork. How did you work together, what tools did you use. Did you have team roles? Reflection on how you worked together. 

### 9.Conclusion

- 10% ~500 words

- Reflect on project as a whole. Lessons learned. Reflect on challenges. Future work. 

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
