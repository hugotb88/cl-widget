const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
  entry: {
    entry: './src/index.js',
  },
  output: {
    filename: "build/static/js/WidgetCL.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=100000' 
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin()]
  },
}