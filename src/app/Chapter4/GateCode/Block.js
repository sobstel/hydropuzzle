import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import { rwidth } from '@lib/rsize';

import * as puzzle from '../puzzle';

class Block extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    variant: PropTypes.number.isRequired
  }

  static defaultProps = {
    active: false
  }

  variantSequence = puzzle.variantSequence();
  variantPatterns = puzzle.variantPatterns();

  TOP_LEFT_INDEX = 0
  TOP_RIGHT_INDEX = 1
  BOTTOM_RIGHT_INDEX = 2
  BOTTOM_LEFT_INDEX = 3

  render () {
    const variantPattern = this.variantPatterns[this.variantSequence[this.props.variant]];
    let patternStyles = [];

    for (let i = 0, len = variantPattern.length; i < len; i += 1) {
      let colPattern = variantPattern[i];
      let colPatternStyles = {};
      if (!colPattern[0]) {
        colPatternStyles.borderTopColor = 'transparent';
      }
      if (!colPattern[1]) {
        colPatternStyles.borderRightColor = 'transparent';
      }
      if (!colPattern[2]) {
        colPatternStyles.borderBottomColor = 'transparent';
      }
      if (!colPattern[3]) {
        colPatternStyles.borderLeftColor = 'transparent';
      }

      patternStyles[i] = colPatternStyles;
    }

    const activeStyles = (this.props.active ? styles.active : {});

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.col, activeStyles, patternStyles[this.TOP_LEFT_INDEX]]} />
          <View style={[styles.col, activeStyles, patternStyles[this.TOP_RIGHT_INDEX]]} />
        </View>
        <View style={styles.row}>
          <View style={[styles.col, activeStyles, patternStyles[this.BOTTOM_LEFT_INDEX]]} />
          <View style={[styles.col, activeStyles, patternStyles[this.BOTTOM_RIGHT_INDEX]]} />
        </View>
      </View>
    );
  }
}

export default Block;

const styles = EStyleSheet.create({
  $gateBlockSize: Math.round(rwidth(18) / 8) * 8, // round to 8x8 grid
  container: {
    width: '$gateBlockSize',
    height: '$gateBlockSize'
  },
  active: {
    backgroundColor: '#ddc',
    borderLeftColor: '#000',
    borderRightColor: '#000',
    borderTopColor: '#000',
    borderBottomColor: '#000',
  },
  row: {
    flexDirection: 'row',
    width: '$gateBlockSize',
    height: '$gateBlockSize / 2'
  },
  col: {
    width: '$gateBlockSize / 2',
    height: '$gateBlockSize / 2',
    borderLeftColor: '#333',
    borderRightColor: '#333',
    borderTopColor: '#333',
    borderBottomColor: '#333',
    borderWidth: Math.ceil(rwidth(1))
  }
});
