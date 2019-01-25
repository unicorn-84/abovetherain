// If your plugin is direct dependent to the html webpack plugin:
const HtmlWebpackPlugin = require('html-webpack-plugin');
// If your plugin is using html-webpack-plugin as an optional dependency
// you can use https://github.com/tallesl/node-safe-require instead:
// const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');

function Plugin() {}

Plugin.prototype.apply = function apply(compiler) {
  compiler.hooks.compilation.tap('Plugin', (compilation) => {
    compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync('Plugin', (data, cb) => {
      if (data.outputName === 'coaches/aleksandrUshakov.html') {
        console.log(data.assets);
        // console.log(compilation.assets);
      }
      cb(null, data);
    });
  });
};

module.exports = Plugin;
