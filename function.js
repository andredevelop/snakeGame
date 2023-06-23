window.onload = function(){
	//recupera id
	canvas = document.getElementById('canvas');
	//recupera o contexto para configar aspecto 2d
	ctx = canvas.getContext('2d');

	//variaveis
	//cobra é um arrai que inicia vazio
	snake = [];
	//posções da cobra e comida
	positionX = 10;
	positionY = 10;
	foodX = 15;
	foodY = 15;
	velX = 0;
	velY = 0;
	grid = 20;
	tam = 2;
	//chamada da função jogo
	setInterval(jogo,100)

	//controles
	document.addEventListener('keydown',function(e){
		switch(e.keyCode){
			//direita
			case 39:
				velX = 1;
				velY = 0;
				break;
			//esquerda
			case 37:
				velX = -1;
				velY = 0;
				break;
			//cima
			case 38:
				velY = -1;
				velX = 0;
				break;
			//baixo
			case 40:
				velY = 1;
				velX = 0;
				break;
		}
	});

}

function jogo(){
	//config da tela
	ctx.fillStyle = "#2980b9";
	//distancia da borda horizontal,vertical,largura,altura
	ctx.fillRect(0,0,canvas.width,canvas.height);
	//deslocamento
	positionX += velX;
	positionY += velY;
	//espelhamento
	if(positionX < 0){
		positionX = grid;
	}
	if(positionX > grid){
		positionX = 0;
	}
	if(positionY < 0){
		positionY = grid;
	}
	if(positionY > grid){
		positionY = 0;
	}
	
	//configurando cobra
	ctx.fillStyle = "#00f102";
	for(var i=0; i < snake.length;i++){
		//para poder a cobra se mover
		ctx.fillRect(snake[i].x*grid,snake[i].y*grid, grid-1,grid-1);
		if(snake[i].x == positionX && snake[i].y == positionY){
			tam = 2;
		}
	}

	//posicionando a cobra
	snake.push({x: positionX,y: positionY});
	

	//apagando
	while(snake.length > tam){
		//shift tira primeiro valor de um array
		//se a cobra tiver tamanho maior que permitido vai cortar
		snake.shift();
	}	
	//comida da cobra
	ctx.fillStyle = '#f1c705';
	ctx.fillRect(foodX*grid,foodY*grid, grid-1,grid-1);

	//comendo a comida
	if(positionX == foodX && positionY == foodY){
		tam++;
		foodX = Math.floor(Math.random()*grid);
		foodY = Math.floor(Math.random()*grid);
	}

}