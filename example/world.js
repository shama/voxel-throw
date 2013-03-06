var createEngine = require('voxel-engine');
var createTerrain = require('voxel-perlin-terrain');

var game = window.game = createEngine({
  generateVoxelChunk: createTerrain({scaleFactor:10}),
  chunkDistance: 2,
  materials: [
    'obsidian',
    ['grass', 'dirt', 'grass_dirt'],
    'grass',
    'plank'
  ],
  texturePath: './textures/',
});
var container = document.getElementById('container');
game.appendTo(container);

var createPlayer = require('voxel-player')(game);
var substack = createPlayer('textures/substack.png');
substack.yaw.position.set(0, 10, 0);
substack.possess();

/*var createTree = require('voxel-forest');
for (var i = 0; i < 20; i++) {
  createTree(game, { bark: 4, leaves: 3 });
}*/

var pickupOrThrow = require('../')(game);
window.addEventListener('mouseup', function() {
  pickupOrThrow();
});
