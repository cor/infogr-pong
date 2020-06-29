<template>
  <div class="home">
    <h1>INFOGR Pong</h1>
    <canvas id="glCanvas" width="1200" height="800"></canvas>
  </div>
</template>

<script>
import { Pong, PongRenderer } from '../pong'

export default {
  name: 'Home',
  data () {
    return {
      pong: null,
      pongRenderer: null
    }
  },
  mounted () {
    const canvas = document.querySelector('#glCanvas')
    const gl = canvas.getContext('webgl')

    // Notify users of browsers that do not support WebGL
    if (gl === null) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.')
    }

    this.pongRenderer = new PongRenderer(gl)
    this.pong = new Pong(this.pongRenderer)

    this.pong.tick()

    const render = (now) => {
      now *= 0.001 // convert to seconds
      // if (this.startTime === null) {
      //   this.startTime = now
      // }

      // const time = 0.0001 + now - this.startTime
      // this.raytracer.drawScene(movie.currentScene(time))
      // this.frameId = requestAnimationFrame(render)
      this.pongRenderer.setBallPosition(now, 0)
      this.pong.tick()
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  }
}
</script>
