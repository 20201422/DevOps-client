const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
})
//
// module.exports = {
//     devServer: {
//         proxy: {
//             '/api': {
//                 target: 'http://localhost:9090',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/api': ''
//                 }
//             }
//         }
//     },
//     lintOnSave: false,
// }
// vue.config.js
// module.exports = {
//     devServer: {
//         proxy: {
//             '/api': {
//                 target: 'http://localhost:9090',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/api': ''
//                 }
//             }
//         },
//         lintOnSave: false
//     }
// };

