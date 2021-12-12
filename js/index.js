const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;


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
  color: 'red',
  draw: function () {
    ctx.beginPath();
    ctx.fillRect(450, 500, 100, 15);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
};
function update() {
  paddle.draw()
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
    ball.vy *= -1;
  }
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    ball.vx *= -1;
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


//Game Arena
const blocks = [];
const myGameArea = {
    gameEngaged :false,
    frames: 0,
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

  function updateGameArea() {
    myGameArea.clear();
    update();
   // checkGameOver();
    //myGameArea.score();
  }

  

 
  myGameArea.start()
  document.addEventListener('keydown', (e) => {
     if(!myGameArea.gameEngaged && e.keyCode == 32 ){
      myGameArea.gameEngaged = true; 
     }
  })
    document.addEventListener('keydown', (e) => {

      switch (e.keyCode) {
        case 39: // up arrow
          paddle.x += 7;
          break;
        case 37: // left arrow
          paddle.x -=7;
          break;
      }
    });
    document.addEventListener('keyup', (e) => {
      paddle.x = 0;
      
    });
