// Game Configuration
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let score = 0;
let gravity = 0.8;
let gameSpeed = 3;

// Cookie settings
const cookie = {
  x: 50,
  y: canvas.height - 100,
  width: 50,
  height: 50,
  velocityY: 0,
  jumpPower: -15,
  isJumping: false
};

// Obstacle settings
const obstacles = [];
const obstacleWidth = 50;
const obstacleHeight = 50;

const obstacleFrequency = 90; // How often obstacles appear (in frames)
let frameCount = 0;

// Game Functions

// Draw Cookie
function drawCookie() {
  ctx.fillStyle = "#F4A300"; // Cookie color
  ctx.beginPath();
  ctx.arc(cookie.x + cookie.width / 2, cookie.y + cookie.height / 2, cookie.width / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

// Create obstacles
function createObstacle() {
  let obstacle = {
    x: canvas.width,
    y: canvas.height - obstacleHeight,
    width: obstacleWidth,
    height: obstacleHeight
  };
  obstacles.push(obstacle);
}

// Move obstacles
function moveObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= gameSpeed;

    // Check collision with the cookie
    if (
      cookie.x + cookie.width > obstacles[i].x &&
      cookie.x < obstacles[i].x + obstacles[i].width &&
      cookie.y + cookie.height > obstacles[i].y
    ) {
      endGame();
    }

    // Remove off-screen obstacles
    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles.splice(i, 1);
      score++;
    }
  }
}

// Draw obstacles
function drawObstacles() {
  ctx.fillStyle = "#8B4513"; // Obstacle color (brown)
  for (let i = 0; i < obstacles.length; i++) {
    ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
  }
}

// Jump mechanics
function jump() {
  if (!cookie.isJumping) {
    cookie.isJumping = true;
    cookie.velocityY = cookie.jumpPower;
  }
}

// Update cookie's position
function updateCookiePosition() {
  cookie.velocityY += gravity;
  cookie.y += cookie.velocityY;

  // Prevent cookie from falling below the ground
  if (cookie.y >= canvas.height - 100) {
    cookie.y = canvas.height - 100;
    cookie.velocityY = 0;
    cookie.isJumping = false;
  }
}

// Draw score
function drawScore() {
  document.getElementById("score").innerText = `Score: ${score}`;
}

// End game
function endGame() {
  alert(`Game Over! Your score is ${score}`);
  resetGame();
}

// Reset game
function resetGame() {
  score = 0;
  obstacles.length = 0;
  cookie.y = canvas.height - 100;
  cookie.velocityY = 0;
  cookie.isJumping = false;
  gameSpeed = 3;
  frameCount = 0;
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  drawCookie();
  moveObstacles();
  drawObstacles();
  updateCookiePosition();
  drawScore();

  frameCount++;
  if (frameCount % obstacleFrequency === 0) {
    createObstacle();
  }

  requestAnimationFrame(gameLoop); // Call next frame
}

// Start game
gameLoop();

// Event listeners for user input
window.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "ArrowUp") {
    jump();
  }
});
