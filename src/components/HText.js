import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

class HText extends PureComponent {
  static propTypes = {
    type: PropTypes.string
  }

  static defaultProps = {
    style: {},
    type: 'default'
  }

  render () {
    const { style, type } = this.props;

    return (<Text {...this.props} style={[styles.common, styles[type], style]} />);
  }
}

export default HText;

const styles = EStyleSheet.create({
  common: {
    backgroundColor: 'transparent',
    fontSize: '1.1rem',
    color: 'black',
    fontWeight: '400'
  },
  default: {
    fontFamily: '$systemFont',
    lineHeight: '1.5rem'
  },
  mono: {
    fontFamily: '$monoFont',
    lineHeight: '1.5rem'
  },
  icon: {
    fontFamily: '$iconFont'
  }
});
