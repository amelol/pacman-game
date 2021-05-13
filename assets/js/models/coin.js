class Coin {

  constructor(ctx, x, y) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.r = 6
    this.w= this.r
    this.h = this.r
  }

  draw() {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    this.ctx.fillStyle = 'yellow'
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.restore()
  }
}
