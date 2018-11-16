import * as puzzle from '@app/Chapter6/puzzle';

describe('Interpreter', () => {
  const interpreter = puzzle.interpreter();
  const manualSamples = puzzle.manualSamples();
  const endCommand = puzzle.endCommand();

  const run = (code) => {
    let state = interpreter.init();

    while (state.interpreter) {
      state = interpreter.runNextCommand(code, state);
    }

    return state;
  };

  it('STOP is valid command', () => {
    expect(endCommand).toBe('STOP');
    expect(run('+++++++++++++++++++.+.-----.+.')['consoleInput']).toEqual(endCommand);
    expect(run('++++[>+++++<-]>-.+.>++[<-->-]<-.+.')['consoleInput']).toEqual(endCommand);
  });

  it('manual samples are valid', () => {
    manualSamples.forEach(({symbol, codes}) => {
      codes.forEach((code) => {
        expect(run(code)['consoleInput']).toEqual(symbol);
      });
    });
  });
});
