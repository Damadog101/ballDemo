// setup canvas

const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth - 200);
const height = (canvas.height = window.innerHeight);

let speed = document.getElementById("speed");
let radius = document.getElementById("size");
let amount = document.getElementById("amount");

// function to generate random number


let images = {
	1 : "/images/blue.png",
	2 : "/images/bomb.png",
	3 : "/images/pink.png",
	4 : "/images/puff.png",
	5 : "/images/red.png",
	6 : "/images/yellow.png"
	
}


function random(min, max) {
	const num = Math.floor(Math.random() * (max - min + 1)) + min;
	return num;
}

function Ball(x, y, velX, velY, color, size) {
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.color = color;
	this.size = size;
}

function playSound(sound) {
	let soundPlayed = new Audio(sound);
	soundPlayed.play();
}

Ball.prototype.draw = function () {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.fill();
};

Ball.prototype.update = function () {
	if (this.x + this.size >= width) {
		this.velX = -this.velX;
	}

	if (this.x - this.size <= 0) {
		this.velX = -this.velX;
	}

	if (this.y + this.size >= height) {
		this.velY = -this.velY;
	}

	if (this.y - this.size <= 0) {
		this.velY = -this.velY;
	}

	this.x += this.velX;
	this.y += this.velY;
};

let balls = [];

function createBall() {
	// Ball Size
	if (radius.value <= 0 || radius.value == " ") {
		size = 4;
	} else {
		size = parseInt(radius.value);
	}

	// Ball Speed
	if (speed.value <= 0 || speed.value == " ") {
		velocity = random(-7, 7);
	} else {
		velocity = parseInt(speed.value);
	}

	let ball = new Ball(
		random(0 + size, width - size),
		random(0 + size, height - size),
		velocity,
		velocity,
		"rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")",
		size
	);

	balls.push(ball);
}

if ((amount.innerHTML = " ")) {
	while (balls.length < 1) {
		createBall();
	}
} else {
	while (balls.length < amount.innerHTML) {
		createBall();
	}
}

amount.addEventListener("input", () => {
	if (amount.value == " ") {
		while (balls.length < 1) {
			createBall();
			console.log(amount.innerHTML);
		}
	} else if (amount.value <= 0) {
		return;
	} else {
		while (balls.length < amount.value) {
			createBall();
		}
		while (balls.length > amount.value) {
			balls.pop();
		}
	}
});

function loop() {
	ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
	ctx.fillRect(0, 0, width, height);

	for (let i = 0; i < balls.length; i++) {
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetect();
	}
	requestAnimationFrame(loop);
}

Ball.prototype.collisionDetect = function () {
	for (let j = 0; j < balls.length; j++) {
		if (!(this === balls[j])) {
			const dx = this.x - balls[j].x;
			const dy = this.y - balls[j].y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < this.size + balls[j].size) {
				// balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
				balls[j].velX = -balls[j].velX;
				balls[j].velY = -balls[j].velY;
				playSound("bird.mp3");
			}
		}
	}
};

loop();

// window.addEventListener("click", () => {
// 	let size = 10;
// 	let ball = new Ball(
// 		// ball position always drawn at least one ball width
// 		// away from the edge of the canvas, to avoid drawing errors
// 		random(0 + size, width - size),
// 		random(0 + size, height - size),
// 		random(-7, 7),
// 		random(-7, 7),
// 		"rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")",
// 		size
// 	);

// 	balls.push(ball);
// });
