class Paddle {
    constructor(x, y, width, height, canvas){
        this.x = x,
        this.y = y,
        this.minWidth = 60,
        this.paddleWidth= width,
        this.paddleHeight= height,
        this.paddleX= (canvas.width - 150) / 2,
        this.paddleY= (canvas.height - 25) / 2,
        this.color= "#0B050C",
        this.rightPressed= false,
        this.leftPressed= false,
        this.draw= function () {
            ctx.fillStyle = "#0B050C";
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
          }
    }
     collisionPaddle(el) {
        if (el.y > this.y && el.y < this.y + 9 && this.gapXPaddle(el)) {
          el.vy *= -1;
        }
      }
       gapXPaddle(el) {
        if (el.x > this.paddleX && el.x < this.paddleX + this.paddleWidth  ) {
          return true;
        } else {
          return false;
        }
      }
      collidedLeft(a, b) {
        if (a + a.vx > b.x) {
          return true;
        }
      }
}

if (typeof module !== "undefined") {
    module.exports = Paddle;
  }
