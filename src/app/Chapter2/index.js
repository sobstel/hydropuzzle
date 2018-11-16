import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import EStyleSheet from 'react-native-extended-stylesheet';
import { loadGame, saveGame } from '@lib/storage';
import { _ } from '@app/script';

import HChapter from '@components/HChapter';
import HComicStory from '@components/HComicStory';
import HMail from '@components/HMail';
import HTrigger from '@components/HTrigger';
import Briefcase from './Briefcase';
import BriefcaseLock from './BriefcaseLock';
import Flashdrive from './Flashdrive';

import config from '@src/config';
import chapter2Images from '@images/chapter2';

class Chapter2 extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {}
  }

  state = {
    ...config.initialState.chapter2,
    scrollable: true
  }

  componentDidMount = async () => {
    if (this.props.completed) {
      this.setState({
        deliveryTrigger: true,
        delivery: true,
        flashdrive: true,
        briefcaseLock: false,
        briefcase: true,
        drEvilMailTrigger: true,
        drEvilMail: true,
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
        upperTitle={_('chapter2.upperTitle')}
        lowerTitle={_('chapter2.lowerTitle')}
        titleImage={chapter2Images.title}
        scrollable={this.state.scrollable}>

        {this.state.deliveryTrigger &&
          <HTrigger
            name='manInBlack'
            onPress={this.onDeliveryTriggerPress}
            disabled={this.state.delivery} />
        }

        {this.state.delivery &&
          <HComicStory
            headerText={_('chapter2.delivery.header')}
            images={chapter2Images.deliveryStory}
            onEnd={this.onDeliveryEnd}
            timeout={config['chapter2.delivery.timeout']}
            completed={this.state.flashdrive} />
        }

        {this.state.flashdrive &&
          <Flashdrive
            onEnd={this.onFlashdriveEnd}
            style={styles.flashdrive}
            completed={this.state.briefcaseLock || this.state.briefcase} />
        }

        {this.state.briefcaseLock &&
          <BriefcaseLock
            onEnd={this.onBriefcaseLockEnd} />
        }

        {this.state.briefcase &&
          <Briefcase
            onLastRecord={this.onBriefcaseLastRecord}
            onPlayerComment={this.onBriefcasePlayerComment}
            completed={this.state.drEvilMailTrigger} />
        }

        {this.state.drEvilMailTrigger &&
          <HTrigger
            name='skull'
            onPress={this.onDrEvilMailTriggerPress}
            disabled={this.state.drEvilMail} />
        }

        {this.state.drEvilMail &&
          <HMail
            from='dr_evil'
            body={_('chapter2.drEvilMail.body')}
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

  onDeliveryTriggerPress = () => this.setState({delivery: true, scrollable: false});
  onDeliveryEnd = () => this.setState({flashdrive: true, scrollable: true});
  onFlashdriveEnd = () => this.setState({briefcaseLock: true});
  onBriefcaseLockEnd = () => this.setState({briefcaseLock: false, briefcase: true});
  onBriefcaseLastRecord = () => {}
  onBriefcasePlayerComment = () => this.setState({drEvilMailTrigger: true});
  onDrEvilMailTriggerPress = () => this.setState({drEvilMail: true, chapterTrigger: true});
}

export default ReactTimeout(Chapter2);

const styles = EStyleSheet.create({
  flashdrive: {
    marginTop: '1rem',
    marginBottom: '2rem'
  }
});
