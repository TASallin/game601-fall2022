let impostor = -1;
let impostorY = 652;
let impostorDestination = -1;
let impostorBearing = 0;
let impostorAnim = 0;
let impostorTimer = 0;
let impostorColor = 0;
let crewmates = [];
let crewColors = [];
let crewDestinations = [];
let crewBearings = [];
let crewAnims = [];
let crewTimers = [];
let newCrewCooldown = 100;
let impostorCooldown = 1000;
let crewCount = 0;
let killTimer = 0;
let voteTimer = 0;
let ejectedX = -1;
let ejectedY = -100;
let ejectedColor = 0;
let ejectedBearing = 0;
let ejectedSpinTimer = 25;
let dead = -1;
let deadColor = 0;
let deadBearing = 0;
let deadTimer = 250;
//credits to InnerSloth for Among Us

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	
}

function draw() {
	background(0, 0, 0); //space and ship
	fill(200, 200, 200);
	rect(0, 200, width, 600);
	
	fill(216, 216, 216);
	rect(100, 300, width - 200, 600);
	noStroke();
	fill(150, 150, 150);
	rect(100, 600, width - 200, 100);
	
	//materia plane
	if (newCrewCooldown > 0) { //adding the crew
		newCrewCooldown -= 1;
	} else if (crewCount < 9) {
		crewCount = crewCount + 1;
		newCrewCooldown = Math.floor(Math.random() * (2000 - 250) + 250);
		if (crewmates.length < 9) {
			crewmates.push(1500);
			crewDestinations.push(1000);
			crewColors.push(Math.floor(Math.random() * 12) + 1);	
			crewBearings.push(4);
			crewAnims.push(0);
			crewTimers.push(25);
		} else {
			for (i = 0; i < crewmates.length; i++) {
				if (crewmates[i] == -1) {
					crewmates[i] = 1500;
					crewDestinations[i] = 1000;
					crewColors[i] = Math.floor(Math.random() * 12) + 1;
					crewBearings[i] = 4;
					crewAnims[i] = 0;
					crewTimers[i] = 25;
					break;
				}
			}
		}
	}
	
	if (impostorCooldown > 0) {//venting the impostor
		impostorCooldown -= 1;
		if (impostorCooldown == 0) {
			impostor = 250;	
			impostorY = 652;
			impostorDestination = 250;
			impostorAnim = 1;
			impostorTimer = 25;
			impostorColor = Math.floor(Math.random() * 12) + 1;
		}
	}
	
	
	for (i = 0; i < crewmates.length; i++) { //drawing the crew
		if (crewmates[i] == -1) {
			continue;
		}
		strokeWeight(1);
		colorPicker(crewColors[i]);
		drawCrewmate(crewmates[i], 550, crewBearings[i], crewAnims[i]);
		if (crewDestinations[i] > crewmates[i]) {
			crewmates[i] = crewmates[i] + 1;
		} else if (crewDestinations[i] < crewmates[i]) {
			crewmates[i] = crewmates[i] - 1;	
		} else if (Math.random() < 0.02) {
			crewDestinations[i] = Math.floor(Math.random() * (1350 - 150) + 150);
			if (crewDestinations[i] > crewmates[i]) {
				crewBearings[i] = 0;
			} else {
				crewBearings[i] = 4;
			}
		}
		if (crewDestinations[i] != crewmates[i]) {
			crewTimers[i] = crewTimers[i] - 1;
			if (crewTimers[i] <= 0) {
				crewTimers[i] = 25;
				crewAnims[i] = (crewAnims[i] + 1) % 2;
			}
		} else {
			crewAnims[i] = 0;
		}
	}
	
	if (impostor > -1) {//drawing the impostor
		
		strokeWeight(1);
		colorPicker(impostorColor);
		drawCrewmate(impostor, impostorY, impostorBearing, impostorAnim);
		
		if (impostorY != 550) {//venting animation
			if (impostorY < 500) {
				impostorY = impostorY + 5;
			} else {
				impostorY = impostorY - 2;
			}
		} else {
		
			if (impostorDestination > impostor) {//moving the impostor
				impostor = impostor + 1;
			} else if (impostorDestination < impostor) {
				impostor = impostor - 1;	
			} else if (Math.random() < 0.02) {
				impostorDestination = Math.floor(Math.random() * (1350 - 150) + 150);
				if (impostorDestination > impostor) {
					impostorBearing = 0;
				} else {
					impostorBearing = 4;
				}
			}
			
			if (impostorDestination != impostor) {
				impostorTimer = impostorTimer - 1;
				if (impostorTimer <= 0) {
					impostorTimer = 25;
					impostorAnim = (impostorAnim + 1) % 2;
				}
			} else if (impostorY == 550) {
				impostorAnim = 0;
			}
		}
		
		if (killTimer > 0) {//sus
			killTimer = killTimer - 1;
		} else {
			for (i = 0; i < crewmates.length; i++) {
				if (impostorDestination > impostor && crewmates[i] == impostor + 75 || impostorDestination < impostor && crewmates[i] == impostor - 75) {
					if (impostor > crewmates[i]) {
						impostor = impostor - 40;
					} else {
						impostor = impostor + 40;
					}
					
					impostorDestination = impostor;
					dead = crewmates[i];
					deadColor = crewColors[i];
					deadBearing = crewBearings[i];
					deadTimer = 250;
					crewmates[i] = -1;
					killTimer = 500;
					crewCount = crewCount - 1;
					voteTimer = 200;
					break;
				}
			}
		}
	}
	
	if (dead > -1) {//drawing the not crewmate anymore
		colorPicker(deadColor);
		drawCrewmate(dead, 550, deadBearing, 2);
		deadTimer = deadTimer - 1;
		if (deadTimer <= 0) {
			dead = -1;
		}
	}
	
	if (voteTimer > 0) { //voting out the impostor or not the impostor
		voteTimer = voteTimer - 1;
		if (voteTimer == 0) {
			if (Math.random() < 0.5) {
					if (impostor < 925 && impostor > 675) {
						ejectedX = impostor;
						impostor = -1;
						impostorCooldown = Math.floor(Math.random() * (4000 - 500) + 500)
						ejectedY = 550;
						ejectedColor = impostorColor;
					}
			} else {
				for (i = 0; i < crewmates.length; i++) {
					if (crewmates[i] < 925 && crewmates[i] > 675) {
						ejectedX = crewmates[i]
						crewmates[i] = -1;
						crewCount = crewCount - 1;
						ejectedY = 550;
						ejectedBearing = 1;
						ejectedSpinTimer = 25;
						ejectedColor = crewColors[i];
						break;
					}
				}
			}
		}
	}
	
	if (ejectedY > -100) {//ejected animation
		
		strokeWeight(1);
		colorPicker(ejectedColor);
		drawCrewmate(ejectedX, ejectedY, ejectedBearing, 0);
		
		ejectedY = ejectedY - 3;
		
		ejectedSpinTimer = ejectedSpinTimer - 1;
		
		if (ejectedSpinTimer <= 0) {
			ejectedSpinTimer = 25;
			ejectedBearing = (ejectedBearing + 1) % 4;
		}
		
	}
	
	//foreground
	strokeWeight(1);
	stroke(0, 0, 0);
	fill(227, 227, 227);
	rect(250, 615, 10, 30);// a vent
	rect(225, 615, 10, 30);
	rect(275, 615, 10, 30);
	rect(225, 645, 60, 10);
	rect(225, 605, 60, 10);
	
	fill(40, 40, 40);
	rect(650, 180, 300, 150);//exit of the ship
	
	rect(1400, 500, 200, 100); //a door
	
	
}

//Acquires the color of a crewmate
function colorPicker(index) {
	switch (index) {
		case 1:
			fill(197, 17, 17);
			break;
		case 2:
			fill(19, 46, 209);
			break;
		case 3:
			fill(17, 127, 45);
			break;
		case 4:
			fill(237, 84, 186);
			break;
		case 5:
			fill(239, 125, 13);
			break;
		case 6:
			fill(245, 245, 87);
			break;
		case 7:
			fill(63, 71, 78);
			break;
		case 8:
			fill(107, 47, 187);
			break;
		case 9:
			fill(113, 73, 30);
			break;
		case 10:
			fill(53, 254, 220);
			break;
		case 11:
			fill(80, 239, 57);
			break;
		case 12:
			fill(214, 224, 240);
			break;
		default:
			fill(0, 0, 0);
			break;
	}
	
}

//draws a crewmate. bearing = 0 for right, 1 for up, 2, for left, 3 for down,4 for left but upright;
//anim 0 = standing, 1 = walking
function drawCrewmate(x, y, bearing, anim) {
		if (anim != 2) {
			if (bearing == 0) {
				rect(x - 25, y - 15, 15, 30);
			} else if (bearing == 2 || bearing == 4) {
				rect(x + 10, y - 15, 15, 30);
			} else if (bearing == 1) {
				rect(x - 15, y + 10, 30, 15);
			} else {
				rect(x - 15, y - 25, 30, 15);
			}
		}
		
		if (bearing % 4 == 0) {
			if (anim != 2) {
				ellipse(x, y, 40, 60);
			}
			rect(x - 20, y, 40, 30);
			if (anim == 1) {
				rect(x - 30, y + 30, 20, 10);
				rect(x + 10, y + 30, 20, 10);
			} else {
				rect(x - 20, y + 30, 10, 20);
				rect(x + 10, y + 30, 10, 20);
			}
		} else if (bearing == 1) {
			ellipse(x, y, 60, 40);
			rect(x, y - 20, 30, 40);
			rect(x + 30, y - 20, 20, 10);
			rect(x + 30, y + 10, 20, 10);
		} else if (bearing == 2) {
			ellipse(x, y, 40, 60);
			rect(x - 20, y - 30, 40, 30);
			rect(x - 20, y - 50, 10, 20);
			rect(x + 10, y - 50, 10, 20);
		} else {
			ellipse(x, y, 60, 40);
			rect(x - 30, y - 20, 30, 40);
			rect(x - 50, y - 20, 20, 10);
			rect(x - 50, y + 10, 20, 10);
		}
		
		if (anim != 2) {
			fill(160, 160, 160);
			if (bearing == 0) {
				ellipse(x + 10, y - 5, 25, 20);
			} else if (bearing == 4) {
				ellipse(x - 10, y - 5, 25, 20);
			} else if (bearing == 1) {
				ellipse(x - 5, y - 10, 20, 25);
			} else if (bearing == 2) {
				ellipse(x - 10, y - 5, 25, 20);
			} else {
				ellipse(x + 5, y - 10, 20, 25);
			}
		}
}