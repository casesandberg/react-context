/* jshint node: true, esnext: true */
"use strict";

var React = require('react');



var context = function(Component) {

  var Context = React.createClass({

    getInitialState: function() {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    },

    childContextTypes: {
      pointer: React.PropTypes.string,
      pixelDensity: React.PropTypes.number,
      width: React.PropTypes.number,
      height: React.PropTypes.number
    },

    getChildContext: function() {
      return {
        pointer: 'mouse',
        pixelDensity: 1.5,
        width: this.state.width,
        height: this.state.height
      };
    },

    componentDidMount: function() {
      window.addEventListener('resize', this.handleResize, false);
    },

    componentWillUnmount: function() {
      window.removeEventListener('resize', this.handleResize, false);
    },

    handleResize: function() {
      this.setState({
        width: window.innerWidth, // Add more accurate info here
        height: window.innerHeight // Add more accurate info here
      });
    },

    render: function(){
      return React.createElement(Component, this.props);
    }
  });

  return Context;
};

context.types = function(){
  return {
    pointer: React.PropTypes.string,
    pixelDensity: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  };
};

module.exports = context;
