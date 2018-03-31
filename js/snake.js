var Snake = function(x, y, bmd) {
  this.length = 1;
  this.xSpeed = 1;
  this.ySpeed = 0;
  this.body = [game.add.sprite(x, y, bmd)];


  this.changeDirection = function(xdir, ydir) {
    this.xSpeed = xdir;
    this.ySpeed = ydir;
  }
  this.update = function() {
    this.body[0].x += this.xSpeed * scale;
    this.body[0].y += this.ySpeed * scale;
  }
}
