import { colorDifference } from './colorTools';

const calculateScore = (c1, c2) => {

  // params rgb objects
  let diff = colorDifference(c1, c2); // 0 (same) - 100 (opposite)
  let temp = 100 - diff * 2;
  let score = temp >= 0 ? temp : 0;
  return score;
};

const calculateTotalScore = (results) => {
  let total = results.reduce((acc, round) => {
    let score = calculateScore(round.picked, round.target);
    return score + acc;
  }, 0);

  return Math.ceil(total / results.length);
};

export { calculateScore, calculateTotalScore };
