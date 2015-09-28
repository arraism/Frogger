function SafeZone(number){
	
	this.x = 40 + number*130;
	this.y = 30;
	this.width = 50;
	this.height = 30;
	this.saveFrog = false;
	this.frog = null;
	
	this.drawSafeZone = function(){
		var canvas = document.getElementById("game");
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "rgb(0, 70, 0)";
		ctx.fillRect(this.x, HEIGHT/NBLIGNES, 50, HEIGHT/NBLIGNES);
		if(this.saveFrog){
			this.frog.drawFrog();
		}
	}
	
	this.addFrog = function(){
		this.saveFrog = true;
		this.frog = new Frog();
		this.frog.x = this.x+10;
		this.frog.y = this.y;
		this.frog.img.src = "Images/FrogDown.png";
	}
}