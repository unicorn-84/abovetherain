const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const cssnano = require('cssnano');
const glob = require('glob');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;
const AddAssetPlugin = require('add-asset-webpack-plugin');
const { common } = require('./src/data');

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
        test: /\.(png|jpg|gif|svg|ico)$/,
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
    new SitemapPlugin(common.url, ['/'], {
      lastMod: true,
      changeFreq: 'always',
      priority: '1',
    }),
    new RobotstxtPlugin({
      policy: [
        {
          userAgent: '*',
          disallow: '',
          crawlDelay: 1,
        },
      ],
      sitemap: `${common.url}/sitemap.xml.gz`,
      host: common.url,
    }),
    new AddAssetPlugin('humans.txt', `/* TEAM */\nDeveloper: ${common.author}\nSite: ${common.author_email}\nLocation: Saint Petersburg, Russia\n\n/* SITE */\nLast update: ${new Date().toLocaleDateString(common.lang, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })}\nLanguage: Russian\nStandards: HTML5, CSS3, ES6\nIDE: WebStorm`),
  ],
};
