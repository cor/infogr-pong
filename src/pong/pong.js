import Player from './player'
import Movement from './movement'
import Ball from './ball'

export const GameStage = {
  Welcome: 0.0,
  Playing: 1.0,
  P1Win: 2.0,
  P2Win: 3.0
}

export class Pong {
  stage
  canvas
  center
  renderer
  state
  maxY

  constructor (renderer, canvas, stage) {
    if (typeof stage !== 'undefined') {
      this.stage = stage
    } else {
      this.stage = GameStage.Playing
    }

    this.canvas = canvas
    this.renderer = renderer
    this.maxY = 0.65
    this.state = new State()

    this.center = {
      x: canvas.width / 2,
      y: canvas.height / 2
    }
  }

  tick () {
    if (this.stage === GameStage.Playing) {
      this.state.transition()
      this.state = this.transition(this.state)
      this.syncState()
    } else {
      this.renderer.setGameStage(this.stage)
    }
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

    if (state.terminating) {
      return state
    }

    const maxBounceAngle = 5 * Math.PI / 12

    // Paddle collision
    if (state.ball.left() < state.P1.right()) {
      if ((state.ball.bottom() < state.P1.top() && state.ball.bottom > state.P1.bottom()) ||
        (state.ball.top() < state.P1.top() && state.ball.top() > state.P1.bottom())) {
        const distanceToNormal = state.P1.y - state.ball.y
        const normalizedDistanceToNormal = distanceToNormal / (state.P1.height / 2)
        const bounceAngle = normalizedDistanceToNormal * maxBounceAngle

        state.ball.speed *= state.ball.acceleration
        console.log(state.ball.speed)

        state.ball.direction.x = state.ball.speed * Math.cos(bounceAngle)
        state.ball.direction.y = state.ball.speed * Math.sin(bounceAngle)
      } else {
        state.terminating = true
      }
    }

    if (state.ball.right() > state.P2.left()) {
      if ((state.ball.bottom() < state.P2.top() && state.ball.bottom > state.P2.bottom()) ||
        (state.ball.top() < state.P2.top() && state.ball.top() > state.P2.bottom())) {
        const distanceToNormal = state.P2.y - state.ball.y
        const normalizedDistanceToNormal = distanceToNormal / (state.P2.height / 2)
        const bounceAngle = normalizedDistanceToNormal * maxBounceAngle

        state.ball.speed *= state.ball.acceleration

        state.ball.direction.x = state.ball.speed * -Math.cos(bounceAngle)
        state.ball.direction.y = state.ball.speed * -Math.sin(bounceAngle)
      } else {
        state.terminating = true
      }
    }

    // if ball hits paddle, compute new ball direction.
    return this.state
  }

  updateBallState (ball) {
    ball.setLocation(ball.x + ball.direction.x, ball.y + ball.direction.y)
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

  syncState () {
    this.renderer.setOldPositions(this.state.ball.oldPositions)
    this.renderer.setGameStage(this.stage)
    this.renderer.setLeftPaddlePosition(this.state.P1.x, this.state.P1.y)
    this.renderer.setRightPaddlePosition(this.state.P2.x, this.state.P2.y)
    this.renderer.setBallPosition(this.state.ball.x, this.state.ball.y)
    this.renderer.setScore(this.state.P1.score, this.state.P2.score)
  }

  draw () {
    this.renderer.draw()
  }

  addEventListeners () {
    this.canvas.addEventListener('mousedown', (e) => {
      const hitboxSize = 50
      const click = getCursorPosition(this.canvas, e)

      if (Math.abs(this.center.x - click.x) < hitboxSize &&
          Math.abs(this.center.y - click.y) < hitboxSize &&
          this.stage !== GameStage.Playing) {
        this.state = new State()
        this.stage = GameStage.Playing
      }
    })

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

// https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
function getCursorPosition (canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return { x: x, y: y }
}

class State {
  P1
  P2
  ball
  terminating

  constructor () {
    this.ball = new Ball()
    this.P1 = new Player(-0.9)
    this.P2 = new Player(0.9)
    this.terminating = false
  }

  gameOver () {
    return this.P1.score > 9 || this.P2.score > 9
  }

  transition () {
    if (this.P1.score > 9) {
      return GameStage.P1Win
    } else if (this.P2.score > 9) {
      return GameStage.P2Win
    }
    return GameStage.Playing
  }
}
