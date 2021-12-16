class Ball {
  constructor(x,y,color, radius) {
    (this.x = x),
      (this.y = y),
      (this.vx = -4),
      (this.vy = -4),
      (this.radius = radius),
      (this.color = color),
      (this.draw = function () {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
      });
  }

  movementBall() {
    this.x += this.vx;
    this.y += this.vy;
  }
}

if (typeof module !== "undefined") {
  module.exports = Ball;
}
