var gulp = require('gulp');

var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');



config = {
  docs: {
    entry: ['webpack-dev-server/client?http://localhost:9100', 'webpack/hot/dev-server', './docs/index.js'],
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: 'http://localhost:9100/build/'
    },
    module: {
      loaders: [
        {
          exclude: /node_modules/,
          test: /\.js$/,
          loaders: ['react-hot-loader', 'babel-loader']
        }, {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loaders: ['react-hot-loader', 'jsx-loader', 'babel-loader', 'react-map-styles']
        }, {
          test: /\.css$/,
          loaders: [ 'style-loader', 'css-loader' ]
        }, {
          test: /\.md$/,
          loaders: [ 'html-loader' ]
        }
      ]
    },
    resolve: {
      alias: {
        'react-context': path.resolve(__dirname, './src/context'),
        'react': path.resolve(__dirname, './node_modules/react')
      },
      extensions: ['', '.js', '.jsx'],
      fallback: [ path.resolve(__dirname, './modules') ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({ quiet: true }),
      new webpack.NoErrorsPlugin()
    ],
    devtool: 'eval',
    quiet: true
  }
};

gulp.task('docs', function(done) {
  done();
  return new WebpackDevServer(webpack(config.docs), {
    publicPath: config.docs.output.publicPath,
    hot: true,
    stats: {
      cached: false,
      cachedAssets: false,
      exclude: ['node_modules', 'components']
    }
  }).listen(9100, 'localhost', function(err, result) {
    if (err) {
      return console.log(err);
    } else {
      return console.log('webpack dev server listening at localhost:9100');
    }
  });
});


gulp.task('static', function(done){

  prodConfig = {
    entry: ['./docs/index.js'],
    output: {
      path: path.join(__dirname, '/build'),
      filename: 'bundle.js',
      publicPath: '/build/'
    },
    module: {
      loaders: [{
          exclude: /node_modules/,
          test: /\.js$/,
          loaders: ['babel-loader']
        }, {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loaders: ['jsx-loader', 'babel-loader', 'react-map-styles']
        }, {
          test: /\.css$/,
          loaders: [ 'style-loader', 'css-loader' ]
        }, {
          test: /\.md$/,
          loaders: [ 'html-loader' ]
        }
      ]
    },
    resolve: {
      alias: {
        'react-context': path.resolve(__dirname, './src/context'),
        'react': path.resolve(__dirname, './node_modules/react')
      },
      extensions: ['', '.js', '.coffee', '.jsx', '.cjsx'],
      fallback: [path.resolve(__dirname, './modules')]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      // new webpack.optimize.UglifyJsPlugin({
      //   mangle: {
      //     except: ['exports', 'require']
      // },
      //   sourceMap: false,
      //   output: {comments: false}
      // }),
      // new webpack.optimize.CommonsChunkPlugin("common.js")
    ],
    devtool: 'eval',
    quiet: true
  };

  webpack(prodConfig, function(err, stats){

    if(err) {
      throw new Error(err);
    }

    done();
  });
});


gulp.task('default', ['docs']);
