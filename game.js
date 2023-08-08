let snake = document.getElementById("snake-canvas");
let snake2d = snake.getContext("2d");
let gameend = false;
snake.width = 400;
snake.height = 400;
let snakesegment = [];
let snakelength = 1;
let snakex = 0;
let snakey = 0;
let xdir = 10;
let ydir = 0;
let food = [];

function snakemotion() {
    snakesegment.unshift({x : snakex, y : snakey});

    snakex = snakex + xdir;
    snakey = snakey + ydir;

    while (snakesegment.length > snakelength) {
        snakesegment.pop();
      }
}

function snakeshape() {
    snake2d.fillStyle = "black";
}

function gameloop() {

    snake2d.clearRect(0, 0, snake.width, snake.height);
    snakemotion();

    for (let i = 0; i < snakesegment.length; i++) {
        snakeshape();
        snake2d.fillRect(snakesegment[i].x, snakesegment[i].y, 10, 10);
    }
    


    function newfood() {
      if (food.length <10){
        let foodx = Math.floor(Math.random() * snake.width);
        let foody = Math.floor(Math.random() * snake.height);
        food.push({x:foodx , y:foody});
      }
    }
    for (let i=0; i<food.length;i++){
      snake2d.fillStyle = "red";
      snake2d.fillRect(food[i].x, food[i].y, 10, 10);
    }
    newfood();
    collision();
  
    setTimeout(function() {
      requestAnimationFrame(gameloop);
  }, 300);
}
 
document.onkeydown = function(event) {
    
    switch (event.keyCode) {
        case 37: // Left arrow
          xdir = -10;
          ydir = 0;
          break;
        case 38: // Up arrow
          xdir = 0;
          ydir = -10;
          break;
        case 39: // Right arrow
          xdir = 10;
          ydir = 0;
          break;
        case 40: // Down arrow
          xdir = 0;
          ydir = 10;
          break;
      }
}
gameloop();

function collision() {
  for (let i = 0;i<food.length; i++){
    if (snakex < food[i].x + 10 && snakex + 10 > food[i].x && 
      snakey < food[i].y + 10 && 
      snakey + 10 > food[i].y) {
        snakelength++;
        food.splice(i, 1);
    }
    if (snakex < -10|| snakey < -10 ||
      snakex > snake.width || snakey > snake.height){
        gameover();
      }
  }
}

function gameover() {
  setTimeout(function(){
    alert("Game Over!");
  },100);
  gameend = true;
}

for (let i=0; i< snakesegment.length; i++){
  if (snakex === snakesegment[i].x && snakey === snakesegment[i].y){
    gameover();
  }
}
