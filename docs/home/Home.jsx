/* jshint node: true, esnext: true */
"use strict";

var React = require('react');
var ReactCSS = require('reactcss');

var Container = require('../layout/Container');
var Grid = require('../layout/Grid');
var Code = require('../common/Code')
var { Raised } = require('react-material-design');

module.exports = class Body extends ReactCSS.Component {

  classes() {
    return {
      'default': {
        header: {
          height: '64px'
        },
        feature: {
          boxShadow: 'inset 0 -2px 0 0 #7F9BB3, inset 0 2px 0 0 #7F9BB3',
          paddingBottom: '100px'
        },
        body: {},

        title: {
          paddingTop: '70px',
          paddingBottom: '35px',
          fontSize: '40px',
          color: '#fff'
        },
        snippet: {
          height: '180px',
          boxShadow: 'inset 0 0 0 2px #7F9BB3',
          borderRadius: '2px',
          background: '#2A5881'
        },

        docs: {
          marginTop: '-55px'
        }
      }
    };
  }

  render(){
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
                <div is="snippet">

                </div>
              </div>
            </Grid>
          </Container>
        </div>

        <div is="body">
          <Container>
            <Grid>
              <div />
              <div is="docs">
                <Raised>
                  <Code file="foo bar\n" />
                </Raised>
              </div>
            </Grid>
          </Container>
        </div>

      </div>
    )
  }
};
