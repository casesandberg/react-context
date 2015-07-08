/* jshint node: true, esnext: true */
"use strict";

var React = require('react');
var ReactCSS = require('reactcss');
var context = require('react-context');

var Container = require('../layout/Container');
var Grid = require('../layout/Grid');
var Code = require('../common/Code');
var { Raised } = require('react-material-design');

class Home extends ReactCSS.Component {

  classes() {
    return {
      'default': {
        header: {
          height: '64px'
        },
        feature: {
          boxShadow: 'inset 0 -2px 0 0 #7F9BB3, inset 0 2px 0 0 #7F9BB3'
        },
        body: {},

        title: {
          paddingTop: '70px',
          paddingBottom: '35px',
          fontSize: '40px',
          color: '#fff'
        },
        Snippet: {
          radius: '2px 2px 0 0',
          background: '#EEEEEE'
        },
        docsWrap: {
          overflow: 'hidden',
          padding: '0 5px 5px',
          margin: '0 -5px'
        },
        Docs: {
          radius: '0 0 2px 2px'
        }
      }
    };
  }

  render(){

    var snippet =
`this.context \= \{
  pointer: '${ this.context.pointer }', // the device's primary input
  density: ${ this.context.density }, // The screen pixel density
  width: ${ this.context.width }, // The screen width (try resizing)
  height: ${ this.context.height }, // The screen height (try resizing)
  language: '${ this.context.language }', // The language thats set
  focus: ${ this.context.focus.toString() } // Window is focused (click your desktop)
\}
`;

    return (
      <div>
        <style>{`
          html, body {
            background: #2A5881;
          }
        `}</style>

        <div is="header">
          <Container>
          header
          </Container>
        </div>

        <div is="feature">
          <Container>
            <Grid>
              <div />
              <div>
                <div is="title">React Context</div>
                <Raised is="Snippet">
                  <Code file={ snippet } />
                </Raised>
              </div>
            </Grid>
          </Container>
        </div>

        <div is="body">
          <Container>
            <Grid>
              <div />
              <div is="docsWrap">
                <Raised is="Docs">
                  <Code file={'---\nlineDecoration: $\n\n---\nnpm install react-context\n'} />
                </Raised>
              </div>
            </Grid>
          </Container>
        </div>

      </div>
    )
  }
};

Home.contextTypes = context.types();

module.exports = Home
