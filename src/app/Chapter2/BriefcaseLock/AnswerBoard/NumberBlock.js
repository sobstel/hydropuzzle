import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import awesomeIcon from '@lib/awesomeIcon';

import HText from '@components/HText';

class NumberBlock extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    value: PropTypes.number.isRequired
  }

  static defaultProps = {
    active: false
  }

  render () {
    return (
      <View>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>
            {this.props.value}
          </Text>
        </View>

        <HText type='icon' style={styles.indicator}>
          {this.props.active && awesomeIcon('&#xf0de;')}
        </HText>
      </View>
    );
  }
}

export default NumberBlock;

const styles = EStyleSheet.create({
  numberContainer: {
    paddingHorizontal: '0.666rem',
    paddingVertical: '0.533rem',
    backgroundColor: '#ddd',
    borderRadius: '0.5rem'
  },
  number: {
    fontFamily: '$monoFont',
    fontSize: '2.666rem',
    fontWeight: 'bold',
    color: '#333'
  },
  indicator: {
    textAlign: 'center',
    fontSize: '1.6rem',
    paddingVertical: '0.333rem',
    color: '#333'
  }
});
