const webpack = require('webpack')
const path = require('path')

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')

// Clean
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        app: [__dirname + '/src/index', 'jquery']
    },
    watch: true,
    output: {
        path: __dirname + '/public/js/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
        ,
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader'
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: __dirname + './node_modules/'
            }
            ,
            {
                test: /pixi\.js/,
                loader: 'expose-loader?PIXI'
            },
            {
                test: /phaser-split\.js$/,
                loader: 'expose-loader?Phaser'
            },
            {
                test: /p2\.js/,
                loader: 'expose-loader?p2'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([
            path.join(__dirname, 'public/js')
        ]),
    ]
}