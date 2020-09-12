import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';

import HButton from '@components/HButton';
import HImage from '@components/HImage';
import HText from '@components/HText';
import HTextInput from '@components/HTextInput';

import chapter7Images from '@images/chapter7';
import * as puzzle from './puzzle';

class Box extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onSuccess: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onSuccess: () => {}
  }

  // unique values sorted alphabetically
  letters = puzzle.phrase.split('').sort().filter((v, i, a) => a.indexOf(v) === i);

  state = {
    eye: false,
    number: 1,
    letter: this.letters[0],
    buttonsDisabled: false
  }

  render () {
    const { width: bgWidth, height: bgHeight } = Image.resolveAssetSource(chapter7Images.box);
    const height = rwidth(100) * (bgHeight / bgWidth);

    return (
      <View style={styles.container}>
        <HImage source={chapter7Images.box} containerStyle={styles.bg} />

        <View style={[styles.innerContainer, {height: height}]}>
          <View style={styles.sideColumn}>
            <HButton
              name='left2'
              appearance='dark'
              scale={0.8}
              onPress={this.onNumberLeft}
              disabled={this.state.buttonsDisabled || this.props.completed} />
            <HButton
              name='left2'
              appearance='dark'
              scale={0.8}
              onPress={this.onLetterLeft}
              disabled={this.state.buttonsDisabled || this.props.completed} />
          </View>

          <View style={styles.mainColumn}>
            <View style={styles.eyeContainer}>
              {this.state.eye &&
                <HImage source={chapter7Images.eye} containerStyle={styles.eye} />
              }
            </View>

            <View style={styles.upperLens}>
              <HText type='mono' style={styles.number}>{this.state.number}</HText>
            </View>

            <View style={styles.lowerLens}>
              <HText type='mono' style={styles.letter}>{this.state.letter}</HText>
            </View>

            <HTextInput
              selectTextOnFocus
              expectedValue={puzzle.phrase}
              onSuccess={this.onSuccess}
              containerStyle={styles.textInput}
              editable={!this.props.completed}
              value={this.props.completed ? puzzle.phrase : null} />
          </View>

          <View style={styles.sideColumn}>
            <HButton
              name='right2'
              appearance='dark'
              scale={0.8}
              onPress={this.onNumberRight}
              disabled={this.state.buttonsDisabled || this.props.completed} />
            <HButton
              name='right2'
              appearance='dark'
              scale={0.8}
              onPress={this.onLetterRight}
              disabled={this.state.buttonsDisabled || this.props.completed} />
          </View>
        </View>
      </View>
    );
  }

  onNumberLeft = () => {
    const number = (this.state.number > 1) ? this.state.number - 1 : puzzle.phrase.length;
    this.setState({number});
    this.haveALook(number, this.state.letter);
  }
  onNumberRight = () => {
    const number = (this.state.number < puzzle.phrase.length) ? this.state.number + 1 : 1;
    this.setState({number});
    this.haveALook(number, this.state.letter);
  }
  onLetterLeft = () => {
    const index = this.letters.indexOf(this.state.letter);
    const nextIndex = (index > 0) ? index - 1 : this.letters.length - 1;
    this.setState({letter: this.letters[nextIndex]});
    this.haveALook(this.state.number, this.letters[nextIndex]);
  }
  onLetterRight = () => {
    const index = this.letters.indexOf(this.state.letter);
    const nextIndex = (index < this.letters.length - 1) ? index + 1 : 0;
    this.setState({letter: this.letters[nextIndex]});
    this.haveALook(this.state.number, this.letters[nextIndex]);
  }
  onSuccess = () => {
    if (this.props.completed) {
      return;
    }
    this.setState({buttonsDisabled: true});
    this.props.onSuccess();
  }

  haveALook (number, letter) {
    const eye = (puzzle.phrase.charAt(number - 1) === letter);
    this.setState({eye});
  }
}

export default Box;

const styles = EStyleSheet.create({
  $columnWidth: rwidth(31),
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: rwidth(100)
  },
  container: {
    width: rwidth(100),
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  sideColumn: {
    width: '$columnWidth',
    justifyContent: 'center'
  },
  mainColumn: {
    width: '$columnWidth',
    alignItems: 'center'
  },
  eyeContainer: {
    marginTop: rwidth(10),
    marginLeft: -rwidth(0.5),
    width: rwidth(12),
    height: rwidth(12),
    alignItems: 'center',
    justifyContent: 'center'
  },
  eye: {
    width: rwidth(10),
    height: rwidth(10)
  },
  upperLens: {
    backgroundColor: '#000d',
    marginTop: rwidth(11.75),
    width: rwidth(8),
    height: rwidth(8),
    borderRadius: rwidth(4),
    alignItems: 'center',
    justifyContent: 'center'
  },
  lowerLens: {
    backgroundColor: '#000d',
    marginTop: rwidth(2.25),
    width: rwidth(12),
    height: rwidth(12),
    borderRadius: rwidth(6),
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    color: '#999',
    fontSize: '1.1rem'
  },
  letter: {
    color: '#999',
    fontSize: '1.5rem',
    lineHeight: '1.5rem'
  },
  textInput: {
    marginTop: rwidth(14),
    width: rwidth(28)
  }
});
