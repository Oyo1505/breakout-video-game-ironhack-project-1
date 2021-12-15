const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const time = document.querySelector("#time");
const ball = new Ball("red", 10);
const ballTwo = new Ball("bleu", 7);
// get  elements that will serve us to display the time:
const minDecElement = document.getElementById("minDec");
const minUniElement = document.getElementById("minUni");
const secDecElement = document.getElementById("secDec");
const secUniElement = document.getElementById("secUni");
//SOUNDS
const bipSound = new Audio("../sounds/bip.wav");
const musicGame = new Audio("../sounds/sound.mp3");
const explosion = new Audio("../sounds/explosion.wav");

const chronometer = new Chronometer();
musicGame.volume = 0.1;
bipSound.volume = 0.3;

//BLOCKS
const bricks = {
  brickWidth: 55,
  brickHeight: 30,
  brickPadding: 2,
  brickOffsetTop: 30,
  brickOffsetLeft: 100,
  rowBlocks: 4,
  colors: ["#ef0909", "#0015ff", "#00ff3f"],
  columnBlocks: 10,
  arrayBricks: [],
};

function initPositionBlocksArray() {
  for (let i = 0; i <= bricks.columnBlocks; i++) {
    bricks.arrayBricks[i] = [];
    for (let j = 0; j <= bricks.rowBlocks; j++) {
      bricks.arrayBricks[i][j] = { x: 0, y: 0, status: iniStatusBlocks() };
    }
  }
}

function randomNumber(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function iniStatusBlocks() {
  let randomNumLife = randomNumber(4, 1);
  return { life: randomNumLife, color: bricks["colors"][randomNumLife - 1] };
}

function drawBrick(bricks, i, j) {
  let brickX =
    i * (bricks.brickWidth + bricks.brickPadding) + bricks.brickOffsetLeft;
  let brickY =
    j * (bricks.brickHeight + bricks.brickPadding) + bricks.brickOffsetTop;
  bricks.arrayBricks[i][j].x = brickX;
  bricks.arrayBricks[i][j].y = brickY;
  ctx.fillStyle = bricks.arrayBricks[i][j].status.color;
  ctx.beginPath();
  ctx.rect(brickX, brickY, bricks.brickWidth, bricks.brickHeight);
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (var i = 0; i <= bricks.columnBlocks; i++) {
    for (var j = 0; j <= bricks.rowBlocks; j++) {
      if (bricks.arrayBricks[i][j].status.life >= 1) {
        drawBrick(bricks, i, j);
      } else if (bricks.arrayBricks[i][j].status.life === 0) {
        bricks.arrayBricks[i][j].x = -100;
        bricks.arrayBricks[i][j].y = 0;
      }
    }
  }
}
function checkIfAllBlocksStatus() {
  let blockDead = 0;
  let numberOfBlocks = bricks.columnBlocks * bricks.rowBlocks;

  for (var i = 0; i <= bricks.columnBlocks; i++) {
    for (var j = 0; j <= bricks.rowBlocks; j++) {
      if (bricks.arrayBricks[i][j].status.life === 0) {
        blockDead += 1;
      } else if (blockDead === 55) {
        myGameArea.stop();
      }
    }
  }
}
let blockDead = 0;
//Block collision
function collisionDetection(el) {
  let leftBall = el.x - el.radius;
  let rightBall = el.x + el.radius;
  let topBall = el.y - el.radius;
  let bottomBall = el.y + el.radius;

  for (let i = 0; i <= bricks.columnBlocks; i++) {
    for (let j = 0; j <= bricks.rowBlocks; j++) {
      let b = bricks.arrayBricks[i][j];
      // console.log(collide(el, b));
      if (
        rightBall > b.x &&
        leftBall < b.x + bricks.brickWidth &&
        bottomBall > b.y &&
        topBall < b.y + bricks.brickHeight
      ) {
        if (collidedRight(el, b)) {
          el.vx *= -1;
        }
        //  bipSound.currentTime = 0;
        //  bipSound.play();
        displayScore();
        el.vy *= -1;
        b.status.life -= 1;
        updateColorBrick(b);
      }
    }
  }
}
function collidedRight(a, b) {
  if (a.x + a.vx > b.x + bricks.brickWidth) {
    return true;
  }
}
function collide(el, b) {
  let leftBall = el.x - el.radius;
  let rightBall = el.x + el.radius;
  let topBall = el.y - el.radius;
  let bottomBall = el.y + el.radius;

  var dx = el.x / 2 - (b.x + bricks.brickWidth / 2);
  var dy = el.y / 2 - (b.y + bricks.brickHeight / 2);
  var width = (rightBall + bricks.brickWidth) / 2;
  var height = (topBall + bricks.brickWidth) / 2;
  var crossWidth = width * dy;
  var crossHeight = height * dx;
  var collision = "none";
  //
  if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
    if (crossWidth > crossHeight) {
      collision = crossWidth > -crossHeight ? "bottom" : "left";
    } else {
      collision = crossWidth > -crossHeight ? "right" : "top";
    }
  }
  return collision;
}
function updateColorBrick(brick) {
  let coloIndex = bricks.colors.indexOf(brick.status.color);
  brick.status.color = bricks["colors"][coloIndex - 1];
}
//END OF BRICKS

//paddle init
const paddle = {
  x: 100,
  y: 500,
  minWidth: 75,
  paddleWidth: 150,
  paddleHeight: 15,
  paddleX: (canvas.width - 150) / 2,
  paddleY: (canvas.height - 25) / 2,
  color: "red",
  rightPressed: false,
  leftPressed: false,
  draw: function () {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.fillRect(
      paddle.paddleX,
      paddle.y,
      paddle.paddleWidth,
      paddle.paddleHeight
    );
    ctx.fill();
    ctx.save();
    ctx.closePath();
  },
};

//collison  paddle
function collisionPaddle(el) {
  if (el.y > paddle.y && gapXPaddle(el)) {
    el.vy *= -1;
  }
}
function gapXPaddle(el) {
  if (el.x > paddle.paddleX && el.x < paddle.paddleX + paddle.paddleWidth) {
    return true;
  } else {
    return false;
  }
}
//END OF PADDLE

//Game Arena
const myGameArea = {
  gameEngaged: false,
  start: function () {
    // call updateGameArea() every 20 milliseconds
    myGameArea.gameEngaged = true;
    this.interval = requestAnimationFrame(update);
  },
  stop: function () {
    // clearInterval(this.interval);
    myGameArea.gameEngaged = false;
    cancelAnimationFrame(this.interval);
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
  collisionDetection(ball);
  collisionPaddle(ball);
  collisionCanvas(ball);
  ball.movementBall();
  increaseDifficulty();
  checkIfAllBlocksStatus();
  keyPressed();
  hitBottom();
  // printScoreCanvas();
  if (myGameArea.gameEngaged) {
    requestAnimationFrame(update);
  }
}
function increaseDifficulty() {
  if (
    chronometer.getSeconds() >= 5 &&
    paddle.paddleWidth !== paddle.minWidth &&
    paddle.x <= 200
  ) {
    paddle.paddleWidth -= 1;
    paddle.x += 1;
    // ballTwo.draw()
    // ballTwo.movementBall();
    // collisionPaddle(ballTwo);
    // collisionCanvas(ballTwo);
    // collisionDetection(ballTwo)
  }
}
function collisionCanvas(el) {
  //collision right and left side
  if (el.y + el.vy > canvas.height || el.y + el.vy < 0) {
    el.vy *= -1;
    displayScore();
  } //collision bottom and top side
  if (el.x + el.vx > canvas.width || el.x + el.vx < 0) {
    el.vx *= -1;
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
    explosion.play();
    chronometer.stop();
  }
}

function printScoreCanvas() {
  if (myGameArea.score >= 1) {
    canvas.classList.add("awesome");
    //    canvas.classList.add("box-sadow-color");
    ctx.font = "italic 6rem  pixel ";
    ctx.fillStyle = "black";
    ctx.fillText("AWESOME !!", canvas.width / 6.5, 300);
    ctx.fillText(" ", canvas.width / 6.5, 300);
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

//Time
function printTime() {
  printMinutes();
  printSeconds();
}

function printMinutes() {
  setInterval(() => {
    minDecElement.innerHTML = `${chronometer
      .computeTwoDigitNumber(chronometer.getMinutes())
      .charAt(0)}`;
    minUniElement.innerHTML = `${chronometer
      .computeTwoDigitNumber(chronometer.getMinutes())
      .charAt(1)}`;
  }, 1000);
}

function printSeconds() {
  setInterval(() => {
    secDecElement.innerHTML = `${chronometer
      .computeTwoDigitNumber(chronometer.getSeconds())
      .charAt(0)}`;
    secUniElement.innerHTML = `${chronometer
      .computeTwoDigitNumber(chronometer.getSeconds())
      .charAt(1)}`;
  }, 1000);
}

initPositionBlocksArray();

printTime();

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 32) {
    chronometer.start();
    myGameArea.start();
    musicGame.play();
  }
});

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
