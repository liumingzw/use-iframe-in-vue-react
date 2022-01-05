const path = require('path');
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    mode: "development",
    // mode: "production",
    devtool: 'source-map',
    entry: "./src/index.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: {
                    loader: 'vue-loader',
                }
            },
            {
                test: /\.(css|less)$/,
                include: /node_modules/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                }],
            },
            {
                test: /\.(css|less)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        },
                    }
                }],
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    devServer: {
        // webpack-dev-server 启动后，将 ./build 作为服务器根目录
        // 因此访问 http://localhost:9000/ 是打开 ./build/index.html
        contentBase: path.join(__dirname, "build"),
        port: 9000
    }
};