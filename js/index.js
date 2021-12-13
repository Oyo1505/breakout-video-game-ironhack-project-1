const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


 // BALL init
 const ball = {
  x: 300,
  y: 300,
  vx: 5,
  vy: 3,
  radius: 7,
  color: 'red',
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

//paddel init
const paddle = {
  x: 100,
  y: 15,
  paddleWidth: 150,
  paddleHeight: 15,
  paddleX : (canvas.width - 150) / 2,
  color: 'red',
  rightPressed :false,
  leftPressed: false,
  draw: function () {
    ctx.beginPath();
    ctx.fillRect(paddle.paddleX, 500, paddle.paddleWidth, paddle.paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
};


//Game Arena
const blocks = [];
const myGameArea = {
    gameEngaged :false,
    blocks: 83,
    start: function () {
       // ball.draw();
    // call updateGameArea() every 20 milliseconds
    this.interval = setInterval(updateGameArea, 10);
    },
    stop: function () {
        clearInterval(this.interval);
      },
    clear: function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      },
      score: function () {
        const points = Math.floor(this.frames / 5);
        ctx.font = '18px serif';
        ctx.fillStyle = 'black';
        ctx.fillText(`Score: ${points}`, 350, 50);
      },
  };
function drawBlocks(){
  //create blocks
  let gapX = 80;
  let gapY = 20;
  for(let i = 0; i <= myGameArea.blocks; i++ ){
    gapX+=45
      ctx.beginPath();
      if(i % 12 === 0 ){
        gapY+=30;
        gapX = 100;
      }
      ctx.rect(gapX, gapY, 40, 20);
      ctx.stroke();
  }
}
function cllisionBlocks(){
  //collission blocks
  for(let i = 0 ; i < myGameArea.length; i++){

  }

}

function update() {
  paddle.draw()
  ball.draw();
  drawBlocks();
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
    ball.vy *= -1;
  }
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    ball.vx *= -1;
  }

  if(paddle.rightPressed){
    paddle.paddleX += 7;
    if(paddle.paddleX + paddle.paddleWidth > canvas.width){
      paddle.paddleX = canvas.width -   paddle.paddleWidth;
    }
  }else if(paddle.leftPressed) {
    paddle.paddleX -= 7;
    if (  paddle.paddleX < 0){
      paddle.paddleX = 0;
    }
}
 // boundariesElement(canvas)
 
 //  hitBottom()

}
 //boundaries racket
 function boundariesElement(racket){
  if (ball.y + ball.vy > racket.height || ball.y + ball.vy < 0) {
    ball.vy *= -1;
  }
  if (ball.x + ball.vx > racket.width || ball.x + ball.vx < 0) {
    ball.vx *= -1;
  }
}

function hitBottom() {
  let rockbottom = canvas.height - ball.radius;
  if (ball.y > rockbottom) {
      myGameArea.stop()
  //   ball.y = rockbottom;
  //   clearInterval(intervalId);
  }
}




  function updateGameArea() {
    myGameArea.clear();
    update();
   // checkGameOver();
    //myGameArea.score();
  }

  function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        paddle.rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
      paddle.leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == "Right" || e.key == "ArrowRight") {
      paddle.rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
      paddle.leftPressed = false;
    }
}

 
  myGameArea.start()
  document.addEventListener('keydown', (e) => {
     if(!myGameArea.gameEngaged && e.keyCode == 32 ){
      myGameArea.gameEngaged = true; 
     }
  })
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

