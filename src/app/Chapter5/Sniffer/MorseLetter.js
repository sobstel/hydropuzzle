import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';

import * as puzzle from '../puzzle';

class MorseLetter extends PureComponent {
  static propTypes = {
    pattern: PropTypes.arrayOf(PropTypes.number).isRequired
  }

  static defaultProps = {
  }

  state = {
    index: 0,
    tone: false
  }

  baseMs = 400;

  render () {
    const delay = Math.floor(Math.random() * 1000);

    const signalStyles = [styles.signal, styles[this.state.tone ? 'on' : 'off']];

    return (
      <Animatable.View
        animation='bounceIn'
        delay={delay}
        onAnimationEnd={this.onAnimationEnd}
        style={signalStyles} />
    );
  }

  onAnimationEnd = ({ finished }) => {
    if (finished) {
      this.nextTone();
    }
  }

  nextTone = () => {
    // to light out
    if (this.state.tone) {
      const nextIndex = this.state.index + 1;
      if (nextIndex >= this.props.pattern.length) {
        this.setState({tone: false, index: 0});
        this.props.setTimeout(this.nextTone, this.baseMs * puzzle.BIG_SPACE);
        return;
      }

      this.setState({tone: false, index: nextIndex});
      this.props.setTimeout(this.nextTone, this.baseMs * puzzle.SPACE);
      return;
    }

    // to light on
    if (!this.state.tone) {
      this.setState({tone: true});
      this.props.setTimeout(this.nextTone, this.baseMs * this.props.pattern[this.state.index]);
    }
  }
}

export default ReactTimeout(MorseLetter);

const styles = EStyleSheet.create({
  $signalSize: '2rem',
  signal: {
    width: '$signalSize',
    height: '$signalSize',
    borderRadius: '$signalSize / 2'
  },
  on: {
    backgroundColor: '#333'
  },
  off: {
    backgroundColor: '#ddd'
  }
});
