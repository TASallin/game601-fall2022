let difficulty = 1;
let level = 1;
let characters = [];
let mothSprite;
let larpasSprite;
let rikiSprite;
let catSprite;
let parkJpg;
let posterJpg;
let target;
let inLevel = false;
let levelTimer = 240;
let timer = 600;
let gameOver = false;
let soundWin;
let soundLose;
let soundBad;
let bgm;

function preload() {
	mothSprite = loadImage("Mothman.png");
	larpasSprite = loadImage("Larpas.jpg");	
	rikiSprite = loadImage("riki.png");	
	catSprite = loadImage("IMG_2145.jpeg");	
	parkJpg = loadImage("park.jpg");
	posterJpg = loadImage("missing.png");
	soundWin = loadSound("outstanding.mp3");
	soundLose = loadSound("mk3-09445.mp3");
	soundBad = loadSound("Amogus.wav");
	bgm = loadSound("23 All Things Must Come.mp3");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	
	mothSprite.resize(50, 50);
	larpasSprite.resize(50, 50);
	rikiSprite.resize(50, 50);
	catSprite.resize(50, 50);
	parkJpg.resize(width, 0);
	posterJpg.resize(0, height - 100);
	
	makeLevel();
	bgm.play();
	bgm.loop();
	
	angleMode(DEGREES);
}

function draw() {
	if (gameOver) {
		gameOverDraw();	
	} else if (inLevel) {
		mainDraw();
	} else {
		betweenDraw();	
	}
}

function makeLevel() {
	let targetIdentity = floor(random(4)) + 1;
	let horizontalMovement = level % 3 == 0;
	let verticalMovement = level % 5 == 0;
	let spin = level % 7 == 0;
	let roam = level % 11 == 0;
	let horizontalSpeed = 0;
	if (horizontalMovement) {
		horizontalSpeed = random(min(level / 10, 5)) * (floor(random(2)) * 2 - 1); 	
	}
	let verticalSpeed = 0;
	if (verticalMovement) {
		verticalSpeed = random(min(level / 10, 5)) * (floor(random(2)) * 2 - 1);	
	}
	let rotationSpeed = 0;
	if (spin) {
		rotationSpeed = random(min(level / 10, 10));	
	}
	let roamSpeed = 0;
	if (roam) {
		roamSpeed = random(floor(level / 11));
	}
	
	characters = [];
	characters[0] = new Character(targetIdentity, random(width - 50), random(height - 50), horizontalSpeed, verticalSpeed, rotationSpeed, roamSpeed);
	target = characters[0];
	let index = 1;
	for (let i = 1; i < 1 + level * 3; i++) {
		if (index == targetIdentity) {
			index = 1 + (index % 4);
		}
		horizontalSpeed *= -1;
		verticalSpeed *= -1;
		rotationSpeed *= -1;
		characters[i] = new Character(index, random(width - 50), random(height - 50), horizontalSpeed, verticalSpeed, rotationSpeed, roamSpeed);
		index = 1 + (index % 4);
	}
}

function mouseClicked() {
	if (!inLevel) {
		return;	
	}
	if (abs(mouseX - 25 - target.x) < 25 && abs(mouseY - 25 - target.y) < 25) {
		level = level + 1;
		makeLevel();
		inLevel = false;
		levelTimer = 240;
		timer = min(timer + 300, 3600);
		soundWin.play();
	} else {
		timer -= 600;	
		if (timer > 0) {
			soundBad.play();	
		}
	}
}

function mainDraw() {
	background(100);
	image(parkJpg, 0, 0);
	for (let i = 0; i < characters.length; i++) {
		let c = characters[i];
		c.x = (c.x + c.velX + floor(random(c.roam * -1, c.roam + 1)));
		if (c.x < -50) {
			c.x = width;	
		} else if (c.x > width) {
			c.x = -50;	
		}
		c.y = (c.y + c.velY + floor(random(c.roam * -1, c.roam + 1)));
		if (c.y < -50) {
			c.y = height;
		} else if (c.y > height) {
			c.y = -50;	
		}
		c.rotation = (c.rotation + c.angularVel) % 360;
		
		push();
		translate(c.x + 25, c.y + 25);
		rotate(c.rotation);
		if (c.identity == 1) {
			image(mothSprite, -25, -25);	
		}
		if (c.identity == 2) {
			image(larpasSprite, -25, -25);	
		}
		if (c.identity == 3) {
			image(rikiSprite, -25, -25);	
		}
		if (c.identity == 4) {
			image(catSprite, -25, -25);	
		}
		pop();
	}
	timer -= 1;
	textSize(32);
	text("time: " + floor(timer / 60), 50, 50); 
	text("level: " + level, 50, 100);
	if (timer <= 0) {
		gameOver = true;
		levelTimer = 300;
		soundLose.play();
	}
}

function betweenDraw() {
	background(100);
	image(posterJpg, width / 2 - 300, 50);
	push();
	translate(width/2, height/2);
	scale(4, 4);
	if (target.identity == 1) {
		image(mothSprite, -25, -35);	
	}
	if (target.identity == 2) {
		image(larpasSprite, -25, -35);	
	}
	if (target.identity == 3) {
		image(rikiSprite, -25, -35);	
	}
	if (target.identity == 4) {
		image(catSprite, -25, -35);	
	}
	levelTimer -= 1;
	if (levelTimer <= 0) {
		inLevel = true;	
	}
	pop();
	textSize(32);
	text("time: " + floor(timer / 60), width / 2 - 50, 450);
	text("level: " + level, width / 2 - 50, 500);
}

function gameOverDraw() {
	textSize(64);
	text("You Lose", width/2 - 100, height/2 - 10);
	levelTimer -= 1;
	if (levelTimer <= 0) {
		inLevel = false;
		gameOver = false;
		levelTimer = 240;
		timer = 600;
		level = 1;
		makeLevel();
	}
}

class Character {
	//1 = moth, 2 = larpas, 3 = riki, 4 = cat
	constructor(identity, x, y, velX, velY, angularVel, roam) {
		this.identity = identity;
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
		this.angularVel = angularVel;
		this.roam = roam;
		this.rotation = 0;
	}
}