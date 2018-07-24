const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const cssnano = require('cssnano');
const glob = require('glob');

module.exports = {
  mode: 'production',
  output: {
    filename: './scripts/[name].[hash].js',
    chunkFilename: './scripts/[name].[hash].js',
  },
  devtool: false,
  module: {
    rules: [
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
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[hash].[ext]',
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.pug',
      minify: {
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
    new PurgecssPlugin({
      paths: glob.sync(path.resolve(__dirname, 'src/**/*'), { nodir: true }),
    }),
  ],
};
