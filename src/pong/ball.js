export default class Ball {
  radius
  x
  y
  direction

  startDirections = [
    { x: 0.01, y: 0.01 },
    { x: 0.01, y: -0.01 },
    { x: -0.01, y: 0.01 },
    { x: -0.01, y: -0.01 }
  ]

  constructor () {
    this.radius = 0.01
    this.x = 0
    this.y = 0
    this.direction = this.startDirections[Math.floor(Math.random() * this.startDirections.length)]
  }
}
