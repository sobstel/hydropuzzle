import shuffle from 'shuffle-array';
import config from '@src/config';
import chapter4Images from '@images/chapter4';

export function variantPatterns () {
  return [
    [[0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [1, 0, 0, 0]],
    [[0, 1, 0, 0], [0, 0, 1, 1], [1, 0, 0, 0], [0, 0, 0, 0]],
    [[0, 0, 0, 0], [0, 0, 1, 0], [1, 0, 0, 1], [0, 1, 0, 0]],
    [[0, 0, 1, 0], [0, 0, 0, 0], [0, 0, 0, 1], [1, 1, 0, 0]],
    [[0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 0, 1], [0, 1, 0, 0]],
    [[0, 0, 1, 0], [0, 0, 1, 0], [1, 0, 0, 0], [1, 0, 0, 0]]
  ];
}

function seq (i) {
  return ((i % 4) + 1) * 10 + Math.ceil((i + 1) / 4);
}

export function filmReel () {
  return shuffle(chapter4Images.sequence.map((source, i) => {
    return { source, i, seq: seq(i) };
  }, {copy: true}));
}

export const initialSequence = [
  [0, 4, 2, 1],
  [1, 5, 3, 2],
  [2, 0, 4, 3],
  [3, 1, 0, 4]
];

export const validSequence = [
  [3, 4, 4, 2],
  [4, 1, 0, 4],
  [4, 2, 3, 4],
  [0, 4, 4, 1]
];

export function validateSequence (sequence) {
  if (config['DEBUG']) {
    return true;
  }

  return validSequence.every((row, y) => {
    return row.every((validValue, x) => {
      return validValue === sequence[y][x];
    });
  });
}
