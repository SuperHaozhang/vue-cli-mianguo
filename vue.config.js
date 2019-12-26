var path = require('path')

module.exports = {
    devServer:{
        port:9090,
        open:true,
        /* 错误显示在页面中*/
        overlay:{
            warnings: false,
            error: true
        },
        /* 代理*/
        proxy:{
            '/api': {
                // 测试环境
                target: 'http://192.168.0.111:8989',  // 接口域名
                changeOrigin: true,  //是否跨域
            }
            },
/*        configureWebpack:{
            name:"project",
            resolve:{
                alias:{
                    '@':resolve('src'),
                    'views':resolve("src/views"),
                    'components':resolve("src/components"),
                    'utils':resolve('src/utils'),
                    'style':resolve('src/style')
                }
            }
        },*/
        contentBase:path.join(__dirname,'static')
    }
}
