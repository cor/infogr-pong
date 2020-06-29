import Movement from './movement'

export default class Player {
  width
  height
  x
  y
  direction
  score
  speed

  constructor (x) {
    this.width = 0.04
    this.height = 0.3
    this.x = x
    this.y = 0
    this.speed = 0.02
    this.direction = Movement.None
    this.score = 0
  }

  left () {
    return this.x - this.width / 2
  }

  right () {
    return this.x + this.width / 2
  }

  top () {
    return this.y + this.height / 2
  }

  bottom () {
    return this.y - this.height / 2
  }
}
