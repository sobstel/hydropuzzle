import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import ReactTimeout from 'react-timeout';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth, rheight } from '@lib/rsize';

import HButton from '@components/HButton';

class HTitleBanner extends PureComponent {
  static propTypes = {
    lowerTitle: PropTypes.string.isRequired,
    onChapterDown: PropTypes.func.isRequired,
    onChapterUp: PropTypes.func.isRequired,
    titleImage: PropTypes.number.isRequired,
    upperTitle: PropTypes.string.isRequired
  }

  render () {
    return (
      <Animatable.View
        animation='fadeIn'
        duration={1000}
        onAnimationEnd={this.onFadeInEnd}
        style={styles.container}>

        <Image source={this.props.titleImage} style={styles.bg} />

        <HButton appearance='dark' name='chapterUp' onPress={this.props.onChapterUp} />

        <View style={styles.titleContainer}>
          <Animatable.Text
            animation={this.props.completed ? '' : 'fadeInLeft'}
            delay={250}
            duration={750}
            style={[styles.title, styles.upperTitle]}>

            {this.props.upperTitle}
          </Animatable.Text>

          <Animatable.Text
            animation={this.props.completed ? '' : 'fadeInRight'}
            delay={250}
            duration={750}
            style={styles.title}>

            {this.props.lowerTitle}
          </Animatable.Text>
        </View>

        <HButton appearance='dark' name='chapterDown' onPress={this.props.onChapterDown} />
      </Animatable.View>
    );
  }
}

export default ReactTimeout(HTitleBanner);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: rwidth(100),
    height: rheight(100),
    justifyContent: 'space-around'
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: rwidth(100),
    height: rheight(100)
  },
  titleContainer: {
    paddingTop: '2.75rem',
    paddingBottom: '2.25rem',
    justifyContent: 'center',
    backgroundColor: `${EStyleSheet.value('$appleOrange')}EE`
  },
  upperTitle: {
    fontSize: '2rem',
    marginBottom: '1.5rem'
  },
  title: {
    color: '#111',
    fontFamily: '$titleFont',
    textAlign: 'center',
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontSize: '2.75rem',
    paddingHorizontal: '2rem'
  }
});
