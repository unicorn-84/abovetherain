const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { each } = require('underscore');
const options = require('./src/database/options');
const pages = require('./src/database/pages');

let prod;
if (process.env.npm_lifecycle_event === 'prod') {
  prod = true;
}

module.exports = {
  entry: {
    main: './src/main',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: prod ? 'scripts/[name].[contenthash:4].js' : 'scripts/[name].js',
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
      // SCSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: prod ? MiniCssExtractPlugin.loader : 'style-loader',
            options: prod ? {
              publicPath: '../',
            } : {},
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
                  cssnano: prod ? {
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
              name: prod ? '[path][name].[hash:4].[ext]' : '[path][name].[ext]',
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
              name: prod ? '[path][name].[hash:4].[ext]' : '[path][name].[ext]',
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
      filename: prod ? 'styles/[name].[contenthash:4].css' : 'styles/[name].css',
    }),
    new CopyPlugin([
      {
        from: 'src/database/events.json',
        to: 'events.json',
        toType: 'file',
      },
    ]),
    new CopyPlugin([
      {
        from: 'src/js/scheduler.min.js',
        to: 'scripts/scheduler.min.js',
        toType: 'file',
      },
    ]),
  ],
  devtool: prod ? 'none' : 'eval',
  optimization: {
    splitChunks: false,
  },
};

(function createPages() {
  each(pages, (page) => {
    module.exports.plugins.push(
      new HtmlWebpackPlugin({
        name: page.name,
        filename: page.link,
        template: page.template,
        vars: {
          prod,
          options,
          page,
        },
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
