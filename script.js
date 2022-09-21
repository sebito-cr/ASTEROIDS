var ship;
var asteroids = [];
var lasers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i = 0; i < 7; i++) {
    asteroids.push(new Asteroid());
  }

  //bg = loadImage('Images/bg.jpg');
}


function draw() {
  background(0);


  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log('no!')
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


function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (key == 'd') {
    ship.setRotation(0.1);
  } else if (key == 'a') {
    ship.setRotation(-0.1);
  } else if (key == 'w') {
    ship.boosting(true);
  }
}

