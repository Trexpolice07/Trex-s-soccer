// Game.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
  x: 100,
  y: canvas.height / 2,
  width: 30,
  height: 50,
  speed: 5,
  color: 'blue'
};

let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 3,
  dx: 3,
  dy: 3,
  color: 'white'
};

let keys = {
  up: false,
  down: false,
  left: false,
  right: false
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') keys.up = true;
  if (e.key === 'ArrowDown') keys.down = true;
  if (e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'ArrowRight') keys.right = true;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowUp') keys.up = false;
  if (e.key === 'ArrowDown') keys.down = false;
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowRight') keys.right = false;
});

function updatePlayer() {
  if (keys.up && player.y > 0) player.y -= player.speed;
  if (keys.down && player.y < canvas.height - player.height) player.y += player.speed;
  if (keys.left && player.x > 0) player.x -= player.speed;
  if (keys.right && player.x < canvas.width - player.width) player.x += player.speed;
}

function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Ball bouncing off walls
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) ball.dx = -ball.dx;
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) ball.dy = -ball.dy;

  // Check if player kicks the ball (simple collision detection)
  if (ball.x > player.x && ball.x < player.x + player.width && ball.y > player.y && ball.y < player.y + player.height) {
    ball.dx = -ball.dx;
    ball.dy = -ball.dy;
  }
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBall() {
  ctx.fillStyle = ball.color;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
  clearCanvas();
  updatePlayer();
  updateBall();
  drawPlayer();
  drawBall();
  requestAnimationFrame(gameLoop);
}

gameLoop();
