---
id: contexts-adblock
title: AdBlock
---
```
this.context.adBlock // bool

Component.contextTypes = context.subscribe(['adBlock'])
```
Utilizes `sitexw/FuckAdBlock` to detect when there is an ad blocker turned on. Valid on Chrome, Firefox, IE (8+), Safari, Opera.
