const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;
const AddAssetPlugin = require('add-asset-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const { options, pages } = require('./src/data');

const remoteServer = process.env.npm_config_server;
const build = process.env.npm_lifecycle_event === 'build:prod' ? 'prod' : 'dev';

module.exports = {
  // TODO: 'Точки входа для отдельных услуг и событий'
  entry: {
    index: './src/pages/index/index',
    services: './src/pages/services/services',
    service: './src/pages/services/service/service',
    schedule: './src/pages/schedule/schedule',
    eventsboard: './src/pages/eventsboard/eventsboard',
    team: './src/pages/team/team',
    coaches: './src/pages/coaches/coaches',
    coach: './src/pages/coaches/coach/coach',
    gallery: './src/pages/gallery/gallery',
    contacts: './src/pages/contacts/contacts',
    requisites: './src/pages/requisites/requisites',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: build === 'prod'
      ? 'scripts/[name].[contenthash:4].js'
      : 'scripts/[name].js',
    chunkFilename: build === 'prod'
      ? 'scripts/[name].[contenthash:4].js'
      : 'scripts/[name].js',
  },
  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'babel-loader',
        ],
      },
      // HTML
      {
        test: /\.(pug|jade)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: build === 'dev',
            },
          },
        ],
      },
      // Fonts
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: path.resolve(__dirname, 'src'),
            },
          },
        ],
      },
      // CSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                ctx: {
                  cssnano: build === 'prod' ? {
                    preset: ['default', {
                      discardComments: {
                        removeAll: true,
                      },
                    }],
                  } : false,
                },
              },
            },
          },
          'sass-loader',
        ],
      },
      // Images
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: build === 'prod' ? '[path][name].[hash:4].[ext]' : '[path][name].[ext]',
              context: path.resolve(__dirname, 'src'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // TODO: 'Global для jquery'
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
    // скрипты шаблона
    // TODO: 'Минимизация сторонних скриптов'
    new CopyWebpackPlugin([
      {
        from: './src/scripts/external/**/*.js',
        to: 'scripts/[name].[ext]',
        toType: 'template',
      },
    ]),
    // Валидации
    new CopyWebpackPlugin([
      {
        from: './src/data/trash',
        to: './[name].[ext]',
        toType: 'template',
      },
    ]),
    // Логотип
    // TODO: 'Hash для логотипа'
    new CopyWebpackPlugin([
      {
        from: './src/images/logo',
        to: './images/logo/[name].[ext]',
        toType: 'template',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: build === 'prod'
        ? 'styles/[name].[contenthash:4].css'
        : 'styles/[name].css',
    }),
    new AddAssetPlugin('humans.txt',
      `/* TEAM */\nDeveloper: ${options.author}\nSite: ${options.author_email}\nLocation: Saint Petersburg, Russia\n\n/* SITE */\nLast update: ${new Date().toLocaleDateString(
        'RU-ru', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        },
      )}\nLanguage: Russian\nStandards: HTML5, CSS3, ES6\nIDE: WebStorm`),
    new FileManagerPlugin({
      onEnd: {
        delete: [
          path.resolve(__dirname, 'dist/**/inline*.*'),
        ],
      },
    }),
    new RobotstxtPlugin({
      policy: [
        {
          userAgent: '*',
          disallow: remoteServer === 'prod' ? null : '/',
        },
      ],
    }),
  ],
  optimization: {
    // TODO: 'Добавить runtime'
    // https://webpack.js.org/configuration/optimization/
    // https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching
    noEmitOnErrors: true,
    // TODO: 'Настроить vendor'
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /(node_modules|bower_components)/,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
        },
        inline: {
          name: false,
          test: /inline/,
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  devServer: {
    stats: 'errors-only',
    overlay: true,
    compress: true,
    port: 8000,
  },
};

if (build === 'prod' && remoteServer !== 'dev') {
  module.exports.plugins.push(
    new PurgecssPlugin({
      paths: glob.sync(path.resolve(__dirname, 'src/**/*'), { nodir: true }),
    }),
  );
}

(function createPages() {
  Object.keys(pages).forEach((page) => {
    module.exports.plugins.push(
      new HtmlWebpackPlugin({
        name: pages[page].name,
        filename: pages[page].link,
        template: pages[page].template,
        inject: false,
        remoteServer,
        minify: {
          removeComments: build === 'prod',
          minifyCSS: build === 'prod',
          minifyJS: build === 'prod',
          collapseWhitespace: build === 'prod',
        },
      }),
    );
  });
}());
