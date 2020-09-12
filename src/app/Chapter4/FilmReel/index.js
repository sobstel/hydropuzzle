import React, { PureComponent } from 'react';
import { LayoutAnimation, Platform, View } from 'react-native';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';
import { _ } from '@app/script';

import HButton from '@components/HButton';
import HText from '@components/HText';

import PhotoFrame from './PhotoFrame';

import * as puzzle from '../puzzle';

class FilmReel extends PureComponent {
  static propTypes = {
    index: PropTypes.number
  }

  static defaultProps = {
    index: null
  }

  state = {
    index: 0
  }

  filmReel = puzzle.filmReel();

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (this.props.index !== nextProps.index) {
      this.setState({index: nextProps.index});
    }
  }

  render () {
    const frameContainerStyles = [
      styles.frameContainer,
      {
        marginLeft: -this.state.index * rwidth(100),
        width: this.filmReel.length * rwidth(100)
      }
    ];

    return (
      <Animatable.View animation='fadeIn' style={styles.container} removeClippedSubviews={Platform.select({ios: null, android: true})}>
        <HText style={styles.text}>
          {_('chapter4.filmReel.message')}
        </HText>

        <View style={frameContainerStyles}>
          {this.filmReel.map(({ source, seq }) => (
            <PhotoFrame
              image={source}
              seq={seq}
              key={seq} />
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          <HButton
            name='left'
            appearance='dark'
            scale={0.9}
            disabled={this.state.index === 0}
            onPress={this.onLeftButtonPress} />

          <HButton
            name='right'
            appearance='dark'
            scale={0.9}
            disabled={this.state.index === this.filmReel.length - 1}
            onPress={this.onRightButtonPress} />
        </View>
      </Animatable.View>
    );
  }

  onLeftButtonPress = () => {
    LayoutAnimation.easeInEaseOut();
    this.setState({index: this.state.index - 1});
  }

  onRightButtonPress = () => {
    LayoutAnimation.easeInEaseOut();
    this.setState({index: this.state.index + 1});
  }
}

export default ReactTimeout(FilmReel);

const styles = EStyleSheet.create({
  container: {
    width: rwidth(100),
    backgroundColor: '#fff6',
    marginBottom: '2rem'
  },
  text: {
    fontFamily: '$monoFont',
    textAlign: 'center',
    fontSize: '1rem',
    marginVertical: '1.5rem'
  },
  frameContainer: {
    flexDirection: 'row'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '1rem',
    marginBottom: '1rem'
  }
});
