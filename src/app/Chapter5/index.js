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
import WifiPassword from './WifiPassword';
import Sniffer from './Sniffer';
import EvilPlan from './EvilPlan';

import config from '@src/config';
import people from '@app/people';
import memes from '@images/memes';
import chapter5Images from '@images/chapter5';

class Chapter5 extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {}
  }

  state = {
    ...config.initialState.chapter5,
    snifferProgressEnded: false, // false
    scrollable: true
  }

  componentDidMount = async () => {
    if (this.props.completed) {
      this.setState({
        header1: true,
        wifiTrigger: true,
        snifferTrigger: true,
        wifiPassword: true,
        sniffer: false,
        evilChatTrigger: true,
        evilChat: true,
        evilPlanTrigger: true,
        evilPlan: true,
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
        keyboardShouldPersistTaps='always'
        showTitleBanner={this.state.titleBanner}
        upperTitle={_('chapter5.upperTitle')}
        lowerTitle={_('chapter5.lowerTitle')}
        titleImage={chapter5Images.title}
        scrollable={this.state.scrollable}>

        {this.state.header1 &&
          <HComicHeader
            text={_('chapter5.header1')}
            style={styles.header1} />
        }

        <View style={styles.triggersContainer}>
          {this.state.wifiTrigger &&
            <HTrigger
              disabled={this.state.evilChatTrigger || (this.state.snifferTrigger && this.state.wifiPassword)}
              name='wifi'
              onPress={this.onWifiTriggerPress} />
          }

          {this.state.snifferTrigger &&
            <HTrigger
              disabled={this.state.evilChatTrigger || this.state.sniffer}
              name='sniff'
              onPress={this.onSnifferTriggerPress} />
          }
        </View>

        {this.state.wifiPassword &&
          <WifiPassword
            onSuccess={this.onWifiPasswordSuccess}
            completed={this.state.evilChatTrigger} />
        }

        {this.state.sniffer &&
          <Sniffer
            onProgressEnd={this.onSnifferProgressEnd}
            completed={this.state.snifferProgressEnded || this.state.evilChatTrigger} />
        }

        {this.state.evilChatTrigger &&
          <HTrigger
            name='skull'
            onPress={this.onEvilChatTriggerPress}
            disabled={this.state.evilChat} />
        }

        {this.state.evilChat &&
          <HChat
            title={_('chapter5.evilChat.title')}
            messages={_('chapter5.evilChat.messages')}
            baseMs={config['chapter5.evilChat.baseMs']}
            people={people}
            memes={memes}
            onEnd={this.onEvilChatEnd}
            completed={this.state.evilPlanTrigger} />
        }

        {this.state.evilPlanTrigger &&
          <HTrigger
            name='evilPlan'
            onPress={this.onEvilPlanTriggerPress}
            disabled={this.state.evilPlan} />
        }

        {this.state.evilPlan &&
          <EvilPlan />
        }

        {this.state.chapterTrigger &&
          <HTrigger
            name='nextChapter'
            onPress={this.props.onEnd} />
        }
      </HChapter>
    );
  }

  onWifiTriggerPress = () => this.setState({wifiPassword: true, sniffer: false, snifferTrigger: true});
  onSnifferTriggerPress = () => this.setState({wifiPassword: false, sniffer: true});
  onSnifferProgressEnd = () => this.setState({snifferProgressEnded: true});
  onWifiPasswordSuccess = () => this.setState({wifiPassword: true, sniffer: false, evilChatTrigger: true});
  onEvilChatTriggerPress = () => this.setState({evilChat: true, scrollable: false});
  onEvilChatEnd = () => {
    this.props.setTimeout(() => {
      this.setState({evilPlanTrigger: true, scrollable: true});
    }, 1000);
  }
  onEvilPlanTriggerPress = () => this.setState({evilPlan: true, chapterTrigger: true})
}

export default ReactTimeout(Chapter5);

const styles = EStyleSheet.create({
  header1: {
    marginTop: '3rem'
  },
  triggersContainer: {
    flexDirection: 'row'
  }
});
