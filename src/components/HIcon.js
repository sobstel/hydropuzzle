import React, { PureComponent } from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import HImage from '@components/HImage';
import HText from '@components/HText';

import icons from '@images/icons';

class HIcon extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    style: ViewPropTypes.style,
    text: PropTypes.string
  }

  static defaultProps = {
    name: null,
    style: {},
    text: null
  }

  render () {
    if (this.props.name) {
      const source = icons[this.props.name];

      return (
        <HImage
          source={source}
          containerStyle={this.props.style} />
      );
    }

    if (this.props.text) {
      const fontSize = EStyleSheet.value('rem') * 1.75;

      return (
        <HText type='icon'
          style={{fontSize}}>

          {this.props.text}
        </HText>
      );
    }

    return null;
  }
}

export default HIcon;
