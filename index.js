var traj = require('voxel-trajectory');

module.exports = function(opts) {
  opts = opts || {};
  if (opts.THREE) opts = {game:opts};
  var game = opts.game;
  var has  = opts.has || false;
  var time = opts.time || 15000;

  function pickup() {
    var block = game.raycast(game.cameraPosition(), game.cameraVector(), 10);
    if (!block) return;
    var type = game.getBlock(block.position);
    if (type === 0) return;
    game.setBlock(block.position, 0);
    return has = type;
  }

  function throwit(v, xy) {
    v = v / 10 || 0.1;
    var target = game.controls.target();

    if (!xy) {
      xy = {
        x: target.pitch.rotation.x,
        y: target.yaw.rotation.y,
      };
      xy.x -= Math.PI / 2;
    }

    var size = game.cubeSize || 1;
    var container = new game.THREE.Object3D();
    var mesh = new game.THREE.Mesh(
      new game.THREE.CubeGeometry(size, size, size),
      new game.THREE.MeshFaceMaterial(game.materials.get(has - 1))
    );
    container.add(mesh);
    mesh.position.set(size / 2, size / 2, size / 2);
    container.position.copy(target.yaw.position);

    game.addItem({
      mesh: container,
      size: size,
      velocity: traj(v, xy),
    });
    var item = game.items[game.items.length - 1];
    setTimeout(function(item) { game.removeItem(item); }, time, item);
    has = false;
    return true;
  }

  return function(v) {
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
