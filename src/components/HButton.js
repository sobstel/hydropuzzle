import memoize from 'lodash.memoize';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LayoutAnimation, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import ReactTimeout from 'react-timeout';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';

import HIcon from '@components/HIcon';

/**
 * General button
 */
class HButton extends PureComponent {
  static propTypes = {
    appearance: PropTypes.string,
    bgColor: PropTypes.string,
    charCode: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onPress: PropTypes.func,
    scale: PropTypes.number,
    style: ViewPropTypes.style,
    text: PropTypes.string
  }

  static defaultProps = {
    appearance: '',
    bgColor: EStyleSheet.value('$appleOrange'),
    charCode: null,
    disabled: false,
    name: null,
    onPress: () => {},
    scale: 1,
    style: {},
    text: null
  }

  pulseDuration = 1000;

  state = {
    pulse: false,
    highlight: false
  }

  componentWillUnmount () {
    LayoutAnimation.spring();
  }

  render () {
    const styles = getStyles(this.props.scale);

    let bgColor = this.props.bgColor;
    if (this.props.appearance === 'dark') {
      bgColor = Color(this.props.bgColor).darken(0.1).string();
    }
    if (this.props.disabled) {
      bgColor = Color(bgColor).desaturate(0.5).fade(0.5).string();
    }

    const containerStyles = [styles.container, this.props.style];
    const buttonStyles = [styles.button, {backgroundColor: bgColor}];
    const borderStyles = [styles.border, {borderColor: bgColor}];
    const activeOpacity = this.props.disabled ? 1 : 0.5;

    return (
      <Animatable.View
        animation='bounceIn'
        delay={250}
        duration={1250}
        onAnimationEnd={this.onInitialAnimationEnd}
        style={containerStyles}>

        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={this.onPress}
          style={buttonStyles}>

          <HIcon
            name={this.props.name}
            text={this.props.text}
            style={styles.icon} />
        </TouchableOpacity>

        <View style={borderStyles} />

        {!this.props.disabled && this.state.pulse && this.pulse()}
        {!this.props.disabled && this.state.highlight && this.highlight()}
      </Animatable.View>
    );
  }

  pulse () {
    const styles = getStyles(this.props.scale);
    const pulseStyles = [styles.pulse, {borderColor: this.props.bgColor}];
    const pulseAnimation = {
      0: {opacity: 0.7, scale: 0.65},
      1: {opacity: 0, scale: 1.1}
    };

    return [
      <Animatable.View
        animation={pulseAnimation}
        easing='ease-out-cubic'
        duration={this.pulseDuration * 2}
        iterationCount='infinite'
        style={pulseStyles}
        key={0} />,
      <Animatable.View
        animation={pulseAnimation}
        easing='ease-out-cubic'
        duration={this.pulseDuration * 2}
        delay={this.pulseDuration}
        iterationCount='infinite'
        style={pulseStyles}
        key={1} />
    ];
  }

  highlight () {
    const styles = getStyles(this.props.scale);
    const highlightStyles = [styles.highlight, {backgroundColor: this.props.bgColor}];
    const highlightAnimation = {
      0: {opacity: 0.7, scale: 0.7},
      1: {opacity: 0, scale: 1}
    };

    return (
      <Animatable.View
        animation={highlightAnimation}
        easing='ease-out-cubic'
        duration={this.pulseDuration / 2}
        style={highlightStyles}
        onAnimationEnd={this.onHiglightAnimationEnd} />
    );
  }

  onInitialAnimationEnd = () => this.setState({pulse: true});

  onHiglightAnimationEnd = () => this.setState({pulse: true, highlight: false});

  onPress = () => {
    if (!this.props.disabled) {
      this.setState({pulse: false, highlight: true});
      this.props.onPress();
    }
  }
}

export default ReactTimeout(HButton);

const getStyles = memoize(function (scale = 1) {
  return EStyleSheet.create({
    $size: `${scale} * 5.5rem`,
    $borderSize: '$size - 20',
    $buttonSize: '$size - 24',
    container: {
      transform: [{scale: scale}],
      alignSelf: 'center',
      width: '$size',
      height: '$size'
    },
    button: {
      position: 'absolute',
      top: 12,
      left: 12,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 4,
      width: '$buttonSize',
      height: '$buttonSize',
      borderRadius: '$buttonSize / 2'
    },
    border: {
      position: 'absolute',
      top: 10,
      left: 10,
      borderWidth: 1,
      zIndex: 3,
      width: '$borderSize',
      height: '$borderSize',
      borderRadius: '$borderSize / 2'
    },
    highlight: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 2,
      width: '$size',
      height: '$size',
      borderRadius: '$size / 2'
    },
    pulse: {
      position: 'absolute',
      top: 0,
      left: 0,
      borderWidth: 2,
      zIndex: 1,
      width: '$size',
      height: '$size',
      borderRadius: '$size / 2'
    },
    icon: {
      width: '$buttonSize - 16',
      height: '$buttonSize - 16'
    }
  });
});
