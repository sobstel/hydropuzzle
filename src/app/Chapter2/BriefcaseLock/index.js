import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { _ } from '@app/script';

import HText from '@components/HText';

import Cipher from './Cipher';
import AnswerBoard from './AnswerBoard';

class BriefcaseLock extends PureComponent {
  static propTypes = {
    onEnd: PropTypes.func
  }

  static defaultProps = {
    onEnd: () => {}
  }

  container = null;

  render () {
    return (
      <Animatable.View
        animation='flipInX'
        duration={600}
        ref={(container) => this.container = container}
        style={styles.container}>

        <View style={styles.textContainer}>
          <HText style={styles.text}>
            {_('chapter2.answerBoard.instructions')}
          </HText>
        </View>

        <Cipher />

        <AnswerBoard
          onSuccess={this.onSuccess} />

      </Animatable.View>
    );
  }

  onSuccess = () => {
    this.container.flipOutX(600).then(() => this.props.onEnd());
  }
}

export default BriefcaseLock;

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fffc',
    paddingVertical: '1rem',
    paddingHorizontal: '1rem'
  },
  textContainer: {
    paddingTop: '1rem',
    paddingBottom: '2rem',
    marginBottom: '2rem',
    borderBottomWidth: 1,
    borderColor: '#ccc3'
  },
  text: {
    fontFamily: '$monoFont',
    textAlign: 'center',
    fontSize: '1rem'
  }
});
