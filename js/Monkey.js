class Monkey {
    constructor(){
      this.x = 0;
      this.y = 500; 
  
      this.movingLeft = false; // to move the monkey smoothly
      this.movingRight = false; // to move the monkey smoothly
  
      this.img = new Image()
      this.img.src = './images/monkey.png';
      
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
      else if(this.movingRight && this.x + this.img.width < canvas.width ) // this condition check if monkey is not going outside from the canvas
        this.x += 20;
  
    }
  
    left() {
      return this.x;
    }
    right() {
      return this.x + this.img.width;
    }
    top() {
      return this.y;
    }
    bottom() {
      return this.y + this.img.height;
    }
  }
