import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';
import { _ } from '@app/script';

import HIcon from '@components/HIcon';
import HText from '@components/HText';

class Battery extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {}
  }

  state = {
    energy: 100
  }

  componentDidMount () {
    if (this.props.completed) {
      this.setState({energy: 0});
    }
  }

  render () {
    let iconName = 'energy1';
    if (this.state.energy <= 66) {
      iconName = 'energy2';
    }
    if (this.state.energy <= 33) {
      iconName = 'energy3';
    }
    if (this.state.energy <= 0) {
      iconName = 'energy4';
    }

    return (
      <Animatable.View animation='zoomIn' onAnimationEnd={this.decrementEnergy} style={styles.container}>
        <HText type='mono' style={styles.name}>{_('chapter6.battery.name')} ({(this.state.energy > 0 ? 'ON' : 'OFF')})</HText>
        <HText type='mono' style={styles.energy}>{this.state.energy}%</HText>
        <HIcon name={iconName} style={styles.icon} />
      </Animatable.View>
    );
  }

  decrementEnergy = () => {
    if (this.state.energy <= 0) {
      this.props.onEnd();
      return;
    }

    this.setState({energy: this.state.energy - 1});
    this.props.setTimeout(this.decrementEnergy, 40);
  }
}

export default ReactTimeout(Battery);

const styles = EStyleSheet.create({
  $batteryBold: '500',
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '1.25rem',
    paddingRight: '1rem',
    paddingVertical: '1rem',
    backgroundColor: '#fff9',
    width: '100%'
  },
  name: {
    width: rwidth(63),
    fontWeight: '$batteryBold',
    fontSize: '1.2rem'
  },
  energy: {
    width: rwidth(15),
    fontWeight: '$batteryBold',
    textAlign: 'right',
    paddingRight: '0.5rem',
    fontSize: '1.2rem'
  },
  iconContainer: {
    width: rwidth(12),
  },
  icon: {
    width: rwidth(12)
  }
});
