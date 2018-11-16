import React, { PureComponent } from 'react';
import { Keyboard, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';

class HTextInput extends PureComponent {
  static propTypes = {
    expectedValue: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onError: PropTypes.func,
    onSuccess: PropTypes.func
  }

  static defaultProps = {
    onBlur: () => {},
    onError: () => {},
    onSuccess: () => {}
  }

  state = {
    text: '',
    editable: true
  }

  render () {
    return (
      <Animatable.View
        style={[styles.inputContainer, this.props.containerStyle]}
        ref={(container) => this.container = container}>

        <TextInput
          editable={this.state.editable}
          keyboardAppearance='dark'
          autoCapitalize='none'
          autoCorrect={false}
          clearButtonMode='never'
          maxLength={this.props.expectedValue.length}
          {...this.props}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          underlineColorAndroid='transparent'
          style={styles.input}
          value={this.state.text} />
      </Animatable.View>
    );
  }

  onBlur = (event) => {
    this.validate(event.nativeEvent.text);
    this.props.setTimeout(this.props.onBlur, 500);
  }
  onChangeText = (text) => {
    this.setState({text});
    if (text.length === this.props.expectedValue.length) {
      return this.validate(text);
    }
  }
  // onSubmitEditing = (event) => this.validate(event.nativeEvent.text);

  validate (text) {
    if (!text) return;
    if (text.toLowerCase() === this.props.expectedValue.toLowerCase()) {
      Keyboard.dismiss();
      this.setState({editable: false});
      this.props.onSuccess();
    } else {
      this.container.shake(500).then(() => {
        this.props.onError(text);
      });
    }
  }
}

export default ReactTimeout(HTextInput);

const styles = EStyleSheet.create({
  inputContainer: {
    backgroundColor: '$appleOrange'
  },
  input: {
    backgroundColor: 'transparent',
    color: '#000',
    height: '2rem',
    fontFamily: '$monoFont',
    fontSize: '1rem',
    fontWeight: '600',
    textAlign: 'center',
    padding: 0
  }
});
