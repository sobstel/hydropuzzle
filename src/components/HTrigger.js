import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import HButton from '@components/HButton';

/**
 * Button that triggers (make to appear) some other element
 */
class HTrigger extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    style: ViewPropTypes.style
  }

  static defaultProps = {
    disabled: false,
    onPress: () => {},
    style: {}
  }

  state = {
    disabled: this.props.disabled
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    // if prop changed and differs from state
    if (nextProps.disabled !== this.props.disabled && nextProps.disabled !== this.state.disabled) {
      this.setState({disabled: nextProps.disabled});
    }
  }

  render () {
    // onPress() needs to be after {...this.props}, so props' onPress gets overriden
    // and "disabled" works properly
    return (
      <HButton
        {...this.props}
        disabled={this.state.disabled}
        style={[styles.button, this.props.style]}
        onPress={this.onPress} />
    );
  }

  onPress = () => {
    this.setState({disabled: true});
    this.props.onPress();
  }
}

export default HTrigger;

const styles = EStyleSheet.create({
  button: {
    marginVertical: '2rem'
  }
});
