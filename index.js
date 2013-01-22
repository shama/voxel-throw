var traj = require('voxel-trajectory');

module.exports = function(opts) {
  opts = opts || {};
  if (opts.THREE) opts = {game:opts};
  var game = opts.game;
  var has  = opts.has || false;
  var time = opts.time || 15000;

  function item(type) {
    var item = {
      mesh: new game.THREE.Mesh(
        new game.THREE.CubeGeometry(game.cubeSize, game.cubeSize, game.cubeSize),
        game.material
      ),
      width: game.cubeSize, height: game.cubeSize, depth: game.cubeSize,
      collisionRadius: game.cubeSize,
      velocity: {x:0, y:0, z:0},
      resting: false
    };
    item.mesh.geometry.faces.forEach(function(face, i) {
      face.materialIndex = ((type - 1) * 6) + i;
    });
    return item;
  }

  function pickup() {
    var block = game.raycast();
    if (!block) return;
    var type = game.getBlock(block);
    if (type === 0) return;
    game.setBlock(block, 0);
    return has = item(type);
  }

  function throwit(v, xy) {
    v = v / 10 || 0.3;
    if (!xy) {
      xy = game.cameraRotation();
      xy.x -= Math.PI / 2;
    }
    has.mesh.position.copy(game.controls.yawObject.position);
    has.mesh.translateY(game.cubeSize);
    has.velocity = traj(v, xy);
    game.addItem(has);
    setTimeout(function(has) { game.removeItem(has); }, time, has);
    has = false;
    return true;
  }

  return function(v) {
    if (!game.controls.enabled) return;
    if (typeof v === 'object') has = clone(v);
    return has === false ? pickup(v) : throwit(v);
  }
}

function clone(obj) {
  if (obj == null || typeof obj !== 'object') return obj;
  var tmp = obj.constructor();
  for (var key in obj) {
    if (key === 'mesh') tmp[key] = obj[key].clone();
    else tmp[key] = clone(obj[key]);
  }
  return tmp;
}
