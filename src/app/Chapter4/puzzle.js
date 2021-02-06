import shuffle from 'shuffle-array';
import config from '@src/config';
import chapter4Images from '@images/chapter4';


export function variantSequence () {
  return [1, 4, 2, 5, 3, 4, 0, 5]
}

export function variantPatterns () {
  return [
    [[0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [1, 0, 0, 0]], // 0 top-left
    [[0, 1, 0, 0], [0, 0, 1, 1], [1, 0, 0, 0], [0, 0, 0, 0]], // 1 top-right
    [[0, 0, 0, 0], [0, 0, 1, 0], [1, 0, 0, 1], [0, 1, 0, 0]], // 2 bottom-right
    [[0, 0, 1, 0], [0, 0, 0, 0], [0, 0, 0, 1], [1, 1, 0, 0]], // 3 bottom-left
    [[0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 0, 1], [0, 1, 0, 0]], // 4 straight-vertical
    [[0, 0, 1, 0], [0, 0, 1, 0], [1, 0, 0, 0], [1, 0, 0, 0]], // 5 straight-horizontal
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

  const variantSeq = variantSequence();

  return validSequence.every((row, y) => {
    return row.every((validValue, x) => {
      return validValue === variantSeq[sequence[y][x]];
    });
  });
}
