/* jshint node: true, esnext: true, browser: true */
"use strict";

var React = require('react');



var context = function(Component) {

  var Context = React.createClass({

    getInitialState: function() {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        focus: document.hasFocus(),
        scroll: window.scrollY
      };
    },

    childContextTypes: {
      pointer: React.PropTypes.string,
      density: React.PropTypes.number,
      width: React.PropTypes.number,
      height: React.PropTypes.number,
      language: React.PropTypes.string,
      focus: React.PropTypes.bool,
      scroll: React.PropTypes.number
    },

    getChildContext: function() {
      return {
        pointer: (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) ? 'touch' : 'mouse',
        density: window.devicePixelRatio,
        width: this.state.width,
        height: this.state.height,
        language: window.navigator.userLanguage || window.navigator.language,
        focus: this.state.focus,
        scroll: this.state.scroll
      };
    },

    componentDidMount: function() {
      window.addEventListener('resize', this.handleResize, false);
      window.addEventListener('focus', this.handleFocus, false);
      window.addEventListener('blur', this.handleFocus, false);
      window.addEventListener('scroll', this.handleScroll, false);
    },

    componentWillUnmount: function() {
      window.removeEventListener('resize', this.handleResize, false);
      window.removeEventListener('focus', this.handleFocus, false);
      window.removeEventListener('blur', this.handleFocus, false);
      window.removeEventListener('scroll', this.handleScroll, false);
    },

    handleScroll: function() {
      this.setState({
        scroll: window.scrollY
      });
    },

    handleResize: function() {
      this.setState({
        width: window.innerWidth, // Add more accurate info here
        height: window.innerHeight // Add more accurate info here
      });
    },

    handleFocus: function(e){
      this.setState({
        focus: e.type === 'focus' ? true : false
      });
    },

    render: function(){
      // console.log(window);
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
    language: React.PropTypes.string,
    focus: React.PropTypes.bool,
    scroll: React.PropTypes.number
  };
};

module.exports = context;
