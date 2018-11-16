import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { _ } from '@app/script';

import HComicHeader from '@components/HComicHeader';
import HText from '@components/HText';

class Kaputt extends PureComponent {
  static propTypes = {
    onEnd: PropTypes.func
  }

  static defaultProps = {
    onEnd: () => {}
  }

  render () {
    return (
      <View style={styles.container}>
        <HComicHeader text={_('chapter6.fame.header')} />

        <Animatable.View animation='fadeIn' onAnimationEnd={this.props.onEnd} delay={500} style={styles.footnoteContainer}>
          <HText type='mono' style={styles.footnote}>{_('chapter6.fame.footnote')}</HText>
        </Animatable.View>
      </View>
    );
  }
}

export default Kaputt;

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    marginTop: '0.5rem'
  },
  footnoteContainer: {
    backgroundColor: '#fff4',
    paddingVertical: '0.75rem',
    paddingHorizontal: '1.25rem'
  },
  footnote: {
    fontSize: '1rem'
  }
});
