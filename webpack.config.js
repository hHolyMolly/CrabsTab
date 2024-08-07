const PATH = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PostcssPresetEnv = require('postcss-preset-env');
const TailwindCss = require('tailwindcss');

const PORT = 3000;

// App main folders
const buildFolder = 'build';
const publicFolder = 'public';
const srcFolder = 'src';

// App paths
const paths = {
  srcIndex: `./${srcFolder}/index.tsx`,

  publicIndex: `./${publicFolder}/index.html`,

  jsFilename: '[name].[contenthash].js',
  cssFilename: '[name].[contenthash].css',

  buildImgFolder: 'img',
  buildFontsFolder: 'fonts',
};

const mode = process.env.NODE_ENV || 'development';

const devMode = mode === 'development';

const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

const pathResolve = (p) => PATH.resolve(__dirname, p);

module.exports = {
  entry: ['@babel/polyfill', paths.srcIndex],

  mode,
  target,
  devtool,

  devServer: {
    historyApiFallback: true,
    static: {
      directory: buildFolder,
    },
    port: PORT,
    open: true,
    hot: true,
  },

  output: {
    filename: paths.jsFilename,
    path: pathResolve(buildFolder),
    clean: true,
    assetModuleFilename: 'assets/[hash][ext]',
  },

  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: paths.publicIndex,
      favicon: `./${publicFolder}/favicon.ico`,
    }),
    new MiniCssExtractPlugin({
      filename: paths.cssFilename,
    }),
  ],

  module: {
    rules: [
      // JavaScript + Jsx
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      // TypeScript
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },

      // Css
      {
        test: /\.(c|sa|sc)ss$/i,
        include: pathResolve(srcFolder),
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [PostcssPresetEnv, TailwindCss],
              },
            },
          },
          'sass-loader',
        ],
      },

      // Images
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: `${paths.buildImgFolder}/[hash][ext]`,
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 80,
              },
            },
          },
        ],
      },

      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: `${paths.buildFontsFolder}/[name][ext]`,
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@assets': pathResolve(`${srcFolder}/assets`),
      '@components': pathResolve(`${srcFolder}/components`),
      '@configs': pathResolve(`${srcFolder}/configs`),
      '@hooks': pathResolve(`${srcFolder}/hooks`),
      '@interfaces': pathResolve(`${srcFolder}/interfaces`),
      '@pages': pathResolve(`${srcFolder}/pages`),
      '@services': pathResolve(`${srcFolder}/services`),
      '@store': pathResolve(`${srcFolder}/store`),
      '@styles': pathResolve(`${srcFolder}/styles`),
      '@utils': pathResolve(`${srcFolder}/utils`),
    },
  },
};
