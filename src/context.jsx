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

var contextTypes = {
  pointer: React.PropTypes.string,
  density: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  language: React.PropTypes.string,
  focus: React.PropTypes.bool,
  scroll: React.PropTypes.number,
  adBlock: React.PropTypes.bool,
  os: React.PropTypes.string,
  browser: React.PropTypes.string,
  browserVersion: React.PropTypes.string
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

    childContextTypes: contextTypes,

    getChildContext: function() {
      return {
        pointer: (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) ? 'touch' : 'mouse',
        density: window.devicePixelRatio,
        width: this.state.width,
        height: this.state.height,
        language: window.navigator.userLanguage || window.navigator.language,
        focus: this.state.focus,
        scroll: this.state.scroll,
        adBlock: this.state.adBlock,
        os: this.checkOS(),
        browser: this.checkBrowser().browser,
        browserVersion: this.checkBrowser().version
      };
    },

    // (C) viazenetti GmbH (Christian Ludwig)
    // http://jsfiddle.net/ChristianL/AVyND/
    checkOS: function() {
      var os = undefined;
      var clientStrings = [
          { s:'Windows', r:/(Windows)/},
          { s:'Android', r:/Android/},
          { s:'Open BSD', r:/OpenBSD/},
          { s:'Linux', r:/(Linux|X11)/},
          { s:'iOS', r:/(iPhone|iPad|iPod)/},
          { s:'Mac', r:/Mac/},
          { s:'UNIX', r:/UNIX/},
          { s:'Robot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
      ];
      for (var i = 0; i < clientStrings.length; i++) {
        var cs = clientStrings[i];
        if (cs.r.test(navigator.userAgent)) {
          return cs.s;
        }
      }

    },

    // (C) viazenetti GmbH (Christian Ludwig)
    // http://jsfiddle.net/ChristianL/AVyND/
    checkBrowser: function() {
      var UA = navigator.userAgent;
      var browser = undefined;
      var version = undefined;
      var verOffset;

      // Opera
      if ((verOffset = UA.indexOf('Opera')) > -1) {
          browser = 'Opera';
          version = UA.substring(verOffset + 6);
          if ((verOffset = UA.indexOf('Version')) > -1) {
              version = UA.substring(verOffset + 8);
          }
      }
      // MSIE
      else if ((verOffset = UA.indexOf('MSIE')) > -1) {
          browser = 'Microsoft Internet Explorer';
          version = UA.substring(verOffset + 5);
      }
      // Chrome
      else if ((verOffset = UA.indexOf('Chrome')) > -1) {
          browser = 'Chrome';
          version = UA.substring(verOffset + 7);
      }
      // Safari
      else if ((verOffset = UA.indexOf('Safari')) > -1) {
          browser = 'Safari';
          version = UA.substring(verOffset + 7);
          if ((verOffset = UA.indexOf('Version')) > -1) {
              version = UA.substring(verOffset + 8);
          }
      }
      // Firefox
      else if ((verOffset = UA.indexOf('Firefox')) > -1) {
          browser = 'Firefox';
          version = UA.substring(verOffset + 8);
      }
      // MSIE 11+
      else if (UA.indexOf('Trident/') > -1) {
          browser = 'Microsoft Internet Explorer';
          version = UA.substring(UA.indexOf('rv:') + 3);
      }
      // Other browsers
      else if ((nameOffset = UA.lastIndexOf(' ') + 1) < (verOffset = UA.lastIndexOf('/'))) {
          browser = UA.substring(nameOffset, verOffset);
          version = UA.substring(verOffset + 1);
          if (browser.toLowerCase() == browser.toUpperCase()) {
              browser = navigator.appName;
          }
      }

      return {
        browser: browser,
        version: version
      }
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

context.subscribe = function(lookup){
  if (!lookup) {
    return contextTypes;
  } else {
    var customTypes = {};
    for (var type of lookup) {
      if (contextTypes[type]) {
        customTypes[type] = contextTypes[type];
      } else {
        console.warn('Context type `' + type + '` does not exist');
      }
    }
    return customTypes;
  }
};

module.exports = context;
