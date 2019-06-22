import React, { PureComponent } from 'react';
import { Modal, Share, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';
import eventEmitterInstance from '@lib/eventEmitterInstance';
import { _ } from '@app/script';

import HText from '@components/HText';

class ShareModal extends PureComponent {
  state = {
    visible: false // false
  }

  componentDidMount () {
    eventEmitterInstance.addListener('shareModal', this.show);
  }

  componentWillUnmount () {
    eventEmitterInstance.removeAllListeners('shareModal');
  }

  render () {
    return (
      <Modal
        visible={this.state.visible}
        animationType='fade'
        transparent
        onRequestClose={this.hide}>

        <View style={styles.container}>
          <View style={styles.modal}>
            <HText style={styles.title}>
              {_('common.shareModal.title')}
            </HText>
            <HText style={styles.message}>
              {_('common.shareModal.message')}
            </HText>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={this.share}>
                <HText style={styles.button}>YES</HText>
              </TouchableOpacity>
              <View style={styles.buttonSeparator} />
              <TouchableOpacity onPress={this.hide}>
                <HText style={styles.button}>NO</HText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  show = () => this.setState({visible: true});
  hide = () => this.setState({visible: false});
  share = () => Share.share({message: 'Hydropuzzle. Can you solve the mystery? https://www.sobstel.org/hydropuzzle/'}).then(this.hide);
}

export default ShareModal;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000d',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    borderRadius: '0.5rem',
    backgroundColor: '#fffc',
    maxWidth: rwidth(88)
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '2rem',
    marginBottom: '1.5rem',
    paddingHorizontal: '1rem'
  },
  message: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    paddingHorizontal: '1.5rem'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#999'
  },
  buttonSeparator: {
    width: 1,
    backgroundColor: '#999'
  },
  button: {
    width: rwidth(40),
    paddingVertical: '1.25rem',
    color: '#418de3',
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: '500'
  }
});
