# voxel-throw

> Pick up and throw voxels in [voxel.js](https://github.com/maxogden/voxel-engine).

[View this example](http://shama.github.com/voxel-throw)

# example

``` js
// create a throwing thing and give it a copy of the game
var pickupOrThrow = require('voxel-throw')(game);

// on mouse down either pick up or throw a voxel
window.addEventListener('mouseup', function() {
  pickupOrThrow(/* velocity, {x: angle, y: angle} */);
}, false);
```

# install

With [npm](https://npmjs.org) do:

```
npm install voxel-throw
```

Use [browserify](http://browserify.org) to `require('voxel-throw')`.

## release history
* 0.1.0 - initial release

## license
Copyright (c) 2013 Kyle Robinson Young<br/>
Licensed under the MIT license.
