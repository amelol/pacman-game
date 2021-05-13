class Energizer {

  constructor(ctx, x, y) {
    this.ctx = ctx

    this.w = 32.6
    this.h = 32.8    

    this.x = x
    this.y = y

    this.img = new Image()
    this.img.src = './assets/img/energizer.png'
  }

  draw() {

    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    )
  } 
}