var RANDOM = Math.random() * 101;

function Game() {
	
	this.playlist = new Array("Son/Activation Theme.ogg", "Son/Hexadecimal Genome.ogg", "Son/Particle Charge.ogg", "Son/Reformat The Planet.ogg", "Son/The Information Chase.ogg");
	this.numMusic = Math.round(RANDOM%4);
	this.music = new Audio(this.playlist[this.numMusic]);
	this.music.play();
	this.deadSound = new Audio("Son/Miss.ogg");
	this.gameOverSound = new Audio("Son/Game Over.ogg");
	this.winSound = new Audio("Son/Win.ogg");
	this.saveSound = new Audio("Son/Save.ogg");
	
	this.map = new Map();
	this.frog = new Frog();
	this.maxCar = 4;
	this.cars = new Array();
	for ( var i = 0; i < 5; i++) {
		this.cars[i] = new Array();
	}
	this.maxStick = 2;
	this.sticks = new Array();
	for ( var i = 0; i < 5; i++) {
		this.sticks[i] = new Array();
	}
	this.safeZones = new Array();
	for ( var i = 0; i < 5; i++) {
		this.safeZones[i] = new SafeZone(i);
	}
	this.timer = 60;

	this.life = 3;
	this.imglife = new Image();
	this.imglife.src = "Images/FrogUp.png";

	this.draw = function() { // Affichage du jeu
		this.map.drawMap();
		this.drawSafeZones();
		this.drawCars();
		this.drawSticks();
		this.frog.drawFrog();
		this.drawTimer();
		this.drawLife();
		this.checkAll();
	}

	this.drawCars = function() {
		for ( var i = 0; i < this.cars.length; i++) {
			for ( var j = 0; j < this.cars[i].length; j++) {
				if (!this.cars[i][j].move()) {
					this.cars[i].splice(j, 1); // Si la voiture sort de
					// l'écran, on la supprime
				}
				this.cars[i][j].drawCar(); // Affichage de la voiture
			}
			if (this.cars[i].length == 0) {
				this.addCar(i); // Pas assez de voiture, on en rajoute
			}
			if (this.cars[i].length < this.maxCar) {
				var lastCar = this.cars[i][this.cars[i].length - 1];
				if (lastCar.direction == "gauche"
						&& WIDTH - lastCar.x > 100 + RANDOM) {
					RANDOM = Math.random() * 101;
					this.addCar(i); // Création de voiture avec décalage
				} else if (lastCar.direction == "droite"
						&& lastCar.x > 100 + RANDOM) {
					RANDOM = Math.random() * 101;
					this.addCar(i); // Création de voiture avec décalage
				}
			}
		}
	}

	this.drawSticks = function() {
		for ( var i = 0; i < this.sticks.length; i++) {
			for ( var j = 0; j < this.sticks[i].length; j++) {
				if (!this.sticks[i][j].move()) {
					this.sticks[i].splice(j, 1); // Si le stick sort de
					// l'écran, on le supprime
				}
				this.sticks[i][j].drawStick(); // Affichage du stick
			}
			if (this.sticks[i].length == 0) {
				this.addStick(i); // Pas assez de stick, on en rajoute
			}
			if (this.sticks[i].length < this.maxStick) {
				var lastStick = this.sticks[i][this.sticks[i].length - 1];
				if (lastStick.direction == "gauche"
						&& WIDTH - lastStick.x > 200 + RANDOM) {
					RANDOM = Math.random() * 101;
					this.addStick(i); // Création de stick avec décalage
				} else if (lastStick.direction == "droite"
						&& lastStick.x > 200 + RANDOM) {
					RANDOM = Math.random() * 101;
					this.addStick(i); // Création de stick avec décalage
				}
			}
		}
	}

	this.drawSafeZones = function() {
		for ( var i = 0; i < this.safeZones.length; i++) {
			this.safeZones[i].drawSafeZone();
		}
	}

	this.addCar = function(numligne) {
		var car = new Car(numligne);
		this.cars[numligne].push(car);
	}

	this.addStick = function(numligne) {
		var stick = new Stick(numligne);
		this.sticks[numligne].push(stick);
	}

	this.carCollision = function(frog) {
		for ( var i = 0; i < this.cars.length; i++) {
			for ( var j = 0; j < this.cars[i].length; j++) {
				if (!((frog.x >= this.cars[i][j].x + this.cars[i][j].width-5)
						|| (frog.x + frog.width <= this.cars[i][j].x+5)
						|| (frog.y >= this.cars[i][j].y + this.cars[i][j].height) 
						|| (frog.y + frog.height <= this.cars[i][j].y))) {
					return true;
				}
			}
		}
		return false;
	}

	this.waterCollision = function(frog) {
		if ((frog.x >= WIDTH) || (frog.x + frog.width <= 0) || (frog.y >= 210)
				|| (frog.y + frog.height <= 30)) {
			return false;
		}
		return true;
	}
	
	this.stickCollision = function(frog) {
		for ( var i = 0; i < this.sticks.length; i++) {
			for ( var j = 0; j < this.sticks[i].length; j++) {
				if (!((frog.x >= this.sticks[i][j].x + this.sticks[i][j].width)
						|| (frog.x + frog.width <= this.sticks[i][j].x)
						|| (frog.y >= this.sticks[i][j].y + this.sticks[i][j].height + 5)
						|| (frog.y + frog.height <= this.sticks[i][j].y - 5))) {
					this.frog.slide(i);
					return true;
				}
			}
		}
		return false;
	}

	this.saveFrog = function(frog) {
		for ( var i = 0; i < this.safeZones.length; i++) {
			if (!((frog.x >= this.safeZones[i].x + this.safeZones[i].width)
					|| (frog.x + frog.width <= this.safeZones[i].x)
					|| (frog.y >= this.safeZones[i].y + this.safeZones[i].height) || (frog.y
					+ frog.height <= this.safeZones[i].y))
					&& this.safeZones[i].saveFrog == false) {
				this.safeZones[i].addFrog();
				this.timer = 60;
				return true;
			}
		}
		return false;
	}

	this.checkWin = function() {
		for ( var i = 0; i < this.safeZones.length; i++) {
			if (this.safeZones[i].saveFrog == false) {
				return false;
			}
		}
		return true;
	}

	this.reset = function() {
		this.map = new Map();
		this.frog = new Frog();
		this.cars = new Array();
		for ( var i = 0; i < 5; i++) {
			this.cars[i] = new Array();
		}
		this.sticks = new Array();
		for ( var i = 0; i < 5; i++) {
			this.sticks[i] = new Array();
		}
		this.safeZones = new Array();
		for ( var i = 0; i < 5; i++) {
			this.safeZones[i] = new SafeZone(i);
		}
		this.life = 3;
		this.timer = 60;
	}

	this.drawTimer = function() {
		var canvas = document.getElementById('game');
		var ctx = canvas.getContext("2d");
		ctx.font = "30px Arial"
		ctx.fillStyle = "rgb(250,0,0)";
		ctx.fillText("Time to live : " + this.timer, 0, ((HEIGHT / NBLIGNES) * 15)-4);
		ctx.fillStyle = "rgb(0, 200, 0)";
		ctx.fillRect(220, ((HEIGHT/NBLIGNES)*14)+5, this.timer*4, 20);
	}

	this.drawLife = function() {
		var canvas = document.getElementById('game');
		var ctx = canvas.getContext("2d");
		ctx.font = "20px Arial"
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillText("Life remaining : " + this.life, 0, (HEIGHT / NBLIGNES) - 5);
		for(var i = 0 ; i < this.life ; i++){
			ctx.drawImage(this.imglife, 160+i*28, 0);
		}
	}
	
	this.nextMusic = function(){
		if(this.numMusic+1 >= this.playlist.length){
			this.numMusic = 0;
		}else{
			this.numMusic++;
		}
		this.music.src = this.playlist[this.numMusic];
		if(this.timer < 30){
			this.music.playbackRate = 1.2;
		}
		this.music.play();
	}
	
	this.checkAll = function(){
		
		if (this.saveFrog(this.frog)) { // Vérifie si la grenouille est sauvée
			window.clearInterval(drawInterval);
			canMove = false;
			this.music.pause();
			this.saveSound.play();

			var canvas = document.getElementById("game");
			var ctx = canvas.getContext("2d");
			
			ctx.fillStyle = "rgba(0, 0, 0,0.5)";
			ctx.fillRect(0, 0, WIDTH,HEIGHT);
			
			ctx.font = "50px Arial"
			ctx.fillStyle = "rgb(0,250,0)";
			ctx.fillText("Frog save !", (WIDTH/2)-125, (HEIGHT/2));
			
			setTimeout(function(){
				GAME.music.playbackRate = 1;
				GAME.music.play();
				GAME.frog = new Frog();
				canMove = true;
				drawInterval = setInterval(draw, 10);
			},1500);

		}else if (this.carCollision(this.frog) || (this.waterCollision(this.frog) && !this.stickCollision(this.frog))) { // Vérifie la collision avec une voiture ou avec l'eau
			window.clearInterval(drawInterval);
			canMove = false;
			this.music.pause();
			this.deadSound.play();
			
			var canvas = document.getElementById("game");
			var ctx = canvas.getContext("2d");
			
			ctx.fillStyle = "rgba(0, 0, 0,0.5)";
			ctx.fillRect(0, 0, WIDTH,HEIGHT);
			
			ctx.font = "50px Arial"
			ctx.fillStyle = "rgb(250,0,0)";
			ctx.fillText("You are dead !", (WIDTH/2)-150, (HEIGHT/2));
			
			setTimeout(function(){
				GAME.music.playbackRate = 1;
				GAME.music.play();
				GAME.life -= 1;
				GAME.timer = 60;
				GAME.frog.reset();
				canMove = true;
				drawInterval = setInterval(draw, 10);
			},4000);
		}else if (this.checkWin()) { // Vérifie si le joueur a gagné
			window.clearInterval(drawInterval);
			canMove = false;
			this.music.load();
			this.winSound.play();
			
			var canvas = document.getElementById("game");
			var ctx = canvas.getContext("2d");
			
			ctx.fillStyle = "rgba(0, 0, 0,0.5)";
			ctx.fillRect(0, 0, WIDTH,HEIGHT);
			
			ctx.font = "100px Arial"
			ctx.fillStyle = "rgb(0,250,0)";
			ctx.fillText("YOU WIN !", (WIDTH/2)-250, (HEIGHT/2));
			
			setTimeout(function(){
				GAME.music.playbackRate = 1;
				GAME.nextMusic();
				GAME.reset();
				canMove = true;
				drawInterval = setInterval(draw, 10);
			},6000);
		}
		if (this.life == 0) { // Vérifie si le joueur a perdu
			window.clearInterval(drawInterval);
			canMove = false;
			this.music.load();
			this.gameOverSound.play();
			
			var canvas = document.getElementById("game");
			var ctx = canvas.getContext("2d");
			
			ctx.fillStyle = "rgba(0, 0, 0,0.5)";
			ctx.fillRect(0, 0, WIDTH,HEIGHT);
			
			ctx.font = "100px Arial"
			ctx.fillStyle = "rgb(255,0,0)";
			ctx.fillText("GAME OVER", (WIDTH/2)-310, (HEIGHT/2));
			
			setTimeout(function(){
				GAME.music.playbackRate = 1;
				GAME.nextMusic();
				GAME.reset();
				canMove = true;
				drawInterval = setInterval(draw, 10);
			},6000);
			
		}
		if(this.music.ended){ // Change la musique si elle est terminée
			this.nextMusic();
		}
	}
}