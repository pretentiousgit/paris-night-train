export default (x = 0, y = 0, blocksToGenerate, layer, map) => {
  for (let i = 0; i <= blocksToGenerate; i += 1) {
    map.putTile(34, i + x, y, layer);
  }
};