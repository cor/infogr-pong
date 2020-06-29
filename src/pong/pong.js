import Player from './player'
import Movement from './movement'
import Ball from './ball'

export default class Pong {
  renderer
  state
  maxY

  constructor (renderer) {
    this.renderer = renderer
    this.maxY = 0.605
    this.state = new State()
  }

  tick () {
    this.state = this.transition(this.state) // mudblood
    this.draw()
  }

  transition (state) {
    this.updatePlayerState(state.P1)
    this.updatePlayerState(state.P2)
    this.updateBallState(state.ball)

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

    if (state.ball.left() < state.P1.right()) {
      if ((state.ball.bottom() < state.P1.top() && state.ball.bottom > state.P1.bottom()) ||
        (state.ball.top() < state.P1.top() && state.ball.top() > state.P1.bottom())) {
        state.ball.direction.x *= -1
      }
    }

    if (state.ball.right() > state.P2.left()) {
      if ((state.ball.bottom() < state.P2.top() && state.ball.bottom > state.P2.bottom()) ||
        (state.ball.top() < state.P2.top() && state.ball.top() > state.P2.bottom())) {
        state.ball.direction.x *= -1
      }
    }

    // if ball hits paddle, compute new ball direction.
    return this.state
  }

  updateBallState (ball) {
    ball.x += ball.direction.x
    ball.y += ball.direction.y

    if (Math.abs(ball.y) > this.maxY) {
      ball.direction.y *= -1
    }
  }

  updatePlayerState (P) {
    switch (P.direction) {
      case Movement.Up:
        P.y = Math.min(P.y + P.speed, this.maxY - P.height / 2)
        break
      case Movement.Down:
        P.y = Math.max(P.y - P.speed, -this.maxY + P.height / 2)
        break
    }
  }

  draw () {
    this.renderer.setLeftPaddlePosition(this.state.P1.x, this.state.P1.y)
    this.renderer.setRightPaddlePosition(this.state.P2.x, this.state.P2.y)
    this.renderer.setBallPosition(this.state.ball.x, this.state.ball.y)
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
    this.ball = new Ball()
    this.P1 = new Player(-0.9)
    this.P2 = new Player(0.9)
  }
}
