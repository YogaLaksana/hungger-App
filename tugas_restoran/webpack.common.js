/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new GenerateSW({

      swDest: 'sw.bundle.js',

      runtimeCaching: [

        {

          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/list'),

          handler: 'StaleWhileRevalidate',

          options: {

            cacheName: 'restaurant-api',

          },

        },

        {

          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/small/'),

          handler: 'StaleWhileRevalidate',

          options: {

            cacheName: 'restaurant-image-api',

          },

        },

        {

          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/'),

          handler: 'StaleWhileRevalidate',

          options: {

            cacheName: 'restaurant-detail',

          },

        },

      ],

    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
  ],
};
