import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';
import { _ } from '@app/script';

import HText from '@components/HText';

import * as puzzle from './puzzle';

class Manual extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {}
  }

  render () {
    return (
      <Animatable.View
        animation={this.props.completed ? '' : 'slideInDown'}
        onAnimationEnd={this.props.onEnd}
        style={styles.container}>

        {this.renderHeader(_('chapter6.manual.header'))}

        {this.renderHeader(_('chapter6.manual.commandsHeader'))}
        {this.renderRow('<', _('chapter6.manual.lt'))}
        {this.renderRow('>', _('chapter6.manual.gt'))}
        {this.renderRow('+', _('chapter6.manual.inc'))}
        {this.renderRow('-', _('chapter6.manual.dec'))}
        {this.renderRow('[', _('chapter6.manual.opar'))}
        {this.renderRow(']', _('chapter6.manual.cpar'))}
        {this.renderRow('.', _('chapter6.manual.dot'))}

        {this.renderHeader(_('chapter6.manual.samplesHeader'))}
        {puzzle.manualSamples().map(({symbol, codes}) => this.renderRow(symbol, codes.join(' OR ')))}

      </Animatable.View>
    );
  }

  renderHeader (text) {
    return (
      <HText type='mono' style={styles.header}>
        {text.toUpperCase()}
      </HText>
    );
  }

  renderRow (symbol, definition, i) {
    return (
      <View style={styles.row} key={symbol}>
        <HText type='mono' style={styles.symbol}>{symbol.toUpperCase()}</HText>
        <HText type='mono' style={styles.definition}>{definition.toUpperCase()}</HText>
      </View>
    );
  }
}

export default Manual;

const styles = EStyleSheet.create({
  container: {
    marginTop: '2rem',
    marginBottom: '2rem',
    width: '100%',
    backgroundColor: '#fff9',
    paddingVertical: '1.5rem'
  },
  header: {
    paddingHorizontal: '1rem',
    marginVertical: '0.5rem',
    fontSize: '0.95rem'
  },
  symbol: {
    fontSize: '0.9rem',
    marginRight: '0.75rem'
  },
  definition: {
    fontSize: '0.9rem'
  },
  row: {
    paddingHorizontal: '1rem',
    flexDirection: 'row',
    maxWidth: rwidth(90)
  }
});
