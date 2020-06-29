<template>
  <div class="home">
    <h1>INFOGR Pong</h1>
    <canvas id="glCanvas" width="1200" height="800"></canvas>
  </div>
</template>

<script>
import Pong from '../pong'

export default {
  name: 'Home',
  data () {
    return {
      pong: null
    }
  },
  mounted () {
    const canvas = document.querySelector('#glCanvas')
    const gl = canvas.getContext('webgl')

    // Notify users of browsers that do not support WebGL
    if (gl === null) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.')
    }

    this.pong = new Pong(gl)

    this.pong.drawScene(null)
  }
}
</script>
