const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const cssnano = require('cssnano');
const glob = require('glob');

module.exports = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash:4].js',
    chunkFilename: '[name].[contenthash:4].js',
  },
  devtool: false,
  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['syntax-dynamic-import'],
          },
        },
      },
      // Images
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash:4].[ext]',
            },
          },
        ],
      },
      // CSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /(node_modules|bower_components)/,
          priority: 1,
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          chunks: 'all',
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        uglifyOptions: {
          warnings: false,
          output: {
            beautify: false,
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: {
            removeAll: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:4].css',
    }),
    new PurgecssPlugin({
      paths: glob.sync(path.resolve(__dirname, 'src/**/*'), { nodir: true }),
    }),
  ],
};
