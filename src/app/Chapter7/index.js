import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import EStyleSheet from 'react-native-extended-stylesheet';
import { loadGame, saveGame } from '@lib/storage';
import { _ } from '@app/script';

import HChapter from '@components/HChapter';
import HChat from '@components/HChat';
import HComicHeader from '@components/HComicHeader';
import HTrigger from '@components/HTrigger';

import Box from './Box';

import config from '@src/config';
import chapter7Images from '@images/chapter7';
import people from '@app/people';
import memes from '@images/memes';

class Chapter7 extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {}
  }

  state = {
    ...config.initialState.chapter7,
    scrollable: true
  }

  componentDidMount = async () => {
    if (this.props.completed) {
      this.setState({
        chatTrigger: true,
        chat: true,
        box: true,
        endTrigger: true
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
        keyboardShouldPersistTaps='always'
        showTitleBanner={this.state.titleBanner}
        upperTitle={_('chapter7.upperTitle')}
        lowerTitle={_('chapter7.lowerTitle')}
        titleImage={chapter7Images.title}
        scrollable={this.state.scrollable}>

        {this.state.chatTrigger &&
          <HTrigger
            name='skull'
            onPress={this.onChatTriggerPress}
            disabled={this.state.chat} />
        }

        {this.state.chat &&
          <HChat
            title={_('chapter7.chat.title')}
            messages={_('chapter7.chat.messages')}
            baseMs={config['chapter7.chat.baseMs']}
            people={people}
            memes={memes}
            onEnd={this.onChatEnd}
            completed={this.state.box} />
        }

        {this.state.box &&
          <View style={styles.boxContainer}>
            <HComicHeader text={_('chapter7.boxHeader')} style={styles.boxHeader} />
            <Box onSuccess={this.onBoxSuccess} completed={this.state.endTrigger} />
          </View>
        }

        {this.state.endTrigger &&
          <HTrigger
            name='onOff'
            onPress={this.props.onEnd} />
        }
      </HChapter>
    );
  }

  onChatTriggerPress = () => this.setState({chat: true, scrollable: false});
  onChatEnd = () => {
    this.setState({scrollable: true});
    this.props.setTimeout(() => this.setState({box: true}), 2000);
  }
  onBoxSuccess = () => this.setState({endTrigger: true});
}

export default ReactTimeout(Chapter7);

const styles = EStyleSheet.create({
  boxHeader: {
    marginVertical: '2rem'
  }
});
