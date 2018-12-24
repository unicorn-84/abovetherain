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
const { options } = require('./src/data');

const prod = process.env.npm_lifecycle_event === 'build:prod';
const buildServer = process.env.npm_config_server;

const htmlWebpackPluginMinifyOptions = {
  removeComments: true,
  minifyCSS: true,
  minifyJS: true,
  collapseWhitespace: true,
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './pages/index/index',
    services: './pages/services/services',
    schedule: './pages/schedule/schedule',
    eventsboard: './pages/eventsboard/eventsboard',
    team: './pages/team/team',
    coaches: './pages/coaches/coaches',
    coach: './pages/coaches/coach/coach',
    gallery: './pages/gallery/gallery',
    contacts: './pages/contacts/contacts',
    requisites: './pages/requisites/requisites',
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
              pretty: true,
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
        from: './scripts/**/*.js',
        to: 'scripts/[name].[ext]',
        toType: 'template',
      },
    ]),
    // стили шаблона
    new CopyWebpackPlugin([
      {
        from: './styles/**/*.css',
        to: 'styles/[name].[ext]',
        toType: 'template',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: prod
        ? 'styles/[name].[contenthash:4].css'
        : 'styles/[name].css',
    }),
    new HtmlWebpackPlugin({
      buildServer,
      filename: 'index.html',
      template: './pages/index/index.pug',
      name: 'index',
      inject: false,
      minify: prod ? htmlWebpackPluginMinifyOptions : null,
    }),
    new HtmlWebpackPlugin({
      buildServer,
      filename: 'services.html',
      template: './pages/services/services.pug',
      name: 'services',
      inject: false,
      minify: prod ? htmlWebpackPluginMinifyOptions : null,
    }),
    new HtmlWebpackPlugin({
      buildServer,
      filename: 'rent.html',
      template: './pages/services/rent.pug',
      name: 'rent',
      inject: false,
      minify: prod ? htmlWebpackPluginMinifyOptions : null,
    }),
    new HtmlWebpackPlugin({
      buildServer,
      filename: 'schedule.html',
      template: './pages/schedule/schedule.pug',
      name: 'schedule',
      inject: false,
      minify: prod ? htmlWebpackPluginMinifyOptions : null,
    }),
    new HtmlWebpackPlugin({
      buildServer,
      filename: 'eventsboard.html',
      template: './pages/eventsboard/eventsboard.pug',
      name: 'eventsboard',
      inject: false,
      minify: prod ? htmlWebpackPluginMinifyOptions : null,
    }),
    new HtmlWebpackPlugin({
      buildServer,
      filename: 'team.html',
      template: './pages/team/team.pug',
      name: 'team',
      inject: false,
      minify: prod ? htmlWebpackPluginMinifyOptions : null,
    }),
    new HtmlWebpackPlugin({
      buildServer,
      filename: 'coaches.html',
      template: './pages/coaches/coaches.pug',
      name: 'coaches',
      inject: false,
      minify: prod ? htmlWebpackPluginMinifyOptions : null,
    }),
    new HtmlWebpackPlugin({
      buildServer,
      filename: 'nadezhda_luchinina.html',
      template: './pages/coaches/nadezhda_luchinina.pug',
      name: 'nadezhda_luchinina',
      inject: false,
      minify: prod ? htmlWebpackPluginMinifyOptions : null,
    }),
    new HtmlWebpackPlugin({
      buildServer,
      filename: 'gallery.html',
      template: './pages/gallery/gallery.pug',
      name: 'gallery',
      inject: false,
      minify: prod ? htmlWebpackPluginMinifyOptions : null,
    }),
    new HtmlWebpackPlugin({
      buildServer,
      filename: 'contacts.html',
      template: './pages/contacts/contacts.pug',
      name: 'contacts',
      inject: false,
      minify: prod ? htmlWebpackPluginMinifyOptions : null,
    }),
    new HtmlWebpackPlugin({
      buildServer,
      filename: 'requisites.html',
      template: './pages/requisites/requisites.pug',
      name: 'requisites',
      inject: false,
      minify: prod ? htmlWebpackPluginMinifyOptions : null,
    }),
    new HtmlWebpackPlugin({
      buildServer,
      filename: 'sofa-makurina-master-class.html',
      template: './pages/eventsboard/sofa-makurina-master-class.pug',
      name: 'sofa-makurina-master-class',
      inject: false,
      minify: prod ? htmlWebpackPluginMinifyOptions : null,
    }),
    new HtmlWebpackPlugin({
      buildServer,
      filename: 'coaches/aleksandr-ushakov.html',
      template: './pages/coaches/coach/aleksandr-ushakov.pug',
      name: 'aleksandr-ushakov',
      inject: false,
      minify: prod ? htmlWebpackPluginMinifyOptions : null,
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
