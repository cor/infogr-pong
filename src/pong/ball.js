export default class Ball {
  radius
  x
  y
  direction
  speed
  acceleration

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
    this.speed = 0.01
    this.acceleration = 1.1
  }

  left () {
    return this.x - this.radius
  }

  right () {
    return this.x + this.radius
  }

  top () {
    return this.y + this.radius
  }

  bottom () {
    return this.y - this.radius
  }
}
