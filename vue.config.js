const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack')
const path = require("path");

// Generate pages object
const pagesObj = {};

const chromeName = ["popup", "options"];

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.js`,
    template: "public/index.html",
    filename: `${name}.html`
  };
});

const plugins =
  process.env.NODE_ENV === "production" ? [{
    from: path.resolve("src/manifest.production.json"),
    to: `${path.resolve("dist")}/manifest.json`
  }] : [{
    from: path.resolve("src/manifest.development.json"),
    to: `${path.resolve("dist")}/manifest.json`
  }];

module.exports = {
  pages: pagesObj,
  configureWebpack: {
    plugins: [
      CopyWebpackPlugin(plugins),
      // // keep module.id stable when vendor modules does not change
      // new webpack.HashedModuleIdsPlugin(),
      // // enable scope hoisting
      // new webpack.optimize.ModuleConcatenationPlugin(),
    ]
  }
};