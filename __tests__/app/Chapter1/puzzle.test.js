import * as puzzle from '@app/Chapter1/puzzle';

describe('Password', () => {
  it('is valid', () => {
    expect(puzzle.password).toBe('qwerty');
  });
});
