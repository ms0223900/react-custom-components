/* eslint-disable no-unused-vars */
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // mode: 'development',
  entry: {
    app: ['./src/index.js'],
    vendors: ['react'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build/'),
    publicPath: '/',
  },
  target: 'web',
  module: {
    rules: [
      { 
        test: /\.(jsx|js)$/, 
        exclude: /node_modules/, use: { 
          loader: 'babel-loader', 
          options: { presets: ['@babel/preset-react'] } }
      },
      { test: /.js$/, exclude: /node_modules/, use: { 
        loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }
      },
      { test: /\.css$/, 
        exclude: /node_modules/, 
        use: ['style-loader', 'css-loader'],
      },
      { test: /\.(scss|sass)$/,
        exclude: /node_modules/, 
        use: ['style-loader','css-loader','sass-loader'],
        include: path.resolve(__dirname, '../'),
      },
      {
        enforce: 'pre', //enforce it check code previously
        test: /\.(jsx|js)$/, 
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: 'file-loader'
      },	
    ],
  },
  optimization: { //split the static or larger code to vendor file
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'custom-components',
      template: './src/template.html'
    }),
    new webpack.DefinePlugin({
      // NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      // GRAPHQL_API: JSON.stringify('http://10.40.201.178:4005/')
    })
  ],
  stats: 'errors-only',
  node: {
    fs: 'empty',
  },
  // plugins: [new HtmlWebpackPlugin()]
}