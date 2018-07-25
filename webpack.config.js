const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const productionConfig = require('./webpack.production');
const developmentConfig = require('./webpack.development');

const commonConfig = merge([
  {
    context: path.resolve(__dirname, 'src'),
    entry: {
      index: './index',
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
          from: './styles',
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
