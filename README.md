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

Or if you just want to throw your own item, like a rock:

```js
var throwthis = require('voxel-throw')(game);

var rock = {
  mesh: new game.THREE.Mesh(
    new game.THREE.CubeGeometry(4, 4, 4),
    new game.THREE.MeshBasicMaterial({color:0x333333})
  ),
  size: 4,
  collisionRadius: 4,
  resting: false
};

window.addEventListener('mouseup', function() {
  throwthis(rock);
}, false);
```

# install

With [npm](https://npmjs.org) do:

```
npm install voxel-throw
```

Use [browserify](http://browserify.org) to `require('voxel-throw')`.

## release history
* 0.2.0 - Updates for voxel-engine@0.10.0 (thanks @HowlingEverett!)
* 0.1.1 - ability to override the item thrown
* 0.1.0 - initial release

## license
Copyright (c) 2013 Kyle Robinson Young<br/>
Licensed under the MIT license.
