import config from '@src/config';

export function manualSamples () {
  return [
    {symbol: 'ABCD', codes: ['+.+.+.+.', '+.>++.>+++.>++++.']},
    {symbol: 'HELP', codes: ['++++[>++>+>+++>++++<<<<-]>.>+.>.>.']}
  ];
}

export function endCommand () {
  return 'STOP';
}

export function interpreter () {
  return new Interpreter();
};

class Interpreter {
  init () {
    return {
      caretPos: 0,
      interpreter: true,
      pointerPos: 0,
      cells: [0, 0, 0, 0, 0],
      consoleInput: '',
      consoleError: '',
      success: false
    };
  }

  runNextCommand (code, state) {
    if (config['DEBUG']) {
      return {...state, caretPos: -1, interpreter: false, success: true};
    }

    let nextState = {...state};

    // END
    if (state.caretPos >= code.length) {
      if (state.consoleInput === endCommand()) {
        return {...nextState, caretPos: -1, interpreter: false, success: true};
      }

      switch (state.consoleInput) {
        case '':
          return {...nextState, consoleError: 'command empty, forgot to output? (.)', interpreter: false};

        case 'ACID':
          return {...nextState, consoleError: 'https://youtu.be/u9-Evq-tcas', interpreter: false};

        case 'HELP':
          return {...nextState, consoleError: 'google -> brainfuck', interpreter: false};
      }

      return {...nextState, consoleError: 'unrecognized command', interpreter: false};
    }

    let caretPos = state.caretPos;
    let cells = state.cells.slice(0);
    let pointerPos = state.pointerPos;
    let consoleInput = state.consoleInput;

    switch (code[caretPos]) {
      case '<':
        if (pointerPos === 0) {
          return {...nextState, consoleError: `pointer out of range (cell ${pointerPos + 1})`, interpreter: false};
        }
        pointerPos -= 1;
        break;

      case '>':
        if (pointerPos + 1 === cells.length) {
          return {...nextState, consoleError: `pointer out of range (cell #${pointerPos + 1})`, interpreter: false};
        }
        pointerPos += 1;
        break;

      case '+':
        if (cells[pointerPos] === 26) {
          return {...nextState, consoleError: `max value is 26 (cell #${pointerPos + 1})`, interpreter: false};
        }
        cells[pointerPos] += 1;
        break;

      case '-':
        if (cells[pointerPos] === 0) {
          return {...nextState, consoleError: `min value is 0 (cell #${pointerPos + 1})`, interpreter: false};
        }
        cells[pointerPos] -= 1;
        break;

      case '[':
        if (cells[pointerPos] === 0) {
          const idx = code.slice(caretPos).indexOf(']');
          if (idx === -1) {
            return {...nextState, consoleError: 'no matching "]" found', interpreter: false};
          }
          caretPos += idx - 1;
        }
        break;

      case ']':
        if (cells[pointerPos] !== 0) {
          const idx = code.slice(0, caretPos).lastIndexOf('[');
          if (idx === -1) {
            return {...nextState, consoleError: 'no matching "[" found', interpreter: false};
          }
          caretPos = idx - 1;
        }
        break;

      case '.':
        const cellValue = cells[pointerPos];
        if (cellValue === 0) {
          return {...nextState, consoleError: `cannot output zero (cell ${pointerPos + 1})`, interpreter: false};
        }
        if (cellValue > 0 && cellValue <= 26) {
          consoleInput += String.fromCharCode(cellValue + 64); // 64 to match ascii code
        }
        break;
    }

    caretPos += 1;

    return {...nextState, caretPos, cells, pointerPos, consoleInput};
  }
}
