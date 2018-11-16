import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import HButton from '@components/HButton';

class Controls extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    onRight: PropTypes.func,
    onUp: PropTypes.func
  }

  static defaultProps = {
    disabled: false,
    onRight: () => {},
    onUp: () => {}
  }

  render () {
    return (
      <View style={styles.container}>
        <HButton
          name='up'
          appearance='dark'
          scale={0.9}
          disabled={this.props.disabled}
          onPress={this.props.onUp} />

        <HButton
          name='right'
          appearance='dark'
          scale={0.9}
          disabled={this.props.disabled}
          onPress={this.props.onRight} />
      </View>
    );
  }
}

export default Controls;

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center'
  }
});
