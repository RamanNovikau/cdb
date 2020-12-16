const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'Test',
        }),
        // new CopyPlugin({
        //   patterns: [
        //     {
        //       from: 'src/assets/',
        //       to: 'assets/[path][name].[ext]',
        //       toType: 'template',
        //       globOptions: {
        //         ignore: [
        //           '/*.ico',
        //           '/subdir/**',
        //         ],
        //       },
        //     },
        //   ],
        // }),
    ],
};