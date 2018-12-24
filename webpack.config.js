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

const prod = process.env.npm_lifecycle_event === 'build:prod';
const buildServer = process.env.npm_config_server;

module.exports = {
  entry: {
    index: './src/pages/index/index',
    services: './src/pages/services/services',
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
    filename: prod ? 'scripts/[name].[contenthash:4].js' : 'scripts/[name].js',
    chunkFilename: prod
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
              pretty: !prod,
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
              name: '[name].[ext]',
              outputPath: 'fonts/',
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
          'css-loader',
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
              name: prod ? '[name].[hash:4].[ext]' : '[name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
    // скрипты шаблона
    new CopyWebpackPlugin([
      {
        from: './src/scripts/**/*.js',
        to: 'scripts/[name].[ext]',
        toType: 'template',
      },
    ]),
    // стили шаблона
    new CopyWebpackPlugin([
      {
        from: './src/styles/**/*.css',
        to: 'styles/[name].[ext]',
        toType: 'template',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: prod
        ? 'styles/[name].[contenthash:4].css'
        : 'styles/[name].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new FileManagerPlugin({
      onEnd: {
        delete: [
          path.resolve(__dirname, 'dist/**/inline*.*'),
        ],
      },
    }),
  ],
  optimization: {
    noEmitOnErrors: true,
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
    host: process.env.HOST,
    port: process.env.PORT || 8000,
  },
};

if (prod) {
  if (buildServer === 'dev') {
    module.exports.plugins.push(
      new RobotstxtPlugin({
        policy: [
          {
            userAgent: '*',
            disallow: '/',
          },
        ],
      }),
    );
  } else {
    module.exports.plugins.push(
      new RobotstxtPlugin({
        policy: [
          {
            userAgent: '*',
          },
        ],
      }),
      new AddAssetPlugin('humans.txt',
        `/* TEAM */\nDeveloper: ${options.author}\nSite: ${options.author_email}\nLocation: Saint Petersburg, Russia\n\n/* SITE */\nLast update: ${new Date().toLocaleDateString(
          'RU-ru', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          },
        )}\nLanguage: Russian\nStandards: HTML5, CSS3, ES6\nIDE: WebStorm`),
      new CopyWebpackPlugin([
        {
          from: './data/trash',
          to: './[name].[ext]',
          toType: 'template',
        },
      ]),
      new PurgecssPlugin({
        paths: glob.sync(path.resolve(__dirname, 'src/**/*'), { nodir: true }),
      }),
    );
  }
}

(function createPages() {
  Object.keys(pages).forEach((page) => {
    module.exports.plugins.push(
      new HtmlWebpackPlugin({
        name: pages[page].name,
        filename: pages[page].link,
        template: pages[page].template,
        inject: false,
        buildServer,
        minify: {
          removeComments: prod,
          minifyCSS: prod,
          minifyJS: prod,
          collapseWhitespace: prod,
        },
      }),
    );
  });
}());
