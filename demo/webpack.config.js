const path = require('path');

module.exports = {
    devtool: "source-map",
    entry: [
        '@babel/polyfill',
        'webpack-dev-server/client?http://0.0.0.0:3000',
        __dirname + '/index.js'
    ],
    output: {
        filename: 'react-bash.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    }
};
