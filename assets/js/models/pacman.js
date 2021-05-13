class Pacman {

  constructor(ctx) {
    this.ctx = ctx

    this.w = 32.6
    this.h = 32.8    

    this.x = 0
    this.y = this.ctx.canvas.height - this.h
    this.y0 = this.y

    this.vx = 0
    this.vy = 0

    this.img = new Image()
    this.img.drawCount = 0
    this.img.frames = 3
    this.img.frameIndex = 0
    this.img.src = './assets/img/pacman.png'
  }

  onKeyEvent(event) {
      if (event.type === 'keydown') {
        switch(event.keyCode) {
          case KEY_RIGHT:
            this.vx = this.w
            if(this.x + this.w >= this.ctx.canvas.width){
              this.x = this.ctx.canvas.width - this.w
            }            
            break;
          case KEY_LEFT:
            this.vx = -this.w
              if(this.x <= 0){
              this.x = 0
              }
            break;
          case KEY_UP:
            this.vy = -this.h
            if(this.y <= 0){
              this.y = 0
            }
            break;
          case KEY_DOWN:
            this.vy = this.h
            if(this.y + this.h >= this.ctx.canvas.height){
              this.y = this.y0
            }
            break;
        }
      } else {
        switch(event.keyCode) {
          case KEY_RIGHT:
            this.vx = 0
            break;
          case KEY_LEFT:
            this.vx = 0
            break;
          case KEY_UP:
            this.vy = 0
            break;
          case KEY_DOWN:
            this.vy = 0
            
            break;
        }
      }
    }

  draw() {
    this.img.drawCount++

    if (this.img.drawCount >= 10) {
      this.img.drawCount = 0
      this.animate()
    }

    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      0,
      this.img.width / 3,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )
  } 
    
  move() {
    this.x += this.vx
    this.y += this.vy
  }

  animate() {
    this.img.frameIndex++

    if (this.img.frameIndex >= this.img.frames){
      this.img.frameIndex = 0
    }
  }

  collidesWith(element){
    return this.x < element.x + element.w &&
    this.x + this.w > element.x &&
    this.y < element.y + element.h &&
    this.y + this.h > element.y
  }

}