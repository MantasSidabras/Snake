var properties = {
  width: 800,
  height: 600
}
var game = new Phaser.Game(properties.width, properties.height, Phaser.AUTO, 'game');

var score;
var snake;
var food;
var scale = 20;
var text;
var gameloop;
var GameState = {
  preload: function() {},

  create: function() {
    newgame();
  },

  update: function() {
    if (gameloop) {
      if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        snake.changeDirection(-1, 0);
      }
      if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        snake.changeDirection(1, 0);
      }
      if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        snake.changeDirection(0, -1);
      }
      if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        snake.changeDirection(0, 1);
      }
      snake.update();
    } else {
      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        newgame();
      }
    }
  }
}

var foodLocation = function() {
  let rows = properties.height / scale;
  let cols = properties.width / scale;
  let x;
  let y;
  generateNew = false;
  do{
    generateNew = false;
    x = Math.floor(Math.random() * cols);
    y = Math.floor(Math.random() * (rows - 3)) + 3;

    snake.body.forEach((b) => {
      if(b.x == x*scale && b.y == y*scale) {
          generateNew = true;
        }
    });
  } while(generateNew);
  if (x >= 800 || y >= 600) alert("food out of bounds");
  return {x,y};
}

var topbar = function() {
  let graphics = game.add.graphics(0, 0);

  // graphics.lineStyle(2, 0xffd900, 1);

  graphics.beginFill(0x006699, 1);
  graphics.drawRect(0, 0, properties.width, 3 * scale);
  let txt = "Score: " + score;
  text = game.add.text(scale, scale, txt, {
    font: "20px Pixeled",
    fill: "#f0f0f0"
  });
}

var updateScore = function() {
  let txt = "Score: " + score;
  text.setText(txt);
}

var newgame = function(){
  game.world.removeAll();

  gameloop = true;
  game.time.slowMotion = 5;
  game.stage.backgroundColor = "#262626";
  score = 0;
  topbar();
  snake = new Snake(game.world.centerX - 100, game.world.centerY);
  let location = foodLocation();
  food = game.add.sprite(location.x * scale, location.y * scale, block('#ff0000'));
}

var gameover = function() {
  gameloop = false;
  let graphics = game.add.graphics(0, 0);
  graphics.beginFill(0x006699, 1);
  game.add.text(game.world.centerX-4*scale, game.world.centerY, 'Game over!', {
    font: "20px Pixeled",
    fill: "#0080ff"
  }).bringToTop();
  game.add.text(game.world.centerX-10*scale, game.world.centerY+3*scale, 'Press space to play again. ', {
    font: "20px Pixeled",
    fill: "#0080ff"
  }).bringToTop();
}

game.state.add('GameState', GameState);
game.state.start('GameState');
