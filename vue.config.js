module.exports = {
  publicPath: '/',
  transpileDependencies: ['vuetify'],
  outputDir: "dist",
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compiler = require('vue-template-babel-compiler')
        return options
      })
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {
          '/api': '/',
        },
      },
    },
  },
};

