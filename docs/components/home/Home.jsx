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
        logo: {
          padding: '10px 0',
          float: 'left',
          marginLeft: '-10px'
        },
        nav: {
          padding: '10px 0',
          float: 'right',
          marginRight: '-10px'
        },
        svg: {
          width:'24px',
          height:'24px',
          fill: 'rgba(255,255,255,.87)',
          padding: '10px'
        },
        feature: {
          boxShadow: 'inset 0 -1px 0 0 rgba(255,255,255,.2), inset 0 1px 0 0 rgba(255,255,255,.2)'
        },
        body: {
          marginBottom: '30px'
        },
        npm: {
          position: 'relative'
        },
        star: {
          position: 'absolute',
          top: '11px',
          right: '-22px'
        },

        files: {
          paddingBottom: '15px'
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

    var domFiles = React.findDOMNode(this.refs.files) && React.findDOMNode(this.refs.files).children;

    if (domFiles) {
      var files = {};
      for (var i = 0; i < domFiles.length; i++) {
        var file = domFiles[i];
        files[file.offsetTop] = file.id;
      }

      this.setState({ files: files });
    }
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
  scroll: ${ this.context.scroll } // The window scroll position
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
            <div is="logo">
              <svg is="svg" viewBox="0 0 24 24">
                <path d="M18,18H6V6H18M18,4H6A2,2 0 0,0 4,6V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18V6C20,4.89 19.1,4 18,4Z" />
              </svg>
            </div>

            <div is="nav">
              <a href="https://github.com/casesandberg/react-context" target="_blank" is="link">
                <svg is="svg" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                </svg>
              </a>
            </div>
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

                  <div ref="files" is="files">
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
