const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

// index.js文件只从app.js文件中导入实际应用，然后启动应用。
const server = http.createServer(app)

server.listen(config.PORT, () => {
    //logger-module的函数info用于控制台打印输出
    logger.info(`Server running on port ${config.POORT}`)
})