# [React Context](http://casesandberg.github.io/react-context/)

* **Engagement Properties** - AdBlock and Focus
* **Display Properties** - Density, Scroll, Width and Height
* **Device Properties** - Language, OS, Browser and Browser Version

```javascript
var React = require('react');
var context = require('react-context');

var Component = React.createClass({

  // subscribe to all the contextTypes
  contextTypes: context.subscribe(['os']),

  render(){

    if (this.context.os === 'Windows') {
      var downloadLink = 'http://some.url/downloads/App.exe';
    } else if (this.context.os === 'Mac') {
      var downloadLink = 'http://some.url/downloads/App.app';
    } else if (this.context.os === 'Android') {
      var downloadLink = 'https://play.google.com/store/apps/details?id=com.app.some';
    } else if (this.context.os === 'iOS') {
      var downloadLink = 'https://itunes.apple.com/us/app/someapp/id12345678';
    } else {
      var downloadLink = 'http://some.url/downloads/';
    }

    return(
      <a href={ downloadLink }>Download App</div>
    )
  }
});
```

## Installation & Usage

```
npm install react-context --save
```

### Wrap Root
Wrap your top-most component with `react-context`.

```javascript
var React = require('react');
var context = require('react-context');

var Root = React.createClass({
  render(){
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
