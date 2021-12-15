class Paddle {
    constructor(x, y, width, height, canvas){
        this.x = x,
        this.y = y,
        this.minWidth = 60,
        this.paddleWidth= width,
        this.paddleHeight= height,
        this.paddleX= (canvas.width - 150) / 2,
        this.paddleY= (canvas.height - 25) / 2,
        this.color= "red",
        this.rightPressed= false,
        this.leftPressed= false,
        this.draw= function () {
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
          }
    }
     collisionPaddle(el) {
        if (el.y > this.y && this.gapXPaddle(el)) {
          el.vy *= -1;
        }
      }
       gapXPaddle(el) {
        if (el.x > this.paddleX && el.x < this.paddleX + this.paddleWidth) {
          return true;
        } else {
          return false;
        }
      }
}

if (typeof module !== "undefined") {
    module.exports = Paddle;
  }
