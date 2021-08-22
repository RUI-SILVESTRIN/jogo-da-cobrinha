let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;  //32 pixels por quadradinho
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
//comida
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

/*cria a grade de fundo do jogo*/
function criarBG() {
    context.fillStyle = "lightgreen";  //cor de fundo
    context.fillRect(0,0,16*box,16*box);   //retangulo do jogo
}

//criando a comida
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function criarCobrinha() {
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";  //cor da cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box);   //retangulo da cobrilha   
    }
}

//recebe o movimento das teclas e muda a direcao
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right")  direction = "left";
    if(event.keyCode == 38 && direction != "down")  direction = "up";
    if(event.keyCode == 39 && direction != "left")  direction = "right";
    if(event.keyCode == 40 && direction != "up")  direction = "down";
}

function iniciarJogo() {
    //se a cabeca bater no rabo alerta e acaba o jogo
    for(i = 1; i< snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
        clearInterval(jogo);
        alert('Game Over : (');
        }
    }

    //faz a cobrinha sair por um lado e entrar do outro
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    criarBG();
    criarCobrinha();
    drawFood();  //chama a funcao da comida

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    //faz andar a cobra
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        //retira o ultimo elemento do array(cobrinha anterior)
    snake.pop();
    }
    else{
        //faz a fruta mudar de lugar
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y =  Math.floor(Math.random() * 15 + 1) * box;
    }


    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 700);

