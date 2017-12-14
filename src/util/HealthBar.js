/**
 Copyright (c) 2015 Belahcen Marwane (b.marwane@gmail.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

function HealthBar (game, providedConfig) {
  this.game = game;

  this.setupConfiguration(providedConfig);
  this.setPosition(this.config.x, this.config.y);
  this.drawBackground();
  this.drawHealthBar();
  this.setFixedToCamera(this.config.isFixedToCamera);
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const newHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function setupConfiguration(providedConfig) {
  this.config = this.mergeWithDefaultConfiguration(providedConfig);
  this.flipped = this.config.flipped;
}

function mergeObjects(targetObj, newObj) { // ToDo: make into a Map
  for (const p in newObj) {
    try {
      targetObj[p] = newObj[p].constructor == Object ? mergeObjects(targetObj[p], newObj[p]) : newObj[p];
    } catch (e) {
      targetObj[p] = newObj[p];
    }
  }
  return targetObj;
}

function mergeWithDefaultConfiguration(newConfig) {
  const defaultConfig = {
    layer: null,
    width: 250,
    height: 40,
    x: 0,
    y: 0,
    bg: {
      color: '#651828'
    },
    bar: {
      color: '#FEFF03'
    },
    animationDuration: 200,
    flipped: false,
    isFixedToCamera: false
  };

  return mergeObjects(defaultConfig, newConfig);
}

function drawBackground() {
  const bmd = this.game.add.bitmapData(this.config.width, this.config.height);
  bmd.ctx.fillStyle = this.config.bg.color;
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, this.config.width, this.config.height);
  bmd.ctx.fill();
  bmd.update();

  if (this.config.layer !== null) {
    this.bgSprite = this.config.layer.create(this.x, this.y, bmd);
  } else {
    this.bgSprite = this.game.add.sprite(this.x, this.y, bmd);
  }

  this.bgSprite.anchor.set(0.5);

  if (this.flipped) {
    this.bgSprite.scale.x = -1;
  }
}

function drawHealthBar() {
  const bmd = this.game.add.bitmapData(this.config.width, this.config.height);
  bmd.ctx.fillStyle = this.config.bar.color;
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, this.config.width, this.config.height);
  bmd.ctx.fill();
  bmd.update();

  if (this.config.layer !== null) {
    this.barSprite = this.config.layer.create(this.x - (this.bgSprite.width / 2), this.y, bmd);
  } else {
    this.barSprite = this.game.add.sprite(this.x - (this.bgSprite.width / 2), this.y, bmd);
  }

  this.barSprite.anchor.y = 0.5;

  if (this.flipped) {
    this.barSprite.scale.x = -1;
  }
}

function setPosition(x, y) {
  this.x = x;
  this.y = y;

  if (this.bgSprite !== undefined && this.barSprite !== undefined) {
    this.bgSprite.position.x = x;
    this.bgSprite.position.y = y;


    this.barSprite.position.x = x - (this.config.width / 2);
    this.barSprite.position.y = y;
  }
}

function setPercent(newPercentage) {
  let p;
  if (newPercentage < 0) p = 0;
  if (newPercentage > 100) p = 100;

  const newWidth = (p * this.config.width) / 100;

  this.setWidth(newWidth);
}

function setBarColor(newHexColor) {
  const bmd = this.barSprite.key;
  bmd.update();

  const currentRGBColor = bmd.getPixelRGB(0, 0);
  const newRGBColor = hexToRgb(newHexColor);
  bmd.replaceRGB(
    currentRGBColor.r,
    currentRGBColor.g,
    currentRGBColor.b,
    255,

    newRGBColor.r,
    newRGBColor.g,
    newRGBColor.b,
    255
  );
}

function setWidth(newWidth) {
  if (this.flipped) {
    newWidth = -1 * newWidth;
  }
  this.game.add.tween(this.barSprite)
    .to({ width: newWidth }, this.config.animationDuration, Phaser.Easing.Linear.None, true);
}

function setFixedToCamera(fixedToCamera) {
  this.bgSprite.fixedToCamera = fixedToCamera;
  this.barSprite.fixedToCamera = fixedToCamera;
}

function kill() {
  this.bgSprite.kill();
  this.barSprite.kill();
}

const prototypeUpdate = {
  constructor: HealthBar,
  setupConfiguration: setupConfiguration,
  mergeWithDefaultConfiguration: mergeWithDefaultConfiguration,
  drawBackground: drawBackground,
  drawHealthBar: drawHealthBar,
  setPosition: setPosition,
  setPercent: setPercent,
  setBarColor: setBarColor,
  setWidth: setWidth,
  setFixedToCamera: setFixedToCamera,
  kill: kill
};

HealthBar.prototype = { ...HealthBar.prototype, ...prototypeUpdate };
module.exports = HealthBar;
