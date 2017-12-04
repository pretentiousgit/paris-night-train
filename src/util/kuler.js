import ColourScheme from 'color-scheme';

export default (hueNumber, variation, schema) => {
  const scheme = new ColourScheme();

  // initialize scheme
  scheme.from_hue(hueNumber || 21)
    .scheme(schema || 'triade')
    .distance(0.1)
    .add_complement(false)
    .variation(variation || 'default')
    .web_safe(false);

  const colours = scheme.colors();

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
