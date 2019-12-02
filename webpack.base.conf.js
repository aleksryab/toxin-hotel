const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const globImporter = require('node-sass-glob-importer');

const devMode = process.env.NODE_ENV !== 'production';
const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
};

// Pages const for HtmlWebpackPlugin
const fs = require('fs');
const PAGES_DIR = `${PATHS.src}/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(file => file.endsWith('.pug'));


module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    main: `${PATHS.src}/index.js`,
    ui: `${PATHS.src}/scss/ui.scss`

  },
  output: {
    path: PATHS.dist,
    filename: 'js/[name].js',
    // publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },{
      test: /\.pug$/,
      loader: 'pug-loader',
      options: {
        pretty: true,
        self: true
      }
    },{
      test: /\.(scss|sass)$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {sourceMap: true}
        }, {
          loader: 'postcss-loader',
          options: {sourceMap: true, config: {path: './postcss.config.js'}}
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            sassOptions: {
              importer: globImporter()
            }
          }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader', {
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
          options: {sourceMap: true}
        }, {
          loader: 'postcss-loader',
          options: {sourceMap: true, config: {path: './postcss.config.js'}}
        }
      ]
    }, {
      test: /\.(png|jpe?g|gif|svg)$/i,
      exclude: /fonts/,
      loader: 'file-loader',
      options: {
        name: 'img/[name].[ext]',
      }
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      include: /fonts/,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]',
        publicPath: '../'
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.pug', '.scss', '.sass', '.gif', '.png', '.jpg', '.jpeg', '.svg']
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: 'img', ignore: '_dev/**/*'},
      { from: `${PATHS.src}/static`, to: '' }
    ]),
    ...PAGES.map(page => new HtmlWebpackPlugin({
      getData: () => {
       try {
         return JSON.parse(fs.readFileSync(`${PAGES_DIR}/data/${page.replace(/\.pug/,'')}.json`, 'utf8'));
       } catch (e) {
         console.warn(`data.json was not provided for page`);
         return {};
       }
     },
       template: `${PAGES_DIR}/${page}`,
       filename: `./${page.replace(/\.pug/,'.html')}`,
       inject: devMode,
       minifyminify: false,
     }))
  ]
};

