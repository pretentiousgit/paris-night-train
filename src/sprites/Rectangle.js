export default (game, w, h, c, f) => {
  const rect = game.add.bitmapData(w, h);
  rect.ctx.beginPath();
  rect.ctx.rect(0, 0, w, h);
  rect.ctx.fillStyle = c || '#CCC';
  rect.ctx.fill();
  rect.ctx.strokeStyle = '#FF0000';
  rect.ctx.stroke();
  rect.filters = [f];
  return rect;
};
