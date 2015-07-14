/* jshint node: true, esnext: true */
"use strict";

var React = require('react');

var HomeHeader = require('./HomeHeader');
var HomeFeature = require('./HomeFeature');
var HomeBody = require('./HomeBody');




module.exports = class Home extends React.Component {

  render(){
    return (
      <div style={{ fontFamily: 'Roboto' }}>
        <HomeHeader />
        <HomeFeature />
        <HomeBody />
      </div>
    )
  }
};
