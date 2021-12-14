const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const bipSound = new Audio("../sounds/bip.wav");
const musicGame = new Audio("../sounds/sound.mp3");
musicGame.volume = 0.1;
// BALL init
const ball = {
  x: 300,
  y: 300,
  vx: 3,
  vy: -3,
  radius: 7,
  color: "red",
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};
function initPositionBlocksArray() {
  for (let i = 0; i <= bricks.columnBlocks; i++) {
    bricks.arrayBricks[i] = [];
    for (let j = 0; j <= bricks.rowBlocks; j++) {
      bricks.arrayBricks[i][j] = { x: 0, y: 0, life: 1 };
    }
  }
}

function drawBricks() {
  for (var i = 0; i <= bricks.columnBlocks; i++) {
    for (var j = 0; j <= bricks.rowBlocks; j++) {
      if (bricks.arrayBricks[i][j].life === 1) {
        let brickX =
          i * (bricks.brickWidth + bricks.brickPadding) +
          bricks.brickOffsetLeft;
        let brickY =
          j * (bricks.brickHeight + bricks.brickPadding) +
          bricks.brickOffsetTop;
        bricks.arrayBricks[i][j].x = brickX;
        bricks.arrayBricks[i][j].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, bricks.brickWidth, bricks.brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

//Block collision
function collisionDetection() {
  let leftBall = ball.x - ball.radius;
  let rightBall = ball.x + ball.radius;
  let topBall = ball.y - ball.radius;
  let bottomBall = ball.y + ball.radius;
  for (let i = 0; i <= bricks.columnBlocks; i++) {
    for (let j = 0; j <= bricks.rowBlocks; j++) {
      let b = bricks.arrayBricks[i][j];
      if (
        rightBall > b.x &&
        leftBall < b.x + bricks.brickWidth &&
        bottomBall > b.y &&
        topBall < b.y + bricks.brickHeight
      ) {
        bipSound.play();
        ball.vy *= -1;
        b.life = 0;
        b.x = 0;
        b.y = 0;
      }
    }
  }
}
//END OF BRICKS

//paddle init
const paddle = {
  x: 100,
  y: 500,
  paddleWidth: 150,
  paddleHeight: 15,
  paddleX: (canvas.width - 150) / 2,
  color: "red",
  rightPressed: false,
  leftPressed: false,
  draw: function () {
    ctx.beginPath();
    ctx.fillRect(
      paddle.paddleX,
      paddle.y,
      paddle.paddleWidth,
      paddle.paddleHeight
    );
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  },
};

//collison  paddle
function collisionPaddle() {
  if (ball.y > paddle.y && gapXPaddle()) {
    ball.vy *= -1;
  }
}
function gapXPaddle() {
  if (
    ball.x >= paddle.paddleX &&
    ball.x <= paddle.paddleX + paddle.paddleWidth
  ) {
    return true;
  } else {
    return false;
  }
}
//END OF PADDLE

//Game Arena
const bricks = {
  brickWidth: 55,
  brickHeight: 30,
  brickPadding: 5,
  brickOffsetTop: 30,
  brickOffsetLeft: 30,
  rowBlocks: 4,
  columnBlocks: 10,
  arrayBricks: [],
};

const myGameArea = {
  gameEngaged: false,
  start: function () {
    // call updateGameArea() every 20 milliseconds
    this.interval = setInterval(update, 10);
  },
  stop: function () {
    clearInterval(this.interval);
  },
  clear: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  score: 0,
};

function update() {
  myGameArea.clear();
  paddle.draw();
  ball.draw();
  drawBricks();
  collisionDetection();
  collisionPaddle();
  collisionCanvas();
  ball.x += ball.vx;
  ball.y += ball.vy;
  keyPressed();
  hitBottom();
}
function collisionCanvas() {
  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
    ball.vy *= -1;
    displayScore();
  }
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    ball.vx *= -1;
    displayScore();
  }
}
function keyPressed() {
  if (paddle.rightPressed) {
    paddle.paddleX += 7;
    if (paddle.paddleX + paddle.paddleWidth > canvas.width) {
      paddle.paddleX = canvas.width - paddle.paddleWidth;
    }
  } else if (paddle.leftPressed) {
    paddle.paddleX -= 7;
    if (paddle.paddleX < 0) {
      paddle.paddleX = 0;
    }
  }
}

//Collision canvas bottom and GAME OVER
function hitBottom() {
  let rockbottom = canvas.height - ball.radius;
  if (ball.y > rockbottom) {
    myGameArea.stop();
    musicGame.pause();
    musicGame.currentTime = 0;
    //   ball.y = rockbottom;
    //   clearInterval(intervalId);
  }
}
//END OF GAME ARENA

//LISTENERS
function displayScore() {
  myGameArea.score += 1;
  const scoreDiv = document.querySelector("#score");
  scoreDiv.innerHTML = myGameArea.score;
}
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    paddle.rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    paddle.leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    paddle.rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    paddle.leftPressed = false;
  }
}

initPositionBlocksArray();

document.addEventListener("keydown", (e) => {
  if (!myGameArea.gameEngaged && e.keyCode == 32) {
    myGameArea.gameEngaged = true;
    myGameArea.start();
    musicGame.play();
  }
});
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
