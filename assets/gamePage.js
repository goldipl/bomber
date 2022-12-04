import { startCounting, getTimeSpentOnSite } from "./timeCounter";
import "./gamePage.css";
import { scorePage } from "./scorePage";
import { failPage } from "./failPage";
import { sendStats } from "./sendStats";

var score = 0;
var elf = 0;
var gameTime;

if (performance.navigation.type == 0) {
	window.sessionStorage.clear();
	// clearing the sessionstorage data
}

export function gamePage() {
	score = 0;
	elf = 0;
	sendStats("02gamePage");
	startCounting();
	app.innerHTML = `
<div id="gameContainer">
<canvas id="canvas">
</canvas>
<div id="topBar"><img id="gora" src="./assets/img/02/nakladka_gora.png"></img><span id="gameScore">0</span> <span id="gameTime">
01:30</span><span id="gameLives"><img src="./assets/img/02/zycie_on.png"></img><img src="./assets/img/02/zycie_on.png"></img><img src="./assets/img/02/zycie_on.png"></img></span></div>
</div>`;

	const time = document.getElementById("gameTime");
	const gameScore = document.getElementById("gameScore");
	const gameLives = document.getElementById("gameLives");
	const gameContainer = document.getElementById("gameContainer");
	const topBar = document.getElementById("topBar");

	let speed = 4;
	let seconds = 90;
	const gameTimer = () => {
		seconds--;
		let mins = Math.floor(seconds / 60);
		let secs = Math.floor(seconds % 60);
		time.innerHTML =
			mins.toString().padStart(2, "0") + ":" + secs.toString().padStart(2, "0");
		if (seconds == 80) {
			speed += 1;
		} else if (seconds == 70) {
			speed += 1;
		} else if (seconds == 60) {
			speed += 1;
		} else if (seconds == 50) {
			speed += 1;
		} else if (seconds == 40) {
			speed += 1;
		} else if (seconds == 30) {
			speed += 1;
		} else if (seconds == 20) {
			speed += 1;
		} else if (seconds == 10) {
			speed += 1;
		}

		// console.log(speed);
	};

	function showTime() {
		seconds = 90;
		if (game.play) {
			setInterval(gameTimer, 1000);
		}
	}

	const canvas = document.getElementById("canvas");

	let height;
	let width;
	let windowWidth;
	let windowHeight;
	width = gameContainer.offsetWidth;
	height = gameContainer.offsetHeight;
	windowWidth = body.offsetWidth;
	windowHeight = body.offsetHeight;
	canvas.setAttribute("height", height);
	canvas.setAttribute("width", width);

	var player = {
		speed: 20,
		width: (canvas.height / 8) * 1.26,
		height: canvas.height / 8,
		color: "red",
		score: 0,
		lives: 0,
		image: "./assets/img/02/kosz.png",
		x: canvas.width / 2 - height / 6 / 2,
		y: (canvas.height * 8.3) / 10,
	};

	const CanvasResize = () => {
		width = gameContainer.offsetWidth;
		height = gameContainer.offsetHeight;
		windowWidth = body.offsetWidth;
		windowHeight = body.offsetHeight;
		canvas.setAttribute("height", height);
		canvas.setAttribute("width", width);
		if (width >= windowWidth) {
			topBar.classList.add("active");
		} else {
			topBar.classList.remove("active");
		}
		player.width = (canvas.height / 8) * 1.26;
		player.height = canvas.height / 8;
		player.y = (canvas.height * 8.3) / 10;
		player.x = canvas.width / 2 - height / 6 / 2;
		if (width >= windowWidth) {
			topBar.classList.add("active");
		}
	};
	CanvasResize();
	window.addEventListener("resize", CanvasResize);
	const ctx = canvas.getContext("2d");

	const cachedImage1 = new Image();
	cachedImage1.src = "./assets/img/02/charmsy/1.png";
	const cachedImage2 = new Image();
	cachedImage2.src = "./assets/img/02/charmsy/2.png";
	const cachedImage3 = new Image();
	cachedImage3.src = "./assets/img/02/charmsy/3.png";
	const cachedImage4 = new Image();
	cachedImage4.src = "./assets/img/02/charmsy/4.png";
	const cachedImage5 = new Image();
	cachedImage5.src = "./assets/img/02/charmsy/5.png";
	const cachedImage6 = new Image();
	cachedImage6.src = "./assets/img/02/charmsy/6.png";
	const cachedImage7 = new Image();
	cachedImage7.src = "./assets/img/02/charmsy/7.png";
	const playerImage = new Image();
	playerImage.src = "./assets/img/02/kosz.png";

	const enemies = {
		speed: speed,
		arr1: [],
		arr2: [],
		arr3: [],
		arr4: [],
		arr5: [],
		arr6: [],
		arr7: [],
		arr8: [],
		arr9: [],
		total1: 1,
		total2: 1,
		total3: 1,
		total4: 1,
		total5: 1,
		total6: 1,
		total7: 1,
		total8: 1,
		total9: 1,
		images: [
			cachedImage1,
			cachedImage2,
			cachedImage3,
			cachedImage4,
			cachedImage5,
			cachedImage6,
			cachedImage7,
		],
	};

	const game = {
		play: false,
		req: "",
		dif: 0.09,
	};

	function col(a, b) {
		let boo =
			a.x < b.x + b.width &&
			a.x + a.width > b.x &&
			a.y < b.y + b.height &&
			a.y + a.height > b.y;
		if (boo) {
			// console.log("HIT");
		}
		return boo;
	}

	function enemyMaker1() {
		let number = Math.floor(Math.random() * 7);
		let xPos = canvas.width * 0.05;
		let badValue = false;
		enemies.arr1.push({
			x: xPos,
			// y: Math.random() * -1000,
			y: -50 + Math.random() * -5,
			speed: speed,
			bad: badValue,
			image: enemies.images[number],
		});
	}

	function enemyMaker2() {
		let number = Math.floor(Math.random() * 7);
		let xPos = canvas.width * 0.1 + Math.random() * canvas.width * 0.05;
		let badValue = false;
		enemies.arr2.push({
			x: xPos,
			y: -50 + Math.random() * -5,
			speed: speed,
			bad: badValue,
			image: enemies.images[number],
		});
	}

	function enemyMaker3() {
		let number = Math.floor(Math.random() * 7);
		let xPos = canvas.width * 0.2 + Math.random() * canvas.width * 0.05;
		let badValue = false;
		enemies.arr3.push({
			x: xPos,
			y: -50 + Math.random() * -5,
			speed: speed,
			bad: badValue,
			image: enemies.images[number],
		});
	}

	function enemyMaker4() {
		let number = Math.floor(Math.random() * 7);
		let xPos = canvas.width * 0.3 + Math.random() * canvas.width * 0.05;
		let badValue = false;
		enemies.arr4.push({
			x: xPos,
			y: -50 + Math.random() * -5,
			speed: speed,
			bad: badValue,
			image: enemies.images[number],
		});
	}

	function enemyMaker5() {
		let number = Math.floor(Math.random() * 7);
		let xPos = canvas.width * 0.4 + Math.random() * canvas.width * 0.05;
		let badValue = false;
		enemies.arr5.push({
			x: xPos,
			y: -50 + Math.random() * -5,
			speed: speed,
			bad: badValue,
			image: enemies.images[number],
		});
	}

	function enemyMaker6() {
		let number = Math.floor(Math.random() * 7);
		let xPos = canvas.width * 0.5 + Math.random() * canvas.width * 0.05;
		let badValue = false;
		enemies.arr6.push({
			x: xPos,
			y: -50 + Math.random() * -5,
			speed: speed,
			bad: badValue,
			image: enemies.images[number],
		});
	}

	function enemyMaker7() {
		let number = Math.floor(Math.random() * 7);
		let xPos = canvas.width * 0.6 + Math.random() * canvas.width * 0.05;
		let badValue = false;
		enemies.arr7.push({
			x: xPos,
			y: -50 + Math.random() * -5,
			speed: speed,
			bad: badValue,
			image: enemies.images[number],
		});
	}

	function enemyMaker8() {
		let number = Math.floor(Math.random() * 7);
		let xPos = canvas.width * 0.7 + Math.random() * canvas.width * 0.05;
		let badValue = false;
		enemies.arr8.push({
			x: xPos,
			y: -50 + Math.random() * -5,
			speed: speed,
			bad: badValue,
			image: enemies.images[number],
		});
	}

	function enemyMaker9() {
		let number = Math.floor(Math.random() * 7);
		let xPos = canvas.width * 0.8 + canvas.width * 0.02;
		let badValue = false;
		enemies.arr9.push({
			x: xPos,
			y: -50 + Math.random() * -5,
			speed: speed,
			bad: badValue,
			image: enemies.images[number],
		});
	}

	const enemiesArray = [
		enemyMaker1,
		enemyMaker2,
		enemyMaker3,
		enemyMaker4,
		enemyMaker5,
		enemyMaker6,
		enemyMaker7,
		enemyMaker8,
		enemyMaker9,
	];

	function gameOver() {
		clearInterval(gameTimer);
		time.innerText = "01:30";
		seconds = 90;
		if (elf == 0) {
			score = score + 15;
		}
		gameTime = parseInt(getTimeSpentOnSite() / 1000).toString();
		cancelAnimationFrame(game.req);
		game.play = false;
		ctx.beginPath();
		scorePage();
	}

	function gameStart() {
		game.req = requestAnimationFrame(draw);
		game.play = true;
		showTime();
		player.score = 0;
		player.lives = 3;
	}

	let oldX;
	let newX;
	let diffX;
	let oldX2;
	let newX2;
	let diffX2;
	var touch;

	function handleTouchEvent(e) {
		// console.log("handler added");
		if (e.touches.length === 0) return;
		// e.preventDefault();
		// e.stopPropagation();
		// e.stopImmediatePropagation();
		touch = e.touches[0];
		oldX2 = 0;
		newX2 =
			touch.pageX -
			(windowWidth - canvas.width) / 2 -
			player.x -
			player.width / 2;
		diffX2 = newX2 - oldX2;
		if (diffX2 > 10 && player.x < canvas.width - player.width - 10) {
			player.x += player.speed / 2;
			if (diffX2 > 20 && player.x < canvas.width - player.width - 20) {
				player.x += player.speed;
				if (diffX2 > 40 && player.x < canvas.width - player.width - 40) {
					player.x += player.speed * 2;
				}
			}
		} else if (diffX2 < -10 && player.x > 10) {
			{
				player.x -= player.speed / 2;
				if (diffX2 < -20 && player.x > 20) {
					player.x -= player.speed;
					if (diffX2 < -40 && player.x > 40) {
						player.x -= player.speed * 2;
					}
				}
			}
		}
		newX2 = oldX2;
	}

	function mouseMoveHandler(e) {
		// console.log("handlers added");
		oldX = 0;
		newX =
			e.clientX -
			(windowWidth - canvas.width) / 2 -
			player.x -
			player.width / 2;
		diffX = newX - oldX;
		if (diffX > 10 && player.x < canvas.width - player.width - 10) {
			player.x += player.speed / 2;
			if (diffX > 20 && player.x < canvas.width - player.width - 20) {
				player.x += player.speed;
				if (diffX > 40 && player.x < canvas.width - player.width - 40) {
					player.x += player.speed * 2;
				}
			}
		} else if (diffX < -10 && player.x > 10) {
			{
				player.x -= player.speed / 2;
				if (diffX < -20 && player.x > 20) {
					player.x -= player.speed;
					if (diffX < -40 && player.x > 40) {
						player.x -= player.speed * 2;
					}
				}
			}
		}
		newX = oldX;
	}
	function draw() {
		const addHandlers = () => {
			body.addEventListener("mousemove", mouseMoveHandler);
			body.addEventListener("touchstart", handleTouchEvent);
			body.addEventListener("touchmove", handleTouchEvent);
			body.addEventListener("touchend", handleTouchEvent);
			body.addEventListener("touchcancel", handleTouchEvent);
		};
		addHandlers();

		if (time.textContent.includes("00:00")) {
			gameOver();
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let randomNumber = Math.floor(Math.random() * 9);

		if (
			enemies.arr1.length < enemies.total1 &&
			enemies.arr2.length < enemies.total2 &&
			enemies.arr3.length < enemies.total3 &&
			enemies.arr4.length < enemies.total4 &&
			enemies.arr5.length < enemies.total5 &&
			enemies.arr6.length < enemies.total6 &&
			enemies.arr7.length < enemies.total7 &&
			enemies.arr8.length < enemies.total8 &&
			enemies.arr9.length < enemies.total9
		) {
			enemiesArray[randomNumber]();
			let intervalValue = height / 2;
			var selectEnemy = () => {
				let randomNumber2 = Math.floor(Math.random() * 9);
				enemiesArray[randomNumber2]();
				// console.log(seconds);
				clearInterval(interval);
				if (seconds == 80) {
					intervalValue = (height / 2) * 0.95;
				} else if (seconds == 70) {
					intervalValue = (height / 2) * 0.9;
				} else if (seconds == 60) {
					intervalValue = (height / 2) * 0.85;
				} else if (seconds == 50) {
					intervalValue = (height / 2) * 0.8;
				} else if (seconds == 40) {
					intervalValue = (height / 2) * 0.75;
				} else if (seconds == 30) {
					intervalValue = (height / 2) * 0.7;
				} else if (seconds == 20) {
					intervalValue = (height / 2) * 0.65;
				} else if (seconds == 10) {
					intervalValue = (height / 2) * 0.6;
				}
				interval = setInterval(selectEnemy, intervalValue);
			};
			var interval = setInterval(selectEnemy, intervalValue);
		}

		ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

		for (let i = enemies.arr1.length - 1; i >= 0; i--) {
			// enemies.arr.forEach((enemy, index) => {

			if (game.play) {
				if (enemies.arr1[i].y < canvas.height * 0.02) {
					enemies.arr1[i].width = 0;
					enemies.arr1[i].height = 0;
				} else {
					enemies.arr1[i].width = canvas.height / 20;
					enemies.arr1[i].height = (canvas.height / 20) * 2.32;
				}
				// console.log(imgEnemy);
				var imgEnemy1 = enemies.arr1[i].image;
				ctx.drawImage(
					imgEnemy1,
					enemies.arr1[i].x,
					enemies.arr1[i].y,
					enemies.arr1[i].width,
					enemies.arr1[i].height
				);

				enemies.arr1[i].y += speed;
				if (
					enemies.arr1[i].y > canvas.height * 0.85 &&
					enemies.arr1[i].image != "./assets/img/02/charmsy/elf.png"
				) {
					setTimeout(() => {
						enemies.arr1.splice(i, 1)[0];
					}, 0);
					if (player.lives == 0) {
						player.lives = "-";
					}
				} else if (enemies.arr1[i].y > canvas.height * 0.85) {
					setTimeout(() => {
						enemies.arr1.splice(i, 1)[0];
					}, 0);
				}
				// ctx.beginPath();
				if (col(player, enemies.arr1[i])) {
					setTimeout(() => {
						var removed;
						removed = enemies.arr1.splice(i, 1)[0];
						if (removed.bad) {
							player.score -= 5;
							elf++;
							player.lives--;
							if (elf == 3) {
								clearInterval(gameTimer);
								app.innerHTML = ``;
								cancelAnimationFrame(game.req);
								game.play = false;
								failPage();
							}
						} else {
							player.score += 1;
						}
						gameScore.innerHTML = `${player.score}`;
						score = player.score;
					}, 0);
					//console.log(removed);
				}
			}
		}

		for (let i = enemies.arr2.length - 1; i >= 0; i--) {
			if (game.play) {
				if (enemies.arr2[i].y < canvas.height * 0.02) {
					enemies.arr2[i].width = 0;
					enemies.arr2[i].height = 0;
				} else {
					enemies.arr2[i].width = canvas.height / 20;
					enemies.arr2[i].height = (canvas.height / 20) * 2.32;
				}

				var imgEnemy2 = enemies.arr2[i].image;
				ctx.drawImage(
					imgEnemy2,
					enemies.arr2[i].x,
					enemies.arr2[i].y,
					enemies.arr2[i].width,
					enemies.arr2[i].height
				);
			}
			enemies.arr2[i].y += speed;
			if (
				enemies.arr2[i].y > canvas.height * 0.85 &&
				enemies.arr2[i].image != "./assets/img/02/charmsy/elf.png"
			) {
				setTimeout(() => {
					enemies.arr2.splice(i, 1)[0];
				}, 0);
				if (player.lives == 0) {
					player.lives = "-";
				}
			} else if (enemies.arr2[i].y > canvas.height * 0.85) {
				setTimeout(() => {
					enemies.arr2.splice(i, 1)[0];
				}, 0);
			}
			if (col(player, enemies.arr2[i])) {
				setTimeout(() => {
					var removed;
					removed = enemies.arr2.splice(i, 1)[0];
					if (removed.bad) {
						player.score -= 5;
						elf++;
						player.lives--;
						if (elf == 3) {
							clearInterval(gameTimer);
							app.innerHTML = ``;
							cancelAnimationFrame(game.req);
							game.play = false;
							failPage();
						}
					} else {
						player.score += 1;
					}
					gameScore.innerHTML = `${player.score}`;
					score = player.score;
				}, 0);
			}
		}

		for (let i = enemies.arr3.length - 1; i >= 0; i--) {
			if (game.play) {
				if (enemies.arr3[i].y < canvas.height * 0.02) {
					enemies.arr3[i].width = 0;
					enemies.arr3[i].height = 0;
				} else {
					enemies.arr3[i].width = canvas.height / 20;
					enemies.arr3[i].height = (canvas.height / 20) * 2.32;
				}
				var imgEnemy3 = enemies.arr3[i].image;
				if (imgEnemy3 != imgEnemy1) {
					ctx.drawImage(
						imgEnemy3,
						enemies.arr3[i].x,
						enemies.arr3[i].y,
						enemies.arr3[i].width,
						enemies.arr3[i].height
					);
				} else {
				}
			}
			enemies.arr3[i].y += speed;
			if (
				enemies.arr3[i].y > canvas.height * 0.85 &&
				enemies.arr3[i].image != "./assets/img/02/charmsy/elf.png"
			) {
				setTimeout(() => {
					enemies.arr3.splice(i, 1)[0];
				}, 0);
				if (player.lives == 0) {
					player.lives = "-";
				}
			} else if (enemies.arr3[i].y > canvas.height * 0.85) {
				setTimeout(() => {
					enemies.arr3.splice(i, 1)[0];
				}, 0);
			}
			if (col(player, enemies.arr3[i])) {
				setTimeout(() => {
					var removed;
					removed = enemies.arr3.splice(i, 1)[0];
					if (removed.bad) {
						player.score -= 5;
						elf++;
						player.lives--;
						if (elf == 3) {
							clearInterval(gameTimer);
							app.innerHTML = ``;
							cancelAnimationFrame(game.req);
							game.play = false;
							failPage();
						}
					} else {
						player.score += 1;
					}
					gameScore.innerHTML = `${player.score}`;
					score = player.score;
				}, 0);
			}
		}

		for (let i = enemies.arr4.length - 1; i >= 0; i--) {
			if (game.play) {
				if (enemies.arr4[i].y < canvas.height * 0.02) {
					enemies.arr4[i].width = 0;
					enemies.arr4[i].height = 0;
				} else {
					enemies.arr4[i].width = canvas.height / 20;
					enemies.arr4[i].height = (canvas.height / 20) * 2.32;
				}
				var imgEnemy4 = enemies.arr4[i].image;
				ctx.drawImage(
					imgEnemy4,
					enemies.arr4[i].x,
					enemies.arr4[i].y,
					enemies.arr4[i].width,
					enemies.arr4[i].height
				);
			}
			enemies.arr4[i].y += speed;
			if (
				enemies.arr4[i].y > canvas.height * 0.85 &&
				enemies.arr4[i].image != "./assets/img/02/charmsy/elf.png"
			) {
				setTimeout(() => {
					enemies.arr4.splice(i, 1)[0];
				}, 0);
				if (player.lives == 0) {
					player.lives = "-";
				}
			} else if (enemies.arr4[i].y > canvas.height * 0.85) {
				setTimeout(() => {
					enemies.arr4.splice(i, 1)[0];
				}, 0);
			}
			if (col(player, enemies.arr4[i])) {
				setTimeout(() => {
					var removed;
					removed = enemies.arr4.splice(i, 1)[0];
					if (removed.bad) {
						player.score -= 5;
						elf++;
						player.lives--;
						if (elf == 3) {
							clearInterval(gameTimer);
							app.innerHTML = ``;
							cancelAnimationFrame(game.req);
							game.play = false;
							failPage();
						}
					} else {
						player.score += 1;
					}
					gameScore.innerHTML = `${player.score}`;
					score = player.score;
				}, 0);
			}
		}

		for (let i = enemies.arr5.length - 1; i >= 0; i--) {
			if (game.play) {
				if (enemies.arr5[i].y < canvas.height * 0.02) {
					enemies.arr5[i].width = 0;
					enemies.arr5[i].height = 0;
				} else {
					enemies.arr5[i].width = canvas.height / 20;
					enemies.arr5[i].height = (canvas.height / 20) * 2.32;
				}
				var imgEnemy5 = enemies.arr5[i].image;
				ctx.drawImage(
					imgEnemy5,
					enemies.arr5[i].x,
					enemies.arr5[i].y,
					enemies.arr5[i].width,
					enemies.arr5[i].height
				);
			}
			enemies.arr5[i].y += speed;
			if (
				enemies.arr5[i].y > canvas.height * 0.85 &&
				enemies.arr5[i].image != "./assets/img/02/charmsy/elf.png"
			) {
				setTimeout(() => {
					enemies.arr5.splice(i, 1)[0];
				}, 0);
				if (player.lives == 0) {
					player.lives = "-";
				}
			} else if (enemies.arr5[i].y > canvas.height * 0.85) {
				setTimeout(() => {
					enemies.arr5.splice(i, 1)[0];
				}, 0);
			}
			if (col(player, enemies.arr5[i])) {
				setTimeout(() => {
					var removed;
					removed = enemies.arr5.splice(i, 1)[0];
					if (removed.bad) {
						player.score -= 5;
						elf++;
						player.lives--;
						if (elf == 3) {
							clearInterval(gameTimer);
							app.innerHTML = ``;
							cancelAnimationFrame(game.req);
							game.play = false;
							failPage();
						}
					} else {
						player.score += 1;
					}
					gameScore.innerHTML = `${player.score}`;
					score = player.score;
				}, 0);
			}
		}

		for (let i = enemies.arr6.length - 1; i >= 0; i--) {
			if (game.play) {
				if (enemies.arr6[i].y < canvas.height * 0.02) {
					enemies.arr6[i].width = 0;
					enemies.arr6[i].height = 0;
				} else {
					enemies.arr6[i].width = canvas.height / 20;
					enemies.arr6[i].height = (canvas.height / 20) * 2.32;
				}
				var imgEnemy6 = enemies.arr6[i].image;
				ctx.drawImage(
					imgEnemy6,
					enemies.arr6[i].x,
					enemies.arr6[i].y,
					enemies.arr6[i].width,
					enemies.arr6[i].height
				);
			}
			enemies.arr6[i].y += speed;
			if (
				enemies.arr6[i].y > canvas.height * 0.85 &&
				enemies.arr6[i].image != "./assets/img/02/charmsy/elf.png"
			) {
				setTimeout(() => {
					enemies.arr6.splice(i, 1)[0];
				}, 0);
				if (player.lives == 0) {
					player.lives = "-";
				}
			} else if (enemies.arr6[i].y > canvas.height * 0.85) {
				setTimeout(() => {
					enemies.arr6.splice(i, 1)[0];
				}, 0);
			}
			if (col(player, enemies.arr6[i])) {
				setTimeout(() => {
					var removed;
					removed = enemies.arr6.splice(i, 1)[0];
					if (removed.bad) {
						player.score -= 5;
						elf++;
						player.lives--;
						if (elf == 3) {
							clearInterval(gameTimer);
							app.innerHTML = ``;
							cancelAnimationFrame(game.req);
							game.play = false;
							failPage();
						}
					} else {
						player.score += 1;
					}
					gameScore.innerHTML = `${player.score}`;
					score = player.score;
				}, 0);
			}
		}

		for (let i = enemies.arr7.length - 1; i >= 0; i--) {
			if (game.play) {
				if (enemies.arr7[i].y < canvas.height * 0.02) {
					enemies.arr7[i].width = 0;
					enemies.arr7[i].height = 0;
				} else {
					enemies.arr7[i].width = canvas.height / 20;
					enemies.arr7[i].height = (canvas.height / 20) * 2.32;
				}
				var imgEnemy7 = enemies.arr7[i].image;
				ctx.drawImage(
					imgEnemy7,
					enemies.arr7[i].x,
					enemies.arr7[i].y,
					enemies.arr7[i].width,
					enemies.arr7[i].height
				);
			}
			enemies.arr7[i].y += speed;
			if (
				enemies.arr7[i].y > canvas.height * 0.85 &&
				enemies.arr7[i].image != "./assets/img/02/charmsy/elf.png"
			) {
				setTimeout(() => {
					enemies.arr7.splice(i, 1)[0];
				}, 0);
				if (player.lives == 0) {
					player.lives = "-";
				}
			} else if (enemies.arr7[i].y > canvas.height * 0.85) {
				setTimeout(() => {
					enemies.arr7.splice(i, 1)[0];
				}, 0);
			}
			if (col(player, enemies.arr7[i])) {
				setTimeout(() => {
					var removed;
					removed = enemies.arr7.splice(i, 1)[0];
					if (removed.bad) {
						player.score -= 5;
						elf++;
						player.lives--;
						if (elf == 3) {
							clearInterval(gameTimer);
							app.innerHTML = ``;
							cancelAnimationFrame(game.req);
							game.play = false;
							failPage();
						}
					} else {
						player.score += 1;
					}
					gameScore.innerHTML = `${player.score}`;
					score = player.score;
				}, 0);
			}
		}

		for (let i = enemies.arr8.length - 1; i >= 0; i--) {
			if (game.play) {
				if (enemies.arr8[i].y < canvas.height * 0.02) {
					enemies.arr8[i].width = 0;
					enemies.arr8[i].height = 0;
				} else {
					enemies.arr8[i].width = canvas.height / 20;
					enemies.arr8[i].height = (canvas.height / 20) * 2.32;
				}
				var imgEnemy8 = enemies.arr8[i].image;
				ctx.drawImage(
					imgEnemy8,
					enemies.arr8[i].x,
					enemies.arr8[i].y,
					enemies.arr8[i].width,
					enemies.arr8[i].height
				);
			}
			enemies.arr8[i].y += speed;
			if (
				enemies.arr8[i].y > canvas.height * 0.85 &&
				enemies.arr8[i].image != "./assets/img/02/charmsy/elf.png"
			) {
				setTimeout(() => {
					enemies.arr8.splice(i, 1)[0];
				}, 0);
				if (player.lives == 0) {
					player.lives = "-";
				}
			} else if (enemies.arr8[i].y > canvas.height * 0.85) {
				setTimeout(() => {
					enemies.arr8.splice(i, 1)[0];
				}, 0);
			}
			if (col(player, enemies.arr8[i])) {
				setTimeout(() => {
					var removed;
					removed = enemies.arr8.splice(i, 1)[0];
					if (removed.bad) {
						player.score -= 5;
						elf++;
						player.lives--;
						if (elf == 3) {
							clearInterval(gameTimer);
							app.innerHTML = ``;
							cancelAnimationFrame(game.req);
							game.play = false;
							failPage();
						}
					} else {
						player.score += 1;
					}
					gameScore.innerHTML = `${player.score}`;
					score = player.score;
				}, 0);
			}
		}

		for (let i = enemies.arr9.length - 1; i >= 0; i--) {
			if (game.play) {
				if (enemies.arr9[i].y < canvas.height * 0.02) {
					enemies.arr9[i].width = 0;
					enemies.arr9[i].height = 0;
				} else {
					enemies.arr9[i].width = canvas.height / 20;
					enemies.arr9[i].height = (canvas.height / 20) * 2.32;
				}
				var imgEnemy9 = enemies.arr9[i].image;
				ctx.drawImage(
					imgEnemy9,
					enemies.arr9[i].x,
					enemies.arr9[i].y,
					enemies.arr9[i].width,
					enemies.arr9[i].height
				);
			}
			enemies.arr9[i].y += speed;
			if (
				enemies.arr9[i].y > canvas.height * 0.85 &&
				enemies.arr9[i].image != "./assets/img/02/charmsy/elf.png"
			) {
				setTimeout(() => {
					enemies.arr9.splice(i, 1)[0];
				}, 0);
				if (player.lives == 0) {
					player.lives = "-";
				}
			} else if (enemies.arr9[i].y > canvas.height * 0.85) {
				setTimeout(() => {
					enemies.arr9.splice(i, 1)[0];
				}, 0);
			}
			if (col(player, enemies.arr9[i])) {
				setTimeout(() => {
					var removed;
					removed = enemies.arr9.splice(i, 1)[0];
					if (removed.bad) {
						player.score -= 5;
						elf++;
						player.lives--;
						if (elf == 3) {
							app.innerHTML = ``;
							cancelAnimationFrame(game.req);
							game.play = false;
							clearInterval(gameTimer);
							failPage();
						}
					} else {
						player.score += 1;
					}
					gameScore.innerHTML = `${player.score}`;
					score = player.score;
				}, 0);
			}
		}

		if (game.play) {
			if (elf == 1) {
				gameLives.innerHTML = `<img src="./assets/img/02/zycie_on.png"></img><img src="./assets/img/02/zycie_on.png"></img><img src="./assets/img/02/zycie_off.png"></img>`;
			} else if (elf == 2) {
				gameLives.innerHTML = `<img src="./assets/img/02/zycie_on.png"></img><img src="./assets/img/02/zycie_off.png"></img><img src="./assets/img/02/zycie_off.png"></img>`;
			} else if (elf == 3) {
				gameLives.innerHTML = `<img src="./assets/img/02/zycie_off.png"></img><img src="./assets/img/02/zycie_off.png"></img><img src="./assets/img/02/zycie_off.png"></img>`;
			}
			ctx.beginPath();
			game.req = requestAnimationFrame(draw);
		}
	}
	gameStart();
}
export { score, gameTime };
