const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

// Use dotenv to get the environment variables
dotenv.config({ path: path.resolve(__dirname, '../', '.env')});
const WEBPACK_DEV_SERVER_HOST = process.env.WEBPACK_DEV_SERVER_HOST;
const WEBPACK_DEV_SERVER_PORT = process.env.WEBPACK_DEV_SERVER_PORT;
const FLASK_URL = process.env.FLASK_URL;

module.exports = {
  mode: 'development',
  target: 'web',
  entry: './src/index.jsx',
  // Bundled code
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  // Configure the webpack development server
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    host: WEBPACK_DEV_SERVER_HOST,
    port: WEBPACK_DEV_SERVER_PORT,
    // Proxy api requests to the Flask server
    proxy: [
      {
        context: ['/api'],
        target: FLASK_URL
      }
    ]
  },
  // Pass JavaScript files through the Babel transpiler
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', {'runtime': 'automatic'}],
            ]
          }
        }
      }
    ]
  },
  // Resolve .js and .jsx files
  resolve: {
    extensions: ['.js', '.jsx']
  }
};