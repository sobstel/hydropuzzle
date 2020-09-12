import React, { PureComponent } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';
import HText from '@components/HText';


import MorseLetter from './MorseLetter';

import * as puzzle from '../puzzle';

class MorseCode extends PureComponent {
  letterPatterns = puzzle.letterPatterns();

  render () {
    return (
      <View style={styles.container}>
        {this.letterPatterns.map((letterPattern, i) => (
          <View key={i}>
            <HText type='mono' style={styles.label}>{i + 1}</HText>
            <MorseLetter pattern={letterPattern} />
          </View>
        ))}
      </View>
    );
  }
}

export default MorseCode;

const styles = EStyleSheet.create({
  container: {
    marginTop: '1.6rem',
    width: rwidth(88),
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  label: {
    textAlign: 'center',
    marginBottom: '0.5rem'
  }
});
