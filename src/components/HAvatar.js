import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, ViewPropTypes } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

class HAvatar extends PureComponent {
  static propTypes = {
    person: PropTypes.instanceOf(Object).isRequired,
    style: ViewPropTypes.style
  }

  static defaultProps = {
    style: {}
  }

  render () {
    return (
      <Image
        source={this.props.person.avatar}
        style={[styles.avatar, this.props.style]} />
    );
  }
}

export default HAvatar;

const styles = EStyleSheet.create({
  $avatarSize: '3.5rem',
  avatar: {
    width: '$avatarSize',
    height: '$avatarSize',
    borderRadius: '$avatarSize / 2'
  }
});
