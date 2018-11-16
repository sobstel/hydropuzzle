import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, ViewPropTypes } from 'react-native';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class HComicHeader extends PureComponent {
  static propTypes = {
    style: ViewPropTypes.style,
    text: PropTypes.string.isRequired
  }

  static defaultProps = {
    style: {}
  }

  render () {
    return (
      <Animatable.View
        animation='fadeIn'
        style={[styles.container, this.props.style]}>

        <Text style={styles.text}>
          {this.props.text}
        </Text>
      </Animatable.View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#fff7',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#6660',
    width: '100%'
  },
  text: {
    fontFamily: '$comicHeaderFont',
    fontSize: '1.25rem',
    paddingHorizontal: '1rem',
    paddingVertical: '0.75rem'
  }
});
