var properties = {
  width: 800,
  height: 600
}
var game = new Phaser.Game(properties.width, properties.height, Phaser.AUTO, 'game');

var score = 0;
var snake;
var food;
var scale = 20;
var GameState = {
  preload: function() {

  },

  create: function() {
     game.time.slowMotion = 6;

     snake = new Snake(game.world.centerX - 100, game.world.centerY);
     let location = foodLocation();
     food = game.add.sprite(location.x * scale, location.y * scale, block('#ff0000'));
  },

  update: function() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        snake.changeDirection(-1,0);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
      snake.changeDirection(1,0);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
      snake.changeDirection(0,-1);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
      snake.changeDirection(0,1);
    }

    // if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    // {
    //   snake.eat();
    // }
    snake.update();
  }
}

var foodLocation = function(){
  let rows = properties.height / scale;
  let cols = properties.width / scale;

  let x = Math.floor(Math.random() * Math.floor(cols));
  let y = Math.floor(Math.random() * Math.floor(rows));
  return {x, y};
}

game.state.add('GameState', GameState);
game.state.start('GameState');
