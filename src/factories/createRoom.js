import globals from '../config.globals';
import row from '../factories/row';
import column from '../factories/column';

const {
  worldHeight,
  worldWidth
} = globals;

function createDoorWall(x = 0, y = 20, width = 21, door = 7, doorPos = 7) {
  const {
    map,
    tileMapLayer,
    backgroundLayer
  } = globals;


  const rows = {
    left: {
      x: x + 1,
      width: doorPos
    },
    right: {
      x: x + (doorPos + door),
      width: width - (doorPos + door)
    }
  };

  row(rows.left.x, y, rows.left.width, tileMapLayer, map, backgroundLayer);
  row(rows.right.x, y, rows.right.width, tileMapLayer, map, backgroundLayer);
}

function createRoom(
  x = 0,
  y = 0,
  width = Math.round((worldWidth / 3)),
  height = 20,
  door = 6,
  doorPos = (Math.floor((worldWidth / 3)) - 6) / 2
) {
  const { map, tileMapLayer } = globals;
  // top wall
  row(x, y, width, tileMapLayer, map);

  // column walls
  column(x, 0, height, tileMapLayer, map); // left
  column(x + 15, 0, height, tileMapLayer, map); // right

  // bottom wall with entrance hole
  createDoorWall(x, height, width, door, doorPos);
}

export default function createCarriage() {
  // in here get the actual width of the available level from the world
  const thirds = (Math.round(worldWidth / 3));

  createRoom(0, 0);
  createRoom(thirds * 1, 0);
  createRoom(thirds * 2, 0);
  row(0, worldHeight - 1, worldWidth, globals.tileMapLayer, globals.map);
  globals.map.setCollisionBetween(1, 2000);
  globals.tileMapLayer.resizeWorld();
  const tiles = globals.game.physics.p2.convertTilemap(globals.map, globals.tileMapLayer);

  for (let i = 0; i < tiles.length; i += 1) {
    const tileBody = tiles[i];
    tileBody.setCollisionGroup(globals.wallCollisionGroup);
    tileBody.collides(globals.playerCollisionGroup);
  }
}
