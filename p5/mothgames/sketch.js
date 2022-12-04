let ballX = 300;
let ballY = 550;
let velocityX = 0;
let velocityY = 0;
let moving = false;
let pressedLast = false;
let scorePlayer = 0;
let scoreMoth = 0;
let mothX = 1000;
let mothY = 550;
let mothTarget = 1000;
let passedByMoth = true;
let blink = 200;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
}

function draw() {
	background(0, 200, 255);
	fill(0xc7, 0xbe, 0x95);
	rect(0, 600, width, 200);
	fill(0x3c);
	rect(width / 2 - 20, 300, 40, 250);
	rect(width / 2 - 3, 550, 6, 50);
	
	fill(255, 255, 0);
	circle(250, 50, 400);
	fill(212, 212, 212);
	ellipse(600, 100, 100, 80);
	ellipse(640, 100, 100, 80);
	ellipse(680, 100, 100, 80);
	
	ellipse(1200, 130, 100, 80);
	ellipse(1240, 130, 100, 80);
	ellipse(1280, 130, 100, 80);
	
	fill(200, 0, 0); //draw ball
	circle(ballX, ballY, 100);
	fill(255)
	circle(ballX, ballY, 50);
	
	if (mouseIsPressed && !pressedLast && ballX < width / 2) { //launch ball
		if (abs(mouseX - ballX) < 75 && mouseY > ballY - 10 && ballY > 350) {
			velocityX = 0.2 * (ballX - mouseX);
			velocityY = -0.5 * min(100 - mouseY + ballY, 50);
			moving = true;
			passedByMoth = false;
		}
	}
	
	pressedLast = mouseIsPressed;
	
	//Mothman drawing I copy pasted from my programming 1
	strokeWeight(1);
	stroke(0, 0, 0);
	fill(204, 193, 71);
	arc(mothX - 15, mothY + 8, 40, 55, QUARTER_PI, PI + HALF_PI + QUARTER_PI);
	arc(mothX + 15, mothY + 8, 40, 55, PI + QUARTER_PI, 2 * PI + HALF_PI + QUARTER_PI);
	fill(189, 15, 38);
	arc(mothX - 15, mothY + 8, 40, 55, HALF_PI + QUARTER_PI, PI + QUARTER_PI);
	arc(mothX + 15, mothY + 8, 40, 55, PI + HALF_PI + QUARTER_PI, 2 * PI + QUARTER_PI);
	fill(25, 179, 94);
	arc(mothX - 15, mothY + 8, 40, 55, QUARTER_PI, HALF_PI + QUARTER_PI);
	arc(mothX + 15, mothY + 8, 40, 55, 2 * PI + QUARTER_PI, 2 * PI + HALF_PI + QUARTER_PI);
	strokeWeight(2);
	line(mothX, mothY + 8, mothX - 33, mothY + 8);
	line(mothX, mothY + 8, mothX + 33, mothY + 8);
	line(mothX - 14, mothY + 8, mothX - 25, mothY - 15);
	line(mothX + 14, mothY + 8, mothX + 25, mothY - 15);
	line(mothX - 14, mothY + 8, mothX - 25, mothY + 30);
	line(mothX + 14, mothY + 8, mothX + 25, mothY + 30);
	stroke(1, 3, 51);
	strokeWeight(3);
	line(mothX - 3, mothY + 35, mothX - 9, mothY + 55);
	line(mothX + 3, mothY + 35, mothX + 9, mothY + 55);
	strokeWeight(2);
	line(mothX - 10, mothY + 55, mothX - 14, mothY + 62);
	line(mothX - 9, mothY + 55, mothX - 9, mothY + 63);
	line(mothX - 8, mothY + 55, mothX - 4, mothY + 62);
	line(mothX + 10, mothY + 55, mothX + 14, mothY + 62);
	line(mothX + 9, mothY + 55, mothX + 9, mothY + 63);
	line(mothX + 8, mothY + 55, mothX + 4, mothY + 62);
	noFill()
	strokeWeight(3)
	stroke(48, 87, 230);
	arc(mothX - 15, mothY - 50, 20, 20, PI, 2 * PI);
	arc(mothX + 15, mothY - 50, 20, 20, PI, 2 * PI);
	noStroke();
	fill(48, 87, 230);
	ellipse(mothX, mothY, 30, 70);
	ellipse(mothX, mothY - 30, 40, 40);
	if (blink > 0) {
		fill(168, 43, 19);
		ellipse(mothX - 7, mothY - 37, 8, 8);
		ellipse(mothX + 7, mothY - 37, 8, 8);
		fill(0, 0, 0);
		ellipse(mothX - 7, mothY - 37, 3, 3);
		ellipse(mothX + 7, mothY - 37, 3, 3);
		blink -= deltaTime;
		if (blink <= 0) {
			blink = -200;
		}
	} else {
			fill(0, 0, 0);
			ellipse(mothX - 7, mothY - 37, 8, 3);
			ellipse(mothX + 7, mothY - 37, 8, 3);
			blink += deltaTime;
			if (blink >= 0) {
				blink = 4000;
			}
	}
	
	ellipse(mothX, mothY - 25, 22, 8); //Mothman TM (property of Atlus)
	
	if (mothTarget - mothX <= 3 && random() < 0.02) {
		if (ballX < width / 2 || ballX > width) {
			mothTarget = floor(random() * (1450 - 800) + 800);
		} else {
			mothTarget = ballX + floor((550 - ballY) * 0.5);
		}
	} else if (mothX > mothTarget + 3) {
		mothX = mothX - 4;
	} else if (mothX < mothTarget - 3) {
		mothX = mothX + 4;
	}
	
	if (!moving || velocityY > 0) {//will the moth hit the ball?
		if (abs(mothX - ballX) < 50 && ballY > 450) {
				velocityX = 0.25 * max(ballX - (mothX + 40), -50);
				velocityY = floor(random() * (20 - 25) - 20);
				if (ballY <= 550) {
					velocityX = - 0.01 * (ballX - 200) + random() - 0.5;
				}
				moving = true;
				passedByMoth = true;
		}
	}
	
	if (moving) { //move ball
		ballX = ballX + velocityX;
		ballY = min(ballY + velocityY, 550);
		velocityY = min(velocityY + 0.66, 8);
		if (ballY >= 550) {
			moving = false;
			if (ballX > width / 2 + 50 && ballX < width + 50) { //land, do score
				scorePlayer = scorePlayer + 1;	
			} else if (ballX < width / 2 - 50 && ballX > 50) {
				scoreMoth = scoreMoth + 1;
			} else if (passedByMoth) {
				scorePlayer = scorePlayer + 1;
			} else {
				scoreMoth = scoreMoth + 1;
			}
			if (ballX > width - 10 || ballX < 10) {
				if (passedByMoth) {
					ballX = floor(random() * (500 - 200) + 200);
				} else {
					ballX = floor(random() * (1300 - 1000) + 1000);
				}
			}
		} else if (abs(ballX - width / 2) < 25 && ballY > 300) {
			moving = false;
			ballY = 550;
			if (passedByMoth) {
				scorePlayer = scorePlayer + 1;
				ballX = floor(random() * (500 - 200) + 200);
			} else {
				scoreMoth = scoreMoth + 1;
				ballX = floor(random() * (1300 - 1000) + 1000);
			}
		}
	}
	
	
	
	fill(0); //here's the score
	textSize(32);
	text('You', 50, 50);
	text(scorePlayer, 150, 50);
	text('Moth', 1350, 50);
	text(scoreMoth, 1450, 50);
	
}