export default class Ball {
  radius
  x
  y
  direction

  constructor () {
    this.radius = 0.01
    this.x = 0
    this.y = 0
    this.direction = {
      x: -0.01,
      y: 0.05
    }
  }
}
