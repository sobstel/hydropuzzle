import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import HButton from '@components/HButton';

class Controls extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onDown: PropTypes.func,
    onRight: PropTypes.func
  }

  static defaultProps = {
    disabled: false,
    onChange: () => {},
    onDown: () => {},
    onRight: () => {}
  }

  render () {
    return (
      <View style={styles.container}>
        <HButton
          name='right'
          appearance='dark'
          scale={0.9}
          disabled={this.props.disabled}
          onPress={this.props.onRight} />

        <HButton
          name='down'
          appearance='dark'
          scale={0.9}
          disabled={this.props.disabled}
          onPress={this.props.onDown} />

        <HButton
          name='rotate'
          appearance='dark'
          scale={0.9}
          disabled={this.props.disabled}
          onPress={this.props.onChange} />
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
