const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const time = document.querySelector("#time");

// get  elements that will serve us to display the time:
const minDecElement = document.getElementById("minDec");
const minUniElement = document.getElementById("minUni");
const secDecElement = document.getElementById("secDec");
const secUniElement = document.getElementById("secUni");
//SOUNDS
const musicGame = new Audio("./sounds/sound.mp3");
const explosion = new Audio("./sounds/explosion.wav");
const final = new Audio("./sounds/final.mp3");
musicGame.volume = 0.1;
bipSound.volume = 0.3;
final.volume = 0.5;

const retryBtn = document.querySelector('#retry');
retryBtn.style.visibility = "hidden"
//INIT ELEMENTS
const chronometer = new Chronometer();
const paddle = new Paddle(100, 500, 140, 15, canvas);
const bricks = new Bricks(55, 25, 6, 10);
const ball = new Ball(400, paddle.y -5,"#7AB1F2", 5);
const ballTwo = new Ball("bleu", 7);

//Game Arena
const myGameArea = {
  gameEngaged: false,
  start: function () {
    myGameArea.gameEngaged = true;
    this.interval = requestAnimationFrame(update);
  },
  stop: function () {
    chronometer.stop();
    myGameArea.gameEngaged = false;
    cancelAnimationFrame(this.interval);
  },
  clear: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  score: 0,
};
//check number of blocks deleted
function gameIsOver(num, allBlocks) {
  if (num === allBlocks) {
    myGameArea.stop();
    musicGame.currentTime = 0;
     musicGame.pause()
    final.play()
    printStringCanvas("YOU WIN !", 5);
    canvas.classList.add("box-sadow-color");
    addScore()
  }
}

function update() {
  myGameArea.clear();
  paddle.draw();
  ball.draw();
  bricks.drawBricks();
  bricks.collisionDetection(ball);
  paddle.collisionPaddle(ball);
  collisionCanvas(ball);
  ball.movementBall();
  increaseDifficulty();
  bricks.checkIfAllBlocksStatus();
  keyPressed();
  hitBottom();
  if (myGameArea.gameEngaged) {
    requestAnimationFrame(update);
  }
}
function increaseDifficulty() {
  if (
    chronometer.getSeconds() >= 30 &&
    paddle.paddleWidth >= paddle.minWidth 
  ) {
    canvas.classList.add("awesome");
    paddle.paddleWidth -= 1;
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
    paddle.paddleX += 9;
    if (paddle.paddleX + paddle.paddleWidth > canvas.width) {
      paddle.paddleX = canvas.width - paddle.paddleWidth;
    }
  } else if (paddle.leftPressed) {
    paddle.paddleX -= 9;
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
    printStringCanvas("LOSER !!!", 4.5);
    explosion.play();
    addScore()
    retryBtn.style.visibility = "visible"
  }
}

function printScoreCanvas() {
    printStringCanvas("AWESOME", 6.5);
}
 

function printStringCanvas(str, posx) {
  ctx.font = "italic 6rem  pixel ";
  ctx.fillStyle = "black";
  ctx.fillText(`${str}`, canvas.width / posx, 300);
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

//RETRY
function retry() {
  bricks.initPositionBlocksArray();
  ball.x =450;
  ball.y=495;
  paddle.y = 500;
  chronometer.reset()
  myGameArea.score = 0
  myGameArea.stop();
  musicGame.currentTime = 0;
  musicGame.play();
  chronometer.start();
  myGameArea.start();
  retryBtn.style.visibility = "hidden"
  paddle.paddleX = (canvas.width - 150) / 2;
  paddle.paddleWidth = 150;
  if(canvas.classList.contains('awesome') || canvas.classList.contains('box-sadow-color')){
    canvas.classList.remove("awesome")
    canvas.classList.remove("box-sadow-color")
  }
}

retryBtn.addEventListener('click', retry)  


//BOARD SCORE
const liScore = document.querySelector('#scoreBoard')
let newArr = JSON.parse(localStorage.getItem("score")) || [];

function addScore() {
  if(newArr.score < myGameArea.score){
    let personalScore = { score : myGameArea.score || 0}
    localStorage.setItem("score", JSON.stringify(personalScore));
    liScore.innerHTML = myGameArea.score
  }else{
    liScore.innerHTML = newArr.score
  }

}
window.addEventListener('load', () => { // Storage will still stay after refresh
  if(newArr.length !==0)liScore.innerHTML = newArr.score;
});

//initialisation of block in the canvas
bricks.initPositionBlocksArray();
paddle.draw();
ball.draw();
bricks.drawBricks();

let gameStarted = false;

document.addEventListener("keydown", (e) => {
  if (gameStarted === false && e.keyCode == 32) {
  chronometer.start();
  myGameArea.start();
  musicGame.play();
   printTime()
   gameStarted = true
  }
});

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
