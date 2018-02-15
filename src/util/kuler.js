import ColourScheme from 'color-scheme';


function hexToRgbA(hex) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join('')}`;
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},1)`;
  }
  throw new Error('Bad Hex');
}

export default (hueNumber, variation, schema) => {
  const scheme = new ColourScheme();

  // initialize scheme
  scheme.from_hue(hueNumber || 21)
    .scheme(schema || 'triade')
    .distance(0.1)
    .add_complement(false)
    .variation(variation || 'default')
    .web_safe(false);

  const colours = scheme.colors().map((c) => hexToRgbA(`#${c}`));

  const main = {
    main: colours[0],
    mainShade: colours[1],
    mainPale: colours[2],
    mainRich: colours[3]
  };

  const contrast = (colours.length > 3) ? {
    contrast: colours[4],
    contrastShade: colours[5],
    contrastPale: colours[6],
    contrastRich: colours[7]
  } : {};

  const triad = (colours.length > 7) ? {
    triad: colours[8],
    triadShade: colours[9],
    triadPale: colours[10],
    triadRich: colours[11]
  } : {};

  return {
    colourArray: colours,
    ...main,
    ...contrast,
    ...triad
  };
};
