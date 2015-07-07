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
      density: React.PropTypes.number,
      width: React.PropTypes.number,
      height: React.PropTypes.number,
      language: React.PropTypes.string
    },

    getChildContext: function() {
      return {
        pointer: 'mouse',
        density: window.devicePixelRatio,
        width: this.state.width,
        height: this.state.height,
        language: window.navigator.userLanguage || window.navigator.language
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
      console.log(window);
      console.log();
      return React.createElement(Component, this.props);
    }
  });

  return Context;
};

context.types = function(){
  return {
    pointer: React.PropTypes.string,
    density: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    language: React.PropTypes.string
  };
};

module.exports = context;
