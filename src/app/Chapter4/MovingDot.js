import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';

class MovingDot extends PureComponent {
  static propTypes = {
    animation: PropTypes.object.isRequired,
    duration: PropTypes.number.isRequired,
    onEnd: PropTypes.func,
    onStart: PropTypes.func
  }

  static defaultProps = {
    onEnd: () => {},
    onStart: () => {}
  }

  render () {
    return (
      <Animatable.View
        animation={this.props.animation}
        onAnimationBegin={this.props.onStart}
        onAnimationEnd={this.props.onEnd}
        delay={600}
        duration={this.props.duration}
        style={styles.dotWrapper}>

        <Animatable.View
          animation='pulse'
          duration={600}
          easing='ease-out'
          iterationCount='infinite'
          style={styles.dot} />

      </Animatable.View>
    );
  }
}

export default MovingDot;

const styles = EStyleSheet.create({
  dotWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1
  },
  dot: {
    backgroundColor: '#4285f4',
    width: '1.2rem',
    height: '1.2rem',
    borderRadius: '0.6rem',
    borderColor: '#fff9',
    borderWidth: 2
  }
});
