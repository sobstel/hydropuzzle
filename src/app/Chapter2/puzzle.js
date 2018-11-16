import config from '@src/config';

export function answerCheck () {
  return new AnswerCheck();
};

class AnswerCheck {
  constructor () {
    this.values = securityCode().map((item) => item.value);
  }

  isValid (values) {
    if (config['DEBUG']) {
      return true;
    }

    return this.values.join('') === values.join('');
  }

  isSimilar (values) {
    if (this.isValid(values)) {
      return false;
    }

    return this.values.every((value) => values.indexOf(value) !== -1);
  }
}

export function securityCode () {
  return [
    {
      value: 3,
      signPattern: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
      ],
      hintText: '&#xf0c9;'
    },
    {
      value: 2,
      signPattern: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1]
      ],
      hintText: '&#xf04c;'
    },
    {
      value: 9,
      signPattern: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1]
      ],
      hintText: '&#xf00a;'
    },
    {
      value: 5,
      signPattern: [
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1]
      ],
      hintText: '&#xf005;'
    }
  ];
}
