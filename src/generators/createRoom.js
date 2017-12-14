import Phaser from 'phaser';
import globals from '../config.globals';
import row from '../generators/row';
import column from '../generators/column';

const {
  blockSize: BLOCK_SIZE,
  worldHeight,
  worldWidth
} = globals;

function createDoorWall(x = 0, y = 20, width = 21, door = 7, doorPos = 7) {
  const {
    game,
    map,
    collisionLayer,
    backgroundLayer
  } = globals;

  const w = game.cache.getImage('player').width * 0.8;
  const doorSprite = game.add.sprite(x, y, 'door');

  doorSprite.anchor.setTo(0, 0.75);
  doorSprite.x = ((x + doorPos) * BLOCK_SIZE) + w;
  doorSprite.y = (y * BLOCK_SIZE);

  backgroundLayer.add(doorSprite);
  game.physics.arcade.enable(doorSprite, Phaser.Physics.ARCADE);
  doorSprite.body.enable = true;
  doorSprite.body.immovable = true;

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

  row(rows.left.x, y, rows.left.width, collisionLayer, map);
  row(rows.right.x, y, rows.right.width, collisionLayer, map);
}

function createRoom(
  x = 0,
  y = 0,
  width = Math.round((worldWidth / 3)),
  height = 20,
  door = 6,
  doorPos = (Math.floor((worldWidth / 3)) - 6) / 2
) {
  const { map, collisionLayer } = globals;

  console.log(worldWidth);
  console.log('near wall', x);
  console.log('width', width);
  console.log('far wall', x + 20);
  // top wall
  row(x, y, width, collisionLayer, map);

  // column walls
  column(x, 0, height, collisionLayer, map); // left
  column(x + 15, 0, height, collisionLayer, map); // right

  // bottom wall with entrance hole
  createDoorWall(x, height, width, door, doorPos);
}

export default function createCarriage() {
  // in here get the actual width of the available level from the world
  const thirds = (Math.round(worldWidth / 3));

  createRoom(0, 0);
  createRoom(thirds * 1, 0);
  createRoom(thirds * 2, 0);
}
