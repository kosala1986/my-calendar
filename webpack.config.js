const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: ["./src/index.js"],
    mode: 'production',
    output: {
        path: __dirname + '/dist',
        filename: "./main.js"
    },
    watch: true,
    devtool: false,
    performance: { hints: false },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(sass|scss)$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    }
}