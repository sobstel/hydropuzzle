import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import EStyleSheet from 'react-native-extended-stylesheet';
import { loadGame, saveGame } from '@lib/storage';
import { _ } from '@app/script';

import HChapter from '@components/HChapter';
import HComicHeader from '@components/HComicHeader';
import HMail from '@components/HMail';
import HTrigger from '@components/HTrigger';

import MailAttachment from './MailAttachment';
import Manual from './Manual';
import Decrocoder from './Decrocoder';
import Battery from './Battery';
import Reactor from './Reactor';
import Kaputt from './Kaputt';
import Fame from './Fame';

import config from '@src/config';

import chapter6Images from '@images/chapter6';

class Chapter6 extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {}
  }

  state = {
    ...config.initialState.chapter6,
    scrollable: true
  }

  componentDidMount = async () => {
    if (this.props.completed) {
      this.setState({
        mailTrigger: true,
        mail: true,
        manual: true,
        decrocoder: true,
        battery: true,
        reactorTrigger: false,
        reactor: true,
        timeTravel: false,
        kaputt: true,
        fameTrigger: true,
        fame: true,
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
        upperTitle={_('chapter6.upperTitle')}
        lowerTitle={_('chapter6.lowerTitle')}
        titleImage={chapter6Images.title}
        scrollable={this.state.scrollable}>

        {this.state.mailTrigger &&
          <HTrigger
            name='robot'
            onPress={this.onMailTriggerPress}
            disabled={this.state.mail} />
        }

        {this.state.mail &&
          <HMail
            from='professor'
            body={_('chapter6.mail.body')}
            footerContent={<MailAttachment onAttachmentPress={this.onAttachmentPress} completed={this.state.manual} />}
            completed={this.state.manual} />
        }

        {this.state.manual &&
          <Manual
            onEnd={this.onManualEnd}
            completed={this.state.decrocoder} />
        }

        {this.state.decrocoder &&
          <Decrocoder
            onEnd={this.onDecrocoderEnd}
            completed={this.state.battery} />
        }

        {this.state.battery &&
          <Battery
            onEnd={this.onBatteryEnd}
            completed={this.state.reactorTrigger || this.state.reactor} />
        }

        {this.state.reactorTrigger &&
          <HTrigger
            name='radiation'
            onPress={this.onReactorTriggerPress}
            disabled={this.state.reactor} />
        }

        {this.state.reactor &&
          <Reactor
            onOn={this.onReactorOn}
            onOff={this.onReactorOff}
            completed={this.state.kaputt} />
        }

        {this.state.timeTravel &&
          <View>
            <HComicHeader text={_('chapter6.timeTravel')} style={styles.timeTravel} />

            <HTrigger
              name='backInTime'
              onPress={this.onTimeTravelEnd} />
          </View>
        }

        {this.state.kaputt &&
          <Kaputt
            onEnd={this.onKaputtEnd} />
        }

        {this.state.fameTrigger &&
          <HTrigger
            name='thumbsUp'
            onPress={this.onFameTriggerPress}
            disabled={this.state.fame} />
        }

        {this.state.fame &&
          <Fame
            onEnd={this.onFameEnd}
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

  onMailTriggerPress = () => this.setState({mail: true});
  onAttachmentPress = () => this.setState({manual: true});
  onManualEnd = () => this.setState({decrocoder: true});
  onDecrocoderEnd = () => this.setState({battery: true});
  onBatteryEnd = () => this.setState({reactor: true});
  onReactorOn = () => this.setState({timeTravel: true});
  onTimeTravelEnd = () => this.setState({timeTravel: false, reactor: false, reactorTrigger: true});
  onReactorTriggerPress = () => this.setState({reactor: true, reactorTrigger: false});
  onReactorOff = () => this.setState({kaputt: true});
  onKaputtEnd = () => this.setState({fameTrigger: true});
  onFameTriggerPress = () => this.setState({fame: true});
  onFameEnd = () => this.setState({chapterTrigger: true});
}

export default ReactTimeout(Chapter6);

const styles = EStyleSheet.create({
  timeTravel: {
    marginTop: '1rem'
  }
});
