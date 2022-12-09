const webpackResolve = require("craco-webpack-resolve")

module.exports = {
  plugins: [
    {
      plugin: webpackResolve,
      options: {
        resolve: {
          alias: {
            "buffer": "buffer",
            "stream": "stream-browserify",
          },
          fallback: {
            stream: require.resolve("stream-browserify"),
            crypto: require.resolve("crypto-browserify"),
            buffer: require.resolve('buffer/'),
          }
        }
      }
    },
  ],
}