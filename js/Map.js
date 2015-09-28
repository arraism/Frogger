var NBLIGNES = 15;
var WIDTH = 650;
var HEIGHT = 450;

function Map() {
	
	this.safeZone = new Image();
	this.safeZone.src = "Images/SafeZone.png";
	this.finish = new Image();
	this.finish.src = "Images/Finish.png";

	this.drawMap = function() {
		var canvas = document.getElementById("game");
		var ctx = canvas.getContext("2d");

		//Fond
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillRect(0, 0, WIDTH, HEIGHT);

		//Arrivée
		ctx.drawImage(this.finish, 0, HEIGHT/NBLIGNES);
		
		//Eau
		//ctx.drawImage(this.eau, 0, (HEIGHT/NBLIGNES)*2);
		ctx.fillStyle = "rgb(0, 0, 50)";
		ctx.fillRect(0, (HEIGHT/NBLIGNES)*2, WIDTH, (HEIGHT/NBLIGNES)*5);
		
		//Save
		ctx.drawImage(this.safeZone, 0, (HEIGHT/NBLIGNES)*7);
		//ctx.fillStyle = "rgb(150, 0, 150)";
		//ctx.fillRect(0, (HEIGHT/NBLIGNES)*7, WIDTH, HEIGHT/NBLIGNES);
		
		//Route
		//ctx.fillStyle = "rgb(192, 192, 192)";
		//ctx.fillRect(0, (HEIGHT/NBLIGNES)*8, WIDTH, (HEIGHT/NBLIGNES)*5);
		
		//Start
		ctx.drawImage(this.safeZone, 0, (HEIGHT/NBLIGNES)*13);
		//ctx.fillStyle = "rgb(150, 0, 150)";
		//ctx.fillRect(0, (HEIGHT/NBLIGNES)*13, WIDTH, HEIGHT/NBLIGNES);

	}
}