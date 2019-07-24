const path = require("path");

var config = {
  entry: path.resolve(path.join(__dirname, "src/index.js")),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  externals: {
    react: "commonjs react"
  }
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "source-map";
    config.mode = "development";
  }
  return config;
};
