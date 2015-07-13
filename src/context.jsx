/* jshint node: true, esnext: true, browser: true */
"use strict";

var React = require('react');



var fakeAdClasses = 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links';
var fakeAdStyles = {
  width: '1px !important',
  height: '1px !important',
  position: 'absolute !important',
  left: '-10000px !important',
  top: '-1000px !important',

}


var context = function(Component) {

  var Context = React.createClass({

    getInitialState: function() {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        focus: document.hasFocus(),
        scroll: window.scrollY,
        adBlock: false
      };
    },

    childContextTypes: {
      pointer: React.PropTypes.string,
      density: React.PropTypes.number,
      width: React.PropTypes.number,
      height: React.PropTypes.number,
      language: React.PropTypes.string,
      focus: React.PropTypes.bool,
      scroll: React.PropTypes.number,
      adBlock: React.PropTypes.bool
    },

    getChildContext: function() {
      return {
        pointer: (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) ? 'touch' : 'mouse',
        density: window.devicePixelRatio,
        width: this.state.width,
        height: this.state.height,
        language: window.navigator.userLanguage || window.navigator.language,
        focus: this.state.focus,
        scroll: this.state.scroll,
        adBlock: this.state.adBlock
      };
    },

    componentDidMount: function() {
      window.addEventListener('resize', this.handleResize, false);
      window.addEventListener('focus', this.handleFocus, false);
      window.addEventListener('blur', this.handleFocus, false);
      window.addEventListener('scroll', this.handleScroll, false);

      this.checkForAdBlock();
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

    checkForAdBlock: function(){
      var ad = React.findDOMNode( this.refs.fakeAd );

      // https://github.com/sitexw/FuckAdBlock/blob/master/fuckadblock.js
      if (window.document.body.getAttribute('abp') !== null ||
          ad.offsetParent === null ||
          ad.offsetHeight == 0 ||
          ad.offsetLeft == 0 ||
          ad.offsetTop == 0 ||
          ad.offsetWidth == 0 ||
          ad.clientHeight == 0 ||
          ad.clientWidth == 0 ) {
            this.setState({ adBlock: true });
          }

      if (window.getComputedStyle !== undefined) {
    	  var adStyles = window.getComputedStyle(ad, null);

        if (adStyles.getPropertyValue('display') == 'none' ||
            adStyles.getPropertyValue('visibility') == 'hidden') {
    		      this.setState({ adBlock: true });
    		}
      }

      console.log(ad);
    },

    render: function(){
      // console.log(window);
      return (
        <div>
          <div className={ fakeAdClasses } style={ fakeAdStyles } ref="fakeAd" />
          <Component {...this.props} />
        </div>
      )
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
    scroll: React.PropTypes.number,
    adBlock: React.PropTypes.bool
  };
};

module.exports = context;
