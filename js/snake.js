var Snake = function(x, y) {
  this.length = 1;
  this.xSpeed = 1;
  this.ySpeed = 0;
  this.timeTillGrow = [];
  this.foodPosition = [];
  this.body = [
    game.add.sprite(x, y, block('#b3ffff')),
    game.add.sprite(x-scale, y, block('#ffffff')),
    game.add.sprite(x-2*scale, y, block('#ffffff')),
  ];

  this.changeDirection = function(xdir, ydir) {
    if (this.xSpeed != xdir && this.xSpeed != -xdir)
      this.xSpeed = xdir;
    if (this.ySpeed != ydir && this.ySpeed != -ydir)
      this.ySpeed = ydir;
  }
  this.update = function() {
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    this.body[0].x += this.xSpeed * scale;
    this.body[0].y += this.ySpeed * scale;

    if(this.body[0].x == food.x && this.body[0].y == food.y){
      score++;
      food.destroy();
      let location = foodLocation();
      food = game.add.sprite(location.x * scale, location.y * scale, block('#ff0000'));
    }
  }
}

var block = function(color){
  var bmd = game.add.bitmapData(0,0);
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, scale, scale);
  bmd.ctx.fillStyle = color;
  bmd.ctx.fill();
  return bmd;
}
