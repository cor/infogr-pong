const path = require('path')

module.exports = {
  publicPath: '/infogr-pong/',
  outputDir: path.resolve(__dirname, './docs'),
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.vert$|\.frag$/i,
          use: 'raw-loader'
        }
      ]
    }
  }
}
