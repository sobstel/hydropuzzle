import React, { PureComponent } from 'react';
import { TouchableOpacity, ViewPropTypes } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import awesomeIcon from '@lib/awesomeIcon';

import HText from './HText';

/**
 * Share/like/comment button under post/tweet
 */
class HSocialButton extends PureComponent {
  static propTypes = {
    containerStyles: ViewPropTypes.style,
    iconStyles: ViewPropTypes.style,
    labelStyles: ViewPropTypes.style
  }

  static defaultProps = {
    containerStyles: {},
    iconStyles: {},
    labelStyles: {}
  }

  render () {
    const { button } = this.props;

    return (
      <TouchableOpacity onPress={button.onPress} style={[styles.container, this.props.containerStyles]}>
        <HText style={[styles.icon, this.props.iconStyles]}>{awesomeIcon(button.icon)}</HText>
        <HText style={[styles.label, this.props.labelStyles]}>{button.label}</HText>
      </TouchableOpacity>
    );
  }
}

export default HSocialButton;

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: '1rem',
    alignItems: 'center'
  },
  icon: {
    fontFamily: '$iconFont',
    fontSize: '1.4rem',
    color: '#8799a8',
    marginRight: '0.5rem'
  },
  label: {
    fontSize: '1rem',
    color: '#8799a8'
  }
});
