import * as puzzle from '@app/Chapter4/puzzle';

describe('Film reel', () => {
  const filmReel = puzzle.filmReel();

  it('maps sequence to gate code position', () => {
    expect(filmReel.find((f) => f.i === 0).seq).toEqual(11);
    expect(filmReel.find((f) => f.i === 1).seq).toEqual(21);
    expect(filmReel.find((f) => f.i === 4).seq).toEqual(12);
    expect(filmReel.find((f) => f.i === 7).seq).toEqual(42);
    expect(filmReel.find((f) => f.i === 9).seq).toEqual(23);
    expect(filmReel.find((f) => f.i === 13).seq).toEqual(24);
    expect(filmReel.find((f) => f.i === 15).seq).toEqual(44);
  });
});

describe('Sequence', () => {
  const validSequence = [
    [3, 4, 4, 2],
    [4, 1, 0, 4],
    [4, 2, 3, 4],
    [0, 4, 4, 1]
  ];
  const initialSequence = puzzle.initialSequence;

  it('validates correctly', () => {
    expect(puzzle.validateSequence(validSequence)).toBe(true);
  });

  it('has initial sequence not equal to valid sequence', () => {
    expect(initialSequence).not.toEqual(validSequence);
  });
});
