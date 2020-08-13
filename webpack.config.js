const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const fs = require('fs');
const extractPlugin = new ExtractTextPlugin({
    filename: 'index.css'
})
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        // publicPath: "/dist"
    },
    mode: "development",
    // devServer: {
    //     contentBase: './dist/',
    //     https: {
    //         key: fs.readFileSync('./key.pem'),
    //         cert: fs.readFileSync('./cert.pem'),
    //         ca: fs.readFileSync('./cert.pem')
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpeg|jpg|png|ico|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                        }
                    }
                ]
            },
        ]
    },
    optimization: {
        minimize: true
    },
    plugins: [
        extractPlugin,
        new HtmlWebpackPlugin({ template: 'src/index.html'}),
        new CleanWebpackPlugin(),
    ]
}