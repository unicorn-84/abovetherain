const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const productionConfig = require('./webpack.production');
const developmentConfig = require('./webpack.development');

const production = process.env.npm_lifecycle_event === 'build';

const commonConfig = merge([
  {
    context: path.resolve(__dirname, 'src'),
    entry: {
      index: './pages/index/index',
      services: './pages/services/services',
      schedule: './pages/schedule/schedule',
      events: './pages/events/events',
      team: './pages/team/team',
      coaches: './pages/coaches/coaches',
      gallery: './pages/gallery/gallery',
      contacts: './pages/contacts/contacts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './scripts/[name].js',
    },
    module: {
      rules: [
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
      ],
    },
    plugins: [
      new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
      new AsyncChunkNames(),
      new CopyWebpackPlugin([
        {
          from: './scripts/**/*.js',
          to: 'scripts/[name].[ext]',
          toType: 'template',
        },
      ]),
      new CopyWebpackPlugin([
        {
          from: './styles/**/*.css',
          to: 'styles/[name].[ext]',
          toType: 'template',
        },
      ]),
      // new CopyWebpackPlugin([
      //   {
      //     from: './data',
      //     to: 'data/[path][name].[ext]',
      //     toType: 'template',
      //   },
      // ]),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './pages/index/index.pug',
        name: 'index',
        excludeChunks: ['services', 'schedule', 'events', 'team', 'coaches', 'gallery', 'contacts', 'event'],
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
        excludeChunks: ['index', 'schedule', 'events', 'team', 'coaches', 'gallery', 'contacts', 'event'],
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
        excludeChunks: ['index', 'services', 'events', 'team', 'coaches', 'gallery', 'contacts', 'event'],
        minify: {
          removeComments: production,
          minifyCSS: production,
          minifyJS: production,
          collapseWhitespace: production,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'events.html',
        template: './pages/events/events.pug',
        name: 'events',
        excludeChunks: ['index', 'services', 'schedule', 'team', 'coaches', 'gallery', 'contacts', 'event'],
        minify: {
          removeComments: production,
          minifyCSS: production,
          minifyJS: production,
          collapseWhitespace: production,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'team.html',
        template: './pages/team/team.pug',
        name: 'team',
        excludeChunks: ['index', 'services', 'schedule', 'events', 'coaches', 'gallery', 'contacts', 'event'],
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
        name: 'event',
        excludeChunks: ['index', 'services', 'schedule', 'events', 'team', 'gallery', 'contacts'],
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
        excludeChunks: ['index', 'services', 'schedule', 'events', 'team', 'coaches', 'contacts', 'event'],
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
        excludeChunks: ['index', 'services', 'schedule', 'events', 'team', 'coaches', 'gallery', 'event'],
        minify: {
          removeComments: production,
          minifyCSS: production,
          minifyJS: production,
          collapseWhitespace: production,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'event.html',
        template: './pages/events/event.pug',
        name: 'event',
        excludeChunks: ['index', 'services', 'schedule', 'team', 'coaches', 'gallery', 'contacts'],
        minify: {
          removeComments: production,
          minifyCSS: production,
          minifyJS: production,
          collapseWhitespace: production,
        },
      }),
    ],
    optimization: {
      noEmitOnErrors: true,
    },
  },
]);

module.exports = (mode) => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, {mode});
  }
  return merge(commonConfig, developmentConfig, {mode});
};
