import Movement from './movement'

export default class Player {
  width
  height
  x
  y
  direction
  score

  constructor (x) {
    this.width = 0.02
    this.height = 0.12
    this.x = x
    this.y = 0
    this.direction = Movement.None
    this.score = 0
  }
}
