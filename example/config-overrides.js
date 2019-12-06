// touch config-overrides.js && yarn add react-app-rewired -D
// "start": "react-app-rewired start"
const path = require('path');
process.env.INLINE_RUNTIME_CHUNK = 'false';

const pwd = (...args) => path.resolve(__dirname, '../', ...args);

module.exports = {
  webpack: function(config, env) {
    config.resolve.plugins = [config.resolve.plugins[0]];
    // const babel = config.module.rules[1];
    // babel.include = [/(bdc-components)/, babel.include];

    // config.externals = {
    //   immer: 'immer',
    // };
    config.optimization.splitChunks = {
      chunks: 'all', // all, async, initial
      name: false,
      minSize: 0,
      maxAsyncRequests: 5,
      cacheGroups: {
        // 编译成单个文件
        vendor_src: {
          test: /.*/,
          name: 'src',
        },
        // // 有意义的首屏资源，首屏相关页面+组件+容器+排除大组件、大容器
        // vendor_FMP: {
        //   test: /(pages\/(Login|Learn|LearnDetail)|components\/(?!Null)|containers\/(?!BigContainers)|actions\/(?!BigActions))/,
        //   name: 'fmp',
        // },
      },
    };
    return config;
  },
  jest: function(config) {
    return config;
  },
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      return config;
    };
  },
  paths: function(paths, env) {
    return paths;
  },
};
