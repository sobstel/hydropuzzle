import * as puzzle from '@app/Chapter3/puzzle';

describe('Credit card', () => {
  it('has valid cvv code', () => {
    expect(puzzle.cvvCode).toBe('255');
  });

  it('has alt code', () => {
    expect(puzzle.altCode).toBe('933');
  });
});
