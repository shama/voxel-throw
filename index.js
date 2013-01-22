var traj = require('voxel-trajectory');

module.exports = function(opts) {
  opts = opts || {};
  if (opts.THREE) opts = {game:opts};
  var game = opts.game;
  var has  = opts.has || false;
  var time = opts.time || 15000;

  function pickup() {
    if (!game.controls.enabled) return;
    var block = game.raycast();
    if (!block) return;
    var type = game.getBlock(block);
    if (type === 0) return;
    game.setBlock(block, 0);
    has = type;
  }

  function throwit(v, xy) {
    v = v / 10 || 0.3;
    if (!xy) {
      xy = game.cameraRotation();
      xy.x -= Math.PI / 2;
    }
    var item = {
      mesh: new game.THREE.Mesh(
        new game.THREE.CubeGeometry(game.cubeSize, game.cubeSize, game.cubeSize),
        game.material
      ),
      width: game.cubeSize, height: game.cubeSize, depth: game.cubeSize,
      collisionRadius: game.cubeSize,
      velocity: traj(v, xy),
      resting: false
    };
    item.mesh.position.copy(game.controls.yawObject.position);
    item.mesh.geometry.faces.forEach(function(face, i) {
      face.materialIndex = ((has - 1) * 6) + i;
    });
    game.addItem(item);
    setTimeout(function(item) { game.removeItem(item); }, time, item);
    has = false;
  }

  return function(v) {
    if (has === false) pickup();
    else throwit(v);
  }
}
