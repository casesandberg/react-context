/* jshint node: true, esnext: true */
"use strict";

var React = require('react');
var context = require('react-context');



var Child = React.createClass({

  // subscribe to all the contextTypes
  contextTypes: context.subscribe(),

  render(){
    var contexts = [];
    for (var key in this.context){
      var value = this.context[key];
      contexts.push(<div key={ key }><span>{ key }:</span> <span>{ value.toString() }</span></div>);
    }
    return(
      <div>{ contexts }</div>
    )
  }
});


module.exports = Child;
