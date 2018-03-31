var properties = {
  width: 800,
  height: 600
}
var game = new Phaser.Game(properties.width, properties.height, Phaser.AUTO, 'game');
var snake;
var scale = 20;
var snakeSprite;
var GameState = {
  preload: function() {

  },

  create: function() {
    var bmd = game.add.bitmapData(0,0);
    game.time.desiredFps = 6;
    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,scale,scale);
    bmd.ctx.fillStyle = '#ff0000';
    bmd.ctx.fill();

    // use the bitmap data as the texture for the sprite
    snake = new Snake(game.world.centerX - 100, game.world.centerY, bmd);

  },

  update: function() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        snake.xSpeed = -1;
        snake.ySpeed = 0;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
      snake.xSpeed = 1;
      snake.ySpeed = 0;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
      snake.xSpeed = 0;
      snake.ySpeed = -1;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
      snake.xSpeed = 0;
      snake.ySpeed = 1;
    }
    snake.update();
  }
}

game.state.add('GameState', GameState);
game.state.start('GameState');
