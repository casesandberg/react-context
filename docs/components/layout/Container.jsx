/* jshint node: true, esnext: true */
"use strict";

var React = require('react');
var ReactCSS = require('reactcss');

module.exports = class Container extends ReactCSS.Component {

  classes() {
    return {
      'default': {
        container: {
          maxWidth: '720px',
          padding: '0 20px',
          margin: '0 auto'
        }
      }
    };
  }

  render(){
    return <div is="container">{ this.props.children }</div>
  }
};
