const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { options, pages } = require('./src/data');

let build;
const server = process.env.npm_config_server;
if (process.env.npm_lifecycle_event === 'webpack:dev') {
  build = 'dev';
} else if (process.env.npm_lifecycle_event === 'webpack:prod') {
  build = 'prod';
}

module.exports = {
  entry: {
    main: './src/main',
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
      // SCSS
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
      // Video
      {
        test: /\.(mp4)$/,
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
      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context: path.resolve(__dirname, 'src'),
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
    new MiniCssExtractPlugin({
      filename: build === 'prod'
        ? 'styles/[name].[contenthash:4].css'
        : 'styles/[name].css',
    }),
  ],
  optimization: {
    noEmitOnErrors: true,
  },
  devServer: {
    stats: 'errors-only',
    overlay: true,
    compress: true,
    host: options.hostLocal,
    port: options.portLocal,
  },
  resolve: {
    alias: {
      lazy: path.resolve(__dirname, 'node_modules/jquery-lazy/jquery.lazy.js'),
    },
  },
};

(function createPages() {
  Object.keys(pages).forEach((page) => {
    module.exports.plugins.push(
      new HtmlWebpackPlugin({
        name: pages[page].name,
        filename: pages[page].link,
        template: pages[page].template,
        vars: {
          build,
          server,
        },
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
