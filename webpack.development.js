module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    stats: 'errors-only',
    open: true,
    overlay: true,
    host: process.env.HOST,
    port: process.env.PORT,
  },
  module: {
    rules: [
      // Images
      {
        test: /\.(png|jpg|gif|svg)$/,
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
