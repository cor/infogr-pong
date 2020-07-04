export default class Ball {
  radius
  x
  y
  direction
  oldPositions = []
  speed
  acceleration

  startDirections = [
    { x: 0.01, y: 0.01 },
    { x: 0.01, y: -0.01 },
    { x: -0.01, y: 0.01 },
    { x: -0.01, y: -0.01 }
  ]

  setLocation (x, y) {
    this.oldPositions.push(new Float32Array([x, y]))
    if (this.oldPositions.length > 30) {
      this.oldPositions.shift()
    }
    this.x = x
    this.y = y
  }

  constructor () {
    this.radius = 0.01
    this.x = 0
    this.y = 0
    this.direction = this.startDirections[Math.floor(Math.random() * this.startDirections.length)]
    this.speed = 0.01
    this.acceleration = 1.1

    for (var i = 0; i < 30; i++) {
      this.oldPositions[i] = new Float32Array([0, 0])
    }
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
