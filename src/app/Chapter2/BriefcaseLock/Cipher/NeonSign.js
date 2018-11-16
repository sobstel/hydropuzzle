import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

class NeonSign extends PureComponent {
  static propTypes = {
    activeX: PropTypes.number,
    activeY: PropTypes.number,
    pattern: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
  }

  static defaultProps = {
    activeX: null,
    activeY: null
  }

  render () {
    return (
      <View>
        {[0, 1, 2].map(x => {
          return (
            <View key={x} style={styles.row}>
              {[0, 1, 2].map(y => this.renderDot(x, y))}
            </View>
          );
        })}
      </View>
    );
  }

  renderDot (x, y) {
    let dotStyles = styles.dot;

    // highlight if belongs to pattern and currently active
    if (this.props.pattern[x][y] && (x === this.props.activeX || y === this.props.activeY)) {
      dotStyles = [dotStyles, styles.highlightedDot];
    }

    return (<View key={y} style={dotStyles} />);
  }
}

export default NeonSign;

const styles = EStyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  dot: {
    margin: '0.2rem',
    width: '0.8rem',
    height: '0.8rem',
    borderRadius: '0.4rem',
    backgroundColor: '#ccc'
  },
  highlightedDot: {
    backgroundColor: '#333'
  }
});
