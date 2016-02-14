# [React Context](http://casesandberg.github.io/react-context/)

* **Engagement Properties** - AdBlock and Focus
* **Display Properties** - Density, Scroll, Width and Height
* **Device Properties** - Language, OS, Browser and Browser Version

```js
var React = require('react');
var context = require('react-context');

var Component = React.createClass({

  // subscribe to all the contextTypes
  contextTypes: context.subscribe(['os']),

  render() {
    var downloadLink;

    switch (this.state.os) {
      case 'Windows':
        downloadLink = 'http://some.url/downloads/App.exe';
        break;
      case 'Mac':
        downloadLink = 'http://some.url/downloads/App.app';
        break;
      case 'Android':
        downloadLink = 'https://play.google.com/store/apps/details?id=com.app.some';
        break;
      case 'iOS':
        downloadLink = 'https://itunes.apple.com/us/app/someapp/id12345678';
        break;
      default:
        downloadLink = 'http://some.url/downloads/';
        break;
    }

    return <a href={ downloadLink }>Download App</div>
  }
});
```

## Installation & Usage

```
npm install react-context --save
```

### Wrap Root
Wrap your top-most component with `react-context`.

```js
var React = require('react');
var context = require('react-context');

var Root = React.createClass({
  render() {
    return <div>Root</div>
  }
});

module.exports = context(Root);
```

### Set Types
Pass it an array of types you want to subscribe to, or call it with no arguments to subscribe to all of them.

```javascript
// Subscribe to scroll and adBlock
Child.contextTypes = context.subscribe(['scroll', 'adBlock']);

// Subscribe to every context
Child.contextTypes = context.subscribe();
```
