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


module.exports = context(Root);
