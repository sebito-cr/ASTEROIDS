var ship;
var asteroids = [];
var lasers = [];
var gameState = 0;
var liveCounter = 0;

function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(850, 850);
  gameReset();
}

function gameReset() {
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
}

function menu() {
  background(menuImage)
}

function game() {
  fill(255);
  text("lives" + liveCounter, 0, 0, 100, 100);
  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      //console.log('no!')
      liveCounter -= 1;
      if (liveCounter == 0) {
        gameState = 2;
      } else {
        gameReset();
      }
      //gameState = 2;
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
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
          console.log(asteroids.length)
          if (asteroids.length == 0) {
            newAsteroid();
          }
          break;
        }
      }
    }
  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}

function gameOver() {
  background(menuImage)
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function gameStart() {
  gameState = 1;
  liveCounter = 3;
}

function keyPressed() {
  if (gameState == 0) {
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

