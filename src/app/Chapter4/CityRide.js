import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';

import HImage from '@components/HImage';
import HText from '@components/HText';
import MovingDot from './MovingDot';

import config from '@src/config';
import chapter4Images from '@images/chapter4';
import cityRideAnimation from './cityRideAnimation';

class CityRide extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func,
    onStart: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {},
    onStart: () => {}
  }

  state = {
    distanceLeft: 8.9,
    timeLeft: 17,
    expectedArrival: null
  }

  interval = null;
  rideTime = config['chapter4.cityRide.time'];

  componentWillMount () {
    this.updateExpectedArrival();
  }

  componentDidMount () {
    this.props.setInterval(() => this.updateExpectedArrival(), 15000); // every 15 secs
  }

  render () {
    return (
      <Animatable.View animation='fadeIn'style={styles.container}>
        <View style={styles.header}>
          <HText type='icon' style={styles.headerIcon}>&#xf175;</HText>
          <HText style={styles.headerText}>South Of Heaven</HText>
          <HText type='icon' style={styles.headerIcon}>&#xf175;</HText>
        </View>

        <View>
          <HImage
            source={chapter4Images.citymap}
            containerStyle={styles.mapContainerStyles} />

          {!this.props.completed &&
            <MovingDot
              animation={cityRideAnimation()}
              duration={this.rideTime}
              onStart={this.onAnimationStart}
              onEnd={this.onAnimationEnd} />
          }
        </View>

        {!this.props.completed &&
          <View style={styles.footer}>
            <HText style={[styles.footerText, styles.timeLeft]}>
              {this.state.timeLeft} min
            </HText>
            <HText style={styles.footerTextSeparator}>
              ·
            </HText>
            <HText style={[styles.footerText]}>
              {this.state.distanceLeft} km
            </HText>
            <HText style={styles.footerTextSeparator}>
              ·
            </HText>
            <HText style={[styles.footerText]}>
              {this.state.expectedArrival}
            </HText>
          </View>
        }
      </Animatable.View>
    );
  }

  onAnimationStart = () => {
    this.props.onStart();

    // distance decreaser
    this.interval = this.props.setInterval(() => {
      this.setState({distanceLeft: (this.state.distanceLeft - 0.1).toFixed(1)});
    }, 1250);

    // time left decreaser
    this.props.setTimeout(() => {
      this.setState({timeLeft: (this.state.timeLeft - 1)});
    }, this.rideTime * 0.75);
  }
  onAnimationEnd = () => {
    this.props.clearInterval(this.interval);
    this.props.onEnd();
  }

  onPress = (event) => {
    const {locationX, locationY} = event.nativeEvent;
    this.setState({x: locationX, y: locationY});
  }

  updateExpectedArrival () {
    const date = new Date();
    date.setMinutes(date.getMinutes() + this.state.timeLeft);

    const formattedHours = ('0' + date.getHours()).slice(-2);
    const formattedMinutes = ('0' + date.getMinutes()).slice(-2);

    const expectedArrival = `${formattedHours}:${formattedMinutes}`;

    this.setState({expectedArrival});
  }
}

export default ReactTimeout(CityRide);

const styles = EStyleSheet.create({
  container: {
    marginTop: '1rem'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '1.5rem',
    backgroundColor: '#109d58',
    zIndex: 2 // to hide dot under
  },
  headerIcon: {
    color: '#fff',
    fontSize: '1.75rem',
    marginHorizontal: '1.25rem'
  },
  headerText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: '1.5rem',
    lineHeight: '1.5rem'
  },
  footer: {
    paddingVertical: '1rem',
    paddingHorizontal: '1rem',
    backgroundColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  footerText: {
    color: '#666',
    fontWeight: '600'
  },
  footerTextSeparator: {
    marginHorizontal: '0.5rem'
  },
  timeLeft: {
    color: '#006a25',
    fontSize: '1.25rem'
  },
  mapContainerStyles: {
    width: '100%'
  }
});
