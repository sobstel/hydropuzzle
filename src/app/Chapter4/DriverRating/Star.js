import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';

import HIcon from '@components/HIcon';

const DEFAULT_OPACITY = 0.8;

class Star extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    empty: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    rating: PropTypes.number.isRequired
  }

  render () {
    return (
      <TouchableOpacity
        activeOpacity={this.props.disabled ? DEFAULT_OPACITY : 0.2}
        onPress={this.onPress}
        style={styles.container}>

        <HIcon name={this.props.empty ? 'starEmpty' : 'star'} />
      </TouchableOpacity>
    );
  }

  onPress = () => {
    this.props.onPress(this.props.rating);
  }
}

export default Star;

const styles = EStyleSheet.create({
  container: {
    width: rwidth(16),
    opacity: DEFAULT_OPACITY
  }
});
