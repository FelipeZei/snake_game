let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");      //context renderiza o que sera exibido dentro do canvas
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 +1) * box,     //math.random é um numero de 0 ate 1. Math.floor tira a parte flutuante, as casas decimais
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){     //criar background
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);     //retangulo onde sera feito o jogo. parametros: posicao x, y, altura, largura
}

function criarCobra(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);     //passando o tamanho da cobra
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);     //criando o retangulo nas posicoes aleatorias
}

document.addEventListener('keydown', update);   //listener para as teclas de direcao

function update (event){
    if(event.keyCode == 37 && direction !="right") direction = "left";    //codigos das teclas direcionais
    if(event.keyCode == 38 && direction !="down") direction = "up";     //direcao nao pode ser a oposta, pois a cobra tem uma cabeca e nao poderia voltar por cima dela mesma
    if(event.keyCode == 39 && direction !="left") direction = "right";
    if(event.keyCode == 40 && direction !="up") direction = "down";
}

function iniciarJogo(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;//para fazer a cobra entrar em um lado e sair do outro do quadro
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    criarBG();
    criarCobra();
    drawFood();

    let snakeX = snake[0].x;    //posicao da cabeca da cobra para que tenha um ponto de partida quando fizer os movimentos
    let snakeY = snake[0].y;

    //coordenadas por onde ela ira seguir no plano cartesiano
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){ //para que quando coma o tamanho aumente e uma nova comida seja gerada
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 +1) * box;     
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }   

    let newHead = {     //cabeca da cobra
        x: snakeX,
        y: snakeY,
    }

    snake.unshift(newHead);     //insere elementos no comeco do array, neste caso para que seja a cabeca da cobra

}

let jogo = setInterval(iniciarJogo, 100);   //tempo em milisgundos para renovar a tela 