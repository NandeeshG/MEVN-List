try {
    const dotenv = require('dotenv')
    dotenv.config({ path: '../.env' })
    console.log('Ran dotenv in client!!', process.env.SERVER_PORT)
} catch (e) {
    console.log(e)
}

module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: `http://localhost:${process.env.SERVER_PORT}`,
                },
            },
        },
    },
}
