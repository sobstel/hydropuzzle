import React, { PureComponent } from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';

class TypingIndicator extends PureComponent {
  state = {
    animation: true
  }

  render () {
    const fadeInOutAnimation = {
      0: { opacity: 0.5, scale: 1 },
      0.3: { opacity: 1, scale: 1.2 },
      1: { opacity: 0.5, scale: 1 }
    };

    const animationDuration = 450;
    const animationDelay = (animationDuration / 3);

    return (
      <View {...this.props} style={styles.container}>
        {this.state.animation && [
          <Animatable.View
            key={0}
            animation={fadeInOutAnimation}
            easing='ease-out-cubic'
            duration={animationDuration}
            style={styles.dot} />,
          <Animatable.View
            key={1}
            animation={fadeInOutAnimation}
            easing='ease-out-cubic'
            duration={animationDuration}
            delay={animationDelay}
            style={styles.dot} />,
          <Animatable.View
            key={2}
            animation={fadeInOutAnimation}
            easing='ease-out-cubic'
            duration={animationDuration}
            delay={animationDelay * 2}
            style={styles.dot}
            onAnimationEnd={this.restartAnimation} />
        ]}
      </View>
    );
  }

  restartAnimation = () => {
    this.setState({animation: false});
    this.setState({animation: true});
  }
}

export default TypingIndicator;

const styles = EStyleSheet.create({
  $dotSize: '0.5rem',
  container: {
    alignSelf: 'flex-start',
    marginVertical: '0.5rem',
    marginLeft: '6.25rem',
    flexDirection: 'row'
  },
  dot: {
    width: '$dotSize',
    height: '$dotSize',
    backgroundColor: '#aaa',
    borderRadius: '$dotSize / 2',
    marginRight: '$dotSize / 3'
  }
});
