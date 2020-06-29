export default class Pong {
  renderer

  constructor (renderer) {
    this.renderer = renderer
  }

  tick () {
    this.renderer.draw()
  }
}
