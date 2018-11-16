import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { _ } from '@app/script';

import HTweet from '@components/HTweet';

import people from '@app/people';

class Fame extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    completed: false,
    onEnd: () => {}
  }

  render () {
    return (
      <View style={styles.container}>
        <Animatable.View
          animation={this.props.completed ? '' : 'fadeInRight'}
          style={[styles.postContainer, styles.firstPost]}>

          <HTweet
            text={_('chapter6.fame.text2')}
            person={people.professor}
            time='now'
            likesCount={9}
            retweetsCount={2} />
        </Animatable.View>

        <Animatable.View
          animation={this.props.completed ? '' : 'fadeInRight'}
          onAnimationEnd={this.props.onEnd}
          delay={750}
          style={styles.postContainer}>

          <HTweet
            text={_('chapter6.fame.text1')}
            person={people.orchid}
            time='now'
            likesCount={37}
            retweetsCount={11} />
        </Animatable.View>
      </View>
    );
  }
}

export default Fame;

const styles = EStyleSheet.create({
  container: {
    width: '100%'
  },
  postContainer: {
    paddingVertical: '0rem',
    backgroundColor: '#fff9'
  },
  firstPost: {
    marginBottom: '1rem'
  }
});
