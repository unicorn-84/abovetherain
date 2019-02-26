const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;
const AddAssetPlugin = require('add-asset-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const { options, pages } = require('./src/data');

let build;
const server = process.env.npm_config_server;
const seo = process.env.npm_config_seo;
if (process.env.npm_lifecycle_event === 'webpack:dev') {
  build = 'dev';
} else if (process.env.npm_lifecycle_event === 'webpack:prod') {
  build = 'prod';
}

module.exports = {
  entry: {
    index: './src/pages/index/index',
    services: './src/pages/services/services',
    service: './src/pages/services/service/service',
    schedule: './src/pages/schedule/schedule',
    events: './src/pages/events/events',
    event: './src/pages/events/event/event',
    team: './src/pages/team/team',
    coaches: './src/pages/coaches/coaches',
    coach: './src/pages/coaches/coach/coach',
    gallery: './src/pages/gallery/gallery',
    contacts: './src/pages/contacts/contacts',
    requisites: './src/pages/requisites/requisites',
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
  externals: {
    jquery: 'jQuery',
    Util: 'util.js',
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
    new MiniCssExtractPlugin({
      filename: build === 'prod'
        ? 'styles/[name].[contenthash:4].css'
        : 'styles/[name].css',
    }),
    new FileManagerPlugin({
      onEnd: {
        delete: [
          path.resolve(__dirname, 'dist/**/inline*.*'),
        ],
      },
    }),
    new PurgecssPlugin({
      paths: glob.sync(path.resolve(__dirname, 'src/**/*.{pug,js}'), { nodir: true }),
      whitelistPatterns: [/carousel/, /collapsing/, /^slb/],
      rejected: true,
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
      'bootstrap.scss': path.resolve(__dirname, 'node_modules/bootstrap/scss/bootstrap.scss'),
      'style.scss': path.resolve(__dirname, 'src/styles/style.scss'),
      carousel: path.resolve(__dirname, 'node_modules/bootstrap/js/dist/carousel.js'),
      collapse: path.resolve(__dirname, 'node_modules/bootstrap/js/dist/collapse.js'),
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
        inject: false,
        vars: {
          build,
          server,
          seo,
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

(function makeSeoStuff() {
  if (seo) {
    module.exports.plugins.push(
      new RobotstxtPlugin({
        policy: [
          {
            userAgent: '*',
            disallow: server === 'prod' ? null : '/',
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
          from: './src/data/trash',
          to: './[name].[ext]',
          toType: 'template',
        },
      ]),
    );
  } else if (!seo && server === 'dev') {
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
  }
}());

(function splitChunks() {
  module.exports.optimization.splitChunks = {
    cacheGroups: {
      default: false,
      vendors: false,
      common: {
        name: 'common',
        minChunks: Object.keys(module.exports.entry).length,
        chunks: 'all',
      },
      // inline: {
      //   name: false,
      //   test: /inline/,
      //   chunks: 'initial',
      //   enforce: true,
      // },
    },
  };
}());
