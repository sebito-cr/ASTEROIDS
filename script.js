var ship;
var asteroids = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  asteroids.push(new Asteroid());

  //bg = loadImage('Images/bg.jpg')
}

function draw() {
  background(0);
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();

  for (var i = 0; i < asteroids.length; i++) {
    asteroids[i].render();
  }
}

function keyReleased(){
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW){
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW){
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW){
    ship.boosting(true);
  }
}

class Ship{
  constructor(){
  this.pos = createVector(width / 2, height / 2);
  this.r = 23;
  this.heading = 4.70;
  this.rotation = 0;
  this.vel = createVector (0,0);
  this.isBoosting = false;
  }

  boosting(b){
    this.isBoosting = b;
  }

  update(){
    if (this.isBoosting){
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }

  boost(){
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
  }

  render() {
    push ();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2)
    noFill();
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r)
    pop();
  }

  edges(){
  if (this.pos.x > width + this.r){
    this.pos.x = -this.r;
  } else if (this.pos.x < -this.r){
    this.pos.x = width +this.r;
  }
   if (this.pos.y > height + this.r){
    this.pos.y = -this.r;
  } else if (this.pos.y < -this.r){
    this.pos.y = height +this.r;
   }
}
  
  setRotation(a){
  this.rotation = a;
}
  
  turn() {
    this.heading += this.rotation;
  }

}
