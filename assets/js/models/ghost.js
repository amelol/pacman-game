class Ghost {

  constructor(ctx, x, y, eatable) {
    this.ctx = ctx

    this.w = 32.6
    this.h = 32.8    

    this.x = x
    this.y = y
 

    this.vx = 0
    this.vy = 0

    this.isEatable = eatable

    this.img = new Image()
    this.img.drawCount = 0
    this.img.frames = 2
    this.img.frameIndex = 0
    this.img.src = './assets/img/ghost.png'
  }

  draw() {
    this.img.drawCount++

    if (this.img.drawCount >= 10) {
      this.img.drawCount = 0
      this.animate()
    }

    if (this.isEatable) {
      this.img.src = './assets/img/ghost-deenergized.png'
    } else if (!this.isEatable) {
      this.img.src = './assets/img/ghost.png'
    }

    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      0,
      this.img.width / 2,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )
  } 

  animate() {
    this.img.frameIndex++

    if (this.img.frameIndex >= this.img.frames){
      this.img.frameIndex = 0
    }
  }
    
  move(pacman) { 

    if(this.lastMove === 'y'){

      if (this.x < pacman.x) {
        this.x += this.w 
        this.lastMove = 'x'
      }

      if (this.x > pacman.x) {
        this.x -= this.w 
        this.lastMove = 'x'
      } 

      if (this.x <= 0) {
        this.x = 0
        this.lastMove = 'x'
      }
      
      if (this.x + this.w >= this.ctx.canvas.width){
        this.x = this.ctx.canvas.width - this.w
        this.lastMove = 'x'
      } 

    } else {

      if (this.y < pacman.y) {
        this.y += this.h
        this.lastMove = 'y'
      }

      if (this.y > pacman.y) {
        this.y -= this.h
        this.lastMove = 'y'
      }

      if (this.y <= 0){
        this.y = 0
        this.lastMove = 'y'
      }
    
      if (this.y + this.h >= this.ctx.canvas.height){
        this.y = this.ctx.canvas.height - this.h
        this.lastMove = 'y'
      }
    }
  }

  moveReverse(pacman) { 

    if(this.lastMove === 'y'){

      if (this.x < pacman.x) {
        this.x -= this.w 
        this.lastMove = 'x'
      }

      if (this.x > pacman.x) {
        this.x += this.w 
        this.lastMove = 'x'
      } 

      if (this.x <= 0) {
        this.x = 0
        this.lastMove = 'x'
      }
      
      if (this.x + this.w >= this.ctx.canvas.width){
        this.x = this.ctx.canvas.width - this.w
        this.lastMove = 'x'
      } 

    } else {

      if (this.y < pacman.y) {
        this.y -= this.h
        this.lastMove = 'y'
      }

      if (this.y > pacman.y) {
        this.y += this.h
        this.lastMove = 'y'
      }

      if (this.y <= 0){
        this.y = 0
        this.lastMove = 'y'
      }
    
      if (this.y + this.h >= this.ctx.canvas.height){
        this.y = this.ctx.canvas.height - this.h
        this.lastMove = 'y'
      }
    }
  }  
}