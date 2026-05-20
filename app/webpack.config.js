const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => ({
  mode: argv && argv.mode ? argv.mode : "production",
  entry: "./src/index.tsx",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
    assetModuleFilename: "images/[hash][ext][query]",
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
        },
        {
          from: path.resolve(__dirname, "../staticwebapp.config.json"),
          to: "staticwebapp.config.json"
        }
      ],
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, "public"),
        publicPath: "/",
      },
      {
        directory: path.resolve(__dirname, "../public"),
        publicPath: "/",
      },
      {
        directory: path.resolve(__dirname, "dist"),
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
          filename: "files/[name][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          reuseExistingChunk: true,
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
        // Separate chunk for large libraries
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          priority: 20,
        },
        framerMotion: {
          test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
          name: 'framer-motion',
          priority: 15,
        },
      },
    },
    runtimeChunk: "single",
    minimize: argv.mode === 'production',
    usedExports: true, // Tree shaking
  },
  performance: {
    hints: argv.mode === 'production' ? 'warning' : false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
