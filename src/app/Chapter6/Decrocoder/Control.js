import React, { PureComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';

import HText from '@components/HText';

class Control extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    of: PropTypes.number.isRequired,
    onPress: PropTypes.func,
    pos: PropTypes.number.isRequired
  }

  static defaultProps = {
    disabled: false,
    onPress: () => {}
  }

  render () {
    const width = parseInt(rwidth(100) / this.props.of);
    let containerStyles = [styles.container, {width, height: rwidth(13)}];

    if (this.props.pos === this.props.of) {
      containerStyles = [
        containerStyles,
        { width: rwidth(100) - ((this.props.of - 1) * width) },
        styles.last
      ];
    }

    if (this.props.disabled) {
      return (<View style={[containerStyles, styles.disabled]}>{this.renderText()}</View>);
    }

    return (
      <TouchableOpacity onPress={this.onPress} style={containerStyles}>
        {this.renderText()}
      </TouchableOpacity>
    );
  }

  renderText () {
    return (<HText type='mono' style={styles.label}>{this.props.label}</HText>);
  }

  onPress = () => {
    if (this.props.disabled) {
      return;
    }

    this.props.onPress(this.props.label);
  }
}

export default Control;

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${EStyleSheet.value('$appleOrange')}cc`,
    borderColor: '#0006',
    borderRightWidth: 1,
    opacity: 1
  },
  disabled: {
    opacity: 0.3
  },
  last: {
    borderRightWidth: 0
  },
  label: {
    fontWeight: '600'
  }
});
