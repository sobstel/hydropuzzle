import * as puzzle from '@app/Chapter5/puzzle';

describe('Morse Code', () => {
  it('spaces are correct', () => {
    expect(puzzle.SPACE).toBe(3);
    expect(puzzle.BIG_SPACE).toBe(7);
  });

  it('letter patterns are correct', () => {
    expect(puzzle.letterPatterns()).toEqual([
      [1, 3, 3, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 3, 3],
      [1, 3, 1],
      [3, 1, 1]
    ]);
  });
});
