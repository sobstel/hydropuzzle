import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import HImage from '@components/HImage';
import MovingDot from '../MovingDot';
import EndRideBanner from './EndRideBanner';

import config from '@src/config';
import chapter4Images from '@images/chapter4';
import images from '@images';
import endRideAnimation from './endRideAnimation';

class EndRide extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {}
  }

  state = {
    endRideBanner: false
  }

  rideTime = config['chapter4.endRide.time'];

  componentDidMount () {
    if (this.props.completed) {
      this.setState({endRideBanner: true});
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Image
          source={images.bg}
          style={styles.dotCover} />

        <View>
          <HImage source={chapter4Images.beachmap} />

          {this.state.endRideBanner &&
            <EndRideBanner
              onEnd={this.props.onEnd}
              completed={this.props.completed} />
          }

          {!this.props.completed &&
            <MovingDot
              animation={endRideAnimation()}
              duration={this.rideTime}
              onEnd={this.onAnimationEnd} />
          }
        </View>
      </View>
    );
  }

  onAnimationEnd = () => {
    this.setState({endRideBanner: true});
  }
}

export default EndRide;

const styles = EStyleSheet.create({
  container: {
    width: '100%'
  },
  dotCover: {
    width: '100%',
    height: '2rem',
    resizeMode: 'cover',
    zIndex: 2
  }
});
