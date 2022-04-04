let inc = 0.1;
let scl = 10;
let cols, rows;
let fr;
let particles = [];
let flowfield;

let zoff = 0;

//199,177,205

function setup() {
	createCanvas(windowWidth, windowHeight);
	cols = floor(width / scl);
	rows = floor(height / scl);
	flowfield = new Array(cols * rows);
	for (let i = 0; i < 200; i++) {
		particles[i] = new Particle();
	}
	background("#348aa7");
}

function draw() {
	
	let c = color("#293241");
	background(51,10);
	let yoff = 0;
	let doCntMax = 300;
	let doScale = 0.01;

	for (let y = 0; y < rows; y++) {
		let xoff = 0;
		for (let x = 0; x < cols; x++) {
			let index = x + y * cols;


			let xPoint = x;
			let yPoint = y;
			let angle = noise(xoff, yoff, zoff) * TWO_PI * 0.1;
				if(mouseIsPressed){
				angle = noise(xoff, yoff, zoff) * TWO_PI * 10;
			}
			let v = p5.Vector.fromAngle(angle);
			v.setMag(1);
			flowfield[index] = v;
			xoff += doScale * cos(TWO_PI * noise(xPoint, yPoint) * 50.0);
yoff += doScale * sin(TWO_PI * noise(yPoint, xPoint) * 50.0);;
		}
		zoff += 0.0003;
	}
	for (let i = 0; i < particles.length; i++) {
		particles[i].follow(flowfield);
		particles[i].update();
		particles[i].edges();
		particles[i].show();
	}
}

function Particle() {
	this.pos = createVector(random(width), random(height));
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.maxspeed = 4;
	this.prevPos = this.pos.copy();

	this.update = function () {
		this.vel.add(this.acc);
		this.vel.limit(this.maxspeed);
		this.pos.add(this.vel);
		this.acc.mult(0);


	}
	this.follow = function (vectors) {
		let x = floor(this.pos.x / scl);
		let y = floor(this.pos.y / scl);
		let index = x + y * cols;
		let force = vectors[index];
		this.applyForce(force);
		this.d = random(0.5, 3);
	}

	this.applyForce = function (force) {
		this.acc.add(force)
	}
	this.show = function () {

		noStroke();
	
		fill(255);
		this.updatePrev();
		ellipse(this.pos.x,this.pos.y,1);

	}
	this.updatePrev = function () {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	}
	this.edges = function () {
		if (this.pos.x > width) {
			this.pos.x = 0;
			this.updatePrev();
		}

		if (this.pos.x < 0) {
			this.pos.x = width;
			this.updatePrev();
		}
		if (this.pos.y > height) {
			this.pos.y = 0;
			this.updatePrev();
		}
		if (this.pos.y < 0) {
			this.pos.y = height;
			this.updatePrev();
		}
	}
}