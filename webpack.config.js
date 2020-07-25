var webpack = require('webpack');

var env = process.env.NODE_ENV;
var config = {
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    },
    module: {
        rules: [
            // // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
            // { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
            // // addition - add source-map support
            // { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" },
            // {
            //   test: /\.tsx?$/,
            //   use: 'ts-loader',
            //   exclude: /node_modules/,
            // },
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader'
              }
            },
            {
              test: /\.(png|svg|jpg|gif|pdf)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]'
                  }
                }
              ]
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            }
          ]
        // loaders: [
        //     { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
        // ]
    },
    output: {
        library: 'ReactBash',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    ]
};

if (env === 'production') {
    config.plugins.push(
        new config.optimization.minimize({
            compressor: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                warnings: false
            }
        })
    )
}

module.exports = config;
