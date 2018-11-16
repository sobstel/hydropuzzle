import * as puzzle from '@app/Chapter2/puzzle';

describe('AnswerCheck', () => {
  const answerCheck = puzzle.answerCheck();

  it('validates correctly', () => {
    expect(answerCheck.isValid([3, 2, 9, 5])).toBe(true);
  });

  it('invalidates correctly', () => {
    expect(answerCheck.isValid([3, 5, 9, 2])).toBe(false);
    expect(answerCheck.isValid([9, 5, 2, 3])).toBe(false);
    expect(answerCheck.isValid([0, 0, 0, 0])).toBe(false);
    expect(answerCheck.isValid([1, 2, 3, 4])).toBe(false);
  });

  it('determines similar code correctly', () => {
    expect(answerCheck.isSimilar([2, 3, 5, 9])).toBe(true);
  });
});

describe('SecurityCode', () => {
  const securityCode = puzzle.securityCode();

  it('patterns', () => {
    expect(securityCode[0].value).toBe(3);
    expect(securityCode[0].signPattern).toEqual([[1, 1, 1], [1, 0, 1], [1, 1, 1]]);
    expect(securityCode[0].hintText).toBe('&#xf0c9;');

    expect(securityCode[1].value).toBe(2);
    expect(securityCode[1].signPattern).toEqual([[1, 0, 1], [1, 0, 1], [1, 1, 1]]);
    expect(securityCode[1].hintText).toBe('&#xf04c;');

    expect(securityCode[2].value).toBe(9);
    expect(securityCode[2].signPattern).toEqual([[1, 1, 1], [1, 0, 0], [1, 1, 1]]);
    expect(securityCode[2].hintText).toBe('&#xf00a;');

    expect(securityCode[3].value).toBe(5);
    expect(securityCode[3].signPattern).toEqual([[1, 0, 1], [1, 1, 1], [1, 0, 1]]);
    expect(securityCode[3].hintText).toBe('&#xf005;');
  });
});
