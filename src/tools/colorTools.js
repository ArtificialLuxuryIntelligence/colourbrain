import deltaE from './deltaE';
import tinycolor from 'tinycolor2';

const colorDifference = (c1, c2) => {
  // params rgb objects
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

const randomRGBAGray = (range = [0, 255], a = 1) => {
  let val = randomInRange(range);
  return {
    r: val,
    g: val,
    b: val,
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

const randomRGBA_matchHS = (color) => {
  let hsl = tinycolor.fromRatio(color).toHsl();
  // let lum = Math.random();
  // hsl.l = lum;

  let lum = Math.random();
  hsl.l = lum;

  let rgb = tinycolor(hsl).toRgb();
  return rgb;
};

const colorCombos = (color) => {
  const complement = tinycolor(color).complement().toRgbString();

  //Thetinycolor built in method rotates the hue by too much in my opinion (normal is 150 and 210 degs from base colour)
  // let splitComplement = tinycolor(color)
  //   .splitcomplement()
  //   .map((c) => c.toRgbString());

  // console.log('SCOMP', splitComplement, color);

  let grayscale = tinycolor(color).greyscale().toRgbString();

  let splitComplement = splitComp(color);

  let triad = tinycolor(color)
    .triad()
    .map((c) => c.toRgbString());
  let tetrad = tinycolor(color)
    .tetrad()
    .map((c) => c.toRgbString());

  //remove original colors
  triad.shift();
  tetrad.shift();
  return {
    target: tinycolor(color).toRgbString(),
    grayscale,
    complement,
    splitComplement,
    triad,
    tetrad,
  };
};

// --- util
const randomInRange = (range = [0, 1]) => {
  let [min, max] = range;
  return Math.random() * (max - min) + min;
};

const splitComp = (color) => {
  return [
    tinycolor(color).spin(150).toRgbString(),
    tinycolor(color).spin(210).toRgbString(),
  ];
};

const generateRounds = (rounds, grayScale = false) => {
  let res = [];
  let r = 0;
  while (r < rounds) {
    let targetColor;

    targetColor = randomRGBA([25, 230]);

    const {
      grayscale,
      complement,
      splitComplement,
      triad,
      tetrad,
    } = colorCombos(targetColor);

    res.push({
      targetColor: grayScale ? tinycolor(grayscale).toRgb() : targetColor,
      color: tinycolor(targetColor).toString(),
      grayscale,
      complement,
      splitComplement,
      triad,
      tetrad,
    });
    r++;
  }
  return res;
};

// make an array from white to black
const grayscaleColorRange = (n) => {
  let res = [];
  let inc = 255 / (n + 1);
  let v = 0;
  for (let i = 0; i < n; i++) {
    res.push({ r: v, g: v, b: v });
    // res.push(`rgb(${v},${v},${v})`);
    v += inc;
  }
  return res;
};

// makes array of single colour in all shades (n divisions)
const shadeColorRange = (n, color) => {
  let res = [];
  let hsl = tinycolor(color).toHsl();
  let { h, s, l } = hsl;
  let inc = 1 / (n + 1);
  // let val = 0;
  let val = l % inc;
  for (let i = 0; i < n; i++) {
    res.push(tinycolor({ h, s, l: val }).toRgb());
    // res.push(`rgb(${v},${v},${v})`);
    val += inc;
  }

  // start from lumin value:
  // go down to zero
  // while()

  // go up to 1
  return res;
};

export {
  colorDifference,
  randomRGBA,
  randomRGBA_matchH,
  randomRGBA_matchHS,
  randomRGBA_matchSL,
  colorCombos,
  generateRounds,
  grayscaleColorRange,
  shadeColorRange,
};
