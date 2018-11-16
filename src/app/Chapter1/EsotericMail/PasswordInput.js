import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';

import HText from '@components/HText';
import HTextInput from '@components/HTextInput';

class PasswordInput extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onSuccess: PropTypes.func,
    password: PropTypes.string.isRequired
  }

  static defaultProps = {
    onBlur: () => {},
    onSuccess: () => {}
  }

  render () {
    return (
      <Animatable.View
        animation='fadeInRight'
        duration={500}
        style={styles.container}>

        <HText style={styles.label}>
          {this.props.label}
        </HText>

        <HTextInput
          expectedValue={this.props.password}
          onBlur={this.props.onBlur}
          onSuccess={this.props.onSuccess}
          clearTextOnFocus
          secureTextEntry
          ref={(textInput) => this.textInput = textInput}
          containerStyle={styles.inputContainer} />
      </Animatable.View>
    );
  }
}

export default PasswordInput;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    marginLeft: '0.25rem',
    fontWeight: '600'
  },
  inputContainer: {
    marginLeft: '0.75rem',
    width: '6.66rem'
  }
});
