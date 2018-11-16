import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import awesomeIcon from '@lib/awesomeIcon';

import HText from '@components/HText';

class Hint extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render () {
    return (
      <HText style={styles.hintText}>
        {awesomeIcon(this.props.text)}
      </HText>
    );
  }
}

export default Hint;

const styles = EStyleSheet.create({
  hintText: {
    fontFamily: '$iconFont',
    fontSize: '2rem',
    lineHeight: '2rem',
    textAlign: 'center',
    marginTop: '1rem',
    color: '#333'
  }
});
