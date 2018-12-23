const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const productionConfig = require('./webpack.production');
const developmentConfig = require('./webpack.development');

const build = process.env.npm_lifecycle_event === 'build:prod';
const server = process.env.npm_config_server;

const commonConfig = merge([
  {
    context: path.resolve(__dirname, 'src'),
    entry: {
      index: './pages/index/index',
      services: './pages/services/services',
      schedule: './pages/schedule/schedule',
      eventsboard: './pages/eventsboard/eventsboard',
      team: './pages/team/team',
      coaches: './pages/coaches/coaches',
      gallery: './pages/gallery/gallery',
      contacts: './pages/contacts/contacts',
      requisites: './pages/requisites/requisites',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './scripts/[name].js',
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
        {
          test: /\.(pug|jade)$/,
          exclude: /(node_modules|bower_components|data)/,
          use: [
            {
              loader: 'pug-loader',
              options: {
                pretty: true,
              },
            },
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /data.*\.(jade|pug|html)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'data/[name].[hash:4].html',
              },
            },
            'extract-loader',
            {
              loader: 'html-loader',
              options: {
                attrs: ['img:src'],
                root: path.resolve(__dirname, '.'),
                interpolate: true,
              },
            },
            {
              loader: 'pug-html-loader',
              options: {
                exports: false,
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
      new HtmlWebpackPlugin({
        server,
        filename: 'index.html',
        template: './pages/index/index.pug',
        name: 'index',
        inject: false,
        minify: {
          removeComments: build,
          minifyCSS: build,
          minifyJS: build,
          collapseWhitespace: build,
        },
      }),
      new HtmlWebpackPlugin({
        server,
        filename: 'services.html',
        template: './pages/services/services.pug',
        name: 'services',
        inject: false,
        minify: {
          removeComments: build,
          minifyCSS: build,
          minifyJS: build,
          collapseWhitespace: build,
        },
      }),
      new HtmlWebpackPlugin({
        server,
        filename: 'rent.html',
        template: './pages/services/rent.pug',
        name: 'rent',
        inject: false,
        minify: {
          removeComments: build,
          minifyCSS: build,
          minifyJS: build,
          collapseWhitespace: build,
        },
      }),
      new HtmlWebpackPlugin({
        server,
        filename: 'schedule.html',
        template: './pages/schedule/schedule.pug',
        name: 'schedule',
        inject: false,
        minify: {
          removeComments: build,
          minifyCSS: build,
          minifyJS: build,
          collapseWhitespace: build,
        },
      }),
      new HtmlWebpackPlugin({
        server,
        filename: 'eventsboard.html',
        template: './pages/eventsboard/eventsboard.pug',
        name: 'eventsboard',
        inject: false,
        minify: {
          removeComments: build,
          minifyCSS: build,
          minifyJS: build,
          collapseWhitespace: build,
        },
      }),
      new HtmlWebpackPlugin({
        server,
        filename: 'team.html',
        template: './pages/team/team.pug',
        name: 'team',
        inject: false,
        minify: {
          removeComments: build,
          minifyCSS: build,
          minifyJS: build,
          collapseWhitespace: build,
        },
      }),
      new HtmlWebpackPlugin({
        server,
        filename: 'coaches.html',
        template: './pages/coaches/coaches.pug',
        name: 'coaches',
        inject: false,
        minify: {
          removeComments: build,
          minifyCSS: build,
          minifyJS: build,
          collapseWhitespace: build,
        },
      }),
      new HtmlWebpackPlugin({
        server,
        filename: 'aleksandr_ushakov.html',
        template: './pages/coaches/aleksandr_ushakov.pug',
        name: 'aleksandr_ushakov',
        inject: false,
        minify: {
          removeComments: build,
          minifyCSS: build,
          minifyJS: build,
          collapseWhitespace: build,
        },
      }),
      new HtmlWebpackPlugin({
        server,
        filename: 'nadezhda_luchinina.html',
        template: './pages/coaches/nadezhda_luchinina.pug',
        name: 'nadezhda_luchinina',
        inject: false,
        minify: {
          removeComments: build,
          minifyCSS: build,
          minifyJS: build,
          collapseWhitespace: build,
        },
      }),
      new HtmlWebpackPlugin({
        server,
        filename: 'gallery.html',
        template: './pages/gallery/gallery.pug',
        name: 'gallery',
        inject: false,
        minify: {
          removeComments: build,
          minifyCSS: build,
          minifyJS: build,
          collapseWhitespace: build,
        },
      }),
      new HtmlWebpackPlugin({
        server,
        filename: 'contacts.html',
        template: './pages/contacts/contacts.pug',
        name: 'contacts',
        inject: false,
        minify: {
          removeComments: build,
          minifyCSS: build,
          minifyJS: build,
          collapseWhitespace: build,
        },
      }),
      new HtmlWebpackPlugin({
        server,
        filename: 'requisites.html',
        template: './pages/requisites/requisites.pug',
        name: 'requisites',
        inject: false,
        minify: {
          removeComments: build,
          minifyCSS: build,
          minifyJS: build,
          collapseWhitespace: build,
        },
      }),
      new HtmlWebpackPlugin({
        server,
        filename: 'sofa-makurina-master-class.html',
        template: './pages/eventsboard/sofa-makurina-master-class.pug',
        name: 'sofa-makurina-master-class',
        inject: false,
        minify: {
          removeComments: build,
          minifyCSS: build,
          minifyJS: build,
          collapseWhitespace: build,
        },
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
      }),
    ],
    optimization: {
      noEmitOnErrors: true,
    },
  },
]);

module.exports = (mode) => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }
  return merge(commonConfig, developmentConfig, { mode });
};
