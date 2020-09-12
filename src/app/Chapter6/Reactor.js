import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import ReactTimeout from 'react-timeout';
import { rwidth } from '@lib/rsize';
import { _ } from '@app/script';

import HButton from '@components/HButton';
import HImage from '@components/HImage';
import HText from '@components/HText';

import chapter6Images from '@images/chapter6';

class Reactor extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onOff: PropTypes.func,
    onOn: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onOff: () => {},
    onOn: () => {}
  }

  state = {
    buttonsDisabled: false,
    effect: null,
    name: true,
    captions: true
  }

  effectNames = {
    on: 'ooops',
    off: 'kaboom'
  }

  container = null;
  containerHeight = null;

  componentDidMount () {
    if (this.props.completed) {
      this.setState({
        buttonsDisabled: true,
        name: true,
        captions: false
      });
      this.props.setTimeout(() => this.setState({effect: 'off'}), 100);
    }
  }

  render () {
    let nameStyles = styles.name;
    if (!this.state.name) {
      nameStyles = [nameStyles, {color: 'transparent'}];
    }

    let buttonTextStyles = styles.button;
    if (!this.state.captions) {
      buttonTextStyles = [buttonTextStyles, {color: 'transparent'}];
    }

    return (
      <Animatable.View
        onLayout={this.onLayout}
        style={styles.container}
        ref={(container) => this.container = container}>

        <HText type='mono' style={nameStyles}>{_('chapter6.reactor.name').toUpperCase()}</HText>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <HButton
              name='radiation'
              bgColor='#6c6'
              disabled={this.state.buttonsDisabled}
              onPress={this.onOnPress} />

            <Animatable.View animation='bounceIn' delay={250} duration={1250}>
              <HText type='mono' style={buttonTextStyles}>EIN</HText>
            </Animatable.View>
          </View>

          <View style={styles.buttonContainer}>
            <HButton
              name='radiation'
              bgColor='#c66'
              disabled={this.state.buttonsDisabled}
              onPress={this.onOffPress} />

            <Animatable.View animation='bounceIn' delay={250} duration={1250}>
              <HText type='mono' style={buttonTextStyles}>AUS</HText>
            </Animatable.View>
          </View>
        </View>

        {this.state.effect && this.renderEffect(this.state.effect)}
      </Animatable.View>
    );
  }

  renderEffect (name) {
    const effectImage = chapter6Images[this.effectNames[name]];
    const { width, height } = Image.resolveAssetSource(effectImage);

    const effectStyles = [
      styles.effect,
      {
        top: this.containerHeight / 2,
        marginTop: -(rwidth(100) * height / width / 2)
      }
    ];

    const onAnimationEnd = () => {
      this.setState({name: false});
      this.props[`on${name.charAt(0).toUpperCase() + name.slice(1)}`]();
    };

    return (
      <Animatable.View
        animation={this.props.completed ? '' : 'bounceIn'}
        onAnimationEnd={onAnimationEnd}
        style={effectStyles}>

        <HImage source={effectImage} />
      </Animatable.View>
    );
  }

  onLayout = (event) => this.containerHeight = event.nativeEvent.layout.height;
  onOnPress = () => this.onPress('on');
  onOffPress = () => this.onPress('off');

  onPress (name) {
    this.setState({buttonsDisabled: true});
    this.container.shake().then(() => {
      this.setState({captions: false});
      this.setState({effect: name});
    });
  }
}

export default ReactTimeout(Reactor);

const styles = EStyleSheet.create({
  container: {
    marginVertical: '2rem',
    width: rwidth(100),
    backgroundColor: '#fff9',
    paddingTop: '2rem',
    paddingBottom: '1rem',
    alignItems: 'center'
  },
  name: {
    fontSize: '1.2rem',
    letterSpacing: 5
  },
  buttonsContainer: {
    marginTop: '2rem',
    marginBottom: '1rem',
    flexDirection: 'row'
  },
  buttonContainer: {
    marginHorizontal: '0.5rem',
    alignItems: 'center'
  },
  buttonText: {
    marginTop: '0.5rem',
    fontSize: '1rem'
  },
  effect: {
    position: 'absolute',
    width: rwidth(98)
  }
});
