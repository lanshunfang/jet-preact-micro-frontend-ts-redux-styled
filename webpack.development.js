/**
  Copyright (c) 2015, 2022, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
require('dotenv').config()

const path = require('path');
const ojetUtils = require('../util');
const webpackUtils = require('./utils');
const common = require('./webpack.common.js');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PreactRefreshPlugin = ojetUtils.requireLocalFirst('@prefresh/webpack');
const { merge } = ojetUtils.requireLocalFirst('webpack-merge');
const configPaths = ojetUtils.getConfiguredPaths();

const projectRoot = process.cwd();

const packageJson = require(`${projectRoot}/package.json`)

const servePort = process.env.PORT || 8082;

const moduleName = 'RemoteJetPreactApp';

let mergedConfig = merge(common, {
  mode: 'development',

  output: {
    filename: '[name].bundle.js',
    publicPath: `http://localhost:${servePort}/`,
  },
  // devtool: 'eval-cheap-module-source-map',

  // Recommend for for Dev
  // devtool: 'eval-source-map',

  // Recommend for production
  devtool: 'source-map',

  devServer: {
    static: [
      {
        directory: path.join(webpackUtils.oracleJetDistCssPath, 'redwood'),
        publicPath: `/${configPaths.src.styles}/redwood`,
      },
      {
        directory: path.join(webpackUtils.oracleJetDistCssPath, 'common'),
        publicPath: `/${configPaths.src.styles}/common`,
      },
    ],
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    // compress: true,
    port: servePort,
    open: true,
    hot: true,
  },
  plugins: [
    new PreactRefreshPlugin(),

    new ModuleFederationPlugin({
      name: moduleName,
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteJetPreactApp': `${projectRoot}/src/bootstrap`
      },
      shared: packageJson.dependencies
    }),

  ],
});

let plugins = mergedConfig.plugins
  .filter(plugin => !(plugin instanceof HtmlWebpackPlugin));

plugins.push(
  new HtmlWebpackPlugin({
    template: path.resolve(configPaths.src.common, 'index.html'),
    // tmp fix from: https://github.com/webpack/webpack-dev-server/issues/3038
    excludeChunks: [moduleName],
  },
  )
);

mergedConfig.plugins = plugins;

module.exports = mergedConfig;