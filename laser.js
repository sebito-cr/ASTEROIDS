class Laser {
  constructor(spos) {
    this.pos = createVector(spos.x, spos.y);
    this.vel = createVector();
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

