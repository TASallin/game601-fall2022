let mothImage1;
let mothImage2;
let mothImage3;
let backgroundImage;
let enemyImage1;
let enemyImage2;
let enemyImage3;
let playerImage;
let normalMusic;
let midbossMusic;
let bossMusic;
let loseMusic;
let mothmen = [];
let mots = [];
let crosshairX;
let crosshairY;
let bullets = [];
let score;
let difficulty;
let spawnTimer;
let gold;
let drops = [];
let hamas = [];
let waves = [];
let megidos = [];
let mudos = [];
let critWaves = [];

let jonX;
let jonY;
let jonHP;
let jonMaxHP;
let jonTimer;
let jonVelX;
let jonVelY;
let jonTargetX;
let jonTargetY;
let jonAlive;
let jonDestroy;
let jonCooldown;
let jonMelee;
let jonLevel;

let orcusX;
let orcusY;
let orcusHP;
let orcusMaxHP;
let orcusTimer;
let orcusVelX;
let orcusVelY;
let orcusTargetX;
let orcusTargetY;
let orcusAlive;
let orcusDestroy;
let orcusCooldown;
let orcusMelee;
let orcusLevel;

let midboss;
let bossTimer;

let gameOver;
let player;
let playerCharge;
let playerAttack;

function preload() {
	mothImage1 = loadImage("MothRussia1.png");
	mothImage2 = loadImage("MothRussia2.png");
	mothImage3 = loadImage("MothRussia3.png");
	playerImage = loadImage("Walter1.png");
	backgroundImage = loadImage("Scwartzwelt.png");
	enemyImage1 = loadImage("Mot.png");
	enemyImage2 = loadImage("Jonathan.png");
	enemyImage3 = loadImage("Orcus.png");
	normalMusic = loadSound("08 Fear of God.mp3");
	midbossMusic = loadSound("17 An Honor Befitting That Name.mp3");
	bossMusic = loadSound("13 Furious Wrath.mp3");
	loseMusic = loadSound("23 Law.mp3");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	backgroundImage.resize(width, 0);
	mothImage1.resize(64, 0);
	mothImage2.resize(64, 0);
	mothImage3.resize(64, 0);
	playerImage.resize(64, 0);
	enemyImage1.resize(0, 64);
	enemyImage2.resize(100, 0);
	enemyImage3.resize(300, 0);
	restart();
}

function draw() {
	if (gameOver > 0) {
		fill(255);
		textSize(48);
		text("Game Over", width / 2 - 200, height / 3);
		text("Press R to restart", width / 2 - 350, height * 5 / 8);
		if (keyIsDown(82)) {
			loseMusic.stop();
			restart();	
		}
		return;
	}
	
	image(backgroundImage, 0, 0);
	
	for (let i = mothmen.length - 1; i >= 0; i--) {
		mothmen[i].update();
		if (mothmen[i].destroy) {
			mothmen.splice(i, 1);	
		}
	}
	
	for (let i = mots.length - 1; i >= 0; i--) {
		mots[i].update();
		if (mots[i].destroy) {
			score += mots[i].level * 10;
			if (floor(random(4)) == 1) {
				drops.push(new macca(mots[i].x, mots[i].y, mots[i].level * 40));
			}
			mots.splice(i, 1);
		}
	}
	
	for (let i = bullets.length - 1; i >= 0; i--) {
		bullets[i].update();
		if (bullets[i].destroy) {
			bullets.splice(i, 1);
		}
	}
	
	for (let i = megidos.length - 1; i >= 0; i--) {
		megidos[i].update();
		if (megidos[i].destroy) {
			megidos.splice(i, 1);
		}
	}
	
	for (let i = hamas.length - 1; i >= 0; i--) {
		hamas[i].update();
		if (hamas[i].destroy) {
			hamas.splice(i, 1);
		}
	}
	
	for (let i = mudos.length - 1; i >= 0; i--) {
		mudos[i].update();
		if (mudos[i].destroy) {
			mudos.splice(i, 1);
		}
	}
	
	for (let i = waves.length - 1; i >= 0; i--) {
		waves[i].update();
		if (waves[i].destroy) {
			waves.splice(i, 1);
		}
	}
	
	for (let i = critWaves.length - 1; i >= 0; i--) {
		critWaves[i].update();
		if (critWaves[i].destroy) {
			critWaves.splice(i, 1);
		}
	}
	
	for (let i = drops.length - 1; i >= 0; i--) {
		drops[i].update();
		if (drops[i].destroy) {
			drops.splice(i, 1);
		}
	}
	
	bossTimer -= 1;
	if (bossTimer == 1000) {
		difficulty += 1;	
	}
	if (!jonAlive && !orcusAlive && bossTimer <= 0) {
		if (midboss) {
			jonAlive = true;
			jonX = -50;
			jonY = height/2;
			jonVelX = 2;
			jonVelY = 0;
			jonTargetX = 50;
			jonTargetY = height/2;
			jonMaxHP = 100 + 50 * jonLevel;
			jonHP = jonMaxHP;
			jonCooldown = 200;
			jonMelee = false;
			normalMusic.pause();
			midbossMusic.loop();
			mots.push(new Mot(-50, height / 4, jonLevel * 2, 1));
			mots.push(new Mot(-50, 3 * height / 4, jonLevel * 2, 1));
		} else {
			orcusAlive = true;
			orcusX = -300;
			orcusY = height/2;
			orcusVelX = 1;
			orcusVelY = 0;
			orcusTargetX = 150;
			orcusTargetY = height/2;
			orcusMaxHP = 500 * orcusLevel;
			orcusHP = orcusMaxHP;
			orcusCooldown = 600;
			orcusMelee = false;
			normalMusic.pause();
			bossMusic.loop();
			mots.push(new Mot(-150, height / 6, orcusLevel * 2, 2));
			mots.push(new Mot(-150, height / 3, orcusLevel * 2, 2));
			mots.push(new Mot(-150, 3 * height / 3, orcusLevel * 2, 2));
			mots.push(new Mot(-150, 5 * height / 6, orcusLevel * 2, 2));
		}
	}
	if (jonAlive) {
		updateJon();	
	}
	if (orcusAlive) {
		updateOrcus();	
	}
	
	
	strokeWeight(4);
	stroke(255, 0, 0);
	noFill();
	arc(crosshairX, crosshairY, 50, 50, 0, 2 * PI);
	line(crosshairX, crosshairY + 10, crosshairX, crosshairY + 60);
	line(crosshairX, crosshairY - 10, crosshairX, crosshairY - 60);
	line(crosshairX + 10, crosshairY, crosshairX + 60, crosshairY);
	line(crosshairX - 10, crosshairY, crosshairX - 60, crosshairY);
	textSize(32);
	strokeWeight(1);
	stroke(0);
	fill(0);
	text("score: " + score, 50, 50);
	fill(255, 255, 0);
	text("macca: " + gold, 50, 100);
	if (gold < 100) {
		tint(150);	
	}
	image(mothImage1, width - 300, height - 64);
	textSize(16);
	text("$100", width - 290, height - 15);
	if (gold < 250) {
		tint(150);	
	}
	image(mothImage2, width - 200, height - 64);
	text("$250", width - 190, height - 15);
	if (gold < 500) {
		tint(150);	
	}
	image(mothImage3, width - 100, height - 64);
	text("$500", width - 90, height - 15);
	noTint();
	
	spawnTimer -= 1;
	if (spawnTimer <= 0) {
		mots.push(new Mot(-20, random(50, height - 100), floor(random(difficulty)) + 1, floor(random(2)) + 1));
		spawnTimer = random(50, max(100, 500 - difficulty * 25));
	}
}

function mouseClicked() {
	if (gameOver > 0) {
		return;
	}
	
	crosshairX = mouseX;
	crosshairY = mouseY;
	
	for (let i = drops.length - 1; i >= 0; i--) {
		if (dist(drops[i].x, drops[i].y, mouseX, mouseY) < 30) {
			drops[i].destroy = true;
			gold += drops[i].amount;
			drops.splice(i, 1);
		}
	}
	
	if (dist(mouseX, mouseY, width - 268, height - 32) < 50 && gold >= 100) {
			gold -= 100;
			mothmen.push(new Mothman(random(width/2 + 100, width - 100), random(50, height - 100), 1));
	}
	if (dist(mouseX, mouseY, width - 168, height - 32) < 50 && gold >= 250) {
			gold -= 250;
			mothmen.push(new Mothman(random(width/2 + 100, width - 100), random(50, height - 100), 2));
	}
	if (dist(mouseX, mouseY, width - 68, height - 32) < 50 && gold >= 500) {
			gold -= 500;
			mothmen.push(new Mothman(random(width/2 + 100, width - 100), random(50, height - 100), 3));
	}
}

function updateJon() {
	image(enemyImage2, jonX - 50, jonY - 50);
	strokeWeight(1);
	stroke(0);
	fill(255, 0, 0);
	rect(jonX - 50, jonY + 64, 64, 8);
	fill(0, 255, 0);
	rect(jonX - 50, jonY + 64, 64 * jonHP / jonMaxHP, 8);
	
	if (dist(jonX, jonY, jonTargetX, jonTargetY) > 12) {
		jonX += jonVelX;
		jonY += jonVelY;
		if (jonMelee == true && dist(jonX, jonY, jonTargetX, jonTargetY) <= 12) {
			jonCooldown = 400;
			jonVelX = 0;
			jonVelY = 0;
		}
	} else {
		if (jonMelee == true) {
			if (jonCooldown == 380 || jonCooldown == 340) {
				for (let i = 0; i < mothmen.length; i++) {
					if (dist(jonX + 100, jonY, mothmen[i].x, mothmen[i].y) < 50) {
						mothmen[i].hp -= 30;
					}
				}
			}
			if (jonCooldown < 380 && jonCooldown > 360) {
				strokeWeight(5);
				stroke(180, 180, 200);
				line(jonX + 50, jonY, jonX + 50 + 100 * cos(-QUARTER_PI + PI * (jonCooldown % 20) / 40), jonY + 100 * sin(-QUARTER_PI + PI * (jonCooldown % 20) / 40)); 
				fill(200, 200, 180);
				arc(jonX + 50, jonY, 100, 100, QUARTER_PI - PI * (20 - jonCooldown % 20) / 40, QUARTER_PI);
				
			}
			if (jonCooldown < 340 && jonCooldown > 320) {
				strokeWeight(5);
				stroke(180, 180, 200);
				line(jonX + 50, jonY, jonX + 50 + 100 * cos(QUARTER_PI - PI * (jonCooldown % 20) / 40), jonY + 100 * sin(QUARTER_PI - PI * (jonCooldown % 20) / 40)); 
				fill(200, 200, 180);
				arc(jonX + 50, jonY, 100, 100, -QUARTER_PI, -QUARTER_PI + PI * (20 - jonCooldown % 20) / 40);
			}
			if (jonCooldown == 300) {
				for (let i = 0; i < mothmen.length; i++) {
					if (dist(jonX, jonY, mothmen[i].x, mothmen[i].y) < 150) {
						mothmen[i].hp -= 40;
					}
				}
			}
			if (jonCooldown < 300 && jonCooldown > 270) {
				strokeWeight(5);
				stroke(180, 180, 200);
				line(jonX, jonY, jonX + 150 * cos(PI * (300 - jonCooldown) / 15), jonY + 150 * sin(PI * (300 - jonCooldown) / 15)); 
				fill(200, 200, 180);
				arc(jonX, jonY, 150, 150, 0, PI * (300 - jonCooldown) / 15);
			}
			if (jonCooldown == 250) {
				jonMelee = false;
				jonTargetX = random(50, width/3);
				jonTargetY = random(50, height - 100);
				let distance = dist(jonX, jonY, jonTargetX, jonTargetY);
				let xDist = jonTargetX - jonX;
				let yDist = jonTargetY - jonY;
				jonVelX = 12 * xDist / distance;
				jonVelY = 12 * yDist / distance;
			}
		}
		else if (floor(random(100)) == 1) {
			jonTargetX = random(50, width/3);
			jonTargetY = random(50, height - 100);
			let distance = dist(jonX, jonY, jonTargetX, jonTargetY);
			let xDist = jonTargetX - jonX;
			let yDist = jonTargetY - jonY;
			jonVelX = 4 * xDist / distance;
			jonVelY = 4 * yDist / distance;
		}
	}
	
	jonCooldown -= 1;
	if (jonCooldown <= 0) {
		if (floor(random(3)) == 1) {
			jonCooldown = 400;
			if (mothmen.length > 0) {
				let targetLock = mothmen[floor(random(mothmen.length))];
				jonTargetX = targetLock.x;
				jonTargetY = targetLock.y;
				let distance = dist(jonX, jonY, jonTargetX, jonTargetY);
				let xDist = jonTargetX - jonX;
				let yDist = jonTargetY - jonY;
				jonVelX = 12 * xDist / distance;
				jonVelY = 12 * yDist / distance;
				jonMelee = true;
			}
		} else {
			jonCooldown = 200;
			let j = floor(random(jonLevel)) + 1;
			for (let i = 0; i < j; i++) {
				hamas.push(new hama(random(width/2 + 100, width - 100), random(50, height - 100)));
			}
		}
	}
	
	if (jonHP <= 0) {
		jonDestroy = true;
		jonAlive = false;
		bossTimer = 2000;
		drops.push(new macca(jonX, jonY, 250 * jonLevel));
		score += 300 * jonLevel;
		midboss = false;
		difficulty += 1;
		jonLevel += 1;
		midbossMusic.stop();
		normalMusic.loop();
	}
}

function updateOrcus() {
	image(enemyImage3, orcusX - 150, orcusY - 50);
	strokeWeight(1);
	stroke(0);
	fill(255, 0, 0);
	rect(orcusX - 150, orcusY + 64, 300, 8);
	fill(0, 255, 0);
	rect(orcusX - 150, orcusY + 64, 300 * orcusHP / orcusMaxHP, 8);
	
	if (dist(orcusX, orcusY, orcusTargetX, orcusTargetY) > 1) {
		orcusX += orcusVelX;
		orcusY += orcusVelY;
	} else if (floor(random(100)) == 1) {
		orcusTargetX = orcusX;
		orcusTargetY = random(50, height - 100);
		orcusVelX = 0;
		if (orcusTargetY > orcusY) {
			orcusVelY = 1;
		} else if (orcusTargetY < orcusY) {
			orcusVelY = -1;
		}
	}
	
	orcusCooldown -= 1;
	if (orcusCooldown <= 0) {
		orcusCooldown = 300;
		if (floor(random(3)) == 1) {
			for (let i = 0; i < 21; i++) {
				megidos.push(new Megido(orcusX - 100 + 100 * floor(i / 7), orcusY, 14, 2 - (i % 7) / 3));
			}
		} else {
			waves.push(new orcusWave(orcusX - 100, orcusY));
			waves.push(new orcusWave(orcusX, orcusY));
			waves.push(new orcusWave(orcusX + 100, orcusY));
		}
	}
	
	if (orcusHP <= 0) {
		orcusDestroy = true;
		orcusAlive = false;
		bossTimer = 2000;
		drops.push(new macca(orcusX, orcusY, 500 * orcusLevel));
		score += 1000 * orcusLevel;
		midboss = true;
		difficulty += 1;
		orcusLevel += 1;
		bossMusic.stop();
		normalMusic.loop();
	}
}

function updatePlayer() {
	image(playerImage, player.x - 32, player.y - 32);
	strokeWeight(1);
	stroke(0);
	fill(255, 0, 0);
	rect(player.x - 32, player.y + 64, 64, 8);
	fill(0, 255, 0);
	rect(player.x - 32, player.y + 64, 64 * player.hp / player.maxHP, 8);
	
	if (player.hp <= 0 && gameOver <= 0) {
		gameOver = 1;
		normalMusic.stop();
		midbossMusic.stop();
		bossMusic.stop();
		loseMusic.loop();
		return;
	}
	
	if (keyIsDown(87)) {
		player.y = max(player.y - 4, 32);	
	}
	if (keyIsDown(65)) {
		player.x = max(player.x - 4, 32);	
	}
	if (keyIsDown(83)) {
		player.y = min(player.y + 4, height - 32);	
	}
	if (keyIsDown(68)) {
		player.x = min(player.x + 4, width - 32);	
	}
	if (keyIsDown(32) && playerAttack == 0) {
		playerCharge += 1;
		strokeWeight(3);
		if (playerCharge < 30) {
			stroke(120);	
		} else if (playerCharge < 60) {
			stroke(0, 0, 255);	
		} else {
			stroke(255, 0, 0);
		}
		line(player.x - 32, player.y, player.x - 84, player.y + 48);
	} else {
		if (playerCharge > 0 && playerCharge < 30) {
			playerAttack = 1;
			for (let i = 0; i < mots.length; i++) {
				if (dist(player.x - 75, player.y, mots[i].x, mots[i].y) < 50) {
					mots[i].hp -= 30;
				}
			}
			if (jonAlive && dist(player.x - 75, player.y, jonX, jonY) < 50) {
				jonHP -= 30;
			}
			if (orcusAlive && dist(player.x - 75, player.y, orcusX, orcusY) < 150) {
				orcusHP -= 30;
			}
		} else if (playerCharge >= 30 && playerCharge < 60) {
			playerAttack = 101;
			for (let i = 0; i < mots.length; i++) {
				if (dist(player.x, player.y, mots[i].x, mots[i].y) < 150) {
					mots[i].hp -= 40;
				}
			}
			if (jonAlive && dist(player.x, player.y, jonX, jonY) < 50) {
				jonHP -= 40;
			}
			if (orcusAlive && dist(player.x, player.y, orcusX, orcusY) < 150) {
				orcusHP -= 40;
			}
		} else if (playerCharge >= 60) {
			critWaves.push(new criticalWave(player.x, player.y));
		}
		playerCharge = 0;
	}
	
	if (playerAttack > 0 && playerAttack < 100) {
		strokeWeight(5);
		stroke(120);
		line(player.x - 50, player.y, player.x - 50 - 100 * cos(-QUARTER_PI + PI * (21 - playerAttack) / 40), player.y + 100 * sin(-QUARTER_PI + PI * (21 - playerAttack) / 40)); 
		fill(20, 60, 120);
		arc(player.x - 50, player.y, 100, 100, -PI - QUARTER_PI, -PI - QUARTER_PI + PI * playerAttack / 40);
		playerAttack += 1;
		if (playerAttack > 20) {
			playerAttack = 0;
		}
	} else if (playerAttack > 100) {
		strokeWeight(5);
		stroke(120);
		line(player.x, player.y, player.x + 150 * cos(PI * (playerAttack - 100) / 15), player.y + 150 * sin(PI * (playerAttack - 100) / 15)); 
		fill(200, 200, 180);
		arc(player.x, player.y, 150, 150, 0, PI * (playerAttack - 100) / 15);
		playerAttack += 1;
		if (playerAttack > 130) {
			playerAttack = 0;	
		}
	}
	
	
}

function restart() {
	mothmen = [];
	mots = [];
	bullets = [];
	drops = [];
	hamas = [];
	waves = [];
	megidos = [];
	mudos = [];
	critWaves = [];
	crosshairX = width/3;
	crosshairY = height/2;
	score = 0;
	difficulty = 1;
	spawnTimer = 100;
	gold = 0;
	bossTimer = 2000;
	jonAlive = false;
	midboss = true;
	jonLevel = 1;
	orcusLevel = 1;
	gameOver = 0;
	playerCharge = 0;
	playerAttack = 0;
	
	mothmen[0] = new Mothman(width * 4 / 5, height / 2, 0);
	mothmen[0].maxHP = 250;
	mothmen[0].hp = 250;
	player = mothmen[0];
	
	for (let i = 1; i < 6; i++) {
		mothmen[i] = new Mothman(random(width/2 + 100, width - 100), random(50, height - 100), 1);
	}
	
	for (let i = 0; i < 5; i++) {
		mots[i] = new Mot(random(0, width/3), random(50, height - 100), 1, 1);
	}
	normalMusic.loop();
}

class Mothman {
	constructor(x, y, job) {
		this.hp = 100;
		this.maxHP = this.hp;
		this.reload = 100;
		this.x = x;
		this.y = y;
		this.targetX = x;
		this.targetY = y;
		this.velX = 0;
		this.velY = 0;
		this.destroy = false;
		this.job = job;
	}
	
	update() {
		if (this.job == 0) {
			updatePlayer();
			return;
		}
		
		if (this.job == 1) {
			image(mothImage1, this.x - 32, this.y - 32);
		} else if (this.job == 2) {
			image(mothImage2, this.x - 32, this.y - 32);
		} else {
			image(mothImage3, this.x - 32, this.y - 32);
		}
		strokeWeight(1);
		stroke(0);
		fill(255, 0, 0);
		rect(this.x - 32, this.y + 64, 64, 8);
		fill(0, 255, 0);
		rect(this.x - 32, this.y + 64, 64 * this.hp / this.maxHP, 8);
		
		if (this.hp <= 0) {
			this.destroy = true;
		}
		
		this.reload -= 1;
		if (this.reload <= 0) {
			if (this.job == 1) {
				this.reload = 100;
				bullets.push(new Bullet(this.x, this.y));
			} else if (this.job == 2) {
				this.reload = 400;
				for (let i = 0; i < mothmen.length; i++) {
					if (dist(this.x, this.y, mothmen[i].x, mothmen[i].y) > 0.1 && dist(this.x, this.y, mothmen[i].x, mothmen[i].y) < 100) {
						mothmen[i].hp = min(mothmen[i].maxHP, mothmen[i].hp + 25);
					}
				}
			} else {
				this.reload = 300;
				mudos.push(new Mudo(random(crosshairX - 100, crosshairX + 100), random(crosshairY - 100, crosshairY + 100)));
			}
		}
		
		if (this.job == 2 && this.reload > 375) {
			strokeWeight(10);
			stroke(0, 255, 0);
			noFill();
			circle(this.x, this.y, 2400 - 6 * this.reload);
		}
		
		if (dist(this.x, this.y, this.targetX, this.targetY) > 2) {
			this.x += this.velX;
			this.y += this.velY;
		} else {
			if (floor(random(100)) == 1) {
				this.targetX = random(width/2 + 100, width - 100);
				this.targetY = random(50, height - 100);
				let distance = dist(this.x, this.y, this.targetX, this.targetY);
				let xDist = this.targetX - this.x;
				let yDist = this.targetY - this.y;
				this.velX = 2 * xDist / distance;
				this.velY = 2 * yDist / distance;
			}
		}
	}
}

class Mot {
	constructor(x, y, level, job) {
		this.level = level;
		this.hp = 15 + 5 * level;
		this.maxHP = this.hp;
		this.x = x;
		this.y = y;
		this.targetX = x + 200;
		this.targetY = y;
		this.destroy = false;
		this.speed = 0.8 + 0.2 * level;
		this.cooldown = 0;
		this.velX = this.speed;
		this.velY = 0;
		this.job = job;
	}
	
	update() {
		image(enemyImage1, this.x - 16, this.y - 32);
		strokeWeight(1);
		stroke(0);
		fill(255, 0, 0);
		rect(this.x - 16, this.y + 64, 32, 8);
		fill(0, 255, 0);
		rect(this.x - 16, this.y + 64, 32 * this.hp / this.maxHP, 8);
		if (this.hp <= 0) {
			this.destroy = true;
		}
		
		this.cooldown -= 1;
		if (this.cooldown <= 0) {
			if (this.job == 1) {
				for (let i = 0; i < mothmen.length; i++) {
					if (dist(this.x, this.y, mothmen[i].x, mothmen[i].y) < 30) {
						mothmen[i].hp -= 19 + this.level;
						this.cooldown = 40;
					}
				}
			} else {
				this.cooldown = 200;
				megidos.push(new Megido(this.x, this.y, 6, 0));
			}
		}
		
		if (dist(this.x, this.y, this.targetX, this.targetY) > 2) {
			this.x += this.velX;
			this.y += this.velY;
		} else if (this.job == 2 && floor(random(100)) == 1) {
			this.targetX = random(50, width/3);
			this.targetY = random(50, height - 100);
			let distance = dist(this.x, this.y, this.targetX, this.targetY);
			let xDist = this.targetX - this.X;
			let yDist = this.targetY - this.Y;
			this.velX = this.speed * xDist / distance;
			this.velY = this.speed * yDist / distance;
		}
		if (this.job == 1 && floor(random(100)) == 1 && mothmen.length > 0) {
			let targetLock = mothmen[floor(random(mothmen.length))];
			this.targetX = targetLock.x;
			this.targetY = targetLock.y;
			let distance = dist(this.x, this.y, this.targetX, this.targetY);
			let xDist = this.targetX - this.x;
			let yDist = this.targetY - this.y;
			this.velX = this.speed * xDist / distance;
			this.velY = this.speed * yDist / distance;
		}
	}
}

class Bullet {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		let distance = dist(x, y, crosshairX, crosshairY);
		let xDist = crosshairX - x;
		let yDist = crosshairY - y;
		this.velX = 10 * xDist / distance;
		this.velY = 10 * yDist / distance;
		this.destroy = false;
	}
	
	update() {
		noStroke();
		fill(150);
		this.x += this.velX;
		this.y += this.velY;
		circle(this.x, this.y, 10);
		if (this.x < -10 || this.x > width + 10 || this.y < -10 || this.y > height + 10) {
			this.destroy = true;
		}
		for (let i = 0; i < mots.length; i++) {
			if (dist(this.x, this.y, mots[i].x, mots[i].y) < 30) {
				this.destroy = true;
				mots[i].hp -= 10;
			}
		}
		if (jonAlive && dist(this.x, this.y, jonX, jonY) < 50) {
			this.destroy = true;
			jonHP -= 10;
		}
		if (orcusAlive && dist(this.x, this.y, orcusX, orcusY) < 150) {
			this.destroy = true;
			orcusHP -= 10;
		}
	}
}

class Megido {
	constructor(x, y, velX, velY) {
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
		this.destroy = false;
	}
	
	update() {
		stroke(255, 0, 0);
		strokeWeight(2);
		fill(50);
		this.x += this.velX;
		this.y += this.velY;
		circle(this.x, this.y, 10);
		if (this.x < -10 || this.x > width + 10 || this.y < -10 || this.y > height + 10) {
			this.destroy = true;
		}
		for (let i = 0; i < mothmen.length; i++) {
			if (dist(this.x, this.y, mothmen[i].x, mothmen[i].y) < 30) {
				this.destroy = true;
				mothmen[i].hp -= 10;
			}
		}
	}
}

class macca {
	constructor(x, y, amount) {
		this.x = x;
		this.y = y;
		this.amount = amount;
		this.lifetime = 250;
		this.destroy = false;
	}
	
	update() {
		strokeWeight(1);
		stroke(0);
		fill(255, 255, 0);
		circle(this.x - 8, this.y, 15);
		circle(this.x + 8, this.y, 15);
		circle(this.x, this.y + 8, 15);
		this.lifetime -= 1;
		if (this.lifetime <= 0) {
			this.destroy = true;
		}
	}
	
}

class hama {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.countdown = 50;
		this.destroy = false;
	}
	
	update() {
		this.countdown -= 1;
		
		if (this.countdown > 0) {
			strokeWeight(4);
			stroke(255, 255, 200);
			noFill();
			arc(this.x, this.y, 50, 50, 0, 2 * PI);
			line(this.x, this.y + 10, this.x, this.y + 60);
			line(this.x, this.y - 10, this.x, this.y - 60);
			line(this.x + 10, this.y, this.x + 60, this.y);
			line(this.x - 10, this.y, this.x - 60, this.y);
		} else {
			fill(255, 255, 200);
			noStroke();
			circle(this.x, this.y, 100);
			
			if (this.countdown == 0) {
				for (let i = 0; i < mothmen.length; i++) {
					if (dist(this.x, this.y, mothmen[i].x, mothmen[i].y) < 100) {
						mothmen[i].hp -= 30;
					}
				}
			}
			
			if (this.countdown <= -20) {
				this.destroy = true;	
			}
		}
	}
}

class Mudo {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.countdown = 50;
		this.destroy = false;
	}
	
	update() {
		this.countdown -= 1;
		
		if (this.countdown > 0) {
			strokeWeight(4);
			stroke(100, 0, 100);
			noFill();
			arc(this.x, this.y, 50, 50, 0, 2 * PI);
			line(this.x, this.y + 10, this.x, this.y + 60);
			line(this.x, this.y - 10, this.x, this.y - 60);
			line(this.x + 10, this.y, this.x + 60, this.y);
			line(this.x - 10, this.y, this.x - 60, this.y);
		} else {
			fill(100, 0, 100);
			noStroke();
			circle(this.x, this.y, 100);
			
			if (this.countdown == 0) {
				for (let i = 0; i < mots.length; i++) {
					if (dist(this.x, this.y, mots[i].x, mots[i].y) < 100) {
						mots[i].hp -= 30;
					}
				}
				if (jonAlive && dist(this.x, this.y, jonX, jonY) < 100) {
					jonHP -= 30;
				}
				if (orcusAlive && dist(this.x, this.y, orcusX, orcusY) < 200) {
					orcusHP -= 30;
				}
			}
			
			if (this.countdown <= -20) {
				this.destroy = true;	
			}
		}
	}
}

class orcusWave {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.cooldown = 0;
		this.destroy = false;
	}
	
	update() {
		this.cooldown -= 1;
		strokeWeight(6);
		stroke(255, 0, 196);
		noFill();
		ellipse(this.x, this.y, 20, 100);
		this.x += 8;
		if (this.x > width + 10) {
			this.destroy = true;
		}
		
		if (this.cooldown <= 0) {
			for (let i = 0; i < mothmen.length; i++) {
				if (dist(this.x, this.y, mothmen[i].x, mothmen[i].y) < 50) {
					mothmen[i].hp -= 5 + 5 * orcusLevel;
					this.cooldown = 30;
				}
			}
		}
	}
}

class criticalWave {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.cooldown = 0;
		this.destroy = false;
	}
	
	update() {
		this.cooldown -= 1;
		strokeWeight(6);
		stroke(255, 0, 0);
		fill(180, 130, 80);
		circle(this.x, this.y, this.cooldown * this.cooldown * 0.25);
		this.x -= 8;
		if (this.x < -10) {
			this.destroy = true;
		}
		
		if (this.cooldown <= 0) {
			this.cooldown = 30;
			for (let i = 0; i < mots.length; i++) {
				if (dist(this.x, this.y, mots[i].x, mots[i].y) < 50) {
					mots[i].hp -= 50;
				}
			}
			if (jonAlive && dist(this.x, this.y, jonX, jonY) < 50) {
				jonHP -= 50;
			}
			if (orcusAlive && dist(this.x, this.y, orcusX, orcusY) < 150) {
				orcusHP -= 50;
			}
		}
	}
}