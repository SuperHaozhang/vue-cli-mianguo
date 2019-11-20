var path = require('path')

module.exports = {
    devServer:{
        port:8889,
        contentBase:path.join(__dirname,'static')
    }
}