const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

// Load the background image
const background = new Image();
background.src = 'assets/background.png';

let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 3, 0, 0, 2],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 3, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 3, 0, 3, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
// 0 = Jalan
// 1 = Tembok
// 2 = Pintu Finish
// 3 = Monster

const tileSize = 50;
const player = {
    x: 1,
    y: 1,
    size: tileSize - 10,
};
const monster = {
    x: 1,
    y: 1,
    size: tileSize - 10,
}

let playerXp = 0;
let playerLevel = 1;

// Function to draw the background image
function drawBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

function drawMonster() {
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 3) {
                ctx.fillStyle = 'rgba(25, 100, 255, 1)';
                ctx.fillRect(col * tileSize + 5, row * tileSize + 5, monster.size, monster.size);
            }
        }
    }
}

function drawMaze() {
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            // Draw Tembok
            if (maze[row][col] === 1) {
                ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            } 
            // Draw Jalan
            else if (maze[row][col] === 0) {
                ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            } 
            // Draw Pintu Finish
            else if (maze[row][col] === 2) {
                ctx.fillStyle = 'rgba(255, 0, 255, 1)';
            }
            // Draw Monster
            else if (maze[row][col] === 3) {
                ctx.fillStyle = 'rgba(25, 100, 255, 1)';
            }
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }
}

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x * tileSize + 5, player.y * tileSize + 5, player.size, player.size);
}

function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    if (maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
    } else if (maze[newY][newX] === 2) {
        player.x = newX;
        player.y = newY;
        document.getElementById('text').style.color = "black";
        location.reload();
    } else if (maze[newY][newX] === 3) {
        let input = prompt("1 + 1");
        if (input == "2") {
            maze[newY][newX] = 0; // Killing monster
            player.x = newX;      // Allow player to move
            player.y = newY;      // Allow player to move
            monsterDropXp = 2;    // Xp drop from monster
            playerXp += monsterDropXp;
        }
    }

    updateGame();
}

// Level Up Function
function levelUp() {
    requiredXpToLevel2 = 2;
    requiredXpToLevel3 = 5;

    if (playerLevel == 1 && playerXp >= requiredXpToLevel2) {
        playerLevel++;
        playerXp -= requiredXpToLevel2;
    } else if (playerLevel == 2 && playerXp >= requiredXpToLevel3) {
        playerLevel++;
        playerXp -= requiredXpToLevel3;
    }

    drawLevel();
}

function drawLevel() {
    document.getElementById('level').textContent = `Level = ${playerLevel}`;
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
        case 's':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
        case 'a':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
        case 'd':
            movePlayer(1, 0);
            break;
    }
});


function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawMaze();
    drawPlayer();
    drawMonster();
    drawLevel();
    levelUp();
}

background.onload = function () {
    updateGame();
};