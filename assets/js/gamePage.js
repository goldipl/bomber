import heartImage from "./../img/heart.png";

const gamePage = () => {
	app.innerHTML = `
		<div id="gameContainer">
			<canvas id="canvas"></canvas>
			<div id="time-container">
				Time: <div id="time-counter">10:00</div>
			</div>
			<div id="lives-container">
				Lives: 
				<div id="lives-counter">
					<img width="40" height ="40" class="heart-icon first" src="${heartImage}"></img>
					<img width="40" height ="40" class="heart-icon second" src="${heartImage}"></img>
					<img width="40" height ="40" class="heart-icon third" src="${heartImage}"></img>
				</div>	
			</div>
			<a id="exit-btn-link-container" href="./index.html">
				<div id="exit-btn">
					Exit
				</div>
			</a>
		</div>`;

	const timeCounter = document.getElementById("time-counter");
	const canvas = document.getElementById("canvas");

	let seconds;
	const gameTimer = () => {
		seconds--;
		let mins = Math.floor(seconds / 60);
		let secs = Math.floor(seconds % 60);
		timeCounter.innerHTML =
			mins.toString().padStart(2, "0") + ":" + secs.toString().padStart(2, "0");
	};

	const showTime = () => {
		seconds = 600;
		if (game.play) {
			setInterval(gameTimer, 1000);
		}
	};
	let height = canvas.offsetHeight;
	let width = canvas.offsetWidth;
	let windowWidth = body.offsetWidth;
	let windowHeight = body.offsetHeight;
	let tile = width / 15;
	const player1 = {
		speed: 1,
		width: tile,
		height: tile,
		color: "blue",
		score: 0,
		lives: 0,
		image: "./assets/img/bomberman.png",
		x: tile,
		y: tile,
	};

	const CanvasResize = () => {
		width = canvas.offsetWidth;
		height = canvas.offsetHeight;
		windowWidth = body.offsetWidth;
		windowHeight = body.offsetHeight;
		canvas.setAttribute("height", height);
		canvas.setAttribute("width", width);
		tile = width / 15;
		player1.width = tile;
		player1.height = tile;
		player1.y = tile;
		player1.x = tile;
	};
	CanvasResize();
	window.addEventListener("resize", CanvasResize);

	const innerWalls = [
		{
			x: 2 * tile,
			y: 2 * tile,
			width: tile,
			height: tile,
		},
		{
			x: 4 * tile,
			y: 2 * tile,
			width: tile,
			height: tile,
		},
		{
			x: 6 * tile,
			y: 2 * tile,
			width: tile,
			height: tile,
		},
		{
			x: 8 * tile,
			y: 2 * tile,
			width: tile,
			height: tile,
		},
		{
			x: 10 * tile,
			y: 2 * tile,
			width: tile,
			height: tile,
		},
		{
			x: 12 * tile,
			y: 2 * tile,
			width: tile,
			height: tile,
		},
	];

	const player1Image = new Image();
	player1Image.src = player1.image;

	const wall = {
		width: tile,
		height: tile,
		image: "./assets/img/wall.png",
	};

	const wallImage = new Image();
	wallImage.src = wall.image;

	const ctx = canvas.getContext("2d");

	const game = {
		play: false,
		req: "",
	};

	//kolizja może się przyda
	function col(a, b) {
		let boo =
			a.x < b.x + b.width &&
			a.x + a.width > b.x &&
			a.y < b.y + b.height &&
			a.y + a.height > b.y;
		if (boo) {
			console.log("HIT");
		}
		return boo;
	}

	function gameOver() {
		clearInterval(gameTimer);
		seconds = 0;
		cancelAnimationFrame(game.req);
		game.play = false;
		// ctx.beginPath();
		scorePage();
	}

	function gameStart() {
		game.req = requestAnimationFrame(draw);
		game.play = true;
		showTime();
		player1.score = 0;
		player1.lives = 3;
	}
	const keyz = {
		ArrowLeft: false,
		ArrowRight: false,
		ArrowUp: false,
		ArrowDown: false,
	};
	document.addEventListener("keydown", (e) => {
		if (e.code in keyz) {
			keyz[e.code] = true;
		}
	});
	document.addEventListener("keyup", (e) => {
		if (e.code in keyz) {
			keyz[e.code] = false;
		}
	});
	//PLAYER STEERING

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// if (time.textContent.includes("00:00")) {
		// 	gameOver();
		// }
		if (
			col(player1, innerWalls[0]) == false &&
			col(player1, innerWalls[1]) == false &&
			col(player1, innerWalls[2]) == false &&
			col(player1, innerWalls[3]) == false &&
			col(player1, innerWalls[4]) == false &&
			col(player1, innerWalls[5]) == false
		) {
			for (let i = 1; i < 6; i++) {
				if (keyz.ArrowLeft && player1.x > tile) {
					// if (player1.y + tile < 2 * tile) {
					player1.x -= player1.speed;
					// }
				}
				if (keyz.ArrowLeft && player1.x > tile) {
					// if (player1.y > 3 * tile) {
					player1.x -= player1.speed;
					// }
				}
				if (keyz.ArrowRight && player1.x < tile * 13) {
					player1.x += player1.speed;
				}
				if (keyz.ArrowUp && player1.y > tile) {
					player1.y -= player1.speed;
				}
				if (keyz.ArrowDown && player1.y < tile * 13) {
					player1.y += player1.speed;
				}
			}
		}
		ctx.drawImage(
			player1Image,
			player1.x,
			player1.y,
			player1.width,
			player1.height
		);
		for (let i = 0; i < 15; i++) {
			//externa lwalls
			ctx.drawImage(wallImage, 0, tile * i, tile, tile);
			ctx.drawImage(wallImage, tile * i, 0, tile, tile);
			ctx.drawImage(wallImage, tile * i, canvas.height - tile, tile, tile);
			ctx.drawImage(wallImage, canvas.width - tile, tile * i, tile, tile);
			//Internal walls
			ctx.drawImage(wallImage, 2 * i * tile, 2 * tile, tile, tile);
			ctx.drawImage(wallImage, 2 * i * tile, 4 * tile, tile, tile);
			ctx.drawImage(wallImage, 2 * i * tile, 6 * tile, tile, tile);
			ctx.drawImage(wallImage, 2 * i * tile, 8 * tile, tile, tile);
			ctx.drawImage(wallImage, 2 * i * tile, 10 * tile, tile, tile);
			ctx.drawImage(wallImage, 2 * i * tile, 12 * tile, tile, tile);
		}

		if (game.play) {
			game.req = requestAnimationFrame(draw);
		}
	}
	gameStart();
};

export default gamePage;
