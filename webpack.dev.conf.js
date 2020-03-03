const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  watch: true,
  devServer: {
    //contentBase: './dist',
    port: 8081,
    open: true,
    hot: true,
    inline: true,
    overlay: {
      warnings: true,
      errors: true
    },
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
