const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const productionConfig = require('./webpack.production');
const developmentConfig = require('./webpack.development');

const production = process.env.npm_lifecycle_event === 'build';
if (production) {
  process.env.NODE_ENV = 'production';
} else {
  process.env.NODE_ENV = 'development';
}

const commonConfig = merge([
  {
    context: path.resolve(__dirname, 'src'),
    entry: {
      index: './pages/index/index',
      services: './pages/services/services',
      schedule: './pages/schedule/schedule',
      eventsboard: './pages/eventsboard/eventsboard',
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
      // валидации
      new CopyWebpackPlugin([
        {
          from: './data/trash',
          to: './[name].[ext]',
          toType: 'template',
        },
      ]),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './pages/index/index.pug',
        name: 'index',
        excludeChunks: [
          'services',
          'schedule',
          'eventsboard',
          'team',
          'coaches',
          'gallery',
          'contacts',
          'requisites'],
        minify: {
          removeComments: production,
          minifyCSS: production,
          minifyJS: production,
          collapseWhitespace: production,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'services.html',
        template: './pages/services/services.pug',
        name: 'services',
        excludeChunks: [
          'index',
          'schedule',
          'eventsboard',
          'team',
          'coaches',
          'gallery',
          'contacts',
          'requisites'],
        minify: {
          removeComments: production,
          minifyCSS: production,
          minifyJS: production,
          collapseWhitespace: production,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'rent.html',
        template: './pages/services/rent.pug',
        name: 'rent',
        excludeChunks: [
          'index',
          'schedule',
          'eventsboard',
          'team',
          'coaches',
          'gallery',
          'contacts',
          'requisites'],
        minify: {
          removeComments: production,
          minifyCSS: production,
          minifyJS: production,
          collapseWhitespace: production,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'schedule.html',
        template: './pages/schedule/schedule.pug',
        name: 'schedule',
        excludeChunks: [
          'index',
          'services',
          'eventsboard',
          'team',
          'coaches',
          'gallery',
          'contacts',
          'requisites'],
        minify: {
          removeComments: production,
          minifyCSS: production,
          minifyJS: production,
          collapseWhitespace: production,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'eventsboard.html',
        template: './pages/eventsboard/eventsboard.pug',
        name: 'eventsboard',
        excludeChunks: [
          'index',
          'services',
          'schedule',
          'team',
          'coaches',
          'gallery',
          'contacts',
          'requisites'],
        minify: {
          removeComments: production,
          minifyCSS: production,
          minifyJS: production,
          collapseWhitespace: production,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'coaches.html',
        template: './pages/coaches/coaches.pug',
        name: 'coaches',
        excludeChunks: [
          'index',
          'services',
          'schedule',
          'eventsboard',
          'team',
          'gallery',
          'contacts'],
        minify: {
          removeComments: production,
          minifyCSS: production,
          minifyJS: production,
          collapseWhitespace: production,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'gallery.html',
        template: './pages/gallery/gallery.pug',
        name: 'gallery',
        excludeChunks: [
          'index',
          'services',
          'schedule',
          'eventsboard',
          'team',
          'coaches',
          'contacts',
          'requisites'],
        minify: {
          removeComments: production,
          minifyCSS: production,
          minifyJS: production,
          collapseWhitespace: production,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'contacts.html',
        template: './pages/contacts/contacts.pug',
        name: 'contacts',
        excludeChunks: [
          'index',
          'services',
          'schedule',
          'eventsboard',
          'team',
          'coaches',
          'gallery',
          'requisites'],
        minify: {
          removeComments: production,
          minifyCSS: production,
          minifyJS: production,
          collapseWhitespace: production,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'requisites.html',
        template: './pages/requisites/requisites.pug',
        name: 'requisites',
        excludeChunks: [
          'index',
          'services',
          'schedule',
          'team',
          'coaches',
          'gallery',
          'contacts'],
        minify: {
          removeComments: production,
          minifyCSS: production,
          minifyJS: production,
          collapseWhitespace: production,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'sofa-makurina-master-class.html',
        template: './pages/eventsboard/sofa-makurina-master-class.pug',
        name: 'sofa-makurina-master-class',
        excludeChunks: [
          'index',
          'services',
          'schedule',
          'team',
          'coaches',
          'gallery',
          'contacts'],
        minify: {
          removeComments: production,
          minifyCSS: production,
          minifyJS: production,
          collapseWhitespace: production,
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
