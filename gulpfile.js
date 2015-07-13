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
          loaders: ['react-hot-loader']
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
        'react-context': path.resolve(__dirname, './src/context.jsx'),
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

gulp.task('default', ['docs']);
