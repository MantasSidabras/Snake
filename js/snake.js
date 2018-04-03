var Snake = function(x, y) {
  this.length = 1;
  this.xSpeed = 1;
  this.ySpeed = 0;

  this.oldXSpeed = 1;
  this.oldYSpeed = 0;
  this.eatenFood = [];
  this.body = [
    game.add.sprite(x, y, block('#b3ffff')),
    game.add.sprite(x - scale, y, block('#ffffff')),
    game.add.sprite(x - 2 * scale, y, block('#ffffff')),
  ];

  this.changeDirection = function(xdir, ydir) {
    if (this.oldXspeed != xdir && this.oldXSpeed != -xdir){
      this.xSpeed = xdir;
    } else {
      this.xSpeed = this.oldXSpeed;
    }
    if (this.oldYSpeed != ydir && this.oldYSpeed != -ydir){
      this.ySpeed = ydir;
    } else {
      this.ySpeed = this.oldYSpeed;
    }
  }
  this.update = function() {
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    this.body[0].x += this.xSpeed * scale;
    this.body[0].y += this.ySpeed * scale;

    this.oldXSpeed = this.xSpeed;
    this.oldYSpeed = this.ySpeed;

    this.death();
    if (this.body[0].x == food.x && this.body[0].y == food.y) {
      score++;
      food.destroy();
      let location = foodLocation();
      food = game.add.sprite(location.x * scale, location.y * scale, block('#ff0000'));
      this.eat(this.body[0].x, this.body[0].y);
    }


    let foodToShift = 0;
    this.eatenFood.forEach((f) => {
      if (typeof f !== 'undefined') {
        f.timeToGrow++;

        if (f.timeToGrow >= this.body.length) {
          foodToShift++;
        }
      }
    });
    for (let i = 0; i < foodToShift; i++) {
      this.grow(this.eatenFood.shift());
    }


  }

  this.death = function() {
    if (this.body[0].x >= properties.width || this.body[0].x < 0 || this.body[0].y >= properties.height || this.body[0].y < 3 * scale)
      gameover();
    for (let i = 2; i < this.body.length; i++) {
      if (this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y) {
        gameover();
      }
    }
  }

  this.eat = function(x, y) {
    updateScore();
    let timeToGrow = 0;
    let foodX = x;
    let foodY = y;

    this.eatenFood.push({
      timeToGrow,
      foodX,
      foodY
    });
  }
  this.grow = function(object) {
    this.body.push(game.add.sprite(object.foodX, object.foodY, block('#ffffff')));
  }
}




var block = function(color) {
  let bmd = game.add.bitmapData(0, 0);
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, scale, scale);
  bmd.ctx.fillStyle = color;
  bmd.ctx.fill();
  return bmd;
}
