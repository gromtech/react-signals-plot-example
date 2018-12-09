const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const ROOT_PATH = path.resolve(__dirname);
const env = process.env.WEBPACK_ENV || 'dev';

const appName = 'app';
const host = '0.0.0.0';
const port = '8000';

const plugins = [];
let outputFile;

if (env === 'build') {
  outputFile = `${appName}.min.js`;
} else {
  outputFile = `${appName}.js`;
}

console.log('outputFile === ' + outputFile);
console.log(`full path === ${__dirname}/lib`);

const dev = env === 'dev';

plugins.push(new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
}));

const config = {
  mode: dev ? 'development' : 'production',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: outputFile,
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=20000',
        include: path.resolve(ROOT_PATH, 'src/assets/img')
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
    ]
  },
  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      assets: path.resolve('./src/assets'),
      components: path.resolve('./src/components'),
      styles: path.resolve('./src/styles'),
      services: path.resolve('./src/services'),
      react: path.resolve(__dirname, 'node_modules', 'react')
    }
  },
  plugins: plugins
};

if (dev) {
  config.devServer = {
    contentBase: path.join(__dirname, 'lib'),
    compress: false,
    port: port
  };
}

module.exports = config;
