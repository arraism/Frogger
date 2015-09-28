var KEY_DOWN = 40;
var KEY_UP = 38;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var canMove = true;
var drawInterval;

init = function() {
	
	GAME = new Game();
	
	if (document.addEventListener) {
		document.addEventListener("keypress", Ignore, false);
		document.addEventListener("keydown", KeyDown, false);
	} else if (document.attachEvent) {
		document.attachEvent("onkeypress", Ignore);
		document.attachEvent("onkeydown", KeyDown);
	} else {
		document.onkeypress = Ignore;
		document.onkeydown = KeyDown;
	}
	function Ignore(e) {
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
	}
	function KeyDown(e) {
		OnKey(1, e)
	}

	function OnKey(state, e) {
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		var KeyID = (window.event) ? event.keyCode : e.keyCode;
		switch (KeyID) {
		case 37:
			GAME.frog.moveLeft();
			break;
		case 38:
			GAME.frog.moveUp();
			break;
		case 39:
			GAME.frog.moveRight();
			break;
		case 40:
			GAME.frog.moveDown();
			break;
		}
	}
	drawInterval = setInterval(draw, 10);
}

function draw(){
	GAME.draw();
}

function Timer() {
	if(GAME.timer == 0){
		window.clearInterval(drawInterval);
		canMove = false;
		GAME.music.pause();
		GAME.deadSound.play();

		var canvas = document.getElementById("game");
		var ctx = canvas.getContext("2d");
		
		ctx.fillStyle = "rgba(0, 0, 0,0.5)";
		ctx.fillRect(0, 0, WIDTH,HEIGHT);
		
		ctx.font = "50px Arial"
		ctx.fillStyle = "rgb(255,0,0)";
		ctx.fillText("Time's up !", (WIDTH/2)-125, (HEIGHT/2));
		
		setTimeout(function(){
			GAME.music.playbackRate = 1;
			GAME.music.play();
			GAME.timer = 60;
			GAME.life -= 1;
			GAME.frog.reset();
			canMove = true;
			drawInterval = setInterval(draw, 10);
		},4000);
		
	} else if (GAME.timer == 30){
		GAME.music.pause();
		var hurrySound = new Audio("Son/Hurry.ogg");
		hurrySound.play();
		GAME.music.playbackRate = 1.2;
		setTimeout(function(){GAME.music.play();},3000);
	}
    GAME.timer -= 1;
    setTimeout("Timer()",1000);
}