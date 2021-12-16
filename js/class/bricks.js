const bipSound = new Audio("./sounds/bip.wav");
class Bricks {
  constructor(width, height, rows, column) {
    (this.brickWidth = width),
      (this.brickHeight = height),
      (this.brickPadding = 2),
      (this.brickOffsetTop = 30),
      (this.brickOffsetLeft = 60),
      (this.rowBlocks = rows),
      (this.colors = ["#6DBBF3", "#A919E4", "#370B6A"]),
      (this.columnBlocks = column),
      (this.arrayBricks = []);
  }

  //initiation position blocks
  initPositionBlocksArray() {
    for (let i = 1; i <= this.columnBlocks; i++) {
      this.arrayBricks[i] = [];
      for (let j = 1; j <= this.rowBlocks; j++) {
        this.arrayBricks[i][j] = { x: 0, y: 0, status: this.iniStatusBlocks() };
      }
    }
  }

  //update color blocks
  updateColorBrick(brick) {
    let coloIndex = this.colors.indexOf(brick.status.color);
    brick.status.color = this["colors"][coloIndex - 1];
  }

  //collision right block
  collidedRight(a, b) {
    if (a   > b.x + this.brickWidth +this.brickPadding) {
      return true;
    }
  }
  //collision left block
  collidedLeft(a, b) {
    if (a + a.vx > b.x) {
      return true;
    }
  }

  //Block collision
  collisionDetection(el) {
    let leftBall = el.x - el.radius;
    let rightBall = el.x + el.radius;
    let topBall = el.y - el.radius;
    let bottomBall = el.y + el.radius;

    for (let i = 1; i <= this.columnBlocks; i++) {
      for (let j = 1; j <= this.rowBlocks; j++) {
        let b = this.arrayBricks[i][j];
        if (
          rightBall > b.x &&
          leftBall < b.x + this.brickWidth +this.brickPadding &&
          bottomBall > b.y &&
          topBall < b.y + this.brickHeight +this.brickPadding
        ) {
          if (
          this.collidedRight(rightBall, b) ||
          this.collidedRight(leftBall, b) || 
          this.collidedLeft(bottomBall, b) || 
          this.collidedLeft(topBall, b) 
          ) {
            el.vx *= -1;
            b.status.life -= 1;
          } else {
            el.vy *= -1;
            b.status.life -= 1;
          }
          bipSound.currentTime = 0;
          bipSound.play();
          displayScore();
          
          this.updateColorBrick(b);
        }
      }
    }
  }

  checkIfAllBlocksStatus() {
    let blockDead = 0;
    let numberOfBlocks = this.columnBlocks * this.rowBlocks;
    for (var i = 1; i <= this.columnBlocks; i++) {
      for (var j = 1; j <= this.rowBlocks; j++) {
        if (this.arrayBricks[i][j].status.life === 0) {
          blockDead += 1;
          gameIsOver(blockDead, numberOfBlocks);
        }
      }
    }
  }
  //draw Bricks
  drawBricks() {
    for (var i = 1; i <= this.columnBlocks; i++) {
      for (var j = 1; j <= this.rowBlocks; j++) {
        if (this.arrayBricks[i][j].status.life >= 1) {
          this.drawBrick(this, i, j);
        } else if (this.arrayBricks[i][j].status.life === 0) {
          this.arrayBricks[i][j].x = -100;
          this.arrayBricks[i][j].y = 0;
        }
      }
    }
  }
  randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  //init color block and the number of hit
  iniStatusBlocks() {
    let randomNumLife = this.randomNumber(4, 1);
    return { life: randomNumLife, color: this["colors"][randomNumLife - 1] };
  }
  //draw brick: set position, color and path
  drawBrick(bricks, i, j) {
    let brickX =
      i * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
    let brickY =
      j * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
    this.arrayBricks[i][j].x = brickX;
    this.arrayBricks[i][j].y = brickY;
    ctx.fillStyle = this.arrayBricks[i][j].status.color;
    ctx.shadowBlur = 50;
    ctx.shadowColor = "whitesmoke";
    ctx.beginPath();
    ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
    ctx.fill();
    ctx.closePath();
  }
}

if (typeof module !== "undefined") {
  module.exports = Bricks;
}
