const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


 // BALL init
 const ball = {
  x: 300,
  y: 300,
  vx: 2,
  vy: -2,
  radius: 9,
  color: 'red',
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

//paddle init
const paddle = {
  x: 100,
  y: 500,
  paddleWidth: 150,
  paddleHeight: 15,
  paddleX : (canvas.width - 150) / 2,
  color: 'red',
  rightPressed :false,
  leftPressed: false,
  draw: function () {
    ctx.beginPath();
    ctx.fillRect(paddle.paddleX, paddle.y, paddle.paddleWidth, paddle.paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
};

/*
      let gapX = 80;
      let gapY = 20;
      for(let i = 0; i <= myGameArea.numBlocks; i++ ){
        gapX+=45
          if(i % 12 === 0 ){
            gapY+=30;
            gapX = 100;
            
          }
          myGameArea.blocks.push({posX : gapX, posY: gapY, width: 20, height: 40, life: 1})
      }
*/ 
//Game Arena

const bricks = {
  brickWidth: 55,
  brickHeight: 30,
  brickPadding: 5,
  brickOffsetTop: 30,
  brickOffsetLeft: 30,
  rowBlocks : 4,
  columnBlocks: 10, 
  arrayBricks : []
}
const myGameArea = {
    gameEngaged :false,
    start: function () {;
    // call updateGameArea() every 20 milliseconds
    this.interval = setInterval(update, 10);
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

  function initPositionBlocksArray(){
  for(let i=0; i<=bricks.columnBlocks; i++) {
    bricks.arrayBricks[i] = [];
      for(let j=0; j<=bricks.rowBlocks; j++) {
        bricks.arrayBricks[i][j] = { x: 0, y: 0, life : 1 };
      }
  }
}

  function drawBricks() {
    for(var i = 0; i<= bricks.columnBlocks; i++) {
        for(var j = 0; j<= bricks.rowBlocks; j++) {
            let brickX = (i * (bricks.brickWidth + bricks.brickPadding)) + bricks.brickOffsetLeft;
            let brickY = (j * (bricks.brickHeight + bricks.brickPadding)) + bricks.brickOffsetTop;
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

//Block collision
function collisionDetection() {
  for(let i =0; i<=bricks.columnBlocks; i++) {
      for(let  j =0; j<=bricks.rowBlocks; j++) {
          let b = bricks.arrayBricks[i][j];
          if (ball.x > b.x && ball.x < b.x + bricks.brickWidth && ball.y > b.y && ball.y < b.y + bricks.brickHeight) {
            ball.vy *= -1;
            b.life = 0
          }
      }
  }
}

function blockTopCollision(block){
  // let top = block.posY;
  // let bottom = block.posY + block.height;
  // let right = block.x + block.width;
  // let left = block.x;

  // let leftBall = ball.x - ball.radius;
  // let rightBall = ball.x + ball.radius;
  // let topBall = ball.y -ball.radius;
  // let bottomBall = ball.y + ball.radius;

  //ball.x > left && ball.x < right && ball.y > top &&
  // if(  ball.y > top  ) {
  //   ball.vy *= -1
  // }

  // if(topBall < bottom ){
  //   setTimeout(() => {ball.vy *= -1}, 20)
  //   console.log(ball.y + ball.vy, topBall)
    
  // }
  
}
function update() {
  myGameArea.clear();
  paddle.draw()
  ball.draw();
  drawBricks();
  collisionDetection();
  collisionPaddle();

  ball.x += ball.vx;
  ball.y += ball.vy;
  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
    ball.vy *= -1;
  }
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    ball.vx *= -1;
  }
  keyPressed();
 //  hitBottom()
}
function keyPressed (){
  
  if(paddle.rightPressed){
    paddle.paddleX += 7;
    if(paddle.paddleX + paddle.paddleWidth > canvas.width){
      paddle.paddleX = canvas.width - paddle.paddleWidth;
    }
  }else if(paddle.leftPressed) {
    paddle.paddleX -= 7;
    if (paddle.paddleX < 0){
      paddle.paddleX = 0;
    }
}
}
 //collison  paddle
 function collisionPaddle(){
  if(ball.y  > paddle.y && gapXPaddle() ) {
    ball.vy *= -1;
  }
}
function gapXPaddle(){
  if(ball.x >= paddle.paddleX && ball.x <= paddle.paddleX + paddle.paddleWidth){
    return true
  }else{
    return false
  }
}

//Collision bottom and GAME OVER
function hitBottom() {
  let rockbottom = canvas.height - ball.radius;
  if (ball.y > rockbottom) {
      myGameArea.stop()
  //   ball.y = rockbottom;
  //   clearInterval(intervalId);
  }
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
    if(e.key == "Right" || e.key == "ArrowRight") {
      paddle.rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
      paddle.leftPressed = false;
    }
}
initPositionBlocksArray()
myGameArea.start()

  document.addEventListener('keydown', (e) => {
     if(!myGameArea.gameEngaged && e.keyCode == 32 ){
    
      myGameArea.gameEngaged = true; 
     }
  })
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

