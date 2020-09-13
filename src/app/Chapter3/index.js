import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as StoreReview from 'react-native-store-review';
import { rwidth } from '@lib/rsize';
import { loadGame, saveGame } from '@lib/storage';
import { _ } from '@app/script';

import HChapter from '@components/HChapter';
import HComicHeader from '@components/HComicHeader';

import HProgressText from '@components/HProgressText';
import HTrigger from '@components/HTrigger';
import HTweet from '@components/HTweet';
import CreditCard from './CreditCard';
import AmazingAtomicActivity from './AmazingAtomicActivity';

import config from '@src/config';
import chapter3Images from '@images/chapter3';
import people from '@app/people';

class Chapter3 extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {}
  }

  state = {
    ...config.initialState.chapter3,
    scrollable: true
  }

  componentDidMount = async () => {
    if (this.props.completed) {
      this.setState({
        amazingAtomicActivityTrigger: true,
        amazingAtomicActvity: true,
        header1Trigger: true,
        header1: true,
        creditCardTrigger: true,
        selfReminderTrigger: true,
        creditCard: true,
        driverFinder: true,
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
        upperTitle={_('chapter3.upperTitle')}
        lowerTitle={_('chapter3.lowerTitle')}
        titleImage={chapter3Images.title}
        scrollable={this.state.scrollable}>

        {this.state.amazingAtomicActivityTrigger &&
          <HTrigger
            name='atom'
            onPress={this.onAmazingAtomicActivityTriggerPress}
            disabled={this.state.amazingAtomicActvity} />
        }

        {this.state.amazingAtomicActvity &&
          <AmazingAtomicActivity />
        }

        {this.state.header1Trigger &&
          <HTrigger
            name='anchor'
            onPress={this.onHeader1TriggerPress}
            disabled={this.state.header1} />
        }

        {this.state.header1 &&
          <HComicHeader
            text={_('chapter3.header1')}
            style={styles.header1} />
        }

        <View style={styles.triggersContainer}>
          {this.state.creditCardTrigger &&
            <HTrigger
              disabled={this.state.driverFinder || (this.state.selfReminderTrigger && this.state.creditCard)}
              name='creditCard'
              onPress={this.onCreditCardTriggerPress} />
          }
          {this.state.selfReminderTrigger &&
            <HTrigger
              disabled={this.state.driverFinder || this.state.selfReminder}
              name='unlock'
              onPress={this.onSelfReminderTriggerPress} />
          }
        </View>

        {this.state.creditCard &&
          <CreditCard
            onError={this.onCreditCardError}
            onSuccess={this.onCreditCardSuccess}
            completed={this.state.driverFinder} />
        }

        {this.state.selfReminder &&
          <View style={styles.selfReminderContainer}>

            <HTweet
              person={people.iman}
              text={_('chapter3.selfReminder.text')}
              time='Aug 16'
              image={chapter3Images.keyboard}
              commentsCount={16}
              likesCount={16}
              retweetsCount={16} />
          </View>
        }

        {this.state.driverFinder &&
          <View style={styles.driverFinder}>
            <HProgressText
              loadText={_('chapter3.driverFinder.loadText')}
              endText={_('chapter3.driverFinder.endText')}
              onEnd={this.onDriverFinderEnd}
              width={rwidth(84)}
              completed={this.state.chapterTrigger} />
          </View>
        }

        {this.state.chapterTrigger &&
          <HTrigger
            name='nextChapter'
            onPress={this.onEnd} />
        }
      </HChapter>
    );
  }

  onAmazingAtomicActivityTriggerPress = () => this.setState({amazingAtomicActvity: true, header1Trigger: true});
  onHeader1TriggerPress = () => this.setState({header1: true, creditCardTrigger: true});
  onCreditCardTriggerPress = () => this.setState({creditCard: true, selfReminder: false, selfReminderTrigger: true});
  onSelfReminderTriggerPress = () => this.setState({creditCard: false, selfReminder: true});
  onCreditCardError = () => {};
  onCreditCardSuccess = () => this.setState({creditCard: true, selfReminder: false, driverFinder: true, scrollable: false});
  onDriverFinderEnd = () => this.setState({chapterTrigger: true, scrollable: true});
  onEnd = () => {
    if (!this.props.completed && StoreReview.isAvailable) {
      StoreReview.requestReview();
    }
    this.props.onEnd();
  }
}

export default ReactTimeout(Chapter3);

const styles = EStyleSheet.create({
  header1: {
    // marginTop: '3rem'
  },
  triggersContainer: {
    flexDirection: 'row'
  },
  selfReminderContainer: {
    width: rwidth(100),
    backgroundColor: '#fff9'
  },
  driverFinder: {
    width: rwidth(100),
    backgroundColor: '#fff9',
    marginTop: '2rem',
    paddingVertical: '2rem',
    alignItems: 'center'
  }
});
