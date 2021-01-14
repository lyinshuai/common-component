const os = require('os');
const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const {
  type,
  getWebpackConfig
} = require('../../utils/index');

const smp = new SpeedMeasurePlugin();
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});

const {
  entry,
  resolve,
  moduleRules,
  assetsSubDirectory,
  antdThemeModifyVars
} = getWebpackConfig();

const {
  alias,
  extensions
} = resolve;
const devModel = process.env.NODE_ENV === 'development';
const modifyVars = type(antdThemeModifyVars) === 'Object' ? antdThemeModifyVars : {};
const assetsPath = (_path) => path.posix.join('static', _path);
const pathResolve = (dir) => path.join(__dirname, '..', dir);

const happyPackPlugin = [
  new HappyPack({
    id: 'babel',
    loaders: [{
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        cacheDirectory: true,
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
          '@babel/plugin-transform-runtime',
          '@babel/plugin-proposal-class-properties',
          [
            'import',
            {
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: 'css'
            }
          ]
        ]
      }
    }],
    // 共享进程池
    threadPool: happyThreadPool,
    // 允许 HappyPack 输出日志
    verbose: true
  })
];

const createLintingRule = () => ({
  test: /\.(js|jsx)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [pathResolve('src'), pathResolve('test')],
  options: {
    formatter: eslintFriendlyFormatter,
    emitWarning: true,
    fix: true
  }
});

const baseConfig = {
  context: path.resolve(),
  resolve: {
    alias: {
      '@': path.resolve('./src')
    },
    extensions: extensions || ['.js', '.json', '.jsx', 'ts', 'tsx']
  },
  module: {
    rules: [
      ...[createLintingRule()],
      {
        test: /\.js|jsx$/,
        use: ['cache-loader', 'happypack/loader?id=babel'],
        include: path.resolve('src')
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
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
                postcssFlexbugsFixes(),
                postcssPresetEnv(),
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
                modifyVars,
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    // copy custom static assets
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve('./static'),
        to: assetsSubDirectory,
        globOptions: {
          ignore: ['.*']
        }
      }]
    })
  ].concat(happyPackPlugin)
};

if (alias && type(alias) === 'Object') {
  for (const key in alias) {
    alias[key] = path.resolve(alias[key]);
  }
  baseConfig.resolve.alias = Object.assign(baseConfig.resolve.alias, alias);
}

if (moduleRules && Array.isArray(moduleRules)) {
  baseConfig.module.rules = [
    ...baseConfig.module.rules,
    ...moduleRules
  ];
}

module.exports = smp.wrap(baseConfig);
