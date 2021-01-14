const path = require('path');
const webpack = require('webpack');
const {
  merge
} = require('webpack-merge');
const portfinder = require('portfinder');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const {
  getWebpackConfig,
  createNotifierCallback
} = require('../../utils');

const {
  notifyOnErrors,
  devtool = 'cheap-module-source-map',
  devServer
} = getWebpackConfig();
const {
  host = 'localhost', port = '8080', ...otherDevServer
} = devServer || {};
const baseWebpackConfig = require('./webpack.base.conf');

process.env.NODE_ENV = 'development';
const {
  HOST
} = process.env;
const PORT = process.env.PORT && Number(process.env.PORT);

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool,
  entry: ['./src/index'],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: HOST || host,
    port: PORT || port,
    compress: true,
    inline: true,
    hot: true,
    overlay: true,
    open: true,
    noInfo: true,
    historyApiFallback: true,
    ...otherDevServer
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: path.resolve('./src/index.html'),
      filename: './index.html',
      inject: true,
      favicon: path.resolve('./static/iphone.ico')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // filename: devMode ? '[name].css' : '[name].[hash].css',
      // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      filename: 'index.css',
      chunkFilename: '[id].css'
    })
  ]
});
console.log(devWebpackConfig);
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`
            ]
          },
          onErrors: notifyOnErrors ? createNotifierCallback() : undefined
        })
      );

      resolve(devWebpackConfig);
    }
  });
});
