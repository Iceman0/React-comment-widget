const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    watch: true,
    watchOptions: {
        poll: true,
        ignored: './node_modules/'
    },
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: "build.js",
        path: path.join(__dirname, './build')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/react"
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template: 'index.html'
        })
    ]

};