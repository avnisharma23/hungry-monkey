
class Monkey {
  constructor(){
    this.x = 0;
    this.y = 500; //canvas.height - 70;
    this.movingLeft = false;
    this.movingRight = false;

    const newImage = new Image();
      newImage.addEventListener('load', () => {
        // Once image loaded => draw
        this.img = newImage;
      });
      newImage.src = './images/monkey.png';
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y);
  }
  moveLeft() {
    if ( this.x > 0) 
      this.x -= 20;
  }
  moveRight() {
    if ( this.x + this.img.width < canvas.width)
      this.x += 20;
      
  }
  move(){

    if(this.movingLeft && this.x > 0 )
      this.x -= 20;
    else if(this.movingRight && this.x + this.img.width < canvas.width )
      this.x += 20;

  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
}


class Banana {
  constructor(){
    
    this.img = new Image();

    if(Math.random()> 0.5) // 50% probality of random number > 0.5
    {
      this.img.src = './images/bananasYellow.png';
      this.color = "yellow";
    }
    else
    {
      this.img.src = './images/bananasGreen.png';
      this.color = "green";
    }
    this.x = Math.random() * (canvas.width);

    if(this.x + this.img.width > canvas.width)
      this.x = this.x - this.img.width;

    this.y = Math.random() * (canvas.height / 4);
    this.width = 70;
    this.height = 70;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y);
  }
  left() {
    return this.x ;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y ;
  }
  bottom() {
    return this.y + this.height;
  }
}





const bananas = [];
const monkey = new Monkey();
const canvas = document.getElementById('gamecanvas');
const ctx = canvas.getContext('2d');

let startPage = document.querySelector("#start-div");
let gamearea = document.querySelector("#games_div");
let gameover = document.querySelector("#gameover-div");

//let monkeyPosRight = 0, monkeyPosDown = 599;
let intervalId;
let frames = 0;
let missedbananas = 0;
let score = 0;

//let isMovingLeft = false;
//let isMovingRight = false;

//Images
const backgroundImage = new Image();
backgroundImage.src = './images/forestbg.jpg'

const exitImage = new Image();
exitImage.src = './images/exit.png'

const scoreBoardImage = new Image();
scoreBoardImage.src = './images/score-removebg-preview.png';

const monkeyImage = new Image();
monkeyImage.src = './images/monkey.png'



window.addEventListener("load",() => {
  //console.log("Hello");
  drawBackground(); 
  

  //button start - Start Game
  startBtn.addEventListener("click", () => {
    intervalId = setInterval(updateGame, 20);
    startGame();
    
  });
  
  restart.addEventListener("click", () => {
    console.log("hh");
    intervalId = setInterval(updateGame, 20);
    startGame();
    
  });

});

document.addEventListener('keydown', event => {
  //console.log('event keyCode', event.keyCode);
  switch (event.keyCode) {
    case 37:
      monkey.movingLeft = true;
      monkey.movingRight = false;
      //console.log('left', monkey);
      break;
    case 39:
      monkey.movingRight=true;
      monkey.movingLeft = false;
      //console.log('right', monkey);
      break;
  }
});

document.addEventListener("keyup", () => {
  monkey.movingLeft = false;
  monkey.movingRight = false;
  
}); 

function startGame()
{ 
  
  startPage.style.display = "none";
  gamearea.style.display = "block";
  gameover.style.display = "none";
  youwindiv.style.display = 'none';
  
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.drawImage(scoreBoardImage, 0, 0); // exit game 
  reset();
  monkey.draw() 
  restartdiv.style.display = 'none';
}

function drawBackground()
{
    gamearea.style.display = 'none';
    gameover.style.display = 'none';
}


function updateGame() {

  ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing canvas for our next animation
 
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.drawImage(scoreBoardImage, 0, 0);
  monkey.move();
  monkey.draw(); // redrawing the monkey
  
  updateObstacles() ;// drawing/redrawing the obstacles(banana)
  catchedBanana();
  checkGameWon();
  checkGameOver();
  fillscore();
  
}

function updateObstacles() {

  for (i = 0; i < bananas.length; i++) {
    if( bananas[i].color == "yellow")
      bananas[i].y += 2;
    else
      bananas[i].y += 3;

    bananas[i].draw();
  }
   frames += 4;
  if (frames % 120 === 0) {
    let x = canvas.height;
    let minWidth = 90;
    let maxWidth = 300;
    let width = Math.floor(
      Math.random() * (maxWidth - minWidth + 1) + minWidth
    );
    let minGap = 0;
    let maxGap = 400;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap); 
    bananas.push(new Banana(gap));
    //console.log(bananas);
  }
  
}

function checkGameWon() 
{
  if(score > 300)
  {
    stop();
    gamearea.style.display = 'none';
    youwindiv.style.display = 'block';
    restartdiv.style.display = 'block';
   }
}

function reset()
{
  bananas.length = 0;
  monkey.x = 0;
  monkey.y = 500;
  missedbananas = 0;
  score = 0 ;
  
}

function stop() {
  clearInterval(intervalId);
}

function catchedBanana() {

  bananas.forEach(banana => {
  if (
    banana.y + banana.img.height >= monkey.y  &&
    ((banana.x + banana.img.width  < monkey.x  + monkey.img.width &&
      banana.x + banana.img.width  > monkey.x) ||
      banana.x > monkey.x &&  banana.x < monkey.x  + monkey.img.width )
  ) 
  {
    banana.y = 2000;
    banana.x = 2000;
    score += 10;
    console.log(score);

    bananas.splice(bananas.indexOf(banana),1) // remove catched banana

  }


  /* if(
    monkey.bottom() < banana.top() ||
    monkey.top() > banana.bottom() ||
    monkey.right() < banana.left() + 5 ||
    monkey.left() > banana.right() - 5
  )
  {

   // banana.y = 2000;
    //banana.x = 2000;
    return true ;
  } */
});

}
function checkGameOver()
{

  bananas.forEach(banana => {
    if (
      banana.y > canvas.height       
    ) 
    {      
      missedbananas ++;
      bananas.splice(bananas.indexOf(banana),1) // remove missed banana from array because triggering multiple times      
    }
  });

  //console.log(missedbananas);
  if(missedbananas > 20)
    doGameOver();
}

function doGameOver() {
  stop();
  //console.log("gamOver")
    gamearea.style.display = 'none';
    restartdiv.style.display = 'block';
    gameover.style.display = 'block';

}

function fillscore(){

  ctx.fillStyle = "#EC6467";
  ctx.font = "22px Pacifico";
  ctx.fillText(`Score: ${score}`, 75, 45);
  ctx.fillText(`Bananas Missed: ${missedbananas}`, 800, 45);

}




