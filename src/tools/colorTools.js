import deltaE from './deltaE';
import tinycolor from 'tinycolor2';

const colorDifference = (c1, c2) => {
  const { r, g, b } = c1;
  const { r: rp, g: gp, b: bp } = c2;
  let delta = deltaE([r, g, b], [rp, gp, bp]);
  return delta;
};

// separate into own files?
const randomRGBA = (range = [0, 255], a = 1) => {
  return {
    r: randomInRange(range),
    g: randomInRange(range),
    b: randomInRange(range),
    a,
  };
};

// returns random rgba object with same saturation and luminosity as input color (different hue)
const randomRGBA_matchSL = (color) => {
  let hsl = tinycolor.fromRatio(color).toHsl();
  let hue = Math.random();
  hsl.h = hue;
  let rgb = tinycolor(hsl).toRgb();
  return rgb;
};

// returns random rgba object with different saturation and luminosity as input color (same hue)
const randomRGBA_matchH = (color) => {
  let hsl = tinycolor.fromRatio(color).toHsl();
  let sat = Math.random();
  let lum = Math.random();
  hsl.s = sat;
  hsl.l = lum;
  let rgb = tinycolor(hsl).toRgb();
  return rgb;
};
const colorCombos = (color) => {
  const complement = tinycolor(color).complement().toRgbString();
  let triad = tinycolor(color)
    .triad()
    .map((c) => c.toRgbString());
  let tetrad = tinycolor(color)
    .tetrad()
    .map((c) => c.toRgbString());

  //remove original colors
  triad.shift();
  tetrad.shift();
  return { complement, triad, tetrad };
};

// --- util
const randomInRange = (range = [0, 1]) => {
  let [min, max] = range;
  return Math.random() * (max - min) + min;
};

export {
  colorDifference,
  randomRGBA,
  randomRGBA_matchH,
  randomRGBA_matchSL,
  colorCombos,
};
