var traj = require('voxel-trajectory');

module.exports = function(opts) {
  opts = opts || {};
  if (opts.THREE) opts = {game:opts};
  var game = opts.game;
  var has  = opts.has || false;
  var time = opts.time || 15000;

  function item(type) {
    var container = new game.THREE.Object3D()
    var mesh = new game.THREE.Mesh(
        new game.THREE.CubeGeometry(game.cubeSize, game.cubeSize, game.cubeSize),
        new game.THREE.MeshFaceMaterial(game.materials.get(1))
    );
    var item = game.makePhysical(container, new game.THREE.Vector3(game.cubeSize, game.cubeSize, game.cubeSize))
    container.add(mesh)
    item.mesh = container;
    mesh.translateY(game.cubeSize / 2)
    mesh.translateX(game.cubeSize / 2)
    mesh.translateZ(game.cubeSize / 2)
    item.subjectTo(new game.THREE.Vector3(0, -9.8/100000, 0))
    game.scene.add(container);

    return item;
  }

  function pickup() {
    var block = game.raycast(game.cameraPosition(), game.cameraVector(), 100);
    if (!block) return;
    var type = game.getBlock(block);
    if (type === 0) return;
    game.setBlock(block, 0);
    return has = item(type);
  }

  function throwit(v, xy) {
    v = v / 10 || 1.0;
    if (!xy) {
      var target = game.controls.target();
      xy = {
        x: target.pitch.rotation.x,
        y: target.yaw.rotation.y
      };
      xy.x -= Math.PI / 2;
    }

    has.mesh.position.copy(game.controls.target().yaw.position);
    has.mesh.translateY(game.cubeSize);
    has.velocity = traj(v, xy);
    game.addItem(has);
    setTimeout(function(has) { game.removeItem(has); }, time, has);
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
