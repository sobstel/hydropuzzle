import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { _ } from '@app/script';

import HText from '@components/HText';
import HTextInput from '@components/HTextInput';

import * as puzzle from './puzzle';

class WifiPassword extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onSuccess: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onSuccess: () => {}
  }

  state = {
    welcomeMessage: false
  }

  componentDidMount () {
    if (this.props.completed) {
      this.setState({welcomeMessage: true});
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <HText type='mono'>
          {_('chapter5.wifiPassword.message')}
        </HText>

        <HTextInput
          expectedValue={puzzle.password}
          onSuccess={this.onSuccess}
          clearTextOnFocus
          secureTextEntry
          containerStyle={styles.inputContainer}
          editable={!this.props.completed}
          value={this.props.completed ? puzzle.password : ''} />

        {this.state.welcomeMessage &&
          <HText type='mono'>
            {_('chapter5.wifiPassword.welcomeMessage')}
          </HText>
        }
      </View>
    );
  }

  onSuccess = () => {
    this.setState({welcomeMessage: true});
    this.props.onSuccess();
  }
}

export default WifiPassword;

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: '2rem',
    backgroundColor: '#fff9',
    alignItems: 'center'
  },
  inputContainer: {
    marginVertical: '1rem',
    width: '6.66rem'
  }
});
