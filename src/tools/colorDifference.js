import deltaE from './deltaE';

const colorDifference = (c1, c2) => {
  const { r, g, b } = c1;
  const { r: rp, g: gp, b: bp } = c2;
  let delta = deltaE([r, g, b], [rp, gp, bp]);
  return delta;
};

export default colorDifference;
