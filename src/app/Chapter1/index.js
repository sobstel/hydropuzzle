import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import EStyleSheet from 'react-native-extended-stylesheet';
import { loadGame, saveGame } from '@lib/storage';
import { _ } from '@app/script';

import HChapter from '@components/HChapter';
import HComicHeader from '@components/HComicHeader';
import HTrigger from '@components/HTrigger';
import CompanyChat from './CompanyChat';
import EsotericMail from './EsotericMail';

import config from '@src/config';
import chapter1Images from '@images/chapter1';

class Chapter1 extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {}
  }

  state = {
    ...config.initialState.chapter1,
    scrollable: true
  }

  componentDidMount = async () => {
    if (this.props.completed) {
      this.setState({
        header1: true,
        companyChatTrigger: true,
        companyChat: true,
        esotericMailTrigger: true,
        esotericMail: true,
        chapterTrigger: true
      });
    }
    if (!this.props.completed) {
      this.setState(await loadGame('currentState'));
    }
  };

  componentDidUpdate () {
    if (!this.props.completed) {
      saveGame('currentState', this.state);
    }
  }

  render () {
    return (
      <HChapter
        {...this.props}
        showTitleBanner={this.state.titleBanner}
        upperTitle={_('chapter1.upperTitle')}
        lowerTitle={_('chapter1.lowerTitle')}
        titleImage={chapter1Images.title}
        scrollable={this.state.scrollable}>

        {this.state.header1 &&
          <HComicHeader
            text={_('chapter1.afterTitle.header')}
            style={styles.header1} />
        }

        {this.state.companyChatTrigger &&
          <HTrigger
            name='chat'
            onPress={this.onCompanyChatTriggerPress}
            disabled={this.state.companyChat} />
        }

        {this.state.companyChat &&
          <CompanyChat
            onStart={this.onCompanyChatStart}
            onEnd={this.onCompanyChatEnd}
            completed={this.state.esotericMailTrigger} />
        }

        {this.state.esotericMailTrigger &&
          <HTrigger
            name='mail'
            onPress={this.onEsotericMailTriggerPress}
            disabled={this.state.esotericMail} />
        }
        {this.state.esotericMail &&
          <EsotericMail
            onUploadStart={this.onEsotericMailUploadStart}
            onEnd={this.onEsotericMailEnd}
            completed={this.state.chapterTrigger} />
        }

        {this.state.chapterTrigger &&
          <HTrigger
            name='nextChapter'
            onPress={this.props.onEnd} />
        }
      </HChapter>
    );
  }

  onCompanyChatTriggerPress = () => this.setState({companyChat: true});
  onCompanyChatStart = () => this.setState({scrollable: false});
  onCompanyChatEnd = () => {
    this.setState({scrollable: true});
    this.props.setTimeout(() => this.setState({esotericMailTrigger: true}), 1000);
  }
  onEsotericMailTriggerPress = () => this.setState({esotericMail: true});
  onEsotericMailUploadStart = () => this.setState({scrollable: false});
  onEsotericMailEnd = () => {
    this.props.setTimeout(() => this.setState({chapterTrigger: true, scrollable: true}), 1000);
  }
}

export default ReactTimeout(Chapter1);

const styles = EStyleSheet.create({
  header1: {
    marginTop: '2rem'
  }
});
