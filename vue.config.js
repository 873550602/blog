module.exports = {
  publicPath: '/',
  transpileDependencies: ['vuetify'],
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

