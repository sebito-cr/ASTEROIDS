function Asteroid() {
  this.pos = createVector(random(width), random(height))
  this.r = 50;

  this.render = function(){
  
  //translate(this.pos.x, this.pos.y);
   noFill();
  stroke(255);
  ellipse(200, 375, this.r = 50 * 2);
  }
}