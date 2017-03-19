const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: [
            path.join(__dirname, '../src/public/script/index.es'),

            path.join(__dirname, '../src/public/script/indexadd.js')
        ],
        tags: [
            path.join(__dirname, '../src/public/script/tags.es'),
        ]
    },
    output: {
        filename: 'public/script/[name]-[hash:5].js',
        path: path.join(__dirname, '../build/')
    },
    module: {
        loaders: [{
            test: /\.es$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-0']
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"dev"'
            }
        }),
        new LiveReloadPlugin({
            appendScriptTag: true
        }),
        new ExtractTextPlugin("public/css/[name]-[hash:5].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'public/script/common/vendor-[hash:5].min.js',
        }),
        new HtmlWebpackPlugin({ // Also generate a test.html
            filename: './views/layout.html',
            template: 'src/widget/layout.html',
            inject: false

        }),
        new HtmlWebpackPlugin({ // Also generate a test.html
            filename: './views/index.html',
            template: 'src/views/index.js',
            inject:false,
            chunks:['vendor','index','tags']
        }),
               new HtmlWebpackPlugin({
            template: 'src/widget/index.html',
            filename:'./widget/index.html',
             inject: false
        }),

    ]
};
