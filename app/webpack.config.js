const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
    assetModuleFilename: "images/[hash][ext][query]", // for images
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, "./public/files"),
          to: "files"
        }
      ],
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, "public"), // serve static files like PDFs here
        publicPath: "/",
      },
      {
        directory: path.resolve(__dirname, "../public"), // serve files from parent public folder
        publicPath: "/",
      },
      {
        directory: path.resolve(__dirname, "dist"), // serve bundled files here
        publicPath: "/",
      },
    ],
    port: 9000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.pdf$/i,
        type: "asset/resource",
        generator: {
          filename: "files/[name][ext]", // PDFs go to /files folder inside dist on build
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};