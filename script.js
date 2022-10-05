var ship;
var asteroids = [];
var lasers = [];
var gameState = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }

}

function draw() {
  background(0);

  if (gameState == 0) {
    menu();
  }

  if (gameState == 1) {
    game();
  }

  if (gameState == 2) {
    gameOver();
  }
}

function preload() {
  menuImage = loadImage("Images/menuscreen.jpg")
  overImage = loadImage("Images/gameover.jpg")
}

function menu() {
  background(menuImage)
}

function game() {
  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log('no!')
      gameState = 2;
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
  background(overImage)
  
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (keyCode === 32) {
    gameState = 1;
  }

  if (keyCode == 32) {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == 68) {
    ship.setRotation(0.1);
  } else if (keyCode == 65) {
    ship.setRotation(-0.1);
  } else if (keyCode == 87) {
    ship.boosting(true);
  }
}

