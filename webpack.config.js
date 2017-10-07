const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname);
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const env = process.env.WEBPACK_ENV || 'dev';

const appName = 'app';
const host = '0.0.0.0';
const port = '8000';

const plugins = [];
let outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = `${appName}.min.js`;
} else {
  outputFile = `${appName}.js`;
}

const config = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    publicPath: `${__dirname}/public`
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['react', 'es2015']
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
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx'],
    assets: path.resolve('./src/assets'),
    components: path.resolve('./src/components'),
    styles: path.resolve('./src/styles'),
    services: path.resolve('./src/services')
  },
  plugins: plugins
};

if (env === 'dev') {
  new WebpackDevServer(webpack(config), {
    contentBase: './public',
    hot: true,
    debug: true
  }).listen(port, host, (err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log('-------------------------');
  console.log(`Local web server runs at http://${host}:${port}`);
  console.log('-------------------------');
}

module.exports = config;
