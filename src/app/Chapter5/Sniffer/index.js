import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';
import { _ } from '@app/script';

import HProgressText from '@components/HProgressText';
import HText from '@components/HText';
import MorseCode from './MorseCode';

class Sniffer extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onProgressEnd: PropTypes.func.isRequired
  }

  static defaultProps = {
    completed: false
  }

  progressWidth = rwidth(66);

  render () {
    return (
      <View style={styles.container}>
        <HText type='mono' style={styles.message}>
          {_('chapter5.sniffer.message')}
        </HText>

        <View style={styles.progressContainer}>
          <HProgressText
            endText={_('chapter5.sniffer.endText')}
            width={this.progressWidth}
            onEnd={this.props.onProgressEnd}
            completed={this.props.completed} />
        </View>

        {this.props.completed &&
          <MorseCode />
        }
      </View>
    );
  }
}

export default Sniffer;

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: '2rem',
    backgroundColor: '#fff9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    marginBottom: '1.5rem'
  },
  progressContainer: {
    width: '100%',
    paddingVertical: '1rem',
    backgroundColor: '#c962',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
