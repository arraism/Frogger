function Car(numLigne){
	
	this.width = 45;
	this.height = 25;
	this.numligne = numLigne;
	
	this.img = new Image();
	
	if(numLigne%2 == 0){this.x = -this.width; this.direction = "droite"; this.img.src = "Images/CarR.png";} //La voiture part de gauche et va à droite
	else{this.x = WIDTH; this.direction = "gauche"; this.img.src = "Images/CarL.png";}			 //La voiture part de droite et va à gauche
	
	this.y = ((HEIGHT/NBLIGNES)*8)+numLigne*(HEIGHT/NBLIGNES)+3; //Ligne de la voiture
	
	//Vitesse différente pour chaque ligne de voiture
	if(numLigne == 0){
		this.speed = 0.4;
	} else if(numLigne == 1){
		this.speed = 1;
	} else if(numLigne == 2){
		this.speed = 0.6;
	} else if(numLigne == 3){
		this.speed = 0.8;
	} else if(numLigne == 4){
		this.speed = 0.5;
	}
	
	this.drawCar = function(){
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