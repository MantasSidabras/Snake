var properties = {
  width: 800,
  height: 600
}
var game = new Phaser.Game(properties.width, properties.height, Phaser.AUTO, 'game');

var score = 0;
var snake;
var food;
var scale = 20;
var text;
var GameState = {
  preload: function() {
  },

  create: function() {
     game.time.slowMotion = 6;
     game.stage.backgroundColor = "#262626";
     topbar();
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
    snake.update();
  }
}

var foodLocation = function(){
  let rows = properties.height / scale;
  let cols = properties.width / scale;

  let x = Math.floor(Math.random() * cols);
  let y = Math.floor(Math.random() * (rows - 4 + 1) + 4 );
  return {x, y};
}

var topbar = function(){
  let graphics = game.add.graphics(0, 0);

    // graphics.lineStyle(2, 0xffd900, 1);

    graphics.beginFill(0x006699, 1);
    graphics.drawRect(0, 0, properties.width, 3 * scale);
    let txt = "Score: " + score;
    text = game.add.text(scale, scale, txt,
      {
          font: "20px Pixeled",
          fill: "#f0f0f0"
      });
}

var updateScore = function(){
  let txt = "Score: " + score;
  text.setText(txt);
}

game.state.add('GameState', GameState);
game.state.start('GameState');
