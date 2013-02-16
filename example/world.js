var createEngine = require('voxel-engine');
var createTerrain = require('voxel-perlin-terrain');
var player = require('voxel-player')

// create the game
var game = createEngine({
  generateVoxelChunk: createTerrain({scaleFactor:10}),
  chunkDistance: 2,
  materials: [
    'obsidian',
    ['grass', 'dirt', 'grass_dirt'],
    'grass',
    'plank'
  ],
  texturePath: './textures/',
  controls: { discreteFire: true },
  worldOrigin: [0,0,0],
});
var hasLock = false;
var container = document.getElementById('container');
game.appendTo(container);

// Add game to the window, for debugging purposes
window.game = game;

// create the player from a minecraft skin file and tell the
// game to use it as the main player
var createPlayer = player(game)
var substack = createPlayer('substack.png')
substack.yaw.position.set(0, -1200, 0)
substack.possess()

// add some trees
var createTree = require('voxel-forest');
for (var i = 0; i < 20; i++) {
  createTree(game, { bark: 4, leaves: 3 });
}

// create a throwing thing
var pickupOrThrow = require('../')(game);

// pick up or throw voxel
game.on('fire', function(target) {
  pickupOrThrow();
});
