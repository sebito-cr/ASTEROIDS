class Asteroid {
  constructor(pos, r) {
    
    if (pos) {
      this.pos = pos.copy();
    } 
      
    else {
      this.pos = createVector(random(width), random(height))
    }
    if (r){
    this.r = r * 0.5;
    }else{
     this.r = random(40,90)
    }
    
   

    
    this.vel = p5.Vector.random2D();
    this.total = floor(random(5, 15));
    this.offset = [];
    for (var i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
    }
  }

  update() {    
      this.pos.add(this.vel); 
  }

  render() {
    push();
    stroke(255);
    noFill();
    translate(this.pos.x, this.pos.y);
    //ellipse(0, 0, this.r = 50 * 2);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  breakup() {
    var newA = [];
    newA[0] = new Asteroid(this.pos, this.r);
    newA[1] = new Asteroid(this.pos, this.r);
    return newA;
  }

  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }

}