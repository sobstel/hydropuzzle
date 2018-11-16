import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { _ } from '@app/script';

import HBriefcase from '@components/HBriefcase';
import HFBPost from '@components/HFBPost';
import HInstaPost from '@components/HInstaPost';
import HTweet from '@components/HTweet';

import people from '@app/people';
import chapter2Images from '@images/chapter2';

class Briefcase extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func,
    onLastRecord: PropTypes.func,
    onPlayerComment: PropTypes.func,
    onRecord: PropTypes.func
  };

  static defaultProps = {
    completed: false,
    onEnd: () => {},
    onLastRecord: () => {},
    onPlayerComment: () => {},
    onRecord: () => {}
  };

  render () {
    return (
      <HBriefcase
        headerText={_('chapter2.briefcase.header')}
        records={this.records()}
        onEnd={this.props.onEnd}
        onLastRecord={this.props.onLastRecord}
        onRecord={this.props.onRecord}
        completed={this.props.completed} />
    );
  }

  records () {
    return [
      <HTweet
        person={people.slayer}
        time='25h'
        text={_('chapter2.briefcase.tweet.text')}
        image={chapter2Images.radioactiveFish}
        commentsCount={2}
        retweetsCount={1}
        likesCount={12} />,

      <HFBPost
        person={people.orchid}
        time='5hrs'
        location={_('chapter2.briefcase.fb.location')}
        text={_('chapter2.briefcase.fb.text')}
        likesCount={2}
        sharesCount={9} />,

      <HInstaPost
        person={people.maharaja}
        time='2 hours'
        location={_('chapter2.briefcase.insta.location')}
        image={chapter2Images.airplane}
        likesCount={13}
        likedBy='general_zod'
        comments={_('chapter2.briefcase.insta.comments')}
        commentable={!this.props.completed}
        onPlayerComment={this.props.onPlayerComment} />
    ];
  }
}

export default Briefcase;
