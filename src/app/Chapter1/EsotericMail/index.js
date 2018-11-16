import React, { PureComponent } from 'react';
import { Platform, View } from 'react-native';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { rwidth } from '@lib/rsize';
import { _ } from '@app/script';

import HButton from '@components/HButton';
import HMail from '@components/HMail';
import HText from '@components/HText';
import HProgressText from '@components/HProgressText';
import PasswordInput from './PasswordInput';

import * as puzzle from './../puzzle';

class EsotericMail extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func,
    onUploadStart: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {},
    onUploadStart: () => {}
  }

  state = {
    attachmentName: true,
    passwordInput: false,
    malwareUpload: false
  }

  componentDidMount () {
    if (this.props.completed) {
      this.setState({
        attachmentName: false,
        passwordInput: false,
        malwareUpload: true
      });
    }
  }

  render () {
    return (
      <HMail
        from='professor'
        body={this.prepareParagraphs()}
        footerContent={this.renderAttachement()}
        completed={this.props.completed} />
    );
  }

  renderAttachement () {
    return (
      <View>
        <View style={styles.attachment}>
          <HButton
            scale={0.9}
            name='attachment'
            appearance='dark'
            onPress={this.onAttachmentPress}
            disabled={this.state.passwordInput || this.state.malwareUpload} />

          {this.state.attachmentName &&
            <Animatable.View animation='fadeIn'>
              <HText style={styles.attachmentName}>
                {_('chapter1.mail.attachment')}
              </HText>
            </Animatable.View>
          }

          {this.state.passwordInput &&
            <PasswordInput
              label={_('chapter1.mail.passwordLabel')}
              password={puzzle.password}
              onBlur={this.onPasswordBlur}
              onSuccess={this.onPasswordSuccess} />
          }

          {this.state.malwareUpload &&
            <HProgressText
              loadText={_('chapter1.malwareUpload.loadText')}
              endText={_('chapter1.malwareUpload.endText')}
              width={rwidth(55)}
              onStart={this.onUploadStart}
              onEnd={this.onUploadEnd}
              completed={this.props.completed} />
          }
        </View>
      </View>
    );
  }

  onAttachmentPress = () => this.setState({attachmentName: false, passwordInput: true});
  onPasswordBlur = () => this.setState({attachmentName: true, passwordInput: false});
  onPasswordSuccess = () => this.setState({passwordInput: false, attachmentName: false, malwareUpload: true});
  onUploadStart = () => this.props.onUploadStart();
  onUploadEnd = () => this.props.onEnd();

  prepareParagraphs () {
    const body = _('chapter1.mail.body');
    return body.map((paragraph, i) => {
      const text = paragraph.replace('%{PASSWORD}', puzzle.password);
      return this.obfuscateParagraph(text, i);
    });
  }

  obfuscateParagraph (paragraph, i) {
    let text = paragraph;

    if (i > 0) {
      text = text.replace(/e/gi, Platform.select({ios: String.fromCharCode(9864), android: String.fromCharCode(9635)}));
      text = text.replace(/a/gi, Platform.select({ios: String.fromCharCode(9780), android: String.fromCharCode(9680)}));

      if (i < 6) {
        if (i > 1) {
          text = text.replace(/r/gi, String.fromCharCode(9632));
          text = text.replace(/t/gi, String.fromCharCode(10054));
        }
        if (i > 2) {
          text = text.replace(/w/gi, String.fromCharCode(9670));
          text = text.replace(/n/gi, String.fromCharCode(8711));
        }
        if (i > 3) {
          text = text.replace(/y/gi, Platform.select({ios: String.fromCharCode(8984), android: String.fromCharCode(8712)}));
          text = text.replace(/o/gi, Platform.select({ios: String.fromCharCode(9707), android: String.fromCharCode(10055)}));
        }
        if (i > 4) {
          text = text.replace(/i/gi, Platform.select({ios: String.fromCharCode(8710), android: String.fromCharCode(10109)}));
          text = text.replace(/s/gi, Platform.select({ios: String.fromCharCode(9777), android: String.fromCharCode(9640)}));
        }
      }
    }

    return text;
  }
}

export default ReactTimeout(EsotericMail);

const styles = EStyleSheet.create({
  attachment: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  attachmentName: {
    marginLeft: '0.5rem',
    fontWeight: '600'
  }
});
