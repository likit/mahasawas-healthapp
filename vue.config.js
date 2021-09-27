module.exports = {
    configureWebpack: () => {
        return {
            devServer: {
                disableHostCheck: true,
            }
        }
    }
}