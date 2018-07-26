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
      index: './pages/index',
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
      ],
    },
    plugins: [
      new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
      new AsyncChunkNames(),
      new CopyWebpackPlugin([
        {
          from: './scripts',
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
      new CopyWebpackPlugin([
        {
          from: './fonts',
          to: 'fonts/[path][name].[ext]',
          toType: 'template',
        },
      ]),
      new CopyWebpackPlugin([
        {
          from: './images',
          to: 'images/[path][name].[ext]',
          toType: 'template',
        },
      ]),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './pages/index/index.pug',
        name: 'index',
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
    return merge(commonConfig, productionConfig, { mode });
  }
  return merge(commonConfig, developmentConfig, { mode });
};
