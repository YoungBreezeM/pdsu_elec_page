/**
 * *@2019-11-07
 * *@author yqf
 * *@describe vue-cli 3.x配置文件
 */

const CompressionPlugin = require('compression-webpack-plugin'); //开启Gzip
const yml = require("js-yaml");
const fs = require("fs");
const {config}= yml.safeLoad(fs.readFileSync("./_config.yml", "utf-8"));
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")



config["configureWebpack"] =(cg)=>{
  if (process.env.NODE_ENV === 'production') {
    // 代码压缩
    cg.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            //生产环境自动删除console
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,
          parallel: true
        })
    );
    return {
      plugins: [
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/, //匹配文件名
          threshold: 10240,//对超过10k的数据压缩
          deleteOriginalAssets: false //不删除源文件
        })
      ]
    }
  }
};
config["chainWebpack"] = cg=>{
  if(process.env.NODE_ENV==="production"){
    if(process.env.npm_config_report){
      cg.plugin("webpack-bundle-analyzer")
          .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
          .end()

    }
  }
};
module.exports = config;

