var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: ["./src/app.tsx"],

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },

  resolve: {
    extensions: ["", ".ts", ".tsx", ".js"]
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loaders: ['style', 'css', 'sass']
        })
      }
    ],

    plugins: [
      new ExtractTextPlugin('index.css', {
        allChunks: true
      })
    ]
  }
};

module.exports = config;
