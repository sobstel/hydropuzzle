import React, { PureComponent } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';
import { _ } from '@app/script';

import HButton from '@components/HButton';
import HImage from '@components/HImage';
import HText from '@components/HText';

import creditsImages from '@images/credits';

class ThankYou extends PureComponent {
  state = {
    index: 0
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.controlsContainer}>
          <HButton
            name='left2'
            appearance='dark'
            scale={0.9}
            onPress={this.onLeft}
            disabled={this.state.index === 0} />

          <HButton
            name='right2'
            appearance='dark'
            scale={0.9}
            onPress={this.onRight}
            disabled={this.state.index === creditsImages.keyboardSequence.length - 1} />
        </View>

        <View style={styles.keyboardContainer}>
          <HImage source={creditsImages.keyboardSequence[this.state.index]} />
        </View>

        <View style={styles.orderHints}>
          <HText type='mono'>1 7 9 8</HText>
          <HText type='mono'>3 2 5</HText>
          <HText type='mono'>4</HText>
          <HText type='mono'>6</HText>
        </View>
      </View>
    );
  }

  onLeft = () => this.setState({index: this.state.index - 1});
  onRight = () => this.setState({index: this.state.index + 1});
}

export default ThankYou;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#fff3',
    paddingHorizontal: '2rem',
    alignItems: 'center'
  },
  headerContainer: {
  },
  header: {
    textAlign: 'center'
  },
  controlsContainer: {
    marginVertical: '1rem',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  keyboardContainer: {
    opacity: 0.8,
    width: rwidth(100),
    marginBottom: '1rem'
  },
  orderHints: {
    alignItems: 'center',
    marginBottom: '1rem'
  }
});
