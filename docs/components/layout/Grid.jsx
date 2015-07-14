/* jshint node: true, esnext: true */
"use strict";

var React = require('react');
var ReactCSS = require('reactcss');
var context = require('react-context');

class Grid extends ReactCSS.Component {



  constructor() {
    super();
  }

  classes() {
    return {
      'default': {
        grid: {
          position: 'relative'
        },
        left: {
          position: 'absolute',
          width: '130px'
        },
        main: {
          paddingLeft: '150px'
        }
      },
      'no-sidebar': {
        left: {
          display: 'none'
        },
        main: {
          paddingLeft: '0'
        }
      }
    };
  }

  styles() {
    return this.css({
      'no-sidebar': this.context.width < 500
    });
  }

  render(){
    return (
      <div is="grid">
        <div is="left">{ this.props.children[0] }</div>
        <div is="main">{ this.props.children[1] }</div>
      </div>
    )
  }
};

Grid.contextTypes = context.subscribe(['width']);

module.exports = Grid;
