const os = require('os');
const path = require('path');
const HappyPack = require('happypack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

const utils = require('./utils');
const config = require('../config');

const smp = new SpeedMeasurePlugin();
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});
const devModel = process.env.NODE_ENV === 'development';

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const createLintingRule = () => ({
  test: /\.(js|jsx)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('examples'), resolve('test')],
  options: {
    formatter: eslintFriendlyFormatter,
    emitWarning: true,
    fix: true
  }
});

const baseConfig = {
  context: path.resolve(__dirname, '../'),
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@': path.resolve('./src')
    }
  },
  module: {
    rules: [
      ...[createLintingRule()],
      {
        test: /\.js|jsx$/,
        use: ['cache-loader', 'happypack/loader?id=babel'],
        include: [path.resolve('src'), path.resolve('examples')]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          devModel ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssFlexbugsFixes,
                autoprefixer({
                  overrideBrowserslist: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'error-color': '#ff2233',
                  'warning-color': '#ff8607',
                  'primary-color': '#2D79F3',
                  'btn-primary-bg': '#0971F3'
                  // 'font-size-base': '12px'
                },
                javascriptEnabled: true
              }
            }
          }
          // 'happypack/loader?id=styles',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        globOptions: {
          ignore: ['.*']
        }
      }]
    }),
    new HappyPack({
      id: 'babel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      ],
      // 共享进程池
      threadPool: happyThreadPool,
      // 允许 HappyPack 输出日志
      verbose: true
    })
  ]
};

module.exports = smp.wrap(baseConfig);
