import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { _ } from '@app/script';

import HButton from '@components/HButton';
import HText from '@components/HText';

class MailAttachment extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onAttachmentPress: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onAttachmentPress: () => {}
  }

  state = {
    buttonDisabled: false
  }

  componentDidMount () {
    if (this.props.completed) {
      this.setState({buttonDisabled: true});
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <HButton
          scale={0.9}
          name='attachment'
          appearance='dark'
          onPress={this.onAttachementPress}
          disabled={this.state.buttonDisabled} />

        <HText type='mono' style={styles.text}>
          {_('chapter6.mail.attachment')}
        </HText>
      </View>
    );
  }

  onAttachementPress = () => {
    this.setState({buttonDisabled: true});
    this.props.onAttachmentPress();
  }
}

export default MailAttachment;

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    marginLeft: '0.5rem'
  }
});
