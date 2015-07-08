/* jshint node: true, esnext: true */
"use strict";

var React = require('react');
var context = require('react-context');

var Home = require('../home/Home');



class Root extends React.Component {

  render(){
    return <Home />
  }
}

module.exports = context(Root);
