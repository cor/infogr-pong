import Player from './player'
import Movement from './movement'

export default class Pong {
  renderer
  state
  maxY

  constructor (renderer) {
    this.renderer = renderer
    this.maxY = 0.605
    // this.maxY = this.renderer.ybound()
    this.state = new State()
  }

  tick () {
    this.state = this.transition(this.state) // mudblood
    this.draw()
  }

  transition (state) {
    this.updatePlayerState(state.P1)
    this.updatePlayerState(state.P2)

    if (state.ball.x <= -1) {
      const newState = new State()
      newState.P1.score = state.P1.score
      newState.P2.score = state.P2.score + 1
      return newState
    } else if (state.ball.x >= 1) {
      const newState = new State()
      newState.P1.score = state.P1.score + 1
      newState.P2.score = state.P2.score
      return newState
    }

    if (Math.abs(state.ball.y) > this.maxY) {
      state.ball.direction.y *= -1
    }

    // const ballLeft = state.ball.x - state.ball.radius/2

    // // if the leftside of the ball is within the lower and upper x bounds of the paddle, a hit is detected.
    // if ( ballLeft < state.P1.x + state.P1.width/2 && ballLeft > state.P1.x - state.P1.width/2) {
    //
    // }
    //
    // const ballRight = state.ball.x + state.ball.radius/2
    //
    // if ( ballRight > state.P2.x - state.P2.width/2 && ballRight < state.P2.x + state.P2.width/2) {
    //
    // }

    // if ball hits paddle, compute new ball direction.
    return this.state
  }

  updatePlayerState (P) {
    switch (P.direction) {
      case Movement.Up:
        P.y = Math.min(P.y + 0.01, this.maxY - P.height / 2)
        break
      case Movement.Down:
        P.y = Math.max(P.y - 0.01, -this.maxY + P.height / 2)
        break
    }
  }

  draw () {
    this.renderer.setLeftPaddlePosition(this.state.P1.x, this.state.P1.y)
    this.renderer.setRightPaddlePosition(this.state.P2.x, this.state.P2.y)
    this.renderer.setBallPosition()
    this.renderer.draw()
  }

  addEventListeners () {
    document.addEventListener('keydown', (k) => {
      switch (k.code) {
        case 'ArrowUp':
          this.state.P2.direction = Movement.Up
          break
        case 'ArrowDown':
          this.state.P2.direction = Movement.Down
          break
        case 'KeyW':
          this.state.P1.direction = Movement.Up
          break
        case 'KeyS':
          this.state.P1.direction = Movement.Down
          break
      }
    })

    document.addEventListener('keyup', (k) => {
      switch (k.code) {
        case 'ArrowUp':
          if (this.state.P2.direction === Movement.Up) {
            this.state.P2.direction = Movement.None
          }
          break
        case 'ArrowDown':
          if (this.state.P2.direction === Movement.Down) {
            this.state.P2.direction = Movement.None
          }
          break
        case 'KeyW':
          if (this.state.P1.direction === Movement.Up) {
            this.state.P1.direction = Movement.None
          }
          break
        case 'KeyS':
          if (this.state.P1.direction === Movement.Down) {
            this.state.P1.direction = Movement.None
          }
          break
      }
    })
  }
}

class State {
  P1
  P2
  ball

  constructor () {
    this.ball = {
      radius: 0.01,
      x: 0,
      y: 0,
      direction: {
        x: -1,
        y: 0
      }
    }
    this.P1 = new Player(-0.9)
    this.P2 = new Player(0.9)
  }
}
