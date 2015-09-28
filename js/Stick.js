function Stick(numLigne){
	
	this.img = new Image();
	
	if(parseInt(RANDOM) % 3 == 0){this.width = 100; this.img.src = "Images/StickLight.png";}
	else if(parseInt(RANDOM) % 3 == 1){this.width = 125;this.img.src = "Images/StickMedium.png";}
	else if(parseInt(RANDOM) % 3 == 2){this.width = 200;this.img.src = "Images/StickLarge.png";}
	
	this.height = 20;
	this.numligne = numLigne;
	
	if(numLigne%2 == 0){this.x = -this.width; this.direction = "droite";} //La voiture part de gauche et va à droite
	else{this.x = WIDTH; this.direction = "gauche";}			 //La voiture part de droite et va à gauche
	
	this.y = ((HEIGHT/NBLIGNES)*2)+numLigne*(HEIGHT/NBLIGNES)+3; //Ligne de la voiture
	
	//Vitesse différente pour chaque ligne de voiture
	if(numLigne == 0){
		this.speed = 0.3;
	} else if(numLigne == 1){
		this.speed = 0.7;
	} else if(numLigne == 2){
		this.speed = 0.4;
	} else if(numLigne == 3){
		this.speed = 0.6;
	} else if(numLigne == 4){
		this.speed = 0.5;
	}
	
	this.drawStick = function(){
		var canvas = document.getElementById('game');
		var ctx = canvas.getContext("2d");
		ctx.drawImage(this.img, this.x, this.y);
	}
	
	this.move = function(){
		//Déplacement de la voiture
		if(this.direction == "droite"){
			this.x += this.speed;
		}else{
			this.x -= this.speed;
		}
		
		//Test si la voiture sort de l'écran
		if(this.x < -this.width || this.x > WIDTH){
			return false;
		}
		return true;
	}
}