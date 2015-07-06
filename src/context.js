/* jshint node: true, esnext: true */
"use strict";

var React = require('react');

module.exports = function(Component) {
  var Context = React.createClass({

    render() {
      return React.createElement(Component, this.props);
    }
  });
  return Context;
};
