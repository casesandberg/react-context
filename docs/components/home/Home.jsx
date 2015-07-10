/* jshint node: true, esnext: true */
"use strict";

var React = require('react');
var ReactCSS = require('reactcss');
var context = require('react-context');
var markdown = require('../../helpers/markdown');

var Container = require('../layout/Container');
var Grid = require('../layout/Grid');
var Code = require('../common/Code');
var { Raised } = require('react-material-design');
var Markdown = require('../common/Markdown');
var MarkdownTitle = require('../common/MarkdownTitle');
var HomeSidebar = require('./HomeSidebar');

var documentation = require('../../documentation');



class Home extends ReactCSS.Component {

  constructor() {
    super();
    this.state = {
      sidebarFixed: false,
      visible: false,
      files: {}
    };
    this.changeSelection = this.changeSelection.bind(this);
    this.attachSidebar = this.attachSidebar.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  classes() {
    return {
      'default': {
        header: {
          height: '64px'
        },
        feature: {
          boxShadow: 'inset 0 -1px 0 0 rgba(255,255,255,.2), inset 0 1px 0 0 rgba(255,255,255,.2)'
        },
        body: {},

        npm: {
          position: 'relative'
        },
        star: {
          position: 'absolute',
          top: '11px',
          right: '-22px'
        },

        title: {
          paddingTop: '100px',
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

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);

    var domFiles = React.findDOMNode(this.refs.files).children;

    var files = {};
    for (var i = 0; i < domFiles.length; i++) {
      var file = domFiles[i];
      files[file.offsetTop] = file.id;
    }
    
    this.setState({ files: files });
  }


  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  handleScroll(e) {
    this.changeSelection();
    this.attachSidebar();
  }

  attachSidebar() {
    var sidebarTop = React.findDOMNode( this.refs.homeSidebar ).getBoundingClientRect().top;

    if (sidebarTop <= 0 && this.state.sidebarFixed === false) {
      this.setState({ sidebarFixed: true });
    }

    if (sidebarTop > 0 && this.state.sidebarFixed === true) {
      this.setState({ sidebarFixed: false });
    }
  }

  changeSelection() {
    var top = document.body.scrollTop - 150;
    var mostVisible = '';

    for (var offset in this.state.files) {
      if (this.state.files.hasOwnProperty(offset)) {
        var id = this.state.files[offset];
        if (offset < top) {
          mostVisible = id;
        }
      }
    }

    if (mostVisible !== this.state.visible) {
      this.setState({ visible: mostVisible });
    }
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

    var bg, transition;
    if (this.context.focus) {
      bg = '#2A5881';
      transition = 'background 400ms linear';
    } else {
      bg = '#666';
      transition = 'background 1000ms linear';
    }

    var markdownFiles = [];

    for (var fileName in documentation) {
      if (documentation.hasOwnProperty(fileName)) {
        var file = documentation[fileName];
        var args = markdown.getArgs(file);
        var body = markdown.getBody(file);

        if (body.trim()) {
          markdownFiles.push(
            <div key={ fileName } id={ args.id } is="file" className="markdown">

              <MarkdownTitle
                isHeadline={ markdown.isSubSection(fileName) ? true : false }
                title={ args.title }
                link={ args.id } />

              <Markdown>{ body }</Markdown>
            </div>
            );
        }
      }
    }

    return (
      <div>
        <style>{`
          html, body {
            background: ${ bg };
            transition: ${ transition };
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
              <div ref="homeSidebar">
                <HomeSidebar files={ documentation } active={ this.state.visible } fixed={ this.state.sidebarFixed }  />
              </div>
              <div is="docsWrap">
                <Raised is="Docs">
                  <div is="npm">
                    <div is="star">
                      <iframe src="https://ghbtns.com/github-btn.html?user=casesandberg&repo=reactcss&type=star&count=true&size=large" scrolling="0" width="160px" height="30px" frameBorder="0"></iframe>
                    </div>
                    <Code file={'---\nlineDecoration: $\n\n---\nnpm install react-context\n'} borders />
                  </div>

                  <div ref="files">
                    { markdownFiles }
                  </div>

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
