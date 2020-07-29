const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    mode: 'development',
    target: 'web',
    devServer: {
      contentBase: path.join(__dirname, 'dist')
    },
    entry: {
      bundle: [
        './public/index.js'
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist/js')
    },
    module: {
      rules: [
        // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
        { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
        // addition - add source-map support
        { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" },
        // {
        //   test: /\.tsx?$/,
        //   use: 'ts-loader',
        //   exclude: /node_modules/,
        // },
        // {
        //   test: /\.jsx?$/,
        //   exclude: /node_modules/,
        //   use: {
        //     loader: 'babel-loader'
        //   }
        // },
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
    },
    // resolves error in finding React, React Dom, and others on build
    externals: {
      "react": "React",
      "react-dom": "ReactDOM",
    },
    // addition - add source-map support
    devtool: "source-map",
    plugins: [
         // will automatically inject bundle js into ./dist/index.html
         new HTMLWebpackPlugin({
             template: './public/index.html', //source
             filename: 'index.html'  //destination
         })
    ]
  }
]
