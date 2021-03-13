/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    index: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js",
    publicPath: "/TypingGame/",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    contentBase: "./dist", // Content base
    inline: true, // Enable watch and live reload
    host: "localhost",
    port: 8080,
    stats: "errors-only",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "babel-loader",
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
