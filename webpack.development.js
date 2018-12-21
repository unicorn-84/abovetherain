module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    stats: 'errors-only',
    overlay: true,
    host: process.env.HOST,
    port: process.env.PORT || 8000,
  },
  module: {
    rules: [
      // Images
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      // CSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
