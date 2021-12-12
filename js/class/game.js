// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// let gravity = 1 ;

// const ball = {
//   x: 100,
//   y: 100,
//   vx: 5,
//   vy: 2,
//   radius: 7,
//   color: '#2e7d32',
//   draw: function () {
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
//     ctx.closePath();
//     ctx.fillStyle = this.color;
//     ctx.fill();
//   }
// };

// function update() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ball.draw();
//  // ball.vy += gravity;
//   ball.x += ball.vx;
//   ball.y += ball.vy;
//   hitBottom()
//   if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
//     ball.vy *= -1;
//   }
//   if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
//     ball.vx *= -1;
//   }
// }

// function hitBottom() {
//   let rockbottom = canvas.height - ball.radius;
//   if (ball.y > rockbottom) {
//     ball.y = rockbottom;
//     clearInterval(intervalId);
//   }
// }
// var intervalId = setInterval(update, 20);
// document.onkeydown = function (e) {
//   if (e.keyCode == 32) {
//     ball.userPull = 0.3;
//   }
// };
 
// document.onkeyup = function (e) {
//   if (e.keyCode == 32) {
//     ball.userPull = 0;
//   }
// };

// setInterval(update, 20);
// ball.draw();
// document.getElementById('faster').onclick = function () {
//   ball.vx *= 1.1;
// };
 
// document.getElementById('slower').onclick = function () {
//   ball.vx *= 0.9;
// }; 
//FLAPPYBIRD
const myObstacles = [];
const myGameArea = {
    canvas: document.createElement('canvas'),
    frames: 0,
    start: function () {
      this.canvas.width = 480;
      this.canvas.height = 270;
      this.context = this.canvas.getContext('2d');
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
       // call updateGameArea() every 20 milliseconds
    this.interval = setInterval(updateGameArea, 20);
    },
    stop: function () {
        clearInterval(this.interval);
      },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
      score: function () {
        const points = Math.floor(this.frames / 5);
        this.context.font = '18px serif';
        this.context.fillStyle = 'black';
        this.context.fillText(`Score: ${points}`, 350, 50);
      },
  };

  function updateGameArea() {
    myGameArea.clear();
    player.newPos();
    player.update();
    updateObstacles();
    checkGameOver();
    myGameArea.score();
  }
  
  function updateObstacles() {
    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
      }
    myGameArea.frames += 1;
    if (myGameArea.frames % 120 === 0) {
      let x = myGameArea.canvas.width;
      let minHeight = 20;
      let maxHeight = 200;
      let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
      let minGap = 50;
      let maxGap = 200;
      let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      myObstacles.push(new Component(10, height, 'green', x, 0));
      myObstacles.push(new Component(10, x - height - gap, 'green', x, height + gap));
    }
  }
  function checkGameOver() {
    const crashed = myObstacles.some(function (obstacle) {
      return player.crashWith(obstacle);
    });
  
    if (crashed) {
      myGameArea.stop();
    }
  }
  
  class Component {
    constructor(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.speedX = 0;
    this.speedY = 0;
    }
    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
      }
    update() {
      const ctx = myGameArea.context;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    left() {
        return this.x;
     }
    right() {
        return this.x + this.width;
    }
     top() {
        return this.y;
    }
     bottom() {
        return this.y + this.height;
    }
     
    crashWith(obstacle) {
        return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
      }
  }

  const player = new Component(30, 30, 'red', 0, 110);
  myGameArea.start();
  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 38: // up arrow
        player.speedY -= 1;
        break;
      case 40: // down arrow
        player.speedY += 1;
        break;
      case 37: // left arrow
        player.speedX -= 1;
        break;
      case 39: // right arrow
        player.speedX += 1;
        break;
    }
  });
  document.addEventListener('keyup', (e) => {
    player.speedX = 0;
    player.speedY = 0;
  });



  
// ctx.fillStyle = 'white';
// ctx.font = '18px serif';

// class Ghost {
//     constructor() {
//       this.x = 25;
//       this.y = 25;
   
//       // Load the image
//       const img = new Image();
//       img.addEventListener('load', () => {
//         // Once image loaded => draw
//         this.img = img;
//         this.draw();
//       });
//       img.src = 'https://www.ionlitio.com/images/2006/11/pacman_pinky.gif';
//     }
//     moveUp() {
//       this.y -= 25;
//     }
//     moveDown() {
//       this.y += 25;
//     }
//     moveLeft() {
//       this.x -= 25;
//     }
//     moveRight() {
//       this.x += 25;
//     }
//     initPos(){
//         this.x = 25;
//         this.y = 25;
//     }
//     draw() {
//       ctx.drawImage(this.img, this.x, this.y, 50, 50);
//     }
//   }

//   const ghost = new Ghost();
//   document.addEventListener('keydown', e => {
//     switch (e.keyCode) {
//       case 38:
//         ghost.moveUp();
//         console.log('up', ghost);
//         break;
//       case 40:
//         ghost.moveDown();
//         console.log('down', ghost);
//         break;
//       case 37:
//         ghost.moveLeft();
//         console.log('left', ghost);
//         break;
//       case 39:
//         ghost.moveRight();
//         console.log('right', ghost);
//         break;
//         case 32:
//             ghost.initPos();
//             console.log('init', ghost);
//             break;
//     }
//     updateCanvas();
//   });


//   function updateCanvas() {
//     ctx.clearRect(0, 0, 1500, 1700);
//     ctx.fillText('Ghost_x: ' + ghost.x, 580, 40);
//     ctx.fillText('Ghost_y: ' + ghost.y, 580, 60);
   
//     ghost.draw();
//   }
//   updateCanvas()
// ctx.fillStyle = '#FF0000';
// // ctx.fillRect(100, 0, 50, 50);
// // ctx.fillRect(300, 0, 50, 50);
// // ctx.fillRect(500, 0, 50, 50);
 
// let speed1 = 400;
// let speed2 = 400;
// let speed3 = 400;


// function clearCanvas() {
//     ctx.clearRect(0, 0, 700, 450); // 700 and 450 are canvas width and height
//   }

//   function drawCanvas(x, y, w, h, color) {
//     ctx.fillStyle = color;
//     ctx.fillRect(x, y, w, h);
//   }
// // const color = {
// //   red: Math.floor(Math.random() * 255),
// //   green: Math.floor(Math.random() * 255),
// //   blue: Math.floor(Math.random() * 255),
// //   rgb: function () {
// //     return `rgb(${this.red}, ${this.green}, ${this.blue})`;
// //   }
// // };

//  function updateCanvas() {
//   // in order to see animation, let's change speed1,2 and 3 on every call
//   speed1 -= 1;
//   speed2 -= 2;
//   speed3 -= 3;
 
//   // clear the canvas
//   clearCanvas();
// //   color.red = (color.red + 1) % 255;
// //   color.blue = (color.blue + 1) % 255;
// //   color.green = (color.green + 1) % 255;
 
// //   ctx.clearRect(0, 0, 480, 270);
// //   ctx.fillStyle = color.rgb();
// //   ctx.fillRect(0, 0, 150, 150);
 
// drawCanvas(50, speed1, 50, 50, 'red');
// drawCanvas(150, speed2, 50, 50, 'green');
// drawCanvas(250, speed3, 50, 50, 'yellow');

// requestAnimationFrame(updateCanvas);
// }
 

// updateCanvas();