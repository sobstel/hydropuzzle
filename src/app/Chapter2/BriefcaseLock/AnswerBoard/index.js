import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';
import { _ } from '@app/script';

import HText from '@components/HText';

import Controls from './Controls';
import NumberBlock from './NumberBlock';

import * as puzzle from '../../puzzle';

class AnswerBoard extends PureComponent {
  static propTypes = {
    onSuccess: PropTypes.func
  }

  static defaultProps = {
    onSuccess: () => {}
  }

  answerCheck = puzzle.answerCheck();
  numbersContainer = null;

  state = {
    numbers: [
      {value: 0, active: true},
      {value: 0, active: false},
      {value: 0, active: false},
      {value: 0, active: false}
    ],
    controls: true,
    similarHint: false
  };

  render () {
    return (
      <View style={styles.container}>
        <HText style={styles.text}>
          {_('chapter2.answerBoard.message')}
        </HText>

        <Animatable.View
          ref={(numbersContainer) => this.numbersContainer = numbersContainer}
          style={styles.numbersContainer}>

          {this.state.numbers.map((number, i) => {
            return (
              <NumberBlock
                key={i}
                value={number.value}
                active={number.active} />
            );
          })}
        </Animatable.View>

        <Controls
          disabled={!this.state.controls}
          onRight={this.changeActive}
          onUp={this.changeValue} />

        {this.state.similarHint &&
          <Animatable.Text
            animation='pulse'
            duration={500}
            style={styles.similarHint}>

            {_('chapter2.answerBoard.similarHint')}
          </Animatable.Text>
        }
      </View>
    );
  }

  changeActive = () => {
    const activeIndex = this.getActiveIndex();
    const numbers = [...this.state.numbers];
    const nextIndex = (activeIndex < numbers.length - 1) ? activeIndex + 1 : 0;

    numbers[activeIndex].active = false;
    numbers[nextIndex].active = true;

    this.setState({numbers});
  }

  changeValue = () => {
    const activeIndex = this.getActiveIndex();
    const numbers = [...this.state.numbers];
    const value = numbers[activeIndex].value;

    numbers[activeIndex].value = value < 9 ? value + 1 : 0;

    this.setState({numbers});
    this.validateCode();
  }

  validateCode () {
    const values = this.state.numbers.map((item) => item.value);

    // similar hint -> disabled intentionally
    // this.setState({similarHint: this.answerCheck.isSimilar(values)});

    if (this.answerCheck.isValid(values)) {
      this.setState({controls: false});
      this.numbersContainer.flash(1000).then(() => {
        this.props.onSuccess();
      });
    }
  }

  getActiveIndex () {
    return this.state.numbers.findIndex((number) => number.active === true);
  }
}

export default AnswerBoard;

const styles = EStyleSheet.create({
  container: {
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTopWidth: 1,
    borderColor: '#ccc3'
  },
  numbersContainer: {
    width: rwidth(75),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center'
  },
  text: {
    fontFamily: '$monoFont',
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '1rem'
  },
  similarHint: {
    fontFamily: '$monoFont',
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.8rem'
  }
});
