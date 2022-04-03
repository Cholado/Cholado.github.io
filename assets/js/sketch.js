let system;

function setup() {
  createCanvas(windowWidth, windowHeight);
  system = new ParticleSystem(createVector(width / 2, height + 30));
  filter(BLUR, 10);
  c1 = color('#493c4d');
  c2 = color('#ffffff');
}

function draw() {
  background('white');
  system.addParticle();
  system.run();
}

function windowResized() {
  centerCanvas();
  resizeCanvas(windowWidth, windowHeight);
}

// A simple Particle class
let Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-4, 4), random(-8, 12));
  this.position = position.copy();
  this.lifespan = height / 3;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(199,177,205, this.lifespan);
  strokeWeight(2);
  fill(199,177,205, this.lifespan);
  esize = random(6, 12);
  ellipse(this.position.x, this.position.y, esize, esize);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};