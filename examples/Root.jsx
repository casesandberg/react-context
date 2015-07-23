/* jshint node: true, esnext: true */
"use strict";

var React = require('react');
var context = require('react-context');

var Child = require('./Child');


var Root = React.createClass({

  render(){
    return <Child />
  }
});

// Wrap your top-most export
module.exports = context(Root);
