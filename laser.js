class Laser {
  constructor(spos, angle) {
    this.pos = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(6);
  }

  update(){
   this.pos.add(this.vel); 
  }

 render(){
   push();
   stroke (255);
   strokeWeight(4);
   point(this.pos.x, this.pos.y); 
   pop();
  }
  
    
}

