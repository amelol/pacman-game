class Game {
  
  constructor(canvasId) {
    this.intervalId = null
    
    const canvas = document.getElementById(canvasId)
    canvas.height = 492
    canvas.width = 620
    this.ctx = canvas.getContext("2d")
    this.gridWidth = 32.6
    this.background = new Background(this.ctx)
    this.pacman = new Pacman(this.ctx)
    this.coins = []
    this.score = document.getElementById("game-score")
    this.ghosts = []
    this.enemyIsEatable = false
    this.energizers = []

    for (let i = 0; i <= 10; i++) {
      this.addCoin()
    }

    for (let i = 0; i <= 2; i++) {
      this.addEnergizer()
    }
    
    this.drawCount = 0
    this.drawCountGhost = 100

    this.audioTheme = new Audio('./assets/sound/theme.mp3')
  }

  start() {
    this.audioTheme.play()

    this.intervalId = setInterval(() => {
      this.clear()
    
      if (this.drawCount % 25 === 0) {
        this.move()
      } 

      if (this.drawCount > this.drawCountGhost) {
        this.drawCountGhost = Math.random() * 200 + 600
        this.drawCount = 0
        this.addGhost() 
      }

      this.draw()

      this.checkCollisions()
    }, 1000 / 60)
  }

  checkCollisions() {
    const collidePacmanCoin = this.coins.find(coin => this.pacman.collidesWith(coin))
    if (collidePacmanCoin) {
      this.audioCoin = new Audio('./assets/sound/eatcoin.mp3')
      this.audioCoin.play()
      this.coins = this.coins.filter(function(coin){ 
        return coin != collidePacmanCoin 
      })
      this.addCoin()
      this.updateScore()
    }

    const collidePacmanGhost = this.ghosts.find(ghost => this.pacman.collidesWith(ghost))
    if (collidePacmanGhost && this.enemyIsEatable) {
      this.ghosts = this.ghosts.filter(function(ghost){ 
        return ghost != collidePacmanGhost; 
      })

      this.addGhost() 
      
      for (let i = 0; i <= 5; i++) {
        this.updateScore()
      }
    
    } else if (!this.enemyIsEatable && collidePacmanGhost){
      this.gameOver()
    }
  
    const collidePacmanEnergizer = this.energizers.find(energizer => this.pacman.collidesWith(energizer))
    if (collidePacmanEnergizer) {
      this.audioEnergizer = new Audio('./assets/sound/eatpowerpill.mp3')
      this.audioEnergizer.play()
      this.enemyIsEatable = true
      this.ghosts.forEach(ghost => ghost.isEatable = true)
      this.energizers = this.energizers.filter(function(energizer){ 
        return energizer != collidePacmanEnergizer; 
      });
        
      setTimeout(() => {
        this.enemyIsEatable = false
        this.ghosts.forEach(ghost => ghost.isEatable = false)
        this.addEnergizer()
      }, 10000)
    }
  }

  updateScore() {
    this.score.innerText = Number(this.score.innerText) + 1
  }

  addCoin() { 
    const coinX = Math.floor(Math.random() * 19) * this.gridWidth + this.gridWidth/2 + 1
    const coinY = Math.floor(Math.random() * 15) * this.gridWidth + this.gridWidth/2 + 3
    const coin = new Coin(this.ctx, coinX, coinY)
    this.coins.push(coin)
  }

  addGhost() { 
    const ghostX = this.background.w - this.gridWidth
    const ghostY = Math.floor(Math.random() * 15) * this.gridWidth + this.gridWidth
    const eatable = this.enemyIsEatable
    const ghost = new Ghost(this.ctx, ghostX, ghostY, eatable)
    this.ghosts.push(ghost)
  }

  addEnergizer() { 
    const energizerX = Math.floor(Math.random() * 19) * this.gridWidth + this.gridWidth
    const energizerY = Math.floor(Math.random() * 15) * this.gridWidth + this.gridWidth
    const energizer = new Energizer(this.ctx, energizerX, energizerY)
    this.energizers.push(energizer)
  }

  onKeyEvent(event) {
    this.pacman.onKeyEvent(event)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  draw() {
    this.drawCount++
    this.background.draw()
    this.pacman.draw()
    this.coins.forEach(coin => coin.draw())
    this.ghosts.forEach(ghost => ghost.draw())
    this.energizers.forEach(energizer => energizer.draw())
  }

  move() {
    this.pacman.move() 
    if (!this.enemyIsEatable) {
      this.ghosts.forEach(ghost => ghost.move(this.pacman))
    } else if (this.enemyIsEatable && this.drawCount % 75 === 0) {
      this.ghosts.forEach(ghost => ghost.moveReverse(this.pacman))
    }
  }

  gameOver() {
    this.audioGameOver = new Audio('./assets/sound/die.mp3')
    this.audioGameOver.play()
    this.ctx.font = "50px Press Start 2P";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      "Game over",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );

    clearInterval(this.intervalId)
  }
}
    
