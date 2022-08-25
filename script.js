function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
}

function draw() {
  background(0);
  ship.render();
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW){
    ship.turn(0.1);
  } else if (keyCode == LEFT_ARROW){
    ship.turn(-0.1);
  }
}

function Ship() {
  this.pos = createVector(width / 2, height / 2);

  // this.pos.x = width/2
  // this.pos.y = height/2

  this.r = 15;
  this.heading = 0;

  this.render = function() {
    translate(this.pos.x, this.pos.y);
    rotate(this.heading)
    noFill();
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r)
  }

  this.turn = function(angle) {
    this.heading += angle;
  }

}
