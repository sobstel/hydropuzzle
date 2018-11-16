export const password = 'psswrd';

const DOT = 1;
const DASH = 3;

export const SPACE = 3;

export const BIG_SPACE = 7;

export function letterPatterns () {
  return [
    // p
    [DOT, DASH, DASH, DOT],
    // s
    [DOT, DOT, DOT],
    // s
    [DOT, DOT, DOT],
    // w
    [DOT, DASH, DASH],
    // r
    [DOT, DASH, DOT],
    // d
    [DASH, DOT, DOT]
  ];
}
