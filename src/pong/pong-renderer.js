import { mat4 } from 'gl-matrix'
import Shader from './shader'

import fsSource from './shaders/shader.frag'
import vsSource from './shaders/shader.vert'

export default class PongRenderer {
  gl
  shader
  buffers

  // constructor (gl, shaderSourceVars) {
  constructor (gl) {
    this.gl = gl
    this.shader = new Shader(gl, vsSource, fsSource)
    this.buffers = this.initBuffers()

    this.shader.use()
    this.setDefaultPositions()
  }

  recompileShader (shaderSourceVars) {
    this.shader.delete()
    this.shader = new Shader(this.gl, vsSource, fsSource, shaderSourceVars)
  }

  initBuffers () {
    // Create a buffer for the square's positions.

    const positionBuffer = this.gl.createBuffer()

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer)

    // Now create an array of positions for the square.

    const positions = [
      -1.0, 1.0,
      1.0, 1.0,
      -1.0, -1.0,
      1.0, -1.0
    ]

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
    this.gl.bufferData(this.gl.ARRAY_BUFFER,
      new Float32Array(positions),
      this.gl.STATIC_DRAW)

    return {
      position: positionBuffer
    }
  }

  draw () {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0) // Clear to black, fully opaque
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    this.gl.clearDepth(1.0) // Clear everything
    this.gl.enable(this.gl.DEPTH_TEST) // Enable depth testing
    this.gl.depthFunc(this.gl.LEQUAL) // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    const fieldOfView = 29.8 * Math.PI / 180 // in radians
    const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight
    const zNear = 0.1
    const zFar = 100.0
    const projectionMatrix = mat4.create()

    // gl-matrix.js always has the first argument as the destination to receive the result.
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar)

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create()

    // Now move the drawing position a bit to where we want to
    // start drawing the square.
    mat4.translate(modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to translate
      [0.0, 0.0, -2.5]) // amount to translate

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    const vertexPositionLocation = this.shader.getAttribLocation('aVertexPosition')
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position)
    this.gl.vertexAttribPointer(vertexPositionLocation, 2, this.gl.FLOAT, false, 0, 0)
    this.gl.enableVertexAttribArray(vertexPositionLocation)

    // Tell WebGL to use our program when drawing
    this.shader.use()

    // Set the shader uniforms
    this.shader.setUniformMatrix4fv('uProjectionMatrix', projectionMatrix)
    this.shader.setUniformMatrix4fv('uModelViewMatrix', modelViewMatrix)
    {
      const offset = 0
      const vertexCount = 4
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, vertexCount)
    }
  }

  setOldPositions (oldPositions) {
    for (const [i, pos] of oldPositions.entries()) {
      this.shader.setUniform2fv(`oldPositions[${i}]`, pos)
    }
  }

  setTime (time) {
    this.shader.setUniform1f('time', time)
  }

  setGameStage (gameStage) {
    this.shader.setUniform1f('gameStage', gameStage)
  }

  setDefaultPositions () {
    this.setLeftPaddlePosition(-0.9, 0)
    this.setRightPaddlePosition(0.9, 0)
    this.setBallPosition(0, 0)
  }

  setLeftPaddlePosition (x, y) {
    this.shader.setUniform2fv('leftPaddlePosition', new Float32Array([x, y]))
  }

  setRightPaddlePosition (x, y) {
    this.shader.setUniform2fv('rightPaddlePosition', new Float32Array([x, y]))
  }

  setBallPosition (x, y) {
    this.shader.setUniform2fv('ballPosition', new Float32Array([x, y]))
  }

  setScore (x, y) {
    this.shader.setUniform2fv('score', new Float32Array([x, y]))
  }
}
