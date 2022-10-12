var ship;
var asteroids = [];
var lasers = [];
var gameState = 0;
var liveCounter = 0;
var immunityCounter = 0;
var scoreCounter = 0;
var highScore = 0;

function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(850, 850);
  gameReset();
}

function gameReset() {
  immunityCounter = frameCount;
  ship = new Ship();
  asteroids = [];
  for (var i = 0; i < 8; i++) {
    asteroids.push(new Asteroid());
  }
}

function newAsteroid() {
  asteroids = [];
  for (var i = 0; i < 8; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);

  if (gameState == 0) {
    menu();
    return;
  }

  if (gameState == 1) {
    game();
    return;
  }

  if (gameState == 2) {
    gameOver();
    return;
  }
}

function preload() {
  menuImage = loadImage("Images/menuscreen.jpg")
  overImage = loadImage("Images/gameover.jpg")
  music = loadSound('asteroids.mp3');
}

function menu() {
  background(menuImage)
}

function game() {
  var shipColour = 255;
  if ((frameCount - immunityCounter) / frameRate() > 3) {
    shipColour = 0;
  }
  fill(255);
  text("lives" + liveCounter, 0, 0, 100, 100);
  text("score" + scoreCounter, 100, 0, 100, 100)
  text("high score" + highScore, 200, 0, 100, 100);
  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      //console.log('no!')
      if (shipColour == 0) {
        liveCounter -= 1;
        if (liveCounter == 0) {
          if (scoreCounter > highScore)
            highScore = scoreCounter;
          gameState = 2;
          music.stop();
        } else {
          gameReset();
        }
        //gameState = 2;
      }
    }
    if (asteroids[i]) {
      asteroids[i].render();
      asteroids[i].update();
      asteroids[i].edges();
    }
  }
  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 20) {
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          scoreCounter += 100;
          console.log(asteroids.length)
          if (asteroids.length == 0) {
            newAsteroid();
          }
          break;
        }
      }
    }
  }

  ship.render(shipColour);
  ship.turn();
  ship.update();
  ship.edges();
}

function gameOver() {
  background(overImage)
  fill(255);
  text("high score" + highScore, 0, 0, 100, 100);
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function gameStart() {
  gameState = 1;
  liveCounter = 3;
  scoreCounter = 0;
  music.loop();
}

function keyPressed() {
  if (gameState == 0) {
    if (keyCode === 32) {
      gameStart();
    }
    return;
  }
  if (gameState == 2) {
    if (keyCode === 32) {
      gameStart();
    }
    return;
  }
  if (gameState == 1) {
    if (keyCode == 32) {
      lasers.push(new Laser(ship.pos, ship.heading));
    } else if (keyCode == 68) {
      ship.setRotation(0.1);
    } else if (keyCode == 65) {
      ship.setRotation(-0.1);
    } else if (keyCode == 87) {
      ship.boosting(true);
    }
    return;
  }
}

