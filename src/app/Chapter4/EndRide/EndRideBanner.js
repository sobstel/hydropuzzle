import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';

import HImage from '@components/HImage';
import HText from '@components/HText';

import chapter4Images from '@images/chapter4';

class EndRideBanner extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {}
  }

  render () {
    return (
      <Animatable.View
        animation={this.props.completed ? '' : 'fadeInUp'}
        onAnimationEnd={this.props.onEnd}
        style={styles.container}>

        <View style={styles.iconContainer}>
          <HImage
            source={chapter4Images.fatTroutIcon}
            containerStyle={styles.icon} />
        </View>

        <HText style={styles.topText}>
          WELCOME TO
        </HText>
        <HText style={styles.middleText}>
          Fat Trout Café
        </HText>
        <HText style={styles.bottomText}>
          <Text style={styles.strongText}>dr_evil</Text>
          &nbsp;and&nbsp;
          <Text style={styles.strongText}>maharaja</Text>
          &nbsp;are&nbsp;visiting
        </HText>
      </Animatable.View>
    );
  }
}

export default EndRideBanner;

const iconSize = rwidth(14);

const styles = EStyleSheet.create({
  $iconSize: iconSize,
  container: {
    position: 'absolute',
    left: rwidth(5),
    bottom: 0,
    width: rwidth(90),
    backgroundColor: '#fff',
    paddingBottom: '0.5rem'
  },
  iconContainer: {
    alignSelf: 'center',
    width: '$iconSize',
    height: '$iconSize',
    borderRadius: '$iconSize / 2',
    backgroundColor: '#c63',
    marginTop: -(iconSize / 2),
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: '$iconSize - 13',
    height: '$iconSize - 13'
  },
  topText: {
    color: '#777',
    fontSize: '1.1rem',
    marginTop: '0.75rem',
    textAlign: 'center'
  },
  middleText: {
    color: '#222',
    fontSize: '2.2rem',
    lineHeight: '2.5rem',
    fontWeight: '600',
    marginVertical: '0.5rem',
    textAlign: 'center'
  },
  bottomText: {
    color: '#999',
    fontSize: '1rem',
    marginBottom: '0.75rem',
    textAlign: 'center'
  },
  strongText: {
    fontWeight: '600'
  }
});
