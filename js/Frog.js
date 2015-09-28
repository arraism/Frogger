var FROG_SPEED = 30;
var INITIAL_X = 315;
var INITIAL_Y = 390;

function Frog(){
	
	this.isAlive = true;
	this.width = 25;
	this.height = 25;
	this.x = INITIAL_X;
	this.y = INITIAL_Y;
	
	this.img = new Image();
	this.img.src = "Images/FrogUp.png";
	
	
	
	this.drawFrog = function(){
		var canvas = document.getElementById('game');
		var ctx = canvas.getContext("2d");
		ctx.drawImage(this.img, this.x, this.y);
	}
	
	this.moveUp = function(){
		if(!(this.y-FROG_SPEED < 0) && canMove){
			this.y -= FROG_SPEED;
			this.img.src = "Images/FrogUp.png";
			var jumpSound = new Audio("Son/Jump.ogg");
			jumpSound.play();
		}
	}

	this.moveDown = function(){
		if(!(this.y+FROG_SPEED > HEIGHT-(HEIGHT/NBLIGNES)-this.height) && canMove){
			this.y += FROG_SPEED;
			this.img.src = "Images/FrogDown.png";
			var jumpSound = new Audio("Son/Jump.ogg");
			jumpSound.play();
		}
	}
	
	this.moveLeft = function(){
		if(!(this.x-FROG_SPEED < 0) && canMove){
			this.x -= FROG_SPEED;
			this.img.src = "Images/FrogLeft.png";
			var jumpSound = new Audio("Son/Jump.ogg");
			jumpSound.play();
		}
	}
	this.moveRight = function(){
		if(!((this.x+FROG_SPEED)+this.width > WIDTH) && canMove){
			this.x += FROG_SPEED;
			this.img.src = "Images/FrogRight.png"
				var jumpSound = new Audio("Son/Jump.ogg");
			jumpSound.play();
		}
	}
	
	this.reset = function(){
		this.x = INITIAL_X;
		this.y = INITIAL_Y;
	}
	
	this.slide = function(numLigne){
		if(numLigne == 0 && this.x + this.width + 0.3 < WIDTH){
			this.x += 0.3;
		} else if(numLigne == 1 && this.x - 0.7 > 0){
			this.x -= 0.7;
		} else if(numLigne == 2 && this.x + this.width + 0.4 < WIDTH){
			this.x += 0.4;
		} else if(numLigne == 3 && this.x - 0.6 > 0){
			this.x -= 0.6;
		} else if(numLigne == 4 && this.x + this.width + 0.5 < WIDTH){
			this.x += 0.5;
		}
	}
	
}